import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Index = () => {

    const [progress, setProgress] = useState(0);
    const [loadingComplete, setLoadingComplete] = useState(false);
    
    // Simula o carregamento
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    setLoadingComplete(true);
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 30); // Ajuste o intervalo para controlar a velocidade do carregamento

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Essa tela deverá exibir a barra de carregamento do jogo!</Text>
            <Button title="Tela inicial" onPress={() => router.navigate("/TelasDoGame")} />
        </View>
    );
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        color: '#000'

    },
    text: {
        fontSize: 30,
        color: '#000',
        textAlign: 'center',
    }
})