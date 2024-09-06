import { StyleSheet, Text, View } from "react-native";

const RegistrationScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Essa tela deverá surgir os perssonagem para o usuario se cadastrar para jogar.</Text>
        </View>
    );
}

export default RegistrationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    text: {
        fontSize: 30,
        color: '#FFF',
        textAlign: 'center',
    }
})