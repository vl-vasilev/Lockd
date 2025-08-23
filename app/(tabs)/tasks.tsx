import AboveCardText from "@/components/AboveCardText";
import Activity from "@/components/Activity";
import Card from "@/components/Card";
import Fab from "@/components/Fab";
import ProfileSection from "@/components/ProfileSection";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Activity = {
    title: string;
    date: string;
    details: string;
    points: number;
}

const INITIALTASKS: Array<Activity> = [
    { title: "Task 1", date: "30 Aug", details: "These are some temporary details that i made up on the spot", points: 10 },
    { title: "Task 2", date: "23 Sep", details: "These are some temporary details that i made up on the spot", points: 20 },
    { title: "Task 3", date: "25 Sep", details: "These are some temporary details that i made up on the spot", points: 30 }
]



export default function SavedScreen() {
    const [selectedActivity, setSelectedActivity] = useState<string | null>("tasks");
    const [tasks, setTasks] = useState(INITIALTASKS);
    const [tests, setTests] = useState<Array<Activity>>([]);

    function renderActivities() {
        const toRender = selectedActivity === "tasks" ? tasks : tests;
        if (toRender.length === 0) {
            return (
                <Card>
                    <Text style={[Typography.default16, { textAlign: "center", justifyContent: "center" }]}>
                        You don't have any {selectedActivity} yet.
                    </Text>
                    <Image source={require('../../assets/images/empty.png')} style={styles.emptyImage} />
                </Card>
            )

        }
        return toRender.map((item, index) => {
            return (
                <Activity
                    key={index}
                    title={item.title}
                    date={item.date}
                    details={item.details}
                    points={item.points}
                />
            )
        })

    }

    function addActivity() {
        setTasks(prevTasks => [
            ...prevTasks,
            {
                title: "New Task",
                date: "6 Sep",
                details: "These are some temporary details that I made up on the spot",
                points: 5
            }
        ])
        setTests(prevTests => [
            ...prevTests,
            {
                title: "New Task",
                date: "6 Sep",
                details: "These are some temporary details that I made up on the spot",
                points: 5
            }
        ])
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[PageStyle, { position: 'relative' }]}>
                <ProfileSection />
                <Fab />
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

                    <View style={styles.activitiesContainer}>
                        {renderActivities()}
                    </View>

                    <AboveCardText
                        title="Completed"
                    />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
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
    activitiesContainer: {
        gap: 8,
        marginBottom: 16,
    },
    emptyImage: {
        width: 300,
        height: 200,
        alignSelf: "center",
        marginTop: 16,
    }
})