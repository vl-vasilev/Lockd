import Typography from "@/constants/Typography";
import Octicons from "@react-native-vector-icons/octicons";
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

interface ContactProps {
    style?: ViewStyle | ViewStyle[];
    name: string;
    contactInfo: string;
}

export default function Contact({ style, name, contactInfo }: ContactProps) {
    return (
        <View style={[styles.contact, style]}>
            <View style={styles.infoContainer}>
                <Text style={Typography.heading16} > {name} </Text>
                <Text style={Typography.secondary14}> {contactInfo} </Text>
            </View>
            <TouchableOpacity>
                <Octicons name="kebab-horizontal" size={16} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    contact: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    infoContainer: {

    }

})