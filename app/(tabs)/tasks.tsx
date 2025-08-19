import AboveCardText from "@/components/AboveCardText";
import Activity from "@/components/Activity";
import Card from "@/components/Card";
import ProfileSection from "@/components/ProfileSection";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Task = {
    title: string;
    date: string;
    points: number;
}

const INITIALTASKS: Array<Task> = [
    { title: "Task 1", date: "August 30th", points: 10 },
    { title: "Task 2", date: "August 23th", points: 20 },
    { title: "Task 3", date: "September 6th", points: 30 }
]



export default function SavedScreen() {
    const [selectedActivity, setSelectedActivity] = useState<string | null>("tasks");
    const [tasks, setTasks] = useState(INITIALTASKS);

    function addActivity() {
        setTasks(prevTasks => [
            ...prevTasks,
            {
                title: "New Task",
                date: "September 10th",
                points: 5
            }
        ])
    }

    return (
        <SafeAreaView style={PageStyle}>
            <ProfileSection />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 16 }}
            >
                <AboveCardText
                    title="ToDo List"
                    buttonText="New"
                    onButtonPress={() => addActivity()}
                />
                <View style={styles.activitiesCategoriesContainer}>
                    <TouchableOpacity
                        style={[styles.activityCategory, { flexGrow: 2 }]}
                        onPress={() => setSelectedActivity("tasks")}
                    >
                        <Card
                            isSelected={selectedActivity === "tasks"}
                        >
                            <Text
                                style={[
                                    { textAlign: "center" },
                                    Typography.default16,
                                    selectedActivity === "tasks" && Typography.selectedText
                                ]}
                            >
                                Tasks
                            </Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.activityCategory, { flexGrow: 2 }]}
                        onPress={() => setSelectedActivity("tests")}
                    >
                        <Card
                            isSelected={selectedActivity === "tests"}
                        >
                            <Text
                                style={[
                                    { textAlign: "center" },
                                    Typography.default16,
                                    selectedActivity === "tests" && Typography.selectedText
                                ]}
                            >
                                Tests
                            </Text>
                        </Card>
                    </TouchableOpacity>

                </View>

                <Card>
                    {tasks.map((item, index) => {
                        return (
                            <Activity
                                key={index}
                                title={item.title}
                                date={item.date}
                                points={item.points}
                            />
                        )
                    })}
                </Card>


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    activitiesCategoriesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 16,
    },
    activityCategory: {
        alignSelf: "stretch",
        flex: 1,
    },
})