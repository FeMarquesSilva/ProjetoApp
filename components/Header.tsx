import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
    title: string
}

const Header = ({ title }: HeaderProps) => {

    const styles = StyleSheet.create({
        headerContainer: {
            padding: 40,
            backgroundColor: "#F9470B",
            alignItems: "center",
        },
        textTitle: {
            fontSize: 24,
            fontWeight: "bold",
            paddingBottom: 4,
            color: "#000"
        }
    })

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.textTitle}>{title}</Text>
        </View>
    );
}

export default Header;