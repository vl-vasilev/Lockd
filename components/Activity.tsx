import Colors from "@/constants/Colors";
import subjectColors from "@/constants/subjectColors";
import Typography from "@/constants/Typography";
import Octicons from "@react-native-vector-icons/octicons";
import { Image, StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";


interface ActivityProps {
    id: number;
    date: string;
    body: string;
    coins: number;
    completed: boolean;
    toggleCompleted: (id: number) => void;
    subject: string;
}


function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    function getOrdinalSuffix(day: string): string {
        const dayNum = parseInt(day);
        if (dayNum >= 11 && dayNum <= 13) {
            return 'th';
        }
        switch (dayNum % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
    
    const dayNum = parseInt(day);
    const monthName = months[parseInt(month) - 1];
    const suffix = getOrdinalSuffix(day);
    
    return `${dayNum}${suffix} ${monthName}`;
}

export default function Activity({ id, date, coins, body, completed, toggleCompleted, subject }: ActivityProps) {
    
    return (
        <View style={[
            styles.activityContainer,
            completed && { opacity: 0.5 },
            { borderRightColor: subjectColors[subject.toLowerCase()] || Colors.primary500 },
        ]}>
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <View style={styles.mainTextContainer}>
                        <Text style={Typography.heading16}>{subject.charAt(0).toUpperCase() + subject.slice(1)}</Text>
                        <View style={styles.dateContainer}>
                            <Octicons name="calendar" size={16} color={"gray"} />
                            <Text style={Typography.default16}> {formatDate(date)}</Text>
                        </View>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={Typography.secondary14}>
                            {body}
                        </Text>
                    </View>
                </View>

                {!completed &&
                    <View style={styles.pointsAndMoreContainer}>
                        <View style={styles.currencyContainer}>
                            <Image source={require('../assets/images/coin.png')} style={styles.coin} />
                            <Text style={styles.coinText}>{coins}</Text>
                        </View>
                        <View style={styles.xpContainer}>
                            <Text style={{ fontSize: 12, fontWeight: "normal", color: "hsl(0, 0%, 60%)" }}>+10XP</Text>
                        </View>
                    </View>
                }
            </View>

            <BouncyCheckbox
                size={24}
                fillColor={subjectColors[subject.toLowerCase()] || Colors.primary500}
                disableText={true}
                onPress={() => toggleCompleted(id)}
                isChecked={completed}
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


