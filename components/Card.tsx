import Colors from "@/constants/Colors";
import { StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode | any;
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
        backgroundColor: Colors.screenBackgroundColor,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    selectedCard: {
        backgroundColor: Colors.primary500,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    }
});