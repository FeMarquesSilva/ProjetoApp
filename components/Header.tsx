import { Text, View } from "react-native";

type HeaderProps = {
    title: string
}

const Header = ({ title }: HeaderProps) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    );
}

export default Header;