import ProfileSection from "@/components/ProfileSection";
import PageStyle from "@/constants/PageStyle";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedScreen() {
    return (
        <SafeAreaView style={PageStyle}>
            <ProfileSection />
        </SafeAreaView>
    )
}