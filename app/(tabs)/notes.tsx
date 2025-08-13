import AboveCardText from "@/components/AboveCardText";
import ProfileSection from "@/components/ProfileSection";
import Colors from "@/constants/Colors";
import PageStyle from "@/constants/PageStyle";
import Octicons from "@react-native-vector-icons/octicons";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SafeAreaView style={PageStyle}>
            <ProfileSection />

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
    },
    searchInput: {
        color: "black",
        paddingHorizontal: 4,
    },
})