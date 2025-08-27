import { Platform } from "react-native";
import { Client, TablesDB } from "react-native-appwrite";

const config = {
    projectId: "68adb9930001d16efb97",
    projectName: "Lockd",
    endpoint: "https://fra.cloud.appwrite.io/v1", // you need to hide all of these
    db: "68adbd1e001019f4610f",
    col: {
        tasks: "68adbd2700335e3dd2cd",
        tests: "tests"
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

export { client, config, tables };

