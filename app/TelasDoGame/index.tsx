import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import Header from "@/components/Header";

type Bichinho = {
    id: number,
    name: string,
    fome: number,
    sono: number,
    diversao: number,
    status: string,
    imagem: any
}



const bichinhoData: Bichinho[] = [
    { id: 1, name: 'Bichinho 1', fome: 70, sono: 50, diversao: 80, status: 'ok', imagem: require('@/assets/images/bichinho.png') },
    { id: 2, name: 'Bichinho 2', fome: 80, sono: 20, diversao: 50, status: 'bem', imagem: require('@/assets/images/bichinho2.png') },
];

const Index = () => {
    const [bichinhos, setBichinhos] = useState<Bichinho[]>([]);

    useEffect(() => {
        setBichinhos(bichinhoData)
    }, [])

    const renderItem = ({ item }: { item: Bichinho }) => (
        <View style={styles.card}>
            <Image source={item.imagem} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>Fome: {item.fome}</Text>
                <Text>Sono: {item.sono}</Text>
                <Text>Diversão: {item.diversao}</Text>
                <Text>Status: {item.status}</Text>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <Header title="DETALHES DOS BICHINHOS"></Header>

            <FlatList data={bichinhos} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.list} />
            <TouchableOpacity style={styles.addButton} onPress={() => { router.push("/TelasDoGame/RegistrationScreen") }}>
                <Ionicons name="add-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { router.navigate("/MiniGames") }}>
                <Ionicons name="game-controller" size={24} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF8433"
    },
    list: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#f13601',
        padding: 20,
        borderRadius: 10,
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#f13601',
        padding: 20,
        borderRadius: 10,
        position: 'absolute',
        bottom: 100,
        right: 20,
    },
});