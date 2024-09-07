import Header from "@/components/Header";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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

    const [tabuleiro, setTabuleiro] = useState([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]);

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
    const [jogador1TurnName, setJogador1TurnName] = useState('Player1 Turn: True');
    const [jogador2TurnName, setJogador2TurnName] = useState('Player2 Turn: False');

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
        backgroundColor: "#ff1",
        textAlign: 'center',
        fontSize: 18,
        padding: 10,
        margin: 5,
    }

})