import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import Header from "@/components/Header";
import { useTodoDatabase } from "../database/todoService";
import { SafeAreaView } from "react-native-safe-area-context";

//Crio o tipagem da minha array de objetos que vou puxar do banco de dados;
type TamagochiList = {
    id: number;
    name: string;
    image: number;
    hunger: number;
    sleep: number;
    fun: number;
    status: string;
};

//Faço uma array com o caminho das minhas imagens;
const bichinhoImages = [
    { id: 1, source: require('@/assets/images/bichinho.png') },
    { id: 2, source: require('@/assets/images/bichinho2.png') },
    { id: 3, source: require('@/assets/images/bichinho3.png') },
    { id: 4, source: require('@/assets/images/bichinho4.png') },
    { id: 5, source: require('@/assets/images/bichinho5.png') },
];

const Index = () => {

    // Define o estado com o tipo TamagochiList[];
    const [tamagochiList, setTamagochiList] = useState<TamagochiList[]>([]);
    const { getTamagochi, alterTamagochi } = useTodoDatabase();

    // Função para carregar as informações do banco e armazenar no estado;
    const list = async () => {
        try {
            const response: TamagochiList[] = await getTamagochi();
            setTamagochiList(response);
        } catch (error) {
            console.error(error);
        }
    };

    // Chama a função de listagem quando o componente for montado;
    useEffect(() => {
        list();
    }, [tamagochiList])

    // Atualiza os atributos a cada hora
    useEffect(() => {
        const atualizarAtributos = async () => {
            try {
                const tamagochis = await getTamagochi();
                const updatedTamagochis = tamagochis.map(tamagochi => {
                    const updatedHunger = Math.max(tamagochi.hunger - 1, 0);
                    const updatedSleep = Math.max(tamagochi.sleep - 1, 0);
                    const updatedFun = Math.max(tamagochi.fun - 1, 0);

                    const total = updatedHunger + updatedSleep + updatedFun;
                    let status = '';
                    if (total === 0) status = 'morto';
                    else if (total <= 50) status = 'crítico';
                    else if (total <= 100) status = 'muito triste';
                    else if (total <= 150) status = 'triste';
                    else if (total <= 200) status = 'ok';
                    else if (total <= 250) status = 'bem';
                    else status = 'muito bem';

                    return { ...tamagochi, hunger: updatedHunger, sleep: updatedSleep, fun: updatedFun, status };
                });

                await Promise.all(updatedTamagochis.map(tamagochi =>
                    alterTamagochi(tamagochi)
                ));

                setTamagochiList(updatedTamagochis); // Atualiza a lista no estado
            } catch (error) {
                console.error(error);
            }
        };

        const interval = setInterval(atualizarAtributos, 30000); // 30s

        return () => clearInterval(interval);
    }, [getTamagochi, alterTamagochi]);

    // Renderiza cada tamagochi da lista;
    const renderItem = ({ item }: { item: TamagochiList }) => {
        const imageSource = bichinhoImages.find(img => img.id === Number(item.image))?.source;

        return (
            //Retorno a visualização dos cardas com o opção de touch para ir nos detalhes dos bichinhos;
            <TouchableOpacity onPress={() => { router.push(`/TelasDoGame/DetailsScreen?id=${item.id}&name=${item.name}&image=${item.image}&hunger=${item.hunger}&sleep=${item.sleep}&fun=${item.fun}`) }}>
                <View style={styles.card}>
                    <Image source={imageSource} style={styles.image} />
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>Fome: {item.hunger}</Text>
                        <Text>Sono: {item.sleep}</Text>
                        <Text>Diversão: {item.fun}</Text>
                        <Text>Status: {item.status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <Header title="LISTAGEM DOS BICHINHOS"></Header>
            <FlatList
                data={tamagochiList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
            <TouchableOpacity style={styles.button} onPress={() => { router.push("/TelasDoGame/registrationScreen") }}>
                <Ionicons name="add-outline" size={24} color="black" />
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
});