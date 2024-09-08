import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTodoDatabase } from "../database/todoService"; // Importa a função do banco de dados

const DetailsScreen = () => {
    const { id, name, image } = useLocalSearchParams();
    const router = useRouter();
    const { alterTamagochi, getTamagochi } = useTodoDatabase(); // Funções para manipular o banco de dados

    const tamagochiId = id ? Number(id) : 0;

    const bichinhoImages: { [key: number]: any } = {
        1: require('@/assets/images/bichinho.png'),
        2: require('@/assets/images/bichinho2.png'),
        3: require('@/assets/images/bichinho3.png'),
        4: require('@/assets/images/bichinho4.png'),
        5: require('@/assets/images/bichinho5.png'),
    };

    const [currentHunger, setCurrentHunger] = useState<number>(0);
    const [currentSleep, setCurrentSleep] = useState<number>(0);
    const [currentFun, setCurrentFun] = useState<number>(0);

    const calculateStatus = () => {
        const total = currentHunger + currentSleep + currentFun;
        if (total === 0) return 'morto';
        if (total <= 50) return 'crítico';
        if (total <= 100) return 'muito triste';
        if (total <= 150) return 'triste';
        if (total <= 200) return 'ok';
        if (total <= 250) return 'bem';
        return 'muito bem';
    };

    const feedPet = async () => {
        const newHunger = Math.min(currentHunger + 10, 100);
        setCurrentHunger(newHunger);

        try {
            const updatedTamagochi = {
                id: tamagochiId,
                name: name as string,
                image: Number(image),
                hunger: newHunger,
                sleep: currentSleep,
                fun: currentFun,
                status: calculateStatus(),
            };
            await alterTamagochi(updatedTamagochi);
        } catch (error) {
            console.error("Erro ao alimentar o bichinho:", error);
        }
    };

    const letSleep = async () => {
        const newSleep = Math.min(currentSleep + 10, 100);
        setCurrentSleep(newSleep);

        try {
            const updatedTamagochi = {
                id: tamagochiId,
                name: name as string,
                image: Number(image),
                hunger: currentHunger,
                sleep: newSleep,
                fun: currentFun,
                status: calculateStatus(),
            };
            await alterTamagochi(updatedTamagochi);
        } catch (error) {
            console.error("Erro ao deixar o bichinho dormir:", error);
        }
    };

    const fetchTamagochiDetails = useCallback(async () => {
        try {
            const tamagochis = await getTamagochi();
            const tamagochi = tamagochis.find(t => t.id === tamagochiId);
            if (tamagochi) {
                setCurrentHunger(tamagochi.hunger);
                setCurrentSleep(tamagochi.sleep);
                setCurrentFun(tamagochi.fun);
            }
        } catch (error) {
            console.error("Erro ao buscar os detalhes do bichinho:", error);
        }
    }, [getTamagochi, tamagochiId]);

    useEffect(() => {
        fetchTamagochiDetails();
    }, [fetchTamagochiDetails]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHunger(prev => Math.max(prev - 1, 0));
            setCurrentSleep(prev => Math.max(prev - 1, 0));
            setCurrentFun(prev => Math.max(prev - 1, 0));
        }, 30000); // diminui 1 ponto a cada 30 segundos

        return () => clearInterval(interval);
    }, []);

    const imageSource = bichinhoImages[Number(image)];

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Detalhes do Bichinho" />
            <View style={styles.content}>
                <Image source={imageSource} style={styles.image} />
                <Text style={styles.name}>{name}</Text>
                <View style={styles.attributes}>
                    <Text>Fome: {currentHunger}</Text>
                    <Text>Sono: {currentSleep}</Text>
                    <Text>Diversão: {currentFun}</Text>
                    <Text>Status: {calculateStatus()}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={feedPet}>
                        <Text style={styles.buttonText}>Alimentar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={letSleep}>
                        <Text style={styles.buttonText}>Dormir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => router.push({ pathname: "/MiniGames", params: { tamagochiId: tamagochiId } })}
                    >
                        <Ionicons name="game-controller" size={24} color="white" />
                        <Text style={styles.buttonText}>Mini Games</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF8433',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    attributes: {
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: '#f13601',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
});

export default DetailsScreen;