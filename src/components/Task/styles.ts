import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        padding: 14,
        flex: 1,
        borderColor: colors.blue[800],
        borderWidth: .3,
        borderRadius: 13,

    },
    detailsbox: {
        gap: 16,
    },
    checkbutton: {
        flex: 1,
        width: 60,
        height: 60,
    },
    tasktitle: {
        color: colors.orange[500],
        fontWeight: "bold",
        fontSize: 24
    }
})