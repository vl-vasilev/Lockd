import Typography from "@/constants/Typography";
import Octicons from "@react-native-vector-icons/octicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Subject() {
    return (
        <View style={styles.subjectContainer}>
            <View style={styles.subjectInfo}>
                <Text style={[styles.subjectTime, Typography.secondary14]}> 8:00 - 8:40 </Text>
                <View style={styles.subjectNameAndCircle}>
                    <View style={styles.subjectCircle} />
                    <Text style={[styles.subjectName, Typography.default16]}> Physics </Text>
                </View>
            </View>
            <TouchableOpacity>
                <Octicons style={styles.optionsIcon} name="kebab-horizontal" size={16} />
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    subjectContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    subjectInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    subjectTime: {

    },
    subjectNameAndCircle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    subjectCircle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#3498db',
    },
    subjectName: {

    },
    optionsIcon: {

    },

})