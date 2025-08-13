import Card from "@/components/Card";
import ProfileSection from "@/components/ProfileSection";
import Colors from "@/constants/Colors";
import PageStyle from "@/constants/PageStyle";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

const SUBJECTDOTCOLORS = {
  biology: '#61ad67ff',
  physics: '#454b8dff',
  math: '#ba5959ff',
}


type MarkedDatesType = {
  [date: string]: {
    dots?: { name: string; color: string }[];
    selected?: boolean;
    selectedColor?: string;
    selectedTextColor?: string;
  };
};

export default function Index() {
  

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState<string>(today);


  const [markedDates, setMarkedDates] = useState<MarkedDatesType>({
    '2025-08-09': {
      dots: [
        { name: 'Biology', color: SUBJECTDOTCOLORS.biology },
        { name: 'Physics', color: SUBJECTDOTCOLORS.physics },
      ]
    },
    '2025-08-10': {
      dots: [{ name: 'Math', color: SUBJECTDOTCOLORS.math }],
    },
  });

  function addDot(date: string, subject: string) {
    const name = subject.toLowerCase() as keyof typeof SUBJECTDOTCOLORS;
    const color = SUBJECTDOTCOLORS[name];
    if (!color) {
      console.warn(`No color defined for subject: ${subject}`);
      return;
    }
    if ((markedDates[date]?.dots?.length ?? 0) >= 3) {
      console.warn(`Cannot add more than 3 dots for date: ${date}`);
      return;
    }

    setMarkedDates((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        dots: [
          ...(prev[date]?.dots || []),
          { name: subject, color: color },
        ]
      },
    }))

  }

  const finalMarkedDates = {
    ...markedDates,
    ...(selectedDate && {
      [selectedDate]: {
        ...markedDates[selectedDate], // Preserve existing dots and other properties
        selected: true,
        selectedColor: Colors.backgroundPrimary,
        selectedTextColor: '#ffffff',
      }
    })
  };

  const dotNames = finalMarkedDates[selectedDate]?.dots?.map(dot => dot.name) || [];


  return (
    <SafeAreaView style={PageStyle}>
      <ProfileSection />
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={finalMarkedDates}
        markingType="multi-dot"

        style={styles.calendar}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          todayTextColor: '#00adf5',
          dayTextColor: '#000000ff',
          textMonthFontSize: 24,
          textMonthFontWeight: 600,
          monthTextColor: '#000000ff',
          selectedDayBackgroundColor: Colors.backgroundPrimary,
          selectedDayTextColor: '#ffffff',
          dotStyle: {
            width: 6,
            height: 6,
            borderRadius: 3,
          },
        }}
      />
      <View style={styles.legend}>
      </View>

      <Card>
        <Text>  
          {dotNames.length > 0
            ? dotNames.join(', ') + ` on ${selectedDate}`
            : `No dots on ${selectedDate}`}
        </Text>
      </Card>

      <TouchableOpacity
        onPress={() => {
          addDot('2025-08-13', 'Biology');
        }}
        style={{ padding: 16, backgroundColor: Colors.primary, borderRadius: 8, marginTop: 16 }}
      >
        <Text>
          Add Biology Dot on 2025-08-13
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 12,
    width: '100%',
  },
  legend: {
    marginTop: 8,
    backgroundColor: "#b38989ff",
  }
})


