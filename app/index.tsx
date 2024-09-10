import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const Index = () => {
  // Define um estado 'progress' com valor inicial 0, que armazenará o progresso da barra de carregamento;
  const [progress, setProgress] = useState(0);

  // Define um estado 'loadingComplete' para verificar se o carregamento foi concluído;
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Simula o processo de carregamento usando o hook useEffect;
  useEffect(() => {
    // Define um intervalo que será executado a cada 30 milissegundos;
    const interval = setInterval(() => {
      // Se o progresso atingir ou ultrapassar 100, o carregamento é concluído;
      setProgress((prevProgress) => {
        // Limpa o intervalo quando o carregamento termina;
        if (prevProgress >= 100) {
          // Seta 'loadingComplete' como true;
          clearInterval(interval);
          setLoadingComplete(true);
          // Garante que o valor de progresso não passe de 100;
          return 100;
        }
        // Incrementa o progresso em 1 a cada ciclo;
        return prevProgress + 1;
      });
    }, 30); // Define o intervalo de tempo para o ciclo de atualização do progresso (30ms);
    // Função de limpeza para limpar o intervalo quando o componente for desmontado;
    return () => clearInterval(interval);
  }, []);

  // Função que permite a navegação para a tela de jogo quando o carregamento atinge 100%;
  const liberarStart = () => {
    if (loadingComplete) {
      // Navega para a rota "/TelasDoGame" usando o Expo Router;
      router.navigate("/TelasDoGame");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Carregando...</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: loadingComplete ? "#28a745" : "#6c757d" },
          ]}
          onPress={liberarStart}
          disabled={!loadingComplete}
        >
          <Text style={styles.buttonText}>Jogar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF8433",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff",
  },
  progressContainer: {
    width: "80%",
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#28a745",
  },
  progressText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
