import Header from "@/components/Header";
import { Accelerometer, AccelerometerMeasurement } from "expo-sensors";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const jogoDosPassos = () => {
    const [stepCount, setStepCount] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [subscription, setSubscription] = useState<any>(null);
    const [challengeStarted, setChallengeStarted] = useState<boolean>(false);
    const [targetSteps, setTargetSteps] = useState<number>(0);
    const [targetTime, setTargetTime] = useState<number>(0);


    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (challengeStarted && timeLeft !== null) {
            if (timeLeft > 0) {
                interval = setInterval(() => setTimeLeft((prev) => prev !== null ? prev - 1 : 0), 1000);
            } else {
                if (interval) {
                    clearInterval(interval);
                }
                setSubscription(null);
                checkChallenge();
            }
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [timeLeft, challengeStarted]);

    const startChallenge = () => {
        const steps = getRandomInt(5, 20);
        const time = getRandomInt(5, 15);
        setTargetSteps(steps);
        setTargetTime(time);
        setTimeLeft(time);
        setChallengeStarted(true);
        setStepCount(0);
        subscribeAccelerometer();
    }

    const subscribeAccelerometer = () => {
        const accelSubscription = Accelerometer.addListener((data: AccelerometerMeasurement) => {
            const { x, y, z } = data;
            if (Math.abs(x + y + z) > 1.5) {
                setStepCount((prev) => prev + 1);
            }
        });
        setSubscription(accelSubscription);
    };

    const checkChallenge = () => {
        if (stepCount >= targetSteps) {
            alert(`Desafio concluído com sucesso! Você caminhou ${targetSteps} passos em ${targetTime} segundos! 🎉`);
        } else {
            alert(`Você não completou o desafio. Precisava caminhar ${targetSteps} passos em ${targetTime} segundos. Tente novamente! 😔`);
        }
        setChallengeStarted(false); // Finaliza o desafio
    };

    // Função para gerar números inteiros aleatórios entre min e max
    const getRandomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Jogo dos Passos"></Header>
            {challengeStarted ? (
                <>
                    <Text style={styles.stepText}>Passos: {stepCount}</Text>
                    <Text style={styles.timerText}>Tempo restante: {timeLeft}s</Text>
                    <Text style={styles.challengeText}>
                        Desafio: Caminhe {targetSteps} passos em {targetTime} segundos
                    </Text>
                </>
            ) : (
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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000"
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

export default jogoDosPassos;