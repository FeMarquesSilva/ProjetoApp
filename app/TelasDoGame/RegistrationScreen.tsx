import Header from "@/components/Header";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

const RegistrationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Cadastro de Personagem"></Header>
      <View style={styles.addForm}>
        <TextInput placeholder="Defina um nome para seu perssonagem!" />
        <Pressable style={styles.buttonAdd} >
          <Text>+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8433",
  },
  addForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  buttonAdd: {
    backgroundColor: '#FF0000',
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 30,
    color: "#FFF",
    textAlign: "center",
    marginTop: 50,
  },
});
