import AddSheet from "@/components/AddSheet";
import Fab from "@/components/Fab";
import Separator from "@/components/Separator";
import Colors from "@/constants/Colors";
import PageStyle from "@/constants/PageStyle";
import Typography from "@/constants/Typography";
import { useGlobalContext } from "@/context/GlobalProvider.js";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Octicons from "@react-native-vector-icons/octicons";
import { useRef } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Account from "../../components/auth/account";
import { logOut } from "../../lib/appwrite.js";





export default function ProfileScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentPress = () => bottomSheetRef.current?.present();
  const { user, setUser, setIsLogged, loading } = useGlobalContext();

  async function handleLogout() {
        await logOut();

        // Clear global context
        setUser(null);
        setIsLogged(false);


    }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[PageStyle, { position: 'relative', alignItems: "center" }]}>
        <Fab openSheet={handlePresentPress} />
        <AddSheet ref={bottomSheetRef} />
        {user ?
          (<ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center" }}
          >

            <View style={styles.profileBackground}>
              <Image source={require('../../assets/images/avatar.png')} style={styles.profilePicture} />
            </View>
            <View style={styles.profileIcons}>
              <TouchableOpacity>
                <Octicons name="briefcase" size={24} color={"black"} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Octicons name="light-bulb" size={24} color={"black"} />
              </TouchableOpacity>
            </View>
            <Text style={[Typography.heading20, { textAlign: "center" }]}>
              {user ? user.name : "Guest"}
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
                  <Octicons name={"clock-fill"} size={16} color={"black"} />
                  <Text style={Typography.heading20}>12h</Text>
                </View>
                <Text style={Typography.secondary14}>Focus time</Text>
              </View>

              <Separator vertical={true} />

              <View style={styles.stat}>
                <View style={styles.statTop}>
                  <Octicons name={"chevron-up"} size={16} color={"green"} />
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

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log("button pressed")}
              >
                <Octicons name="bell" size={24} color="black" />
                <Text style={Typography.default16}>Notifications</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log("button pressed")}
              >
                <Octicons name="gear" size={24} color="black" />
                <Text style={Typography.default16}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log("button pressed")}
              >
                <Octicons name="tools" size={24} color="black" />
                <Text style={Typography.default16}>Customization</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log("button pressed")}
              >
                <Octicons name="mortar-board" size={24} color="black" />
                <Text style={Typography.default16}>Achievements</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{ marginTop: 32, }}
              onPress={handleLogout}
            >
              <Text style={[Typography.secondary14, { color: "red", paddingHorizontal: 16, paddingVertical: 8, backgroundColor: "#f8d0d0ff", borderRadius: 8 }]}>
                logout
              </Text>
            </TouchableOpacity>

          </ScrollView>
          ) : (
            <Account />
            // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            //   <Text style={Typography.heading20}>Please log in to view your profile.</Text>
            // </View>
          )}
      </SafeAreaView >
    </SafeAreaProvider>
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
    width: 18,
    height: 18,
  },
  refferal: {
    backgroundColor: Colors.primary500,
    width: "90%",
    marginVertical: 32,
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
  },
  buttonsContainer: {
    width: "90%",
    flexDirection: "column",
    gap: 16,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#f6f6f6ff",
    alignItems: "center",
    padding: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 12,
  }
});