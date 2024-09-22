import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useFocusEffect } from "expo-router";
import Header from "@/components/Header";
import { useTodoDatabase } from "../database/todoService";
import { SafeAreaView } from "react-native-safe-area-context";
import { todoFunctions, calculateStatus, typeTamagochiList } from '../functions/services';

//Tela de Listagem:
const Index = () => {
  const [tamagochiList, setTamagochiList] = useState<typeTamagochiList[]>([]);
  const { getTamagochi, alterTamagochi, deleteTamagochiById } = useTodoDatabase();
  const { tamagochiImages } = todoFunctions();

  // Função para carregar as informações do banco e armazenar no estado:
  const list = async () => {
    try {
      const response: typeTamagochiList[] = await getTamagochi();
      setTamagochiList(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Chama a função de listagem toda vez que a tela ganha foco (Montagem da chamada "list()" apenas com atualizações):
  useFocusEffect(
    React.useCallback(() => {
      list();
    }, [])
  );

  // Atualiza os atributos a cada 10 segundos:
  useEffect(() => {
    const updateStatus = async () => {
      try {
        const tamagochis = await getTamagochi();
        // Mapeamos cada bichinho para atualizar seus atributos:
        const updatedTamagochis = tamagochis.map((tamagochi) => {
          const updatedHunger = Math.max(tamagochi.hunger - 1, 0);
          const updatedSleep = Math.max(tamagochi.sleep - 1, 0);
          const updatedFun = Math.max(tamagochi.fun - 1, 0);
          const status = calculateStatus(updatedHunger, updatedSleep, updatedFun)

          return {
            ...tamagochi,
            hunger: updatedHunger,
            sleep: updatedSleep,
            fun: updatedFun,
            status,
          };
        });

        await Promise.all(updatedTamagochis.map((tamagochi) => alterTamagochi(tamagochi)));
        setTamagochiList(updatedTamagochis); // Atualiza a lista no estado;
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(updateStatus, 10000); // 10s;
    return () => clearInterval(interval);
  }, [getTamagochi, alterTamagochi]);

  // Renderiza cada tamagochi da lista:
  const redenItens = ({ item }: { item: typeTamagochiList }) => {
    const imageSource = tamagochiImages.find((img) => img.id === Number(item.image))?.source;
    const isDead = item.status === "morto";// Verifica se o Tamagotchi está morto:

    // Função para remover o Tamagochi:
    const deleteTamagochi = (id: number) => {
      Alert.alert(
        'Confirmar Remoção',//Titulo;
        `Deseja realmente remover o Tamagochi ${item.name} permanentemente?`,//Menssagem;
        [
          {//Opção 1;
            text: 'Não',
            style: 'cancel',
          },
          {//Opção 2;
            text: 'Sim',
            onPress: async () => {
              try {
                await deleteTamagochiById({ id });
                setTamagochiList(prev => prev.filter(t => t.id !== id));// Atualiza a lista imediatamente após a remoção:
              } catch (error) {
                console.error('Erro ao remover o Tamagochi:', error);
              }
            },
          },
        ],
      );
    };

    return (
      <TouchableOpacity
        onPress={() => {
          if (!isDead) {
            router.push(`/TelasDoGame/detailsScreen?id=${item.id}&name=${item.name}&image=${item.image}&hunger=${item.hunger}&sleep=${item.sleep}&fun=${item.fun}`);
          }
        }}
        disabled={isDead}
      >
        <View style={[styles.card, isDead && styles.cardDead]}>
          <Image source={imageSource} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            {isDead ? (<Text style={styles.gameOverText}>Game Over</Text>
            ) : (
              <>
                <View style={styles.cardBg}>
                  <Text>  Fome: {item.hunger}</Text>
                  <Text>  Sono: {item.sleep}</Text>
                  <Text>  Diversão: {item.fun}</Text>
                  <Text>  Status: {item.status}</Text>
                </View>
              </>
            )}
          </View>
          <TouchableOpacity
            onPress={() => { deleteTamagochi(item.id) }}
          >
            <Ionicons name="trash" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="LISTAGEM DOS BICHINHOS" />
      <FlatList
        data={tamagochiList}
        renderItem={redenItens}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => { router.push("/TelasDoGame/registrationScreen") }}
      >
        <Text style={styles.textButton}>ADICIONAR BICHINHO   </Text>
        <MaterialIcons name="add-circle" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  // Estilos gerais da página:
  container: {
    flex: 1,
    backgroundColor: "#FF8433",
  },
  // Estilos da lista:
  list: {
    padding: 20,
  },
  // Estilo do cartão para cada bichinho na lista:
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d5bdaf",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  cardBg: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  // Estilo do cartão quando o bichinho está morto:
  cardDead: {
    backgroundColor: "#808080",
  },
  // Estilo da imagem do bichinho:
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  // Estilos para as informações do bichinho:
  info: {
    flex: 1,
  },
  // Estilo do nome do bichinho:
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  // Estilo do texto "Game Over":
  gameOverText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  // Estilo do botão de adicionar bichinho:
  button: {
    flexDirection: 'row',
    width: "80%",
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#ba181b',
    borderRadius: 10,
    left: "4.5%",
    padding: 20,
  },
  textButton: {
    color: 'white',
    fontSize: 18,
  }
});