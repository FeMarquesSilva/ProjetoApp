import React from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

const Index = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.text}>INICIO</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {router.navigate("/MiniGames")}}>
                <Ionicons name="game-controller" size={24} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FF8433"
    },
    text: {
        fontSize: 30,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#f13601',
        padding: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
        marginLeft: 10,
    },
});