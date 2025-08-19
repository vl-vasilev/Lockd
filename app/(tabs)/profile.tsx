import PageStyle from "@/constants/PageStyle";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function ProfileScreen() {


    return (
        <SafeAreaView style={PageStyle}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 16 }}
            >

                <Text>
                    Profile
                </Text>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})