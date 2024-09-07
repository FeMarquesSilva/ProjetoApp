import Header from "@/components/Header";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
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
    const [vencedor, setVencedor] = useState<string | null>(null);
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

    // Marcação dinâmica de qual posição está sendo clicada e verifica se deu uma combinação de vitoria
    const play = (index: number) => {
        if (!jogada[index] && !vencedor) {
            const novaJogada = { ...jogada, [index]: jogadorTurn };
            setJogada(novaJogada);
            setJogadorTurn((prev) => (prev === "X" ? "0" : "X"));
            verificarVencedor(novaJogada);
        }
    };

    // Função para verificar o vencedor
    const verificarVencedor = (jogadaAtual: { [key: number]: Player }) => {
        for (const [a, b, c] of vitory) {
            if (jogadaAtual[a] && jogadaAtual[a] === jogadaAtual[b] && jogadaAtual[a] === jogadaAtual[c]) {
                setVencedor(jogadaAtual[a]);
                if (jogadaAtual[a] === "X") {
                    setJogador1Score((prev) => prev + 1);
                    fimDePartida("Player1");
                } else {
                    setJogador2Score((prev) => prev + 1);
                    fimDePartida("Player2");
                }
                return;
            }
        }
        if (Object.keys(jogadaAtual).length === 9 && !vencedor) {
            setVencedor(null); // Empate
            fimDePartida(null); // Empate
        }
    };

    //Funcção para informar o fim da partida;
    const fimDePartida = (vencedor: string | null) => {
        if (vencedor !== null) {
            alert(`O jogador ${vencedor} venceu!`);
        } else {
            alert("Empate!");
        }
        setVencedor(vencedor);
    };

    // Função para reiniciar o jogo
    const reiniciarPartida = () => {
        setVencedor(null);
        setJogada({});
        setJogadorTurn("X");
    };

    //Função para resetar os pontos dos jogadores:
    const reiniciarPontuação = () => {
        setJogador1Score(0);
        setJogador2Score(0);
    }

    return (
        <View style={styles.containerBody}>
            <Header title="Jogo da Velha"></Header>
            <View style={styles.container}>
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>Vitórias {jogador1Name}: {jogador1Score}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>Vitórias {jogador2Name}: {jogador2Score}</Text>
                    </View>
                </View>
                <Button title="Reiniciar Pontuações" onPress={reiniciarPontuação} />
                <Text style={styles.playerTurn}>Jogador da vez: {jogadorDaVez()}</Text>
                <View style={styles.board}>
                    {tabuleiro().map((_, i) => (
                        <Text key={i} style={styles.cell} onPress={() => play(i)}>{jogada[i]}</Text>
                    ))}
                </View>
                <Button title="Reiniciar Partida" onPress={reiniciarPartida} />
            </View>
        </View>
    );
}

export default JogoDaVelha;

const styles = StyleSheet.create({
    containerBody: {
        backgroundColor: "#FF8433",
        height: "100%",
    },
    container: {
        width: "100%",
        height: "75%",
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
        width: '100%',
        padding: 10,
        backgroundColor: "#F0391D",
        marginBottom: 100,
    },
    infoItem: {
        flex: 1,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        color: "#fff",
    },
    playerTurn: {
        backgroundColor: "#73b295",
        textAlign: 'center',
        fontSize: 18,
        padding: 10,
        margin: 5,
    },
    button: {
        backgroundColor: "#006400",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
})