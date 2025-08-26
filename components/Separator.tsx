import { View } from "react-native";

interface SeparatorProps {
    vertical?: boolean;
}

export default function Separator({ vertical }: SeparatorProps) {
    return vertical ? (
        <View
            style={{
                width: 1,
                height: "100%",
                backgroundColor: "#ddd",
                marginHorizontal: 8,
            }}
        />
    ) : (
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#ddd",
                marginVertical: 8,
            }}
        />
    );
}