import Header from "@/components/Header";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodoDatabase } from "../database/todoService"; // Ajuste o caminho conforme necessário

type Player = "0" | "X";

const JogoDaVelha = () => {
    const route = useRoute();
    const { tamagochiId } = route.params as { tamagochiId: string };
    const id = Number(tamagochiId); // Converte o ID do bichinho para número;

    const { getTamagochi, alterTamagochi } = useTodoDatabase();

    // Arrays com as possíveis combinações para ganhar;
    const vitory = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Criação do tabuleiro com 9 posições;
    const tabuleiro = () => {
        return new Array(9).fill(true);
    };

    // Componentes necessários;
    const [vencedor, setVencedor] = useState<string | null>(null);
    const [jogador1Score, setJogador1Score] = useState(0);
    const [jogador2Score, setJogador2Score] = useState(0);
    const [jogadorTurn, setJogadorTurn] = useState("X");
    const [jogador1Name, setJogador1Name] = useState('Player1');
    const [jogador2Name, setJogador2Name] = useState('Player2');
    const [jogada, setJogada] = useState<{ [key: string]: Player }>({});

    // Função para verificar quem é o jogador da vez;
    const jogadorDaVez = () => {
        if (jogadorTurn === "X") {
            return jogador1Name;
        } else {
            return jogador2Name;
        }
    };

    // Marcação dinâmica de qual posição está sendo clicada e verifica se deu uma combinação de vitória
    const play = (index: number) => {
        if (!jogada[index] && !vencedor) {
            const novaJogada = { ...jogada, [index]: jogadorTurn };
            setJogada(novaJogada);
            setJogadorTurn((prev) => (prev === "X" ? "0" : "X"));//Seta o jogador da vez;
            verificarVencedor(novaJogada); //Verifica se a jogada fez uma vitória;
        }
    };

    // Função para verificar o vencedor
    const verificarVencedor = (jogadaAtual: { [key: number]: Player }) => {
        for (const [a, b, c] of vitory) {
            if (jogadaAtual[a] && jogadaAtual[a] === jogadaAtual[b] && jogadaAtual[a] === jogadaAtual[c]) {
                setVencedor(jogadaAtual[a]);
                if (jogadaAtual[a] === "X") {
                    setJogador1Score((prev) => prev + 1);
                    fimDePartida("Player1");
                } else {
                    setJogador2Score((prev) => prev + 1);
                    fimDePartida("Player2");
                }
                return;
            }
        }
        if (Object.keys(jogadaAtual).length === 9 && !vencedor) {
            setVencedor(null); // Empate
            fimDePartida(null); // Empate
        }
    };

    // Função para informar o fim da partida
    const fimDePartida = (vencedor: string | null) => {
        if (vencedor !== null) {
            alert(`O jogador ${vencedor} venceu!`);
        } else {
            alert("Empate!");
        }
        setVencedor(vencedor);
    };

    // Função para reiniciar o jogo
    const reiniciarPartida = () => {
        setVencedor(null);
        setJogada({});
        setJogadorTurn("X");
    };

    // Função para resetar os pontos dos jogadores
    const reiniciarPontuação = () => {
        setJogador1Score(0);
        setJogador2Score(0);
    };

    // Atualiza a diversão do bichinho a cada segundo
    const atualizarDiversao = useCallback(async () => {
        try {
            const tamagochis = await getTamagochi();
            const tamagochi = tamagochis.find(t => t.id === id);
            if (tamagochi) {
                const updatedFun = Math.min(tamagochi.fun + 1, 100);
                await alterTamagochi({
                    id: tamagochi.id,
                    name: tamagochi.name,
                    image: tamagochi.image,
                    hunger: tamagochi.hunger,
                    sleep: tamagochi.sleep,
                    fun: updatedFun,
                    status: tamagochi.status,
                });
            }
        } catch (error) {
            console.error("Erro ao atualizar a diversão do bichinho:", error);
        }
    }, [getTamagochi, alterTamagochi, id]);

    useEffect(() => {
        const interval = setInterval(atualizarDiversao, 1000); // Atualiza a diversão a cada segundo

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [atualizarDiversao]);

    return (
        <SafeAreaView style={styles.containerBody}>
            <View>
                <Header title="JOGO DA VELHA" />
                <View style={styles.container}>
                    <View style={styles.info}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoText}>Vitórias {jogador1Name}: {jogador1Score}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoText}>Vitórias {jogador2Name}: {jogador2Score}</Text>
                        </View>
                    </View>
                    <Button title="Reiniciar Pontuações" onPress={reiniciarPontuação} />
                    <Text style={styles.playerTurn}>Jogador da vez: {jogadorDaVez()}</Text>
                    <View style={styles.board}>
                        {tabuleiro().map((_, i) => (
                            <Text key={i} style={styles.cell} onPress={() => play(i)}>{jogada[i]}</Text>
                        ))}
                    </View>
                    <Button title="Reiniciar Partida" onPress={reiniciarPartida} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default JogoDaVelha;

const styles = StyleSheet.create({
    containerBody: {
        backgroundColor: "#FF8433",
        height: "100%",
    },
    container: {
        width: "100%",
        height: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    board: {
        display: 'flex',
        justifyContent: 'center',
        width: 370,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
    },
    cell: {
        width: 100,
        fontSize: 80,
        height: 100,
        display: 'flex',
        textAlign: 'center',
        backgroundColor: "#d4f1d9",
        margin: 2,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        backgroundColor: "#F0391D",
        marginBottom: 100,
    },
    infoItem: {
        flex: 1,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        color: "#fff",
    },
    playerTurn: {
        backgroundColor: "#73b295",
        textAlign: 'center',
        fontSize: 18,
        padding: 10,
        margin: 5,
    },
    button: {
        backgroundColor: "#006400",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});