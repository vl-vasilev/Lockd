import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { checkUser, createUser, logIntoAccount, logOut } from "../../../lib/appwrite.js";


export default function Account() {
    const [signUp, setSignUp] = useState<boolean>(true);

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [username, setUsername] = useState<string>("")

    const [user, setUser] = useState<any>(null);


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
                    onPress={signUp ?
                        () => createUser(email, password, username) :
                        () => logIntoAccount(email, password)}
                >
                    <Text style={Typography.selectedText}>
                        {signUp ? "Create Account" : "Log Into Account"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={async () => {
                        const currentUser = await checkUser();
                        setUser(currentUser);   
                    }}
                >
                    <Text>
                        Check
                    </Text>
                    {user &&
                        <Text>
                            Username: {user.name}
                        </Text>}
                </TouchableOpacity>

                <TouchableOpacity
                    style = {{marginTop: 32,}}
                    onPress={logOut}
                >
                    <Text style = {[Typography.secondary14, {color: "red"}]}>
                        logout
                    </Text>
                </TouchableOpacity>
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
        width: "80%",
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
})