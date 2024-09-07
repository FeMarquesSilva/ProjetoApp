import { router } from "expo-router";
import { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useTodoDatabase } from "./database/todoService";




const index = () => {
    const { getTamagochi } = useTodoDatabase();

    useEffect(() => {
        getTamagochi();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Essa tela deverá exibir a barra de carregamento do jogo!</Text>
            <Button title="Tela inicial" onPress={() => router.navigate("/TelasDoGame")} />
        </View>
    );
}

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        color: '#000'

    },
    text: {
        fontSize: 30,
        color: '#000',
        textAlign: 'center',
    }
})