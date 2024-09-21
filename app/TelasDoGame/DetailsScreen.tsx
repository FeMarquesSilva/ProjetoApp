import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTodoDatabase } from "../database/todoService";
import { todoFunctions } from '../functions/services';

const DetailsScreen = () => {
    const { bichinhoImages } = todoFunctions();
    const { id, name, image } = useLocalSearchParams();
    const router = useRouter();
    const { alterTamagochi, getTamagochi } = useTodoDatabase();
    const tamagochiId = id ? Number(id) : 0;

    const [currentHunger, setCurrentHunger] = useState<number>(0);
    const [currentSleep, setCurrentSleep] = useState<number>(0);
    const [currentFun, setCurrentFun] = useState<number>(0);
    const [isSleep, setIsSleep] = useState(false);

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

    const letSleep = () => {
        setIsSleep(prev => !prev);
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            if (isSleep) {
                const newSleep = Math.min(currentSleep + 10, 100);
                setCurrentSleep(newSleep);

                setCurrentHunger(prev => Math.max(prev - 1, 0));
                setCurrentFun(prev => Math.max(prev - 1, 0));

                const updatedTamagochi = {
                    id: tamagochiId,
                    name: name as string,
                    image: Number(image),
                    hunger: Math.max(currentHunger - 1, 0),
                    sleep: newSleep,
                    fun: Math.max(currentFun - 1, 0),
                    status: calculateStatus(),
                };
                await alterTamagochi(updatedTamagochi);

            } else {
                setCurrentHunger(prev => Math.max(prev - 1, 0));
                setCurrentSleep(prev => Math.max(prev - 1, 0));
                setCurrentFun(prev => Math.max(prev - 1, 0));

                const updatedTamagochi = {
                    id: tamagochiId,
                    name: name as string,
                    image: Number(image),
                    hunger: Math.max(currentHunger - 1, 0),
                    sleep: Math.max(currentSleep - 1, 0),
                    fun: Math.max(currentFun - 1, 0),
                    status: calculateStatus(),
                };
                await alterTamagochi(updatedTamagochi);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [isSleep, currentHunger, currentSleep, currentFun]);

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

    const imageSource = bichinhoImages.find(img => img.id === Number(image))?.source;

    return (
        <SafeAreaView style={[styles.container, isSleep && styles.containerSleep]}>
            <Header title="Detalhes do Bichinho" />
            <View style={styles.content}>
                <View style={[styles.cardLarge, isSleep && styles.cardSleep]}>
                    <Image source={imageSource} style={styles.image} />
                    <Text style={styles.name}>{name}</Text>
                </View>
                <View style={[styles.cardSmall, isSleep && styles.cardSleep]}>
                    <Text style={styles.attributeText}>Fome: {currentHunger}</Text>
                    <Text style={styles.attributeText}>Sono: {currentSleep}</Text>
                    <Text style={styles.attributeText}>Diversão: {currentFun}</Text>
                    <Text style={styles.attributeText}>Status: {calculateStatus()}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={feedPet}>
                        <Ionicons name="fast-food-outline" size={24} color="white" />
                        <Text style={styles.buttonText}>Alimentar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={letSleep}>
                        <MaterialCommunityIcons name="sleep" size={24} color="white" />
                        <Text style={styles.buttonText}>{isSleep ? 'Acordar' : 'Dormir'}</Text>
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
    containerSleep: {
        backgroundColor: '#BF6A3D', // Cor laranja escuro quando dormindo
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    cardLarge: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    cardSleep: {
        backgroundColor: '#E0E0E0', // Fundo cinza claro quando dormindo
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 15,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardSmall: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        elevation: 3,
    },
    attributeText: {
        fontSize: 18,
        marginVertical: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#f13601',
        padding: 15,
        borderRadius: 10,
        width: '30%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default DetailsScreen;