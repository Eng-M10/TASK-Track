import { colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    modal: {
        flex: 1,
        justifyContent: "flex-end"
    },
    modalContent: {
        backgroundColor: colors.gray[600],
        borderTopWidth: 1,
        borderTopColor: colors.gray[400],
        paddingBottom: 32,
        padding: 24,
    },
    modalHeader: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 42
    },
    modalCategory: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: colors.gray[400]
    },
    modalLinkName: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.cyan
    },
    modalUrl: {
        fontSize: 14,
        color: colors.gray[400]
    },
    modalFooter: {
        flexDirection: "row",
        marginTop: 32,
        width: "100%",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: colors.gray[600],
        paddingVertical: 14,
    }

});