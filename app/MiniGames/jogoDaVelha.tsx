import Header from "@/components/Header";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Player = "0" | "X"

const JogoDaVelha = () => {

    //Arrys com as possíveis combinações para ganahr;
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

    //Criação do tabuçeiro com 9 posições;
    const tabuleiro = () => {
        return new Array(9).fill(true)
    }

    //Componentes necessários;
    const [vencedor, setVencedor] = useState<Player | null>(null);
    const [reset, setReset] = useState(false);
    const [jogador1Score, setJogador1Score] = useState(0);
    const [jogador2Score, setJogador2Score] = useState(0);
    const [jogadorTurn, setJogadorTurn] = useState("X");
    const [jogador2Turn, setJogador2Turn] = useState(false);
    const [jogador1Name, setJogador1Name] = useState('Player1');
    const [jogador2Name, setJogador2Name] = useState('Player2');
    const [jogada, setJogada] = useState<{ [key: string]: Player }>({})

    //Função para verificar quem é o jogar da vez:
    const jogadorDaVez = () => {
        if (jogadorTurn === "X") {
            return jogador1Name
        }
        else {
            return jogador2Name
        }
    }

    // Função para reiniciar o jogo
    const reiniciarJogo = () => {
        setVencedor(null);
        setJogada({});
        setJogadorTurn("X");
    };

    //Verificar quem é o jogador da vez e em qual cell ele está jogadno;
    const posiçãoJogadorDaVez = (index: number) => {
        if (!jogadorTurn[index]) {
            return;
        }
        return jogadorTurn[index]
    }

    //Marcação dinâmica de qual posição está sendo clicada;
    const play = (index: number) => {
        setJogada(prev => ({ ...prev, [index]: jogadorTurn }))
        setJogadorTurn(prev => prev === "O" ? "X" : "O")

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
                        <Text style={styles.cell} onPress={() => play(i)}>{jogada[i]}</Text>
                    ))}
                </View>
            </View>
        </View>
    );
}

export default JogoDaVelha;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF8433',
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 80,
        height: 100,
        display: 'flex',
        textAlign: 'center',
        backgroundColor: "#d4f1d9",
        margin: 2,
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