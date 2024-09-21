import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTodoDatabase } from "../database/todoService"; 
import { todoFunctions } from '../functions/services'; // Importo minhas funções criadas em um arquivo a parte

const DetailsScreen = () => {

    const { bichinhoImages } = todoFunctions(); //Importo a lista de bichinhos (Imagens) ;
    const { id, name, image } = useLocalSearchParams();
    const router = useRouter();
    const { alterTamagochi, getTamagochi } = useTodoDatabase();
    const tamagochiId = id ? Number(id) : 0;
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
        }, 10000); // diminui 1 ponto a cada 30 segundos

        return () => clearInterval(interval);
    }, []);

    //Utilizo a função importada;
    const imageSource = bichinhoImages.find(img => img.id === Number(image))?.source; 

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Detalhes do Bichinho" />
            <View style={styles.content}>
                <View style={styles.cardLarge}>
                    <Image source={imageSource} style={styles.image} />
                    <Text style={styles.name}>{name}</Text>
                </View>
                <View style={styles.cardSmall}>
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
    cardLarge: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        elevation: 3,
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