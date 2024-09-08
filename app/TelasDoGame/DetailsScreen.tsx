import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailsScreen = () => {
    const { id, name, image, hunger, sleep, fun } = useLocalSearchParams();

    // Mapeia IDs para caminhos de imagem locais
    const bichinhoImages: { [key: number]: any } = {
        1: require('@/assets/images/bichinho.png'),
        2: require('@/assets/images/bichinho2.png'),
        3: require('@/assets/images/bichinho3.png'),
        4: require('@/assets/images/bichinho4.png'),
        5: require('@/assets/images/bichinho5.png'),
    };

    // Estado para armazenar os atributos do bichinho
    const [currentHunger, setCurrentHunger] = useState(Number(hunger));
    const [currentSleep, setCurrentSleep] = useState(Number(sleep));
    const [currentFun, setCurrentFun] = useState(Number(fun));

    // Função para calcular o status do bichinho
    const calculateStatus = () => {
        const total = currentHunger + currentSleep + currentFun;
        if (total === 0) return 'morto';
        if (total <= 50) return 'crítico';
        if (total <= 100) return 'muito triste';
        if (total <= 150) return 'triste';
        if (total <= 200) return 'ok';
        if (total <= 250) return 'bem';
        return 'muito bem';
    };

    // Funções para alimentar, dormir e brincar
    const feedPet = () => setCurrentHunger(prev => Math.min(prev + 10, 100));
    const letSleep = () => setCurrentSleep(prev => Math.min(prev + 10, 100));
    const playWithPet = () => setCurrentFun(prev => Math.min(prev + 10, 100));

    // Atualiza os atributos ao longo do tempo (exemplo: diminui a cada minuto)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHunger(prev => Math.max(prev - 1, 0));
            setCurrentSleep(prev => Math.max(prev - 1, 0));
            setCurrentFun(prev => Math.max(prev - 1, 0));
        }, 60000); // diminui 1 ponto por minuto (você pode ajustar o tempo)

        return () => clearInterval(interval);
    }, []);

    // Obtém a fonte da imagem com base no ID
    const imageSource = bichinhoImages[Number(image)];

    return (
        <View style={styles.container}>
            <Header title="Detalhes do Bichinho" /> {/* Adicione o Header aqui */}
            <Image source={imageSource} style={styles.image} />
            <Text style={styles.name}>{name}</Text>

            <View style={styles.attributes}>
                <Text>Fome: {currentHunger}</Text>
                <Text>Sono: {currentSleep}</Text>
                <Text>Diversão: {currentFun}</Text>
            </View>
            <View>
                <Text>Tela de Detalhes</Text>
                <TouchableOpacity style={styles.button} onPress={() => { router.navigate("/MiniGames") }}>
                    <Ionicons name="game-controller" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF8433',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    attributes: {
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        backgroundColor: '#f13601',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
    }
});