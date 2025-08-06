import { Stack } from "expo-router";

export default function RootLayout() { // for ui elements on all screens
  return (
    <Stack>
      <Stack.Screen name = "(tabs)" options={{
        headerShown: false,
      }}/>
    </Stack>
  );
}
