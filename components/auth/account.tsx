import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { useGlobalContext } from "@/context/GlobalProvider.js";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { checkUser, createUser, logIntoAccount, logOut } from "../../lib/appwrite.js";


export default function Account() {

    const [signUp, setSignUp] = useState<boolean>(true);

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [username, setUsername] = useState<string>("")

    const { user, setUser, setIsLogged, loading } = useGlobalContext();

    function setUserFieds(userNumber: number) {
        if (userNumber === 1) {
            setUsername("vlado1");
            setEmail("test1@gmail.com");
            setPassword("test123456");
        } else if (userNumber === 2) {
            setUsername("vlado2");
            setEmail("test2@gmail.com");
            setPassword("test123456");
        } else { console.log("invalid user number") }
    }

    async function handleAuth() {
        // Login or create account
        if (signUp) {
            await createUser(email, password, username);
        } else {
            await logIntoAccount(email, password);
        }

        // Update global context
        const currentUser = await checkUser();
        setUser(currentUser);
        setIsLogged(true);
    }

    async function handleLogout() {
        await logOut();

        // Clear global context
        setUser(null);
        setIsLogged(false);

        clearInputFields();

    }

    function clearInputFields() {
        setUsername("");
        setEmail("");
        setPassword("");
    }


    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity
                    style={{ marginVertical: 16 }}
                    onPress={() => setSignUp(!signUp)}
                >
                    <Text
                        style={Typography.heading20}
                    >
                        {signUp ? " Sign Up" : " Log In"}
                    </Text>
                </TouchableOpacity>
                <TextInput
                    placeholder="enter username"
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    placeholder="enter email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="enter password"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAuth}
                >
                    <Text style={Typography.selectedText}>
                        {signUp ? "Create Account" : "Log Into Account"}
                    </Text>
                </TouchableOpacity>
                <View>
                    {user ? (
                        <Text>
                            Username: {user.name}
                        </Text>) : (
                        <Text>
                            Not logged in
                        </Text>
                    )}
                </View>
                <View style={styles.filluserFieldsButtonsContainer}>
                    <TouchableOpacity
                        onPress={() => setUserFieds(1)}
                        style={styles.fillUserFieldsButton}
                    >
                        <Text>
                            Fill User 1
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setUserFieds(2)}
                        style={styles.fillUserFieldsButton}
                    >
                        <Text>
                            Fill User 2
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* <TouchableOpacity
                    style={{ marginTop: 32, }}
                    onPress={handleLogout}
                >
                    <Text style={[Typography.secondary14, { color: "red" }]}>
                        logout
                    </Text>
                </TouchableOpacity> */}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: Colors.cardBackgroundColor,
        width: 300,
        borderRadius: 8,
        borderWidth: 1,
    },
    addButton: {
        backgroundColor: Colors.primary500,
        width: "80%",
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 32,
        marginTop: 16,
    },
    fillUserFieldsButton: {
        backgroundColor: Colors.primary300,
        padding: 8,
        justifyContent: "center",
        borderRadius: 16,
    },
    filluserFieldsButtonsContainer: {
        flexDirection: "row",
        gap: 16,
        marginTop: 16,
    }
})