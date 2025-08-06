import Foundation from '@expo/vector-icons/Foundation';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "coral",
    }}>
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({ color, focused }) => {
          return focused ? (
            <Foundation name="home" size={28} color={color} />
          ) : (
            <Octicons name="home" size={24} color={color} />
          )
        },
      }} />

      <Tabs.Screen name="saved" options={{
        title: "Saved"
      }} />

      <Tabs.Screen name="tasks" options={{
        title: "Tasks"
      }} />

      <Tabs.Screen name="notes" options={{
        title: "Notes"
      }} />
    </Tabs>
  );
}
