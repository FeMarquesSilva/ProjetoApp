import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cadastrar Perssonagem</Text>
      <View style={styles.addForm}>
        <TextInput placeholder="Defina um nome para seu perssonagem!" />
        <Pressable style={styles.buttonAdd} >
            <Text>+</Text>
        </Pressable>
      </View>
    </View>
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
  buttonAdd:{
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
