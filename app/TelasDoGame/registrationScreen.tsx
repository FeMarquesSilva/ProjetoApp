import Header from "@/components/Header";
import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodoDatabase } from "../database/todoService";
import { router } from "expo-router";
import { todoFunctions } from "../functions/services";

const RegistrationScreen = () => {

  const { tamagochiImages } = todoFunctions() // Pega as imagens disponíveis para o tamagotchi
  const [name, setName] = useState<string>('') // Estado para armazenar o nome do tamagotchi
  const [image, setImage] = useState<number | null>(null) // Estado para armazenar a imagem selecionada do tamagotchi
  const { saveTamagochi } = useTodoDatabase(); // Função para salvar o tamagotchi no banco de dados

  const register = async () => {
    if (name.trim() === '') { // Verifica se o nome está vazio
      alert("Por Favor preencha o nome e selecione um personagem"); // Exibe alerta se o nome não for preenchido
      return
    }
    if (image === null) { // Verifica se uma imagem foi selecionada
      alert("Por Favor preencha o nome e selecione um personagem"); // Exibe alerta se a imagem não for selecionada
      return
    }
    try { // Tenta salvar o tamagotchi com os atributos iniciais
      const res = await saveTamagochi({ name: name, image: image, hunger: 100, sleep: 100, fun: 100, status: 'Muito bem' });
      router.navigate("/TelasDoGame") // Navega para a tela de listagem de tamagotchis
      alert("Seu novo tamagochi está cadastrado!") // Exibe alerta de sucesso
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="CADASTRO DE BICHINHO"></Header>
      <View style={styles.container}>
        <Text style={styles.label}>Nome do Bichinho:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Defina um nome para seu bichinho!" />
        <Text style={styles.label}>Escolha uma Imagem:</Text>
        <FlatList data={tamagochiImages} numColumns={2} renderItem={({ item }) => (
          <TouchableOpacity style={[styles.imageCard, image === item.id ? styles.selectedImage : null,]}
            onPress={() => setImage(item.id)} >
            <Image source={item.source} style={styles.image} />
          </TouchableOpacity>
        )}
          keyExtractor={(item) => item.id.toString()} // Define a chave única para cada item da lista
          contentContainerStyle={styles.imageList} // Define o estilo do container da lista de imagens
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={() => { register() }}>
          <Text style={styles.buttonText}>Cadastrar Bichinho</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FF8433",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    backgroundColor: "#d00000",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
    borderRadius: 6,
    fontSize: 18,
    backgroundColor: "#fff"
  },
  imageList: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 30,
    gap: 10,
    backgroundColor: "#e85d04",
    borderRadius: 50,
  },
  imageCard: {
    padding: 5,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: "#FF8433",
    borderRadius: 6,
    marginRight: 10,
  },
  selectedImage: {
    borderColor: '#28a745'
  },
  image: {
    height: 120,
    width: 120,
  },
  buttonAdd: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  },
});
