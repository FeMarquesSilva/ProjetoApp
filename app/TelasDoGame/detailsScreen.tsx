import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTodoDatabase } from "../database/todoService";
import { todoFunctions, calculateStatus } from '../functions/services';

const DetailsScreen = () => {
    const { alterTamagochi, getTamagochi } = useTodoDatabase();
    const { tamagochiImages } = todoFunctions();
    const { id, name, image } = useLocalSearchParams();
    const router = useRouter();
    const tamagochiId = id ? Number(id) : 0;

    // Estados para atributos do bichinho
    const [currentHunger, setCurrentHunger] = useState<number>(0); //Fome;
    const [currentSleep, setCurrentSleep] = useState<number>(0); // Sono;
    const [currentFun, setCurrentFun] = useState<number>(0); // Diversão;
    const [isSleep, setIsSleep] = useState(false);

    // Função para alimentar o bichinho:
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
                status: calculateStatus(currentHunger, currentSleep, currentFun),
            };
            await alterTamagochi(updatedTamagochi);
        } catch (error) {
            console.error("Erro ao alimentar o bichinho:", error);
        }
    };

    // Alterna o estado de sono:
    const letSleep = () => {
        // Alterna o estado `isSleep` entre verdadeiro e falso
        setIsSleep(prev => !prev);
    };

    // Efeito para atualizar atributos a cada 10 segundos:
    useEffect(() => {
        const interval = setInterval(async () => {
            const updatedValues = {
                hunger: Math.max(currentHunger - 1, 0),
                sleep: isSleep ? Math.min(currentSleep + 10, 100) : Math.max(currentSleep - 1, 0),
                fun: Math.max(currentFun - 1, 0),
            };
    
            setCurrentHunger(updatedValues.hunger);
            setCurrentSleep(updatedValues.sleep);
            setCurrentFun(updatedValues.fun);
    
            const updatedTamagochi = {
                id: tamagochiId,
                name: name as string,
                image: Number(image),
                ...updatedValues,
                status: calculateStatus(currentHunger, currentSleep, currentFun),
            };
    
            await alterTamagochi(updatedTamagochi);
        }, 10000);
    
        return () => clearInterval(interval);
    }, [isSleep, currentHunger, currentSleep, currentFun]);

    // Função para buscar detalhes do bichinho:
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

    // Efeito para carregar detalhes ao montar o componente:
    useEffect(() => {
        fetchTamagochiDetails();
    }, [fetchTamagochiDetails]);

    // Obtém a fonte da imagem do bichinho:
    const imageSource = tamagochiImages.find(img => img.id === Number(image))?.source;

    return (
        <SafeAreaView style={[styles.container, isSleep && styles.containerSleep]}>
            {/*Verificca se o tamagochi esta dormindo ou acordado e ajusta o estilo da página*/}
            <Header title="Detalhes do Bichinho" />
            <View style={styles.content}>
                {/* Card principal do bichinho: */}
                <View style={[styles.cardLarge, isSleep && styles.cardSleep]}>
                    <Image source={imageSource} style={styles.image} />
                    <Text style={styles.name}>{name}</Text>
                </View>
    
                {/* Exibição dos atributos do bichinho: */}
                <View style={[styles.cardSmall, isSleep && styles.cardSleep]}>
                    <Text style={styles.attributeText}>Fome: {currentHunger}</Text>
                    <Text style={styles.attributeText}>Sono: {currentSleep}</Text>
                    <Text style={styles.attributeText}>Diversão: {currentFun}</Text>
                    <Text style={styles.attributeText}>Status: {calculateStatus(currentHunger, currentSleep, currentFun)}</Text>
                </View>
    
                {/* Container de botões: */}
                <View style={styles.buttonsContainer}>
                    {/* Botão para alimentar o bichinho: */}
                    <TouchableOpacity style={styles.button} onPress={feedPet}>
                        <Ionicons name="fast-food-outline" size={24} color="white" />
                        <Text style={styles.buttonText}>Alimentar</Text>
                    </TouchableOpacity>
    
                    {/* Botão para alternar sono: */}
                    <TouchableOpacity style={styles.button} onPress={letSleep}>
                        <MaterialCommunityIcons name="sleep" size={24} color="white" />
                        <Text style={styles.buttonText}>{isSleep ? 'Acordar' : 'Dormir'}</Text>
                    </TouchableOpacity>
    
                    {/* Botão para acessar mini jogos: */}
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
    // Estilos gerais da página:
    container: {
        flex: 1,
        backgroundColor: '#FF8433',
    },
    // Estilo para quando o bichinho está dormindo:
    containerSleep: {
        backgroundColor: '#BF6A3D', 
    },
    // Conteúdo centralizado:
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    // Estilo do cartão grande:
    cardLarge: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    // Estilo do cartão quando o bichinho está dormindo:
    cardSleep: {
        backgroundColor: '#E0E0E0', 
    },
    // Estilo da imagem do bichinho:
    image: {
        width: 200,
        height: 200,
        marginBottom: 15,
    },
    // Estilo do nome do bichinho:
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // Estilo do cartão pequeno:
    cardSmall: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        elevation: 3,
    },
    // Estilo dos textos dos atributos:
    attributeText: {
        fontSize: 18,
        marginVertical: 5,
    },
    // Contêiner para os botões:
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    // Estilo do botão:
    button: {
        backgroundColor: '#f13601',
        padding: 15,
        borderRadius: 10,
        width: '30%',
        alignItems: 'center',
    },
    // Estilo do texto dentro do botão:
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default DetailsScreen;
