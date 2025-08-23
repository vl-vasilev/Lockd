import Colors from "@/constants/Colors";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

interface CardProps {
    children: React.ReactNode;
    isSelected: boolean;
    setSelectedId: any;
    itemId: string;
    style?: ViewStyle | ViewStyle[];
}

export default function DayCard({ children, isSelected, setSelectedId, itemId, style }: CardProps) {

    return (
        <TouchableOpacity
            onPress={() => setSelectedId(itemId)}
        >
            <View style={[isSelected ? styles.selectedCard : styles.card, style]}>
                {children}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: Colors.cardBackgroundColor,
        borderColor: Colors.cardStrokeColor,
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        padding: 4,
    },
    selectedCard: {
        flex: 1,
        backgroundColor: Colors.primary500,
        borderColor: Colors.primary500,
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        padding: 4,
        
    },
});