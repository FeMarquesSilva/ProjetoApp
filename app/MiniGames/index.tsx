import React from 'react';
import Header from "@/components/Header";
import { useRoute } from '@react-navigation/native';
import { SimpleLineIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

const Index = () => {
    const route = useRoute(); // Usamos o hook 'useRoute' para acessar os parâmetros da rota atual;
    const router = useRouter(); // Usamos o hook 'useRouter' para navegar entre telas;

    // Extração do parâmetro 'tamagochiId' dos parâmetros da rota;
    const { tamagochiId } = route.params as { tamagochiId: number };  

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Header title='Mini Games' />
                <ScrollView style={styles.list}>

                    {/* Navega para a tela do Jogo da Velha, passando o tamagochiId*/}
                    <TouchableOpacity 
                        style={styles.games} 
                        onPress={() => { router.push({ pathname: "/MiniGames/jogoDaVelha", params: { tamagochiId: tamagochiId } }); }}
                    >
                        <SimpleLineIcons style={styles.button} name="game-controller" size={24} color="black" />
                        <Text style={styles.texts}>Jogo da Velha</Text>
                    </TouchableOpacity>

                    {/* Navega para a tela do Jogo de Passos, passando o tamagochiId*/}
                    <TouchableOpacity 
                        style={styles.games} 
                        onPress={() => { router.push({ pathname: "/MiniGames/jogoDosPassos", params: { tamagochiId: tamagochiId } }); }}
                    >
                        <SimpleLineIcons style={styles.button} name="game-controller" size={24} color="black" />
                        <Text style={styles.texts}>Jogo dos Passos</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // Estilo da tela principal:
    container: {
        backgroundColor: "#FF8433",
        height: "100%",
    },
    // Estilo do título da página:
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    // Estilo da lista de jogos:
    list: {
        padding: 10,
    },
    // Estilo para cada botão de jogo:
    games: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    // Estilo do ícone do botão:
    button: {
        marginRight: 10,
    },
    // Estilo do texto do botão:
    texts: {
        fontSize: 18,
    },
});

export default Index;