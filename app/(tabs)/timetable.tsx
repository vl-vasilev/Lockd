import AboveCardText from "@/components/AboveCardText";
import AddSheet from "@/components/AddSheet";
import DayCard from "@/components/DayCard";
import Fab from "@/components/Fab";
import ProfileSection from "@/components/ProfileSection";
import Subject from "@/components/Subject";
import Colors from "@/constants/Colors";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";



type DayCardData = {
    id: string;
    day: string;
    date: string;
}


type Subject = {
    name: string;
    start: string;
    end: string;
}

type SubjectData = {
    id: string;
    subjects: Array<Subject>;
}

const INITIALSUBJECTDATA: SubjectData[] = [
    {
        id: "1", // Monday
        subjects: [
            {
                name: "discussion",
                start: "8:00",
                end: "8:40",
            },
            {
                name: "physics",
                start: "8:50",
                end: "9:30",
            },
            {
                name: "P.E.",
                start: "9:40",
                end: "10:20",
            },
            {
                name: "bulgarian",
                start: "10:30",
                end: "11:10",
            },
            {
                name: "bulgarian",
                start: "11:20",
                end: "12:00",
            },
            {
                name: "DSA",
                start: "12:20",
                end: "13:00",
            },
            {
                name: "coding",
                start: "13:10",
                end: "13:50",
            },
        ]
    },
    {
        id: "2", // Tuesday
        subjects: [
            {
                name: "english",
                start: "8:00",
                end: "8:40",
            },
            {
                name: "english",
                start: "8:50",
                end: "9:30",
            },
            {
                name: "bulgarian",
                start: "9:40",
                end: "10:20",
            },
            {
                name: "geography",
                start: "10:30",
                end: "11:10",
            },
            {
                name: "geography",
                start: "11:20",
                end: "12:00",
            },
            {
                name: "art Class",
                start: "12:20",
                end: "13:00",
            },
        ]
    },
    {
        id: "3", // Wednesday
        subjects: [
            {
                name: "biology",
                start: "8:00",
                end: "8:40",
            },
            {
                name: "chemistry",
                start: "8:50",
                end: "9:30",
            },
            {
                name: "philosophy",
                start: "9:40",
                end: "10:20",
            },
            {
                name: "history",
                start: "10:30",
                end: "11:10",
            },
            {
                name: "computer Work",
                start: "11:20",
                end: "12:00",
            },
            {
                name: "economics",
                start: "12:20",
                end: "13:00",
            },
            {
                name: "german",
                start: "13:10",
                end: "13:50",
            },
            {
                name: "german",
                start: "14:00",
                end: "14:40",
            },
        ]
    },
    {
        id: "4", // Thursday
        subjects: [
            {
                name: "P.E.",
                start: "8:00",
                end: "8:40",
            },
            {
                name: "philosophy",
                start: "8:50",
                end: "9:30",
            },
            {
                name: "biology",
                start: "9:40",
                end: "10:20",
            },
            {
                name: "history",
                start: "10:30",
                end: "11:10",
            },
            {
                name: "math",
                start: "11:20",
                end: "12:00",
            },
            {
                name: "P.E.",
                start: "12:20",
                end: "13:00",
            },
        ]
    },
    {
        id: "5", // Friday
        subjects: [
            {
                name: "chemistry",
                start: "8:00",
                end: "8:40",
            },
            {
                name: "geography",
                start: "8:50",
                end: "9:30",
            },
            {
                name: "physics",
                start: "9:40",
                end: "10:20",
            },
            {
                name: "math",
                start: "10:30",
                end: "11:10",
            },
            {
                name: "history",
                start: "11:20",
                end: "12:00",
            },
            {
                name: "DSA",
                start: "12:20",
                end: "13:00",
            },
            {
                name: "DSA",
                start: "13:10",
                end: "13:50",
            },
        ]
    },

]





export default function SavedScreen() {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const handlePresentPress = () => bottomSheetRef.current?.present();

    const [selectedDayId, setSelectedDayId] = useState<string>("1");
    const [subjectData, setSubjectData] = useState<SubjectData[]>(INITIALSUBJECTDATA);


    const selectedDayData = subjectData.find(day => day.id === selectedDayId);
    const subjectsToRender = selectedDayData ? selectedDayData.subjects : [];

    function addClass() {
        setSubjectData(prevData => {
            return prevData.map(day => {
                if (day.id === selectedDayId) {
                    return {
                        ...day,
                        subjects: [
                            ...day.subjects,
                            {
                                name: "NEW SUBJECT",
                                start: "00:00",
                                end: "00:00",
                            },
                        ]
                    };
                }
                return day;
            });
        });
    }

    function getWeekDates(): DayCardData[] {
        const today = new Date();
        const currentDay = today.getDay();

        // Пресмята разликата между текущия ден и понеделник
        const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        const weekDates: DayCardData[] = [];

        days.forEach((day, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() + mondayOffset + index);

            weekDates.push({
                id: (index + 1).toString(),
                day: day,
                date: date.getDate().toString(),
            });
        });

        return weekDates;
    }

    const DAYCARDDATA = getWeekDates();


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
                        title="Timetable"
                        buttonText="Class"
                        onButtonPress={addClass}
                    />
                    <View style={styles.timetableSection}>
                        <View style={styles.daysContainer}>
                            {DAYCARDDATA.map((item) => {
                                const isSelected = item.id === selectedDayId;
                                return (
                                    <DayCard
                                        key={item.id}
                                        isSelected={isSelected}
                                        setSelectedId={setSelectedDayId}
                                        itemId={item.id}
                                    >
                                        <Text
                                            style={[Typography.heading20, styles.dateText, isSelected && Typography.selectedText]}>
                                            {item.date}
                                        </Text>
                                        <Text
                                            style={[Typography.secondary14, styles.dayText, isSelected && Typography.selectedText]}>
                                            {item.day}
                                        </Text>
                                    </DayCard>
                                );
                            })}
                        </View>

                        <View style={styles.allSubjects}>
                            {subjectsToRender.map((item, index) => {
                                return (
                                    <Subject
                                        key={`${selectedDayId}-${index}`}
                                        subject={item.name}
                                        start={item.start}
                                        end={item.end}
                                    />
                                )
                            })}
                        </View>
                    </View>


                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>

    )
}


const styles = StyleSheet.create({
    aboveCardText: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    timetableSection: {
        flexDirection: "column",
        gap: 16,
        marginBottom: 24,
    },
    daysContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        height: 70,
        alignItems: 'center',
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
        gap: 8,
    },

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
        width: "100%",
    },
    contactsCategoriesContainer: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
    },
    contactCategory: {
        alignSelf: "stretch",
        flex: 1,
    },

    contactsContainer: {
        marginVertical: 16,
    }
})