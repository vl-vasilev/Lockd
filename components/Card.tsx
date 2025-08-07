import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CardProps {
  children: React.ReactNode;
}

export default function Card({children} : CardProps){
    return (
        <SafeAreaView style = {styles.card}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.cardBackgroundColor,
        borderColor: Colors.cardStrokeColor,
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
    }
});