import Card from "@/components/Card";
import ProfileSection from "@/components/ProfileSection";
import Colors from "@/constants/Colors";
import PageStyle from "@/constants/PageStyle";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Index() {

  const [markedDates, setMarkedDates] = useState({
    '2025-08-09': {
      dots: [
        { key: 'vacation', color: '#bd6f6fff' },
        { key: 'massage', color: '#8d458dff' }
      ]
    },
    '2025-08-10': {
      dots: [{ key: 'workout', color: '#434c7dff' }]
    },
    '2025-08-13': {
      dots: [
        { key: 'meeting', color: "#979656ff" },
        { key: 'deadline', color: '#6db170ff' }
      ]
    }
  });


  return (
    <SafeAreaView style={PageStyle}>
      <ProfileSection />
      <Card>
        <Calendar
          markedDates={markedDates}
          markingType="multi-dot"

          // style={styles.calendar}
          theme={{
            textSectionTitleColor: '#b6c1cd',
            todayTextColor: '#ffffffff',
            todayBackgroundColor: Colors.backgroundPrimary,
            dayTextColor: '#000000ff',
            textMonthFontSize: 24,
            textMonthFontWeight: 600,
            monthTextColor: '#000000ff',
            dotStyle: {
              width: 6,
              height: 6,
              borderRadius: 3,
            }
          }}
        />
        <View style={styles.legend}>
          <Text>
            This is going to be the legend where all of the subjects will show up along with their respective color
          </Text>
        </View>
      </Card>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  calendar: {
    alignSelf: "stretch",
    backgroundColor: Colors.cardBackgroundColor,
    borderColor: Colors.cardStrokeColor,
    borderWidth: 1,
    borderRadius: 12,
  },
  legend: {
    marginTop: 8,
    backgroundColor: "#b38989ff",
  }
})


