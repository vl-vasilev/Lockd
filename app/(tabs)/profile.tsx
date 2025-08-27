import AddSheet from "@/components/AddSheet";
import Fab from "@/components/Fab";
import Separator from "@/components/Separator";
import Colors from "@/constants/Colors";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Octicons from "@react-native-vector-icons/octicons";
import { useRef } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




export default function ProfileScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentPress = () => bottomSheetRef.current?.present();

  return (
    <SafeAreaView style={[PageStyle, { position: 'relative', alignItems: "center" }]}>
      <Fab openSheet={handlePresentPress} />
      <AddSheet ref={bottomSheetRef} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle = {{alignItems: "center"}}
      >

        <View style={styles.profileBackground}>
          <Image source={require('../../assets/images/avatar.png')} style={styles.profilePicture} />
        </View>
        <View style={styles.profileIcons}>
          <TouchableOpacity>
            <Octicons name="briefcase" size={24} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Octicons name={"light-bulb"} size={24} color={"black"} />
          </TouchableOpacity>
        </View>
        <Text style={[Typography.heading20, { textAlign: "center" }]}>
          Vlado
        </Text>
        <View style={styles.levelContainer}>
          <View style={styles.levelsText}>
            <Text style={Typography.secondary14}>Lvl 4</Text>
            <Text style={Typography.secondary14}>432 / 500 xp</Text>
          </View>
          <View style={styles.levelBar}></View>
        </View>
        <View style={styles.profileStats}>
          <View style={styles.stat}>
            <View style={styles.statTop}>
              <Image source={require('../../assets/images/coin.png')} style={styles.statCoin} />
              <Text style={Typography.heading20}>100</Text>
            </View>
            <Text style={Typography.secondary14}>Coins</Text>
          </View>

          <Separator vertical={true} />

          <View style={styles.stat}>
            <View style={styles.statTop}>
              <Octicons name={"clock-fill"} size={24} color={"black"} />
              <Text style={Typography.heading20}>12h</Text>
            </View>
            <Text style={Typography.secondary14}>Focus time</Text>
          </View>

          <Separator vertical={true} />

          <View style={styles.stat}>
            <View style={styles.statTop}>
              <Octicons name={"chevron-up"} size={24} color={"green"} />
              <Text style={Typography.heading20}>4th</Text>
            </View>
            <Text style={Typography.secondary14}>Ranking</Text>
          </View>
        </View>

        <View style={styles.refferal}>
          <Text style={[Typography.heading18, Typography.selectedText]}>Invite a friend!</Text>
          <View style={styles.refferalReward}>
            <Image source={require('../../assets/images/coin.png')} style={styles.refferalCoin} />
            <Text>50 / friend</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  profileBackground: {
    backgroundColor: Colors.primary500,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 120,
    width: "100%"
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: Colors.screenBackgroundColor,
    borderWidth: 5,
  },
  profileIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    width: "100%"
  },
  levelContainer: {
    flexDirection: "column",
    marginTop: 8,
  },
  levelsText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  levelBar: {
    backgroundColor: Colors.primary500,
    height: 10,
    width: 200,
    borderRadius: 6,
  },
  profileStats: {
    flexDirection: "row",
    marginTop: 16,
    gap: 8,
  },
  stat: {
    flexDirection: "column",
    alignItems: "center",
  },
  statTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statCoin: {
    width: 28,
    height: 28,
  },
  refferal: {
    backgroundColor: Colors.primary500,
    width: "90%",
    marginTop: 32,
    padding: 16,
    borderRadius: 16,
  },
  refferalReward: {
    backgroundColor: "#fff",
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start"
  },
  refferalCoin: {
    width: 16,
    height: 16,
  }
});