import { colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        color: "#FFFF",
        padding: 12,
        flex: 1
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 8,
    },
    titleContainer: {
        width: "90%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    searchInputContainer: {
        padding: 20,
        backgroundColor: colors.gray[400],
    },
    searchInput: {
        width: "100%",
        borderWidth: .2,
        borderRadius: 12,
        padding: 12,
        borderColor: colors.blue[900]
    }

});