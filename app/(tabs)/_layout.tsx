import Colors from '@/constants/Colors';
import { Octicons } from '@react-native-vector-icons/octicons';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary500,
      tabBarStyle: {
        elevation: 0,
        borderTopWidth: 1,
        paddingTop: 4,
      },
      headerShown: false,
    }}>
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({ color, focused }) => {
          return focused ? (
            <Octicons name="calendar" size={24} color={color} />
          ) : (
            <Octicons name="calendar" size={24} color={color} />
          )
        },
      }} />

      <Tabs.Screen name="timetable" options={{
        title: "Timetable",
        tabBarIcon: ({ color, focused }) => {
          return focused ? (
            <Octicons name="bookmark-filled" size={24} color={color} />
          ) : (
            <Octicons name="bookmark" size={24} color={color} />
          )
        },
      }} />

      <Tabs.Screen name="tasks" options={{
        title: "Tasks",
        tabBarIcon: ({color}) => <Octicons name = "tasklist" size = {24} color={color}/>
      }} />

      <Tabs.Screen name="notes" options={{
        title: "Notes",
        tabBarIcon: ({color}) => <Octicons name = "paperclip" size = {24} color={color}/>
      }} />

      <Tabs.Screen name="profile" options={{
        title: "Profile",
        tabBarIcon: ({ color, focused }) => {
          return focused ? (
            <Octicons name="person-fill" size={24} color={color} />
          ) : (
            <Octicons name="person" size={24} color={color} />
          )
        },
      }} />
    </Tabs>
  );
}
