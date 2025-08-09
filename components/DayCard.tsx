import Colors from "@/constants/Colors";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface CardProps {
    children: React.ReactNode;
    isSelected: boolean;
    setSelectedId: any;
    itemId: string;
}

export default function DayCard({ children, isSelected, setSelectedId, itemId }: CardProps) {

    return (
        <TouchableOpacity
        onPress={() => setSelectedId(itemId)}
        >
            <View style={[isSelected ? styles.selectedCard : styles.card, ]}>
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
        backgroundColor: Colors.backgroundPrimary,
        borderRadius: 12,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 62,
        padding: 4,
    },
});