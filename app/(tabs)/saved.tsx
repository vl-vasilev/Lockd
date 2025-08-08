import Card from "@/components/Card";
import DayCard from "@/components/DayCard";
import ProfileSection from "@/components/ProfileSection";
import Subject from "@/components/Subject";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SavedScreen() {
    return (
        <SafeAreaView style={PageStyle}>
            <ProfileSection />
            <View style={styles.aboveCardText}>
                <Text style={[Typography.heading18]}> Timetable </Text>
                <TouchableOpacity>
                    <Text style={[Typography.cardSpecificText]}> + Add Class </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.timetableSection}>
                <View style={styles.daysContainer}>
                    <DayCard style={styles.day}>
                        <Text style={[Typography.heading18, styles.dateText]}> 15 </Text>
                        <Text style={[Typography.secondary14, styles.dayText]}> Mon </Text>
                    </DayCard>
                    <DayCard style={styles.day}>
                        <Text style={[Typography.heading18, styles.dateText]}> 16 </Text>
                        <Text style={[Typography.secondary14, styles.dayText]}> Tue </Text>
                    </DayCard>
                    <DayCard style={styles.day}>
                        <Text style={[Typography.heading18, styles.dateText]}> 17 </Text>
                        <Text style={[Typography.secondary14, styles.dayText]}> Wed </Text>
                    </DayCard>
                    <DayCard style={styles.day}>
                        <Text style={[Typography.heading18, styles.dateText]}> 18 </Text>
                        <Text style={[Typography.secondary14, styles.dayText]}> Thu </Text>
                    </DayCard>
                    <DayCard style={styles.day}>
                        <Text style={[Typography.heading18, styles.dateText]}> 19 </Text>
                        <Text style={[Typography.secondary14, styles.dayText]}> Fri </Text>
                    </DayCard>
                </View>
                <Card style={styles.allSubjects}>
                    <Subject />
                    <Subject />
                    <Subject />
                    <Subject />
                    <Subject />
                    <Subject />
                </Card>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    aboveCardText: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    timetableSection: {
        flex: 1,
        flexDirection: "column",
        gap: 16,
    },
    daysContainer: {
        flexDirection: "row",
        gap: 20,
    },
    day: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        padding: 4,
    },
    dateText: {
        textAlign: "center",
        verticalAlign: "middle",
    },
    dayText: {
        textAlign: "center",
        verticalAlign: "middle",
    },

    allSubjects: {
        flexDirection: "column",
        gap: 4,
    }
})