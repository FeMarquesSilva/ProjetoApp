import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const Index = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <Text style={styles.text}>INICIO</Text>
            </View>
        </SafeAreaView>
    );
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#FF8433"

    },
    text: {
        fontSize: 30,
        color: '#FFF',
        textAlign: 'center',
    }
})