import AddSheet from "@/components/AddSheet";
import Card from "@/components/Card";
import Fab from "@/components/Fab";
import ProfileSection from "@/components/ProfileSection";
import Colors from "@/constants/Colors";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en', { month: 'short' });
  return `${day} ${month}`;
};

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
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentPress = () => bottomSheetRef.current?.present();

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState<string>(today);


  const [markedDates, setMarkedDates] = useState<MarkedDatesType>({
    '2025-08-09': {
      dots: [
        { name: 'Biology', color: SUBJECTDOTCOLORS.biology, },
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
        ...markedDates[selectedDate],
        selected: true,
        selectedColor: Colors.primary500,
        selectedTextColor: '#ffffff',
      }
    })
  };

  const dotNames = finalMarkedDates[selectedDate]?.dots?.map(dot => dot.name) || [];


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
            showSixWeeks = {false}

            style={styles.calendar}
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
                width: 6,
                height: 6,
                borderRadius: 3,
              },
            }}
          />

          <Text style={[Typography.heading16, { textAlign: 'center' }]}>
            {new Date(selectedDate).toLocaleDateString('en', { weekday: 'short' })}, {formatDate(selectedDate)}
          </Text>
          <Text>
            {dotNames.length > 0
              ? dotNames.join(', ') + ` on ${selectedDate}`
              : `No dots on ${selectedDate}`}
          </Text>
        </Card>

        <TouchableOpacity
          onPress={() => {
            addDot(selectedDate, 'Biology');
          }}
          style={{ padding: 16, backgroundColor: Colors.primary500, borderRadius: 8, marginTop: 16 }}
        >
          <Text>
            Add Biology Dot on {selectedDate}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  calendar: {
    width: '100%',
  },
})


