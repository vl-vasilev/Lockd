import AboveCardText from "@/components/AboveCardText";
import Card from "@/components/Card";
import ProfileSection from "@/components/ProfileSection";
import Colors from "@/constants/Colors";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import Octicons from "@react-native-vector-icons/octicons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>("all");

    return (
        <SafeAreaView style={PageStyle}>
            <ProfileSection />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 16 }}

            >

                <AboveCardText
                    title="Notes"
                    buttonText="Note"
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
            </ScrollView>
        </SafeAreaView>
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
})
