import Colors from "@/constants/Colors";
import { StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  isSelected?: boolean;
}

export default function Card({children, style, isSelected = false} : CardProps){
    return (
        <View style = {[isSelected ? styles.selectedCard : styles.card, style]}>
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
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    selectedCard: {
        flex: 1,
        backgroundColor: Colors.backgroundPrimary,
        borderColor: Colors.backgroundPrimary,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    }
});