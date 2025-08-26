import Colors from "@/constants/Colors";
import Octicons from "@react-native-vector-icons/octicons";
import { StyleSheet, TouchableOpacity } from "react-native";

interface FabProps {
    openSheet: () => void;
}

export default function Fab({openSheet} : FabProps) {

    return (
        <TouchableOpacity 
        style={styles.container}
        onPress={() => openSheet()}
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