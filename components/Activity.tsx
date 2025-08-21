import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import Octicons from "@react-native-vector-icons/octicons";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface ActivityProps {
    title: string;
    date: string;
    details: string;
    points: number;
}

export default function Activity({ title, date, points, details }: ActivityProps) {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    return (
        <View style={[styles.activityContainer, isChecked && { opacity: 0.5 }]}>
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <View style={styles.mainTextContainer}>
                        <Text style={Typography.heading16}>{title}</Text>
                        <View style={styles.dateContainer}>
                            <Octicons name="calendar" size={16} color={"gray"} />
                            <Text style={Typography.default16}> 14 Jul </Text>
                        </View>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={Typography.secondary14}>
                            {details}
                        </Text>
                    </View>
                </View>

                {!isChecked &&
                    <View style={styles.pointsAndMoreContainer}>
                        <View style={styles.currencyContainer}>
                            <Image source={require('../assets/images/coin.png')} style={styles.coin} />
                            <Text style={styles.coinText}>{points}</Text>
                        </View>
                        <View style={styles.xpContainer}>
                            <Text style={{ fontSize: 12, fontWeight: "normal", color: "hsl(0, 0%, 60%)" }}>+10XP</Text>
                        </View>
                    </View>
                }
            </View>

            <BouncyCheckbox
                size={24}
                fillColor={Colors.primary}
                disableText={true}
                onPress={() => setIsChecked(!isChecked)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    activityContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.cardBackgroundColor,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,

        borderRightWidth: 8,
        borderWidth: 1,

        borderRightColor: Colors.primary,
        borderLeftColor: Colors.cardStrokeColor,
        borderTopColor: Colors.cardStrokeColor,
        borderBottomColor: Colors.cardStrokeColor,

        padding: 8,
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
    mainTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
        gap: 16,
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    pointsAndMoreContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginRight: 8,
    },
    detailsContainer: {
        width: 220,
    },
    currencyContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
    },
    coin: {
        width: 16,
        height: 16,
    },
    coinText: {
        ...Typography.secondary14,
        color: "#d19244ff"
    },
    xpContainer: {
        backgroundColor: "#FFFAC7",
        borderRadius: 4,
        padding: 2,
    },
})


