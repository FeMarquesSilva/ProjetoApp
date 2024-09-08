import React from 'react';
import { useRoute } from '@react-navigation/native';
import { SimpleLineIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

const Index = () => {
    const route = useRoute();
    const router = useRouter();
    const { tamagochiId } = route.params as { tamagochiId: string };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Mini Games</Text>
                <ScrollView style={styles.list}>
                    <TouchableOpacity 
                        style={styles.games} 
                        onPress={() => { router.push({ pathname: "/MiniGames/jogoDaVelha", params: { tamagochiId: tamagochiId } }); }}
                    >
                        <SimpleLineIcons style={styles.button} name="game-controller" size={24} color="black" />
                        <Text style={styles.texts}>Jogo da Velha</Text>
                    </TouchableOpacity>
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
    container: {
        backgroundColor: "#FF8433",
        height: "100%",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    list: {
        padding: 10,
    },
    games: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    button: {
        marginRight: 10,
    },
    texts: {
        fontSize: 18,
    },
});

export default Index;