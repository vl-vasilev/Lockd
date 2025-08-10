import Colors from "./Colors";

const Typography = {
    heading18: {
        fontSize: 18,
        fontWeight: "bold" as "bold",
        color: "hsl(0, 0%, 0%)",
    },
    heading16: {
        fontSize: 16,
        fontWeight: "bold" as "bold",
        color: "hsl(0, 0%, 0%)",
    },
    default16: {
        fontSize: 16,
        fontWeight: "normal" as "normal",
        color: "hsl(0, 0%, 0%)"
    },
    secondary16: {
        fontSize: 16,
        fontWeight: "normal" as "normal",
        color: "hsl(0, 0%, 30%)"
    },
    secondary14: {
        fontSize: 14,
        fontWeight: "normal" as "normal",
        color: "hsl(0, 0%, 30%)"
    },
    cardSpecificText: {
        fontSize: 16,
        fontWeight: "normal" as "normal",
        color: Colors.primary
    },
};

export default Typography;