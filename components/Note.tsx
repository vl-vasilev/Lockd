import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import Octicons from "@react-native-vector-icons/octicons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NoteProps {
    id: number;
    title: string;
    content: string;
    date: string;
    isLocked: boolean;
    isFavorite: boolean;
    toggleLocked: (id: number) => void;
    toggleFavorite: (id: number) => void;
}

export default function Note({ id, title, content, date, isLocked, isFavorite, toggleLocked, toggleFavorite }: NoteProps) {
    const router = useRouter();
    return (
        <TouchableOpacity
            style={styles.noteContainer}
            onPress={() => router.push(`/(tabs)/notes/${id}` as any)}
        >
            {isLocked ? (
                <View style={styles.lockedContainer}>
                    <Text style={Typography.heading18}>Locked Note</Text>
                    <TouchableOpacity
                        onPress={() => toggleLocked(id)}                    >
                        <Octicons name="unlock" size={36} color={"black"} />
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <View style={styles.textContainer}>
                        <View>
                            <Text style={Typography.heading18}>{title}</Text>
                            <Text style={Typography.secondary14}>
                                {content.length > 60 ?
                                    content.slice(0, 60) + "..." : content}
                            </Text>
                        </View>
                        <Text style={Typography.secondary16}>{date}</Text>
                    </View>
                    <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
                        <TouchableOpacity
                            onPress={() => toggleFavorite(id)}
                        >
                            {isFavorite ? (
                                <Octicons name="star-fill" size={16} color={"black"} />) : (
                                <Octicons name="star" size={16} color={"black"} />)
                            }
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => toggleLocked(id)}>
                            <Octicons name="lock" size={16} color={"black"} />
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    noteContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.cardBackgroundColor,
        borderRadius: 8,
        padding: 8,
        height: 140,
        width: "48%"
    },
    textContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: "90%",
    },

    lockedContainer: {
        justifyContent: "space-between",
        alignItems: "center",
    }

})