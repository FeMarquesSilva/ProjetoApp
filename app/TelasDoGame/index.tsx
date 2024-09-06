import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const Index = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <Text style={styles.text}>Essa será a tela inicial do jogo, a qual deverá aparecer após cadastrar o perssongaem.</Text>
            </View>
        </SafeAreaView>
    );
}

export default Index;

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