import Header from "@/components/Header";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const index = () => {
    return (
        <View>
        <Header title="Mini Games"></Header>
        <ScrollView style={styles.list}>
            <TouchableOpacity style={styles.games} onPress={() => { router.navigate("/MiniGames/jogoDaVelha") }}>
                <SimpleLineIcons style={styles.button} name="game-controller" size={24} color="black" />
                <Text style={styles.texts}>Jogo da Velha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.games} onPress={() => { router.navigate("/MiniGames/jogoDaMemoria") }}>
                <SimpleLineIcons style={styles.button} name="game-controller" size={24} color="black" />
                <Text style={styles.texts}>Jogo da Memória</Text>
            </TouchableOpacity>
        </ScrollView>
        </View>
    );
}

export default index;

const styles = StyleSheet.create({
    list: {
        padding: 10,
    },
    games: {
        backgroundColor: "#f0f0f0",
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 5,
    },
    button: {
        padding: 10,
    },
    texts: {
        fontSize: 16
    }
})
