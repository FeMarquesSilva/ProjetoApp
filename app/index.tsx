import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

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

    //Função para ao carregar 100% o botão "Jogar" fique acessivel para o jogador;
    const handlePlayPress = () => {
        if (loadingComplete) {
          router.navigate("/TelasDoGame");
        }
      };

    return (
        <SafeAreaView style={styles.container}>
        <View>
          <Text>Carregando...</Text>
          <View>
            <View />
          </View>
          <Text>{Math.round(progress)}%</Text>
          <TouchableOpacity
            onPress={handlePlayPress}
            disabled={!loadingComplete}
          >
            <Text>Jogar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF8433',
      },

})