import AboveCardText from "@/components/AboveCardText";
import Card from "@/components/Card";
import Note from "@/components/Note";
import ProfileSection from "@/components/ProfileSection";
import Colors from "@/constants/Colors";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import Octicons from "@react-native-vector-icons/octicons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface NoteData {
    id: number;
    title: string;
    content: string;
    date: string;
    isFavorite: boolean;
    isLocked: boolean;
}

const data: NoteData[] = [
    {
        id: 1,
        title: "My First Note",
        content: "This is my first note about something important I want to remember.",
        date: "2024-01-15",
        isFavorite: false,
        isLocked: false,
    },
    {
        id: 2,
        title: "Shopping List",
        content: "Don't forget to buy milk, eggs, bread, and coffee for this week.",
        date: "2024-01-16",
        isFavorite: false,
        isLocked: false,
    },
    {
        id: 3,
        title: "Meeting Notes",
        content: "Important discussion points from today's team meeting about the new project.",
        date: "2024-01-17",
        isFavorite: false,
        isLocked: false,
    },
    {
        id: 4,
        title: "Book Ideas",
        content: "List of books I want to read this month including fiction and non-fiction.",
        date: "2024-01-18",
        isFavorite: false,
        isLocked: false,
    },
    {
        id: 5,
        title: "Book Ideas",
        content: "List of books I want to read this month including fiction and non-fiction.",
        date: "2024-01-18",
        isFavorite: false,
        isLocked: false,
    },
];

export default function NotesScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [notes, setNotes] = useState<Array<NoteData>>(data);

    function addNote() {
        setNotes(prevNotes => [
            ...prevNotes,
            {
                id: Math.max(...prevNotes.map(n => n.id)) + 1,
                title: "New Note",
                content: "This is the content of a note i just made so basically i just need to fill this",
                date: "2024-01-18",
                isFavorite: false,
                isLocked: false,
            }
        ])
    }

    function toggleFavorite(id: number) {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
            )
        );
    };

    function toggleLocked(id: number) {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === id ? { ...note, isLocked: !note.isLocked } : note
            )
        );
    };

    const filteredNotes = notes.filter(note => {
        // filter by search
        const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            <SafeAreaView style={PageStyle}>
                <ProfileSection />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingHorizontal: 16 }}

                >

                    <AboveCardText
                        title="Notes"
                        buttonText="Note"
                        onButtonPress={addNote}
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
                                        Typography.default16,
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
                                        Typography.default16,
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
                                        Typography.default16,
                                        selectedCategory === "locked" && Typography.selectedText
                                    ]}
                                >
                                    Locked
                                </Text>
                            </Card>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.notesContainer}>
                        {filteredNotes.map((item) => (
                            <Note 
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                content={item.content}
                                date={item.date}
                                isFavorite={item.isFavorite}
                                isLocked={item.isLocked}
                                toggleFavorite={toggleFavorite}
                                toggleLocked={toggleLocked}
                            />
                        ))}
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
        // backgroundColor: "red",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    }
})
