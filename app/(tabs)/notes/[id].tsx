import PageStyle from "@/constants/PageStyle";
import Octicons from "@react-native-vector-icons/octicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Typography from "../../../constants/Typography";
import { config, tables } from "../../../lib/appwrite.js";


export default function NoteDetails() {
    const { id } = useLocalSearchParams();
    const noteId = id as string;
    const [sContent, setSContent] = useState("");
    const [sTitle, setSTitle] = useState("");


    useEffect(() => {
        setSContent("");
        setSTitle("");
        init();

        // return () => {
        //     tables.updateRow(
        //         config.db,
        //         config.col.notes,
        //         noteId,
        //         { content: sContent},
        //     ).then(function (response) {
        //     }, function (error) {
        //         console.log(error)
        //     })
        // }
    }, [noteId])

    async function init() {
        getData();
    }

    async function getData() {
        try {
            const result = await tables.getRow({
                databaseId: config.db,
                tableId: config.col.notes,
                rowId: noteId,
            });
            setSContent(result.content)
            setSTitle(result.title)

        } catch (err) {
            console.error("Error getting data: " + err)
        }
    }

    async function deleteNote() {
        try {
            const result = await tables.deleteRow({
                databaseId: config.db,
                tableId: config.col.notes,
                rowId: noteId
            });
            router.navigate("/(tabs)/notes");

        } catch (err) {
            console.error("Error deleting row: " + err)
        }

    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[PageStyle, { position: 'relative' }]}>
                <View style={styles.header}>
                    <Text style={Typography.heading20}>
                        {sTitle}
                    </Text>
                    <TouchableOpacity
                        onPress={deleteNote}
                    >
                        <Octicons name="trash" size={24} color={"red"} />
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 8 }}>
                    <TextInput
                        style={styles.content}
                        multiline={true}
                        value={sContent}
                        onChangeText={setSContent}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 8,
        borderColor: "gray",
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    content: {
        height: "100%",
        textAlign: "left",
        textAlignVertical: "top",
    }
})

