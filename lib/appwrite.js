import { Platform } from "react-native";
import { Account, Client, ID, TablesDB } from "react-native-appwrite";

const config = {
    projectId: "68adb9930001d16efb97",
    projectName: "Lockd",
    endpoint: "https://fra.cloud.appwrite.io/v1", // you need to hide all of these
    db: "68adbd1e001019f4610f",
    col: {
        tasks: "68adbd2700335e3dd2cd",
        tests: "tests",
        notes: "notes",
    }
}

const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

switch (Platform.OS) {
    case "android":
        client.setPlatform("dev.vlado.Lockd")
        break;
    // case "ios":
    //     client.setPlatform()
    //     break;
}

const tables = new TablesDB(client);
const account = new Account(client);

async function createUser(email, password, username) {
    try {
        const user = await account.create(
            ID.unique(),
            email,
            password,
            username,
        );
        // console.log(user)
        logIntoAccount(email, password)
        return user;
    } catch (err) {
        console.error("error creating user: " + err)
    }
}

async function logIntoAccount(email, password) {
    try {
        const session = await account.createEmailPasswordSession(
            email,
            password,
        );
        // console.log(session)
    } catch (err) {
        console.error("error logging into acc: " + err)
    }
}

async function checkUser() {
    try {
        const currentUser = await account.get();
        // console.log("function user: " + currentUser.$id)
        return currentUser;
    } catch (err) {
        // console.log("error while checking user: " + err)
        return null;
    }
}

async function logOut() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        // console.log("error while logging out: " + error)
        return null;
    }
}


export { account, checkUser, client, config, createUser, logIntoAccount, logOut, tables };

