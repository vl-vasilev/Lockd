import Typography from "@/constants/Typography";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileCard() {
    return (
        <SafeAreaView style={styles.card}>
            <View style={styles.profileContainer}>
                <Image source={require('../assets/images/avatar.png')} style={styles.avatar} />
                <View style={styles.cardTextContainer}>
                    <Text style={Typography.secondary14}> Good Morning </Text>
                    <Text style={Typography.heading18}> Vlado </Text>
                </View>
            </View>

            <View style={styles.coinsContainer}>
                <Image source={require('../assets/images/coin.png')} style={styles.coin} />
                <Text style = {Typography.default16}> 100 </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        // backgroundColor: '#bf878cff',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    profileContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        width: 55,
        height: 60,
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
    das: {
        
    }
})