import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DetailsScreen = () => {
    return (
        <View>
            <Text>Tela de Detalhes</Text>
            <TouchableOpacity style={styles.button} onPress={() => { router.navigate("/MiniGames") }}>
                <Ionicons name="game-controller" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

export default DetailsScreen;

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: '#f13601',
        padding: 20,
        borderRadius: 10,
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
})