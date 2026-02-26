import Colors from "@/constants/Colors";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import Octicons from "@react-native-vector-icons/octicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { config, tables } from "../../../lib/appwrite.js";

export default function NoteDetails() {
    const { id } = useLocalSearchParams();
    const noteId = id as string;

    const [sContent, setSContent] = useState("");
    const [sTitle, setSTitle] = useState("");
    const [lastEdited, setLastEdited] = useState<Date | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setSContent("");
        setSTitle("");
        setLastEdited(null);
        getData();
    }, [noteId]);

    useEffect(() => {
        if (!sContent && !sTitle) return;
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
            saveNote();
        }, 800);
        return () => {
            if (saveTimer.current) clearTimeout(saveTimer.current);
        };
    }, [sContent, sTitle]);

    async function getData() {
        try {
            const result = await tables.getRow({
                databaseId: config.db,
                tableId: config.col.notes,
                rowId: noteId,
            });
            setSContent(result.content);
            setSTitle(result.title);
            if (result.$updatedAt) setLastEdited(new Date(result.$updatedAt));
        } catch (err) {
            console.error("Error getting note: " + err);
        }
    }

    async function saveNote() {
        try {
            setIsSaving(true);
            await tables.updateRow(config.db, config.col.notes, noteId, {
                content: sContent,
                title: sTitle,
            });
            setLastEdited(new Date());
        } catch (err) {
            console.error("Error saving note: " + err);
        } finally {
            setIsSaving(false);
        }
    }

    function confirmDelete() {
        Alert.alert(
            "Delete Note",
            "Are you sure you want to delete this note? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: deleteNote },
            ]
        );
    }

    async function deleteNote() {
        try {
            await tables.deleteRow({
                databaseId: config.db,
                tableId: config.col.notes,
                rowId: noteId,
            });
            router.navigate("/(tabs)/notes");
        } catch (err) {
            console.error("Error deleting note: " + err);
        }
    }

    function formatLastEdited(date: Date): string {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[PageStyle, styles.screen]}>
                <View style={styles.topBar}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => router.back()}
                    >
                        <Octicons name="chevron-left" size={22} color={Colors.primary700} />
                    </TouchableOpacity>

                    <View style={styles.topBarCenter}>
                        {isSaving ? (
                            <Text style={styles.savingText}>Saving…</Text>
                        ) : lastEdited ? (
                            <Text style={styles.savingText}>
                                Edited {formatLastEdited(lastEdited)}
                            </Text>
                        ) : null}
                    </View>

                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={confirmDelete}
                    >
                        <Octicons name="trash" size={20} color={"#e05252"} />
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>
                    <TextInput
                        style={styles.titleInput}
                        value={sTitle}
                        onChangeText={setSTitle}
                        placeholder="Title"
                        placeholderTextColor="hsl(0, 0%, 70%)"
                        multiline={false}
                        returnKeyType="next"
                    />

                    <View style={styles.divider} />

                    <TextInput
                        style={styles.contentInput}
                        value={sContent}
                        onChangeText={setSContent}
                        placeholder="Start writing…"
                        placeholderTextColor="hsl(0, 0%, 70%)"
                        multiline={true}
                        textAlignVertical="top"
                        scrollEnabled={true}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "hsl(210, 20%, 92%)",
    },
    iconButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: Colors.cardBackgroundColor,
        alignItems: "center",
        justifyContent: "center",
    },
    topBarCenter: {
        flex: 1,
        alignItems: "center",
    },
    savingText: {
        ...Typography.secondary14,
        fontSize: 12,
    },

    body: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    titleInput: {
        fontSize: 26,
        fontWeight: "700",
        color: "hsl(0, 0%, 10%)",
        paddingVertical: 4,
        marginBottom: 8,
    },
    divider: {
        height: 1,
        backgroundColor: "hsl(210, 20%, 92%)",
        marginBottom: 16,
    },
    contentInput: {
        flex: 1,
        fontSize: 16,
        lineHeight: 26,
        color: "hsl(0, 0%, 15%)",
        fontWeight: "400",
    },
});
