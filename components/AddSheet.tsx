import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput, BottomSheetView, useBottomSheetModal } from "@gorhom/bottom-sheet";
import Octicons from "@react-native-vector-icons/octicons";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ID } from "react-native-appwrite";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { config, tables } from "../lib/appwrite.js";
import Separator from "./Separator";



interface Props {
    defaultSelectedType?: string;
}

type Ref = BottomSheetModal;


const AddSheet = forwardRef<Ref, Props>((props, ref) => {

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
            // console.log(DBtasks)
        } catch (err) {
            setError(err)
            console.error(error)
        }
    }
    const [error, setError] = useState<any>(null);


    if (props.defaultSelectedType === undefined) props.defaultSelectedType = "task";
    const { dismiss } = useBottomSheetModal();
    const snapPoints = useMemo(() => ["25%", "50%", "75%", "90%"], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    )

    const [selectedType, setSelectedType] = useState<string>(props.defaultSelectedType);

    // task / test states
    const [actDetails, setActDetails] = useState<string>("");
    const [actDate, setActDate] = useState<string>("");
    const [actSubject, setActSubject] = useState<string>("");

    // note states
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [noteContent, setNoteContent] = useState<string>("");
    const [noteLocked, setNoteLocked] = useState<boolean>(false);


    function addTask() {
        try {
            tables.upsertRow(config.db, config.col.tasks, ID.unique(), {title: "Task Title", date: actDate, body: actDetails, coins: 40, completed: false, subject: actSubject })
            console.log("added task")
            dismiss()
        } catch (err) {
            setError(err)
            console.error(error)
        }
    }

    return (

        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop}
            index={1} // there is an invisible index 0 zero which is 0% so index here = index + 1 in the array
            keyboardBehavior="extend"
        >
            <BottomSheetView style={styles.sheetContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => dismiss()}
                    >
                        <Octicons name="x" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={Typography.heading20}>Add</Text>
                </View>
                <Separator />

                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        style={[styles.tab, selectedType === "task" && styles.selectedTab]}
                        onPress={() => setSelectedType("task")}
                    >
                        <Text style={[Typography.secondary16, selectedType === "task" && Typography.selectedText]}>Task</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, selectedType === "test" && styles.selectedTab]}
                        onPress={() => setSelectedType("test")}
                    >
                        <Text style={[Typography.secondary16, selectedType === "test" && Typography.selectedText]}>Test</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, selectedType === "note" && styles.selectedTab]}
                        onPress={() => setSelectedType("note")}
                    >
                        <Text style={[Typography.secondary16, selectedType === "note" && Typography.selectedText]}>Note</Text>
                    </TouchableOpacity>
                </View>

                {(selectedType === "task" || selectedType === "test") &&
                    <>
                        <View style={styles.inputContainer}>
                            <Octicons name="briefcase" size={16} />
                            <BottomSheetTextInput
                                style={styles.input}
                                placeholder="Enter subject (e.g. math, english etc.)"
                                multiline={true}
                                value={actSubject}
                                onChangeText={setActSubject}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Octicons name="pencil" size={16} />
                            <BottomSheetTextInput
                                style={styles.input}
                                placeholder="Enter details"
                                multiline={true}
                                value={actDetails}
                                onChangeText={setActDetails}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Octicons name="calendar" size={16} />
                            <BottomSheetTextInput
                                style={styles.input}
                                placeholder="Enter due date [YYYY-MM-DD]"
                                multiline={true}
                                value={actDate}
                                onChangeText={setActDate}
                            />
                        </View>

                    </>
                }


                {selectedType === "note" &&
                    <>
                        <View style={styles.inputContainer}>
                            <Octicons name="italic" size={16} />
                            <BottomSheetTextInput
                                style={styles.input}
                                placeholder="Enter title"
                                value={noteTitle}
                                onChangeText={setNoteTitle}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Octicons name="pencil" size={16} />
                            <BottomSheetTextInput
                                style={styles.input}
                                placeholder="Enter content"
                                value={noteContent}
                                onChangeText={setNoteContent}
                            />
                        </View>
                        <View style={styles.lockedContainer}>
                            <BouncyCheckbox
                                size={24}
                                fillColor={Colors.primary500}
                                disableText={true}
                                onPress={() => setNoteLocked(!noteLocked)}
                                isChecked={noteLocked}
                            />
                            <Text style={Typography.default16}>
                                Locked
                            </Text>
                        </View>
                    </>
                }


                <TouchableOpacity
                    style={styles.addButton}
                    onPress={addTask}
                >
                    <Text style={Typography.selectedText}>
                        Add {selectedType[0].toLocaleUpperCase() + selectedType.slice(1)}
                    </Text>
                </TouchableOpacity>

            </BottomSheetView>
        </BottomSheetModal>
    )

});

const styles = StyleSheet.create({
    sheetContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'baseline',
        backgroundColor: "#fff",
        flexDirection: "column",
        gap: 16,
    },
    header: {
        flex: 1,
        flexDirection: "row",
        gap: 145,
        width: "100%",
    },
    tabsContainer: {
        borderColor: "#ddd",
        borderWidth: 1,
        backgroundColor: Colors.cardBackgroundColor,
        width: "100%",
        borderRadius: 36,
        padding: 4,
        flexDirection: "row",
    },
    tab: {
        borderRadius: 20,
        padding: 4,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    selectedTab: {
        backgroundColor: Colors.primary500,
    },
    addButton: {
        backgroundColor: Colors.primary500,
        width: "100%",
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 32,
        marginTop: 16,
    },

    inputContainer: {
        backgroundColor: Colors.cardBackgroundColor,
        borderColor: Colors.cardStrokeColor,
        borderRadius: 12,

        paddingHorizontal: 12,
        paddingVertical: 0,
        flexDirection: "row",
        gap: 8,
        alignItems: "center",

        width: "100%"
    },
    input: {
        color: "black",
        paddingLeft: 4,
        paddingRight: 16,
        width: "100%"
    },

    selectSubjectButton: { // not used rn
        backgroundColor: Colors.cardBackgroundColor,
        borderColor: Colors.cardStrokeColor,
        borderRadius: 12,

        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginTop: 16,
        width: "100%",
        height: 40
    },

    lockedContainer: {
        flexDirection: "row",
        gap: 8,
    }
});


export default AddSheet;