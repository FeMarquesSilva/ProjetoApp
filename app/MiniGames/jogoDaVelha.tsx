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
    const [jogador1ScoreName, setJogador1ScoreName] = useState('Player1 Score: 0');
    const [jogador2ScoreName, setJogador2ScoreName] = useState('Player2 Score: 0');
    const [jogador1TurnName, setJogador1TurnName] = useState('Player1 Turn: True');
    const [jogador2TurnName, setJogador2TurnName] = useState('Player2 Turn: False');

    return (
        <View style={styles.container}>
            <Header title="Jogo da Velha"></Header>
            <Text style={styles.title}>Jogo da Velha</Text>
            <Text style={styles.title}>Jogador 1: {jogador1Name}</Text>
            <Text style={styles.title}>Jogador 2: {jogador2Name}</Text>
            <Text style={styles.title}>Jogador 1 Turn: {jogador1}</Text>
            <Text style={styles.title}>Jogador 2 Turn: {jogador2}</Text>
            <Text style={styles.title}>Jogador 1 Score: {jogador1Score}</Text>
            <Text style={styles.title}>Jogador 2 Score: {jogador2Score}</Text>
        </View>
    )


    return (
        <View>
            <Header title="Jogo da Velha"></Header>
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

})