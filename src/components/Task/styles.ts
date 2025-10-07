import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 14,
        borderColor: colors.blue[900],
        borderWidth: 0.5,
        borderRadius: 13,
        backgroundColor: '#fff',
    },
    checkbutton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    detailsbox: {
        flex: 1,
        gap: 16,
        flexShrink: 1,
        minWidth: 0,
    },
    tasktitle: {
        color: colors.cyan,
        fontWeight: 'bold',
        fontSize: 16,
        flexWrap: 'wrap',
    },
    taskdesc: {
        fontSize: 14,
        color: '#333',
        flexWrap: 'wrap',
    },
    scheduledText: {
        marginTop: 4,
        fontSize: 12,
        color: colors.gray[600],
    },
});