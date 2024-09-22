import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";

const Index = () => {
  //Criamos os estados "progress" e "loadingComplete" para validar o progresso de carregamento e sua conclusão:
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Simula o processo de carregamento usando o hook useEffect;
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Quando o "progress" estiver em 100, limpamos o intervalo determinamos que o loading finalizou:
        if (prevProgress >= 100) {
          // Limpa o intervalo quando o carregamento termina;
          clearInterval(interval);
          setLoadingComplete(true);
          return 100;
        }

        return prevProgress + 1;
      });
    }, 30); // Intervalo de tempo para o ciclo de atualização do progresso (30ms);
    // Função de limpeza para limpar o intervalo quando o componente for desmontado;
    return () => clearInterval(interval);
  }, []);

  // Função que permite a navegação para a tela de jogo quando o carregamento atingir 100%:
  const start = () => {
    if (loadingComplete) {
      router.navigate("/TelasDoGame");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.containerText}>Carregando...</Text>
        <View style={styles.progressContainer}>
          {/* Exibmos uma barra de progresso com a largura dinâmica, baseada no valor da variável "progress": */}
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        {/*Exibimos o "%" do progresso porem de forma arredondada:*/}
        <Text style={styles.containerText}>{Math.round(progress)}%</Text>
        {/*Colocamos o botçao jogar de forma dinamica, onde enquanto o progresso não estiver completo,
        o play não libera e se mantem com fundo cinza:*/}
        <TouchableOpacity
          style={[styles.button,{ backgroundColor: loadingComplete ? "#28a745" : "#6c757d" }]}
          onPress={start}
          disabled={!loadingComplete}
        >
          <Text style={styles.containerText}>Jogar</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  //Estilos gerais da página:
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF8433",
  },
  //Estilos para os textos:
  containerText: {
    fontSize: 24,
    color: "#fff",
  },
  //Estilo da barra de progreço com ocupação de 80% da tela:
  progressContainer: {
    width: "80%",
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  /*Estilo da barra de progresso de forma dinâmica preenchendo na
  cor verde:*/
  progressBar: {
    height: "100%",
    backgroundColor: "#28a745",
  },
  //Estilo do botão:
  button: {
    padding: 14,
    borderRadius: 5,
    marginTop: 60
  },
});
