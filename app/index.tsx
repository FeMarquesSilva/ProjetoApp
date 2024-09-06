import { StyleSheet, Text, View } from "react-native";

const index = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Essa tela deverá exibir a barra de carregamento do jogo!</Text>
        </View>
    );
}

export default index;

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