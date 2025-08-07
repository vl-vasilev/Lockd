import Colors from '@/constants/Colors';
import { Octicons } from '@react-native-vector-icons/octicons';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
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
            <Octicons name="home-fill" size={24} color={color} />
          ) : (
            <Octicons name="home" size={24} color={color} />
          )
        },
      }} />

      <Tabs.Screen name="saved" options={{
        title: "Saved",
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
    </Tabs>
  );
}
