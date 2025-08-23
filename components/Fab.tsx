import Colors from "@/constants/Colors";
import Octicons from "@react-native-vector-icons/octicons";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function Fab() {

    return (
        <TouchableOpacity 
        style={styles.container}
        onPress={() => console.log("pressed FAB")}
        >
            <Octicons name="plus" size={24} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary500,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 32, 
        right: 24,  
        zIndex: 1000,
    }
})