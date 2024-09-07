import Header from "@/components/Header";
import { useState } from "react";
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const bichinhoImages = [
  { id: 1, source: require('@/assets/images/bichinho.png') },
  { id: 2, source: require('@/assets/images/bichinho2.png') }
]

const RegistrationScreen = () => {
  const [name, setName] = useState<string>('')
  const [image, setImage] = useState<number | null>(null)


  const register = (): void => {
    if (name.trim() === '') {
      alert("Por Favor digite o nome");
      return
    }
    if (image === null) {
      alert("Por Favor selecione uma imagem");
      return
    }


  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="CADASTRO DE BICHINHO"></Header>
      <View style={styles.container}>
        <Text style={styles.label}>Nome do Bichinho</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Defina um nome para seu bichinho!" />
        <Text style={styles.label}>Selecionar uma Imagem</Text>
        <FlatList data={bichinhoImages} horizontal renderItem={({ item }) => (
          <TouchableOpacity style={[styles.imageCard, image === item.id ? styles.selectedImage : null,]}
            onPress={() => setImage(item.id)} >
            <Image source={item.source} style={styles.image} />
          </TouchableOpacity>
        )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.imageList}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={register}>
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
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    borderRadius: 6,
    fontSize: 18,
  },
  imageList: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 30,
    gap: 10
  },
  imageCard: {
    padding: 5,
    borderWidth: 2,
    borderColor: '#ddd',
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
  }
});
