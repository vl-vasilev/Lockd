import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import Octicons from "@react-native-vector-icons/octicons";
import { StyleSheet, Text, View } from "react-native";


interface SubjectProps {
    subject: string;
    room?: string;
    teacher?: string;
    start: string;
    end: string;
}

export default function Subject({ subject, room, teacher, start, end }: SubjectProps) {
    if (room === undefined) room = "342";
    if (teacher === undefined) teacher = "Mr. Smith";

    return (
        <View style={styles.subjectContainer}>
            <View style={styles.triangleRotated} />
            <View style={styles.leftSide}>
                <View style={styles.subjectAndRoom}>
                    <Text style={Typography.default16}>{subject}</Text>
                    <View style={styles.roomContainer}>
                        <Octicons name="key" size={16} color="black" />
                        <Text style={Typography.secondary14}>{room}</Text>
                    </View>
                </View>
                <Text style={Typography.secondary14}>{teacher}</Text>
            </View>

            <Text style={Typography.heading16}>
                {start} - {end}
            </Text>
        </View>

    )
}

const styles = StyleSheet.create({
    subjectContainer: {
        backgroundColor: Colors.cardBackgroundColor,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        position: "relative",
        overflow: "hidden",
        borderRadius: 8,
        borderTopLeftRadius: 0,
    },
    leftSide: {
        flexDirection: "column",
        gap: 4,
    },
    subjectAndRoom: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 16,
    },
    roomContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    triangleRotated: {
        position: 'absolute',
        top: -14,
        left: -14,
        width: 26,
        height: 26,
        backgroundColor: Colors.primary500,
        transform: [{ rotate: '45deg' }],
    },
})