import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import Header from "@/components/Header";
import { useTodoDatabase } from "../database/todoService";
import { SafeAreaView } from "react-native-safe-area-context";
import { todoFunctions } from '../functions/services'; // Importo minhas funções criadas em um arquivo a parte

type TamagochiList = {
  id: number;
  name: string;
  image: number;
  hunger: number;
  sleep: number;
  fun: number;
  status: string;
};

const { bichinhoImages } = todoFunctions(); //Importo a lista de bichinhos (Imagens) ;

const Index = () => {
  const [tamagochiList, setTamagochiList] = useState<TamagochiList[]>([]);
  const { getTamagochi, alterTamagochi, deleteTamagochiById } = useTodoDatabase();

  // Função para carregar as informações do banco e armazenar no estado
  const list = async () => {
    try {
      const response: TamagochiList[] = await getTamagochi();
      setTamagochiList(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Chama a função de listagem quando o componente for montado
  useFocusEffect(() => {
    list();
  });

  // Atualiza os atributos a cada 3 segundos
  useEffect(() => {
    const atualizarAtributos = async () => {
      try {
        const tamagochis = await getTamagochi();
        const updatedTamagochis = tamagochis.map((tamagochi) => {
          const updatedHunger = Math.max(tamagochi.hunger - 1, 0);
          const updatedSleep = Math.max(tamagochi.sleep - 1, 0);
          const updatedFun = Math.max(tamagochi.fun - 1, 0);

          const total = updatedHunger + updatedSleep + updatedFun;
          let status = "";
          if (total === 0) status = "morto";
          else if (total <= 50) status = "crítico";
          else if (total <= 100) status = "muito triste";
          else if (total <= 150) status = "triste";
          else if (total <= 200) status = "ok";
          else if (total <= 250) status = "bem";
          else status = "muito bem";

          return {
            ...tamagochi,
            hunger: updatedHunger,
            sleep: updatedSleep,
            fun: updatedFun,
            status,
          };
        });

        await Promise.all(
          updatedTamagochis.map((tamagochi) => alterTamagochi(tamagochi))
        );

        setTamagochiList(updatedTamagochis); // Atualiza a lista no estado
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(atualizarAtributos, 30000); // 30s

    return () => clearInterval(interval);
  }, [getTamagochi, alterTamagochi]);

  // Renderiza cada tamagochi da lista
  const renderItem = ({ item }: { item: TamagochiList }) => {
    const imageSource = bichinhoImages.find(
      (img) => img.id === Number(item.image)
    )?.source;

    //Função para ao precionar o botão de 'trash' o tamagochi será apagado da tabela no banco de dados de acordo com o id;
    const removeTamagochi = (id: number) => {
        Alert.alert(
            'Confirmar Remoção',
            `Deseja realmente remover o Tamagochi ${item.name} permanentemente?`,
            [
                {
                    text: 'Não',
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        try {
                            await deleteTamagochiById({id});
                        } catch (error) {
                            console.error('Erro ao remover o Tamagochi:', error);
                        }
                    },
                },
            ],
        );
    };
    

    return (
      //Retorno a visualização dos cardas com o opção de touch para ir nos detalhes dos bichinhos;
      <TouchableOpacity
        onPress={() => {
          router.push(
            `/TelasDoGame/detailsScreen?id=${item.id}&name=${item.name}&image=${item.image}&hunger=${item.hunger}&sleep=${item.sleep}&fun=${item.fun}`
          );
        }}
      >
        <View style={styles.card}>
          <Image source={imageSource} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Fome: {item.hunger}</Text>
            <Text>Sono: {item.sleep}</Text>
            <Text>Diversão: {item.fun}</Text>
            <Text>Status: {item.status}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              removeTamagochi(item.id);
            }}
          >
            <Ionicons name="trash" size={24} color="black" />
          </TouchableOpacity>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/TelasDoGame/registrationScreen");
        }}
      >
        <Ionicons name="add-outline" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8433",
  },
  list: {
    padding: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
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
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#f13601",
    padding: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 30,
    right: 20,
  },
});
