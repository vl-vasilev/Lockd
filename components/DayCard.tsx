import Colors from "@/constants/Colors";
import { StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export default function DayCard({children, style} : CardProps){

    return (
        <View style = {[styles.card, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: Colors.cardBackgroundColor,
        borderColor: Colors.cardStrokeColor,
        borderWidth: 1,
        borderRadius: 12,
    },
    selectedCard: {
        flex: 1,
        backgroundColor: Colors.primary,
        borderRadius: 12,
    },
});