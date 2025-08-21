import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfileCard() {


    return (
        <Link href = "/profile" asChild>
            <Pressable>
                <View style={styles.card}>
                    <View style={styles.profileContainer}>
                        <Image source={require('../assets/images/avatar.png')} style={styles.avatar} />
                        <View style={styles.cardTextContainer}>
                            <Text style={[Typography.secondary14, Typography.selectedText]}> Good Morning </Text>
                            <Text style={[Typography.heading20, Typography.selectedText]}> Vlado </Text>
                        </View>
                    </View>

                    <View style={styles.coinsContainer}>
                        <Text style={[Typography.heading16, Typography.selectedText]}> 100 </Text>
                        <Image source={require('../assets/images/coin.png')} style={styles.coin} />
                    </View>
                </View>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.primary,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        marginBottom: 8,
    },

    profileContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 32,
    },
    cardTextContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    coinsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    coin: {
        width: 20,
        height: 20,
    },
})