import AboveCardText from "@/components/AboveCardText";
import Activity from "@/components/Activity";
import AddSheet from "@/components/AddSheet";
import Card from "@/components/Card";
import Fab from "@/components/Fab";
import ProfileSection from "@/components/ProfileSection";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { config, tables } from "../../lib/appwrite.js";

type Activity = {
    $id: string;
    title: string;
    date: string;
    body: string;
    coins: number;
    completed: boolean;
    subject: string;
}

export default function SavedScreen() {

    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const handlePresentPress = () => bottomSheetRef.current?.present();
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        init();
    }, [])

    async function init() {
        getData();
    }

    async function getData() {
        try {
            const DBtasks = await tables.listRows(config.db, config.col.tasks);
            const DBtests = await tables.listRows(config.db, config.col.tests);
            setTasks(DBtasks.rows)
            setTests(DBtests.rows)
            // console.log(DBtasks)
        } catch (err) {
            setError(err)
            console.error(error)
        }
    }

    const [selectedActivity, setSelectedActivity] = useState<string | null>("tasks");
    const [tasks, setTasks] = useState<Array<any>>([]);
    const [tests, setTests] = useState<Array<any>>([]);

    function toggleCompleted(item: Activity) {
        if (selectedActivity === "tasks") {
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.$id === item.$id ? { ...task, completed: !task.completed } : task
                )
            );
            try {
                tables.upsertRow(config.db, config.col.tasks, item.$id, { completed: !item.completed })
            } catch (error) {
                console.error(error)
            }
        }
        else {
            setTests(prevTests =>
                prevTests.map(test =>
                    test.$id === item.$id ? { ...test, completed: !test.completed } : test
                )
            );
            try {
                tables.upsertRow(config.db, config.col.tests, item.$id, { completed: !item.completed })
            } catch (error) {
                console.error(error)
            }
        }


    };

    function renderTasks(completed: boolean) {
        if (completed) { // return completed tasks
            return (
                <FlatList
                    scrollEnabled={false}
                    data={tasks.filter(task => task.completed)}
                    renderItem={({ item }) => <Activity
                        key={item.$id}
                        id={item.$id}
                        title={item.title}
                        date={item.date}
                        body={item.body}
                        coins={item.coins}
                        completed={item.completed}
                        toggleCompleted={() => toggleCompleted(item)}
                        subject={item.subject}
                    />}
                    ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                />
            )
        }

        return ( // return uncompleted tasks
            <FlatList
                scrollEnabled={false}
                data={tasks.filter(task => !task.completed)}
                renderItem={({ item }) => <Activity
                    key={item.$id}
                    id={item.$id}
                    title={item.title}
                    date={item.date}
                    body={item.body}
                    coins={item.coins}
                    completed={item.completed}
                    toggleCompleted={() => toggleCompleted(item)}
                    subject={item.subject}
                />}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            />
        )
    }

    function renderTests(completed: boolean) {
        if (completed) { // return completed test
            return (
                <FlatList
                    scrollEnabled={false}
                    data={tests.filter(test => test.completed)}
                    renderItem={({ item }) => <Activity
                        key={item.$id}
                        id={item.$id}
                        title={item.title}
                        date={item.date}
                        body={item.body}
                        coins={item.coins}
                        completed={item.completed}
                        toggleCompleted={() => toggleCompleted(item)}
                        subject={item.subject}
                    />}
                    ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                />
            )
        }

        return ( // return NOT completed tests
            <FlatList
                scrollEnabled={false}
                data={tests.filter(test => !test.completed)}
                renderItem={({ item }) => <Activity
                    key={item.$id}
                    id={item.$id}
                    title={item.title}
                    date={item.date}
                    body={item.body}
                    coins={item.coins}
                    completed={item.completed}
                    toggleCompleted={() => toggleCompleted(item)}
                    subject={item.subject}
                />}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            />
        )
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[PageStyle, { position: 'relative' }]}>
                <ProfileSection />
                <Fab openSheet={handlePresentPress} />
                <AddSheet ref={bottomSheetRef} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingHorizontal: 16 }}
                >
                    <AboveCardText
                        title="ToDo List"
                        buttonText="New"
                        onButtonPress={() => handlePresentPress()}
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
                        {selectedActivity === "tasks" ?
                            renderTasks(false) :
                            renderTests(false)
                        }
                    </View>

                    <AboveCardText
                        title="Completed"
                    />

                    <View style={styles.activitiesContainer}>
                        {selectedActivity === "tasks" ?
                            renderTasks(true) :
                            renderTests(true)
                        }
                    </View>
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