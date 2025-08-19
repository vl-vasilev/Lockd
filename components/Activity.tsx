import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface ActivityProps {
    title: string;
    date: string;
    points: number;
}

export default function Activity({ title, date, points }: ActivityProps) {   
    const [isChecked, setIsChecked] = useState(false);
    return (
        <View style={styles.activityContainer}>
            <BouncyCheckbox
                size={24}
                fillColor={Colors.primary}
                disableText={true}  
            />
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={Typography.heading16}> {title} </Text>
                    <Text style={Typography.secondary14}> {date} </Text>
                </View>
                <View style={styles.pointsAndMoreContainer}>
                    <View style={styles.currencyContainer}>
                        <Text style={Typography.secondary14}>+{points}</Text>
                        <Image source={require('../assets/images/coin.png')} style={styles.coin} /> 
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    activityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    contentContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: 8,

    },
    textContainer: {
        flexDirection: "column",
        flex: 1,
    },
    pointsAndMoreContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    currencyContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
    },
    coin: {
        width: 16,
        height: 16,
    },
})


