import Card from "@/components/Card";
import Contact from "@/components/Contact";
import DayCard from "@/components/DayCard";
import ProfileSection from "@/components/ProfileSection";
import Separator from "@/components/Separator";
import Subject from "@/components/Subject";
import Colors from "@/constants/Colors";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import Octicons from "@react-native-vector-icons/octicons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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




export default function SavedScreen() {
    const [selectedDayId, setSelectedDayId] = useState<string>("1");
    const [subjectData, setSubjectData] = useState<SubjectData[]>(INITIALSUBJECTDATA);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedContactCategory, setSelectedContactCategory] = useState<string>("Students");

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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >

                    <ProfileSection />

                    <View style={styles.aboveCardText}>
                        <Text style={[Typography.heading18]}> Timetable </Text>
                        <TouchableOpacity
                            onPress={addClass}
                        >
                            <Text style={[Typography.cardSpecificText]}> + Add Class </Text>
                        </TouchableOpacity>
                    </View>
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
                                        <Text style={[Typography.heading18, styles.dateText]}> {item.date} </Text>
                                        <Text style={[Typography.secondary14, styles.dayText]}> {item.day} </Text>
                                    </DayCard>
                                );
                            })}
                        </View>

                        <Card style={styles.allSubjects}> 
                            {subjectsToRender.map((item, index) => {
                                return (
                                    <Subject
                                        key={`${selectedDayId}-${index}`}
                                        name={item.name}
                                        start={item.start}
                                        end={item.end}
                                    />
                                )

                            })}
                        </Card>
                    </View>

                    <View style={styles.aboveCardText}>
                        <Text style={[Typography.heading18]}> Contacts </Text>
                        <TouchableOpacity
                        >
                            <Text style={[Typography.cardSpecificText]}> + Add Contact </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchContainer}> 
                        <Octicons name = "search" size={16} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search contacts..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    <View style={styles.contactsCategoriesContainer}>
                        <TouchableOpacity
                            onPress={() => setSelectedContactCategory("Students")}
                            style={styles.contactCategory}
                        >
                            <Card
                                isSelected={selectedContactCategory === "Students"}
                            >
                                <Text style = {{textAlign: "center"}}> Students </Text>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSelectedContactCategory("Teachers")}
                            style={styles.contactCategory}
                        >
                            <Card
                                isSelected={selectedContactCategory === "Teachers"}
                            >
                                <Text style = {{textAlign: "center"}}> Teachers </Text>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSelectedContactCategory("Favorites")}
                            style={styles.contactCategory}
                        >
                            <Card
                                isSelected={selectedContactCategory === "Favorites"}
                            >
                                <Text style = {{textAlign: "center"}}> Favorites </Text>
                            </Card>
                        </TouchableOpacity>
                    </View>
                    <Card style={styles.contactsContainer}>
                        <Contact name = "Vlado" formOfContact="dsda@gmail.com"/>
                        <Separator />
                        <Contact name = "Vlado" formOfContact="dsda@gmail.com"/>
                        <Separator />
                        <Contact name = "Vlado" formOfContact="dsda@gmail.com"/>
                        <Separator />
                        <Contact name = "Vlado" formOfContact="dsda@gmail.com"/>
                        <Separator />
                        <Contact name = "Vlado" formOfContact="dsda@gmail.com"/>
                    </Card>
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
        gap: 4,
    },

    searchContainer: {
        backgroundColor: Colors.cardBackgroundColor,
        borderColor: Colors.cardStrokeColor,
        borderWidth: 1,
        borderRadius: 12,

        paddingHorizontal: 12,
        paddingVertical: 0,
        flexDirection: "row",
        // justifyContent: "space-between",
        gap: 8,
        alignItems: "center",
    },
    searchInput: {
        color: "black",
        paddingHorizontal: 4,
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