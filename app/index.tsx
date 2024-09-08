import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';


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
    const liberarStart = () => {
        if (loadingComplete) {
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
            style={[styles.button, { backgroundColor: loadingComplete ? '#28a745' : '#6c757d' }]}
            onPress={liberarStart}
            disabled={!loadingComplete}
          >
            <Text style={styles.buttonText}>Jogar</Text>
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
    content: {
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: '#fff',
    },
    progressContainer: {
      width: '80%',
      height: 20,
      backgroundColor: '#ddd',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 20,
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#28a745',
    },
    progressText: {
      fontSize: 18,
      color: '#fff',
      marginBottom: 20,
    },
    button: {
      padding: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
  });