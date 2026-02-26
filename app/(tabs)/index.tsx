import Activity from "@/components/Activity";
import AddSheet from "@/components/AddSheet";
import Card from "@/components/Card";
import Fab from "@/components/Fab";
import ProfileSection from "@/components/ProfileSection";
import Colors from "@/constants/Colors";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import { useGlobalContext } from "@/context/GlobalProvider.js";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { client, config, tables } from "../../lib/appwrite.js";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en', { month: 'short' });
  return `${day} ${month}`;
};

const SUBJECTDOTCOLORS = {
  history: "#f44336",
  english: "#e91e63",
  geography: "#9c27b0",
  music: "#673ab7",
  math: "#3f51b5",
  physics: "#03a9f4",
  biology: "#009688",
  chemistry: "#8bc34a",
  philosophy: "#cddc39",
  computerScience: "#ff9800",
}

type MarkedDatesType = {
  [date: string]: {
    dots?: { name: string; color: string }[];
    selected?: boolean;
    selectedColor?: string;
    selectedTextColor?: string;
  };
};

type Activity = {
  $id: string;
  date: string;
  body: string;
  coins: number;
  completed: boolean;
  subject: string;
}

export default function Index() {
  const { user } = useGlobalContext();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentPress = () => bottomSheetRef.current?.present();

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>({});
  const [tasks, setTasks] = useState<Array<Activity>>([]);
  const [tests, setTests] = useState<Array<Activity>>([]);

  useEffect(() => {
    console.log("useEffect in calendar running, user:", user?.name); // дебъгване
    init();

    // връзка с базата данни
    const unsubscribe = client.subscribe([
      `databases.${config.db}.tables.${config.col.tasks}.rows`,
      `databases.${config.db}.tables.${config.col.tests}.rows`,
    ], (response) => {
      if (response.events[0].includes(config.col.tasks)) {
        if (response.events[0].includes("create")) {
          setTasks(prevTasks => [
            response.payload as Activity,
            ...prevTasks
          ])
        } else if (response.events[0].includes("update")) {
          setTasks(prevTasks => prevTasks.map(task =>
            task.$id === (response.payload as Activity).$id ? (response.payload as Activity) : task
          ))
        }
      }
      else if (response.events[0].includes(config.col.tests)) {
        if (response.events[0].includes("create")) {
          setTests(prevTests => [
            response.payload as Activity,
            ...prevTests
          ])
        } else if (response.events[0].includes("update")) {
          setTests(prevTests => prevTests.map(test =>
            test.$id === (response.payload as Activity).$id ? (response.payload as Activity) : test
          ))
        }
      }
    });

    return () => {
      unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    updateMarkedDates();
  }, [tasks, tests]);

  async function init() {
    await getData();
  }

  async function getData() {
    try {
      const DBtasks = await tables.listRows(config.db, config.col.tasks);
      const DBtests = await tables.listRows(config.db, config.col.tests);
      setTasks(DBtasks.rows as unknown as Activity[]);
      setTests(DBtests.rows as unknown as Activity[]);
    } catch (err) {
      console.error("error getting data in calendar: " + err);
    }
  }



  function toggleCompletedTask(item: Activity) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.$id === item.$id ? { ...task, completed: !task.completed } : task
      )
    );

    tables.updateRow(
      config.db,
      config.col.tasks,
      item.$id,
      { completed: !item.completed },
    ).then(function (response) {
    }, function (error) {
      console.log(error)
    })
  };

  function toggleCompletedTest(item: Activity) {
    setTests(prevTests =>
      prevTests.map(test =>
        test.$id === item.$id ? { ...test, completed: !test.completed } : test
      )
    );
    tables.updateRow(
      config.db,
      config.col.tests,
      item.$id,
      { completed: !item.completed },
    ).then(function (response) {
    }, function (error) {
      console.log(error)
    })
  }

  function updateMarkedDates() {
    const newMarkedDates: MarkedDatesType = {};

    tasks.forEach((task) => {
      const date = task.date;
      const subject = task.subject.toLowerCase() as keyof typeof SUBJECTDOTCOLORS;
      const color = SUBJECTDOTCOLORS[subject] || '#999999';

      if (!newMarkedDates[date]) {
        newMarkedDates[date] = { dots: [] };
      }

      if ((newMarkedDates[date].dots?.length ?? 0) < 3) {
        const existingDot = newMarkedDates[date].dots?.find(dot =>
          dot.name.toLowerCase() === task.subject.toLowerCase() && dot.color === color
        );

        if (!existingDot) {
          newMarkedDates[date].dots?.push({
            name: task.subject,
            color: color,
          });
        }
      }
    });

    tests.forEach((test) => {
      const date = test.date;
      const subject = test.subject.toLowerCase() as keyof typeof SUBJECTDOTCOLORS;
      const color = SUBJECTDOTCOLORS[subject] || '#999999';

      if (!newMarkedDates[date]) {
        newMarkedDates[date] = { dots: [] };
      }

      if ((newMarkedDates[date].dots?.length ?? 0) < 3) {
        const existingDot = newMarkedDates[date].dots?.find(dot =>
          dot.name.toLowerCase() === test.subject.toLowerCase() && dot.color === color
        );

        if (!existingDot) {
          newMarkedDates[date].dots?.push({
            name: test.subject,
            color: color,
          });
        }
      }
    });

    setMarkedDates(newMarkedDates);
  }

  const finalMarkedDates = {
    ...markedDates,
    ...(selectedDate && {
      [selectedDate]: {
        ...markedDates[selectedDate],
        selected: true,
        selectedColor: Colors.primary500,
        selectedTextColor: '#ffffff',
      }
    })
  };

  const dotNames = finalMarkedDates[selectedDate]?.dots?.map(dot => dot.name) || [];

  const selectedDateTasks = tasks.filter(task => task.date === selectedDate);
  const selectedDateTests = tests.filter(test => test.date === selectedDate);

  return (
    <SafeAreaView style={[PageStyle, { position: 'relative' }]}>
      <ProfileSection />
      <Fab openSheet={handlePresentPress} />
      <AddSheet ref={bottomSheetRef} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16 }}
      >
        <Card>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            markedDates={finalMarkedDates}
            markingType="multi-dot"
            showSixWeeks={false}

            theme={{
              backgroundColor: Colors.cardBackgroundColor,
              textSectionTitleColor: '#b6c1cd',
              todayTextColor: '#00adf5',
              dayTextColor: '#000000ff',
              textMonthFontSize: 24,
              textMonthFontWeight: 600,
              monthTextColor: '#000000ff',
              selectedDayBackgroundColor: Colors.primary500,
              selectedDayTextColor: '#ffffff',
              dotStyle: {
                width: 8,
                height: 8,
                borderRadius: 4,
                borderColor: "#fff",
                borderWidth: 1,
              },
            }}
          />

          <Text style={[Typography.heading16, { textAlign: 'center', marginTop: 16 }]}>
            {new Date(selectedDate).toLocaleDateString('en', { weekday: 'short' })}, {formatDate(selectedDate)}
          </Text>

          {dotNames.length > 0 && (
            <Text style={{ textAlign: 'center', marginTop: 8, marginBottom: 16 }}>
              Subjects: {dotNames.join(', ')}
            </Text>
          )}

          {selectedDateTasks.length > 0 && (
            <>
              <Text style={[Typography.heading16, { marginTop: 16, marginBottom: 8 }]}>
                Tasks:
              </Text>
              <View style={{ gap: 8 }}>
                {selectedDateTasks.map((task) => (
                  <Activity
                    key={task.$id}
                    id={task.$id as any}
                    date={task.date}
                    body={task.body}
                    coins={task.coins}
                    completed={task.completed}
                    toggleCompleted={() => toggleCompletedTask(task)}
                    subject={task.subject}
                  />
                ))}
              </View>
            </>
          )}

          {selectedDateTests.length > 0 && (
            <>
              <Text style={[Typography.heading16, { marginTop: 16, marginBottom: 8 }]}>
                Tests:
              </Text>
              <View style={{ gap: 8 }}>
                {selectedDateTests.map((test) => (
                  <Activity
                    key={test.$id}
                    id={test.$id as any}
                    date={test.date}
                    body={test.body}
                    coins={test.coins}
                    completed={test.completed}
                    toggleCompleted={() => toggleCompletedTest(test)}
                    subject={test.subject}
                  />
                ))}
              </View>
            </>
          )}

          {selectedDateTasks.length === 0 && selectedDateTests.length === 0 && (
            <Text style={{ textAlign: 'center', marginTop: 8, color: '#999' }}>
              No activities on {selectedDate}
            </Text>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

