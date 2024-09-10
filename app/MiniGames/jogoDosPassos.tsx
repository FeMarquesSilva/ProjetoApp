import Header from "@/components/Header";
import { useRoute } from "@react-navigation/native";
import { Accelerometer, AccelerometerMeasurement } from "expo-sensors";
import { useCallback, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodoDatabase } from "../database/todoService";

const jogoDosPassos = () => {
    // Estados para gerenciar a contagem de passos, tempo restante, assinatura do acelerômetro, estado do desafio, metas de passos e tempo
    const [stepCount, setStepCount] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [subscription, setSubscription] = useState<any>(null);
    const [challengeStarted, setChallengeStarted] = useState<boolean>(false);
    const [targetSteps, setTargetSteps] = useState<number>(0);
    const [targetTime, setTargetTime] = useState<number>(0);

    // Funções para interagir com o banco de dados dos Tamagotchis
    const { getTamagochi, alterTamagochi } = useTodoDatabase();

    // Hook para acessar os parâmetros da rota atual
    const route = useRoute();
    const { tamagochiId } = route.params as { tamagochiId: string };
    const id = Number(tamagochiId); // Converte o ID do Tamagotchi para número

    /**
     * Função para atualizar a diversão do Tamagotchi a cada segundo.
     * Usa useCallback para evitar recriações desnecessárias da função.
     */
    const atualizarDiversao = useCallback(async () => {
        try {
            const tamagochis = await getTamagochi(); // Obtém todos os Tamagotchis do banco de dados
            const tamagochi = tamagochis.find(t => t.id === id); // Encontra o Tamagotchi específico pelo ID
            if (tamagochi) {
                const updatedFun = Math.min(tamagochi.fun + 1, 100); // Incrementa a diversão, limitando-a a 100
                await alterTamagochi({
                    id: tamagochi.id,
                    name: tamagochi.name,
                    image: tamagochi.image,
                    hunger: tamagochi.hunger,
                    sleep: tamagochi.sleep,
                    fun: updatedFun, // Atualiza o valor de diversão
                    status: tamagochi.status,
                });
            }
        } catch (error) {
            console.error("Erro ao atualizar a diversão do bichinho:", error); // Log de erros
        }
    }, [getTamagochi, alterTamagochi, id]);

    /**
     * useEffect para configurar um intervalo que atualiza a diversão do Tamagotchi a cada segundo.
     * Limpa o intervalo quando o componente é desmontado.
     */
    useEffect(() => {
        const interval = setInterval(atualizarDiversao, 1000); // Atualiza a diversão a cada segundo
        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [atualizarDiversao]);

    /**
     * useEffect para gerenciar o temporizador do desafio.
     * Inicia ou decrementa o tempo restante a cada segundo.
     * Verifica a conclusão do desafio quando o tempo acaba.
     */
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (challengeStarted && timeLeft !== null) {
            if (timeLeft > 0) {
                // Decrementa o tempo restante a cada segundo
                interval = setInterval(() => setTimeLeft((prev) => (prev !== null ? prev - 1 : 0)), 1000);
            } else {
                // Quando o tempo acaba, limpa o intervalo e verifica o resultado do desafio
                if (interval) {
                    clearInterval(interval);
                }
                setSubscription(null); // Remove a assinatura do acelerômetro
                checkChallenge(); // Verifica se o desafio foi cumprido
            }
        }

        return () => {
            if (interval) {
                clearInterval(interval); // Limpa o intervalo ao atualizar os estados
            }
        };
    }, [timeLeft, challengeStarted]);

    /**
     * Função para iniciar o desafio.
     * Define metas aleatórias de passos e tempo, reseta a contagem de passos e começa a escutar o acelerômetro.
     */
    const startChallenge = () => {
        const steps = getRandomInt(5, 20); // Define um número aleatório de passos entre 5 e 20
        const time = getRandomInt(5, 15); // Define um tempo aleatório entre 5 e 15 segundos
        setTargetSteps(steps); // Define a meta de passos
        setTargetTime(time); // Define a meta de tempo
        setTimeLeft(time); // Inicializa o tempo restante
        setChallengeStarted(true); // Marca o desafio como iniciado
        setStepCount(0); // Reseta a contagem de passos
        subscribeAccelerometer(); // Inicia a escuta do acelerômetro
    }

    /**
     * Função para assinar o acelerômetro e atualizar a contagem de passos com base nos dados recebidos.
     */
    const subscribeAccelerometer = () => {
        const accelSubscription = Accelerometer.addListener((data: AccelerometerMeasurement) => {
            const { x, y, z } = data; // Obtém os valores do acelerômetro nos eixos X, Y e Z
            if (Math.abs(x + y + z) > 1.5) { // Verifica se a soma absoluta dos eixos excede um limiar
                setStepCount((prev) => prev + 1); // Incrementa a contagem de passos
            }
        });
        setSubscription(accelSubscription); // Salva a assinatura para possível limpeza futura
    };

    /**
     * Função para verificar se o desafio foi cumprido com sucesso.
     * Exibe um alerta com base no resultado e finaliza o desafio.
     */
    const checkChallenge = () => {
        if (stepCount >= targetSteps) {
            alert(`Desafio concluído com sucesso! Você caminhou ${targetSteps} passos em ${targetTime} segundos! 🎉`);
        } else {
            alert(`Você não completou o desafio. Precisava caminhar ${targetSteps} passos em ${targetTime} segundos. Tente novamente! 😔`);
        }
        setChallengeStarted(false);
    };

    /**
     * Função auxiliar para gerar um número inteiro aleatório entre min e max (inclusive).
     * @param min Número mínimo
     * @param max Número máximo
     * @returns Número inteiro aleatório entre min e max
     */
    const getRandomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Componente de Cabeçalho */}
            <Header title="Jogo dos Passos"></Header>

            {/* Renderiza a interface do desafio se estiver iniciado */}
            {challengeStarted ? (
                <>
                    {/* Exibe a contagem de passos */}
                    <Text style={styles.stepText}>Passos: {stepCount}</Text>

                    {/* Exibe o tempo restante */}
                    <Text style={styles.timerText}>Tempo restante: {timeLeft}s</Text>

                    {/* Exibe os detalhes do desafio */}
                    <Text style={styles.challengeText}>
                        Desafio: Caminhe {targetSteps} passos em {targetTime} segundos
                    </Text>
                </>
            ) : (
                // Botão para iniciar o desafio quando não estiver em andamento
                <View style={styles.buttonContainer}>
                    <Button title="Iniciar Desafio" onPress={startChallenge} />
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepText: {
        fontSize: 48,
        color: "#fff",
        textAlign: 'center',
        marginBottom: 20
    },
    timerText: {
        fontSize: 24,
        color: "#fff",
        textAlign: 'center',
        marginBottom: 20
    },
    challengeText: {
        fontSize: 24,
        color: "#ff6347",
        textAlign: 'center',
        marginBottom: 20
    },
    buttonContainer: {
        marginTop: 300,
        alignItems: 'center',
        borderWidth: 30,
        marginBottom: 30
    }
})

export default jogoDosPassos; // Exporta o componente para ser usado em outras partes do aplicativo
