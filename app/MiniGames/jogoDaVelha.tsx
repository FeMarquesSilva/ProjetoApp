import Header from "@/components/Header";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const JogoDaVelha = () => {

    const vitory = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const [tabuleiros, setTabuleiro] = useState([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]);

    const tabuleiro = () => {
        return new Array(9).fill(true)
    }

    const [jogador, setJogador] = useState(1);
    const [jogadorAtual, setJogadorAtual] = useState(1);
    const [jogadas, setJogadas] = useState(0);
    const [vencedor, setVencedor] = useState(null);
    const [reset, setReset] = useState(false);
    const [jogador1, setJogador1] = useState('X');
    const [jogador2, setJogador2] = useState('O');
    const [jogador1Score, setJogador1Score] = useState(0);
    const [jogador2Score, setJogador2Score] = useState(0);
    const [jogador1Turn, setJogador1Turn] = useState(true);
    const [jogador2Turn, setJogador2Turn] = useState(false);
    const [jogador1Name, setJogador1Name] = useState('Player1');
    const [jogador2Name, setJogador2Name] = useState('Player2');

    //Função para verificar quem é o jogar da vez:
    const jogadorDaVez = () => {
        if (jogador1Turn) {
            return jogador1Name
        }
        else {
            return jogador2Name
        }
    }

    return (
        <View>
            <Header title="Jogo da Velha"></Header>
            <View style={styles.info}>
                <Text>Total vitorias {jogador1Name}: {jogador1Score}</Text>
                <Text>Total vitorias {jogador2Name}: {jogador2Score}</Text>
            </View>
            <View>
                <Text style={styles.playerTurn}>Jogador da vez: {jogadorDaVez()}</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.board}>
                    {tabuleiro().map((_, i) => (
                        <Text style={styles.cell}></Text>
                    ))}
                </View>
            </View>
        </View>
    );
}

export default JogoDaVelha;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    container: {
        width: "100%",
        height: "75%",
        backgroundColor: '#FF8433',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    board: {
        display: 'flex',
        justifyContent: 'center',
        width: 370,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
    },
    cell: {
        width: 100,
        height: 100,
        display: 'flex',
        textAlign: 'center',
        backgroundColor: "#fff",
        justifyContent: 'center',
        margin: 2,
    },
    buttons: {

    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#fff",
        padding: 10,
        margin: 5,
    },
    playerTurn: {
        backgroundColor: "#73b295",
        textAlign: 'center',
        fontSize: 18,
        padding: 10,
        margin: 5,
    }

})