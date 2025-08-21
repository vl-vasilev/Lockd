import AboveCardText from "@/components/AboveCardText";
import Contact from "@/components/Contact";
import DayCard from "@/components/DayCard";
import ProfileSection from "@/components/ProfileSection";
import Subject from "@/components/Subject";
import Colors from "@/constants/Colors";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";



type DayCardData = {
    id: string;
    day: string;
    date: string;
}

const DAYCARDDATA: DayCardData[] = [
    {
        id: "1",
        day: "Mon",
        date: "15",
    },
    {
        id: "2",
        day: "Tue",
        date: "16",
    },
    {
        id: "3",
        day: "Wed",
        date: "17",
    },
    {
        id: "4",
        day: "Thu",
        date: "18",
    },
    {
        id: "5",
        day: "Fri",
        date: "19",
    },

]

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
                name: "Discussion",
                start: "8:00",
                end: "8:40",
            },
            {
                name: "Physics",
                start: "8:50",
                end: "9:30",
            },
            {
                name: "P.E.",
                start: "9:40",
                end: "10:20",
            },
            {
                name: "Bulgarian",
                start: "10:30",
                end: "11:10",
            },
            {
                name: "Bulgarian",
                start: "11:20",
                end: "12:00",
            },
            {
                name: "DSA",
                start: "12:20",
                end: "13:00",
            },
            {
                name: "Coding",
                start: "13:10",
                end: "13:50",
            },
        ]
    },
    {
        id: "2", // Tuesday
        subjects: [
            {
                name: "English",
                start: "8:00",
                end: "8:40",
            },
            {
                name: "English",
                start: "8:50",
                end: "9:30",
            },
            {
                name: "Bulgarian",
                start: "9:40",
                end: "10:20",
            },
            {
                name: "Geography",
                start: "10:30",
                end: "11:10",
            },
            {
                name: "Geography",
                start: "11:20",
                end: "12:00",
            },
            {
                name: "Art Class",
                start: "12:20",
                end: "13:00",
            },
        ]
    },
    {
        id: "3", // Wednesday
        subjects: [
            {
                name: "Biology",
                start: "8:00",
                end: "8:40",
            },
            {
                name: "Chemistry",
                start: "8:50",
                end: "9:30",
            },
            {
                name: "Philosophy",
                start: "9:40",
                end: "10:20",
            },
            {
                name: "History",
                start: "10:30",
                end: "11:10",
            },
            {
                name: "Computer Work",
                start: "11:20",
                end: "12:00",
            },
            {
                name: "Economics",
                start: "12:20",
                end: "13:00",
            },
            {
                name: "German",
                start: "13:10",
                end: "13:50",
            },
            {
                name: "German",
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
                name: "Philosophy",
                start: "8:50",
                end: "9:30",
            },
            {
                name: "Biology",
                start: "9:40",
                end: "10:20",
            },
            {
                name: "History",
                start: "10:30",
                end: "11:10",
            },
            {
                name: "Math",
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
                name: "Chemistry",
                start: "8:00",
                end: "8:40",
            },
            {
                name: "Geography",
                start: "8:50",
                end: "9:30",
            },
            {
                name: "Physics",
                start: "9:40",
                end: "10:20",
            },
            {
                name: "Math",
                start: "10:30",
                end: "11:10",
            },
            {
                name: "History",
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

type Contact = {
    role: string; // teacher / student
    name: string;
    contactInfo: string;
}







export default function SavedScreen() {
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
                                name: "NEW SUBJECT", // get input from the user ,  this is temporary
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



    return (
        <SafeAreaProvider>
            <SafeAreaView style={PageStyle}>
                <ProfileSection />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style = {{paddingHorizontal: 16}}
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