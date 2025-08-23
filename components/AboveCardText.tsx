import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AboveCardTextProps {
    title: string,
    buttonText?: string,
    onButtonPress?: () => void;
}

export default function AboveCardText({ title, buttonText, onButtonPress }: AboveCardTextProps) {
    return (
        <View style={styles.aboveCardText}>
            <Text style={[Typography.heading18]}> {title} </Text>
            {buttonText &&
                <TouchableOpacity
                    onPress={onButtonPress}
                >
                    <Text style={[Typography.cardSpecificText]}> + Add {buttonText} </Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    aboveCardText: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        alignItems: "baseline",
    },

    searchContainer: {
        backgroundColor: Colors.cardBackgroundColor,
        borderColor: Colors.cardStrokeColor,
        borderWidth: 1,
        borderRadius: 12,

        paddingHorizontal: 12,
        paddingVertical: 0,
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    searchInput: {
        color: "black",
        paddingHorizontal: 4,
    },
})