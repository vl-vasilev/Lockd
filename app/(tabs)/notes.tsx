import AboveCardText from "@/components/AboveCardText";
import AddSheet from "@/components/AddSheet";
import Card from "@/components/Card";
import Fab from "@/components/Fab";
import Note from "@/components/Note";
import ProfileSection from "@/components/ProfileSection";
import Colors from "@/constants/Colors";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Octicons from "@react-native-vector-icons/octicons";
import { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { client, config, tables } from "../../lib/appwrite.js";


interface NoteData {
    $id: string;
    title: string;
    content: string;
    date: string;
    isFavorite: boolean;
    isLocked: boolean;
}

// const data: NoteData[] = [
//     {
//         id: 1,
//         title: "My First Note",
//         content: "This is my first note about something important I want to remember.",
//         date: "2024-01-15",
//         isFavorite: false,
//         isLocked: false,
//     },
//     {
//         id: 2,
//         title: "Shopping List",
//         content: "Don't forget to buy milk, eggs, bread, and coffee for this week.",
//         date: "2024-01-16",
//         isFavorite: false,
//         isLocked: false,
//     },
//     {
//         id: 3,
//         title: "Meeting Notes",
//         content: "Important discussion points from today's team meeting about the new project.",
//         date: "2024-01-17",
//         isFavorite: false,
//         isLocked: false,
//     },
//     {
//         id: 4,
//         title: "Book Ideas",
//         content: "List of books I want to read this month including fiction and non-fiction.",
//         date: "2024-01-18",
//         isFavorite: false,
//         isLocked: false,
//     },
//     {
//         id: 5,
//         title: "Book Ideas",
//         content: "List of books I want to read this month including fiction and non-fiction.",
//         date: "2024-01-18",
//         isFavorite: false,
//         isLocked: false,
//     },
// ];

export default function NotesScreen() {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const handlePresentPress = () => bottomSheetRef.current?.present();

    const [error, setError] = useState<any>(null);

    useEffect(() => {
        init();

        const unsubscribe = client.subscribe([
            `databases.${config.db}.tables.${config.col.notes}.rows`, // listens to notes
        ], (response) => {
            if (response.events[0].includes(config.col.notes && "create")) {
                setNotes(prevNotes => [
                    response.payload,
                    ...prevNotes
                ])
            }
            else if (response.events[0].includes(config.col.notes && "delete")) {
                getData();
            }

        })

        return () => {
            unsubscribe();
        }
    }, [])

    async function init() {
        getData();
    }

    async function getData() {
        try {
            const DBnotes = await tables.listRows(config.db, config.col.notes);
            setNotes(DBnotes.rows);
        } catch (err) {
            setError(err)
            console.error("Error getting data: " + error)
        }
    }

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [notes, setNotes] = useState<Array<any>>([]);

    function toggleFavorite(item: NoteData) {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.$id === item.$id ? { ...note, isFavorite: !note.isFavorite } : note
            )
        );

        tables.updateRow(
            config.db,
            config.col.notes,
            item.$id,
            { isFavorite: !item.isFavorite },
        ).then(function (response) {
        }, function (error) {
            console.log(error)
        })
    };

    function toggleLocked(item: NoteData) {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.$id === item.$id ? { ...note, isLocked: !note.isLocked } : note
            )
        );

        tables.updateRow(
            config.db,
            config.col.notes,
            item.$id,
            { isLocked: !item.isLocked },
        ).then(function (response) {
        }, function (error) {
            console.log(error)
        })
    };

    const filteredNotes = notes.filter(note => {
        // filter by search
        const matchesSearch =
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase());

        // filter by category
        let matchesCategory = true;
        if (selectedCategory === "favorites") {
            matchesCategory = note.isFavorite;
        } else if (selectedCategory === "locked") {
            matchesCategory = note.isLocked;
        }
        // "all" shows everything so matchesCategory stays true

        return matchesSearch && matchesCategory;
    });




    return (
        <SafeAreaProvider>
            <SafeAreaView style={[PageStyle, { position: 'relative' }]}>
                <ProfileSection />
                <Fab openSheet={handlePresentPress} />
                <AddSheet ref={bottomSheetRef} defaultSelectedType="note" />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingHorizontal: 16 }}

                >

                    <AboveCardText
                        title="Notes"
                        buttonText="Note"
                        onButtonPress={() => handlePresentPress()}
                    />

                    <View style={styles.searchContainer}>
                        <Octicons name="search" size={16} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    <View style={styles.categoriesContainer}>
                        <TouchableOpacity
                            style={[styles.category, { flexGrow: 2 }]}
                            onPress={() => setSelectedCategory("all")}
                        >
                            <Card
                                isSelected={selectedCategory === "all"}
                            >
                                <Text
                                    style={[
                                        { textAlign: "center" },
                                        Typography.secondary16,
                                        selectedCategory === "all" && Typography.selectedText
                                    ]}
                                >
                                    All
                                </Text>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.category, { flexGrow: 2 }]}
                            onPress={() => setSelectedCategory("favorites")}
                        >
                            <Card
                                isSelected={selectedCategory === "favorites"}
                            >
                                <Text
                                    style={[
                                        { textAlign: "center" },
                                        Typography.secondary16,
                                        selectedCategory === "favorites" && Typography.selectedText
                                    ]}
                                >
                                    Favorites
                                </Text>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.category, { flexGrow: 2 }]}
                            onPress={() => setSelectedCategory("locked")}
                        >
                            <Card
                                isSelected={selectedCategory === "locked"}
                            >
                                <Text
                                    style={[
                                        { textAlign: "center" },
                                        Typography.secondary16,
                                        selectedCategory === "locked" && Typography.selectedText
                                    ]}
                                >
                                    Locked
                                </Text>
                            </Card>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.notesContainer}>
                        <FlatList
                            scrollEnabled={false}
                            data={filteredNotes}
                            numColumns={2}
                            columnWrapperStyle = {{gap: 8, marginVertical: 4}}
                            renderItem={({ item, }) => <Note
                                key={item.$id}
                                id={item.$id}
                                title={item.title}
                                content={item.content}
                                date={item.date}
                                isLocked={item.isLocked}
                                isFavorite={item.isFavorite}
                                toggleLocked={() => toggleLocked(item)}
                                toggleFavorite={() => toggleFavorite(item)}
                            />}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
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

        marginBottom: 16,
    },
    searchInput: {
        color: "black",
        paddingHorizontal: 4,
        width: "100%"
    },
    categoriesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 16,
    },
    category: {
        alignSelf: "stretch",
        flex: 1,
    },
    notesContainer: {
        flex: 1,
    }
})
