import Typography from "@/constants/Typography";
import Octicons from "@react-native-vector-icons/octicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


interface SubjectProps {
    name: string;
    start: string;
    end: string;
}

export default function Subject({ name, start, end }: SubjectProps) {
    return (
        <View style={styles.subjectContainer}>
            <View style={styles.subjectInfo}>
                <View style = {styles.timeContainer}>
                    <Text style={ Typography.secondary14}> {start} - {end} </Text>
                </View>
                <View style={styles.subjectNameAndCircle}>
                    <View style={styles.subjectCircle} />
                    <Text style={ Typography.default16}> {name} </Text>
                </View>
            </View>
            <TouchableOpacity>
                <Octicons name="kebab-horizontal" size={16} />
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
    timeContainer: {
        width: 100,
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
})