import { StyleSheet } from "react-native";
import { Font, Color } from "./../../utils/variable";

const styles = StyleSheet.create({
    toggleswitch: {
        width: "18%",
        paddingLeft: 15,
        textAlign: "right",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    toggleFalseBack: {
        position: "relative",
        width: 40,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Color.BACK_BLACK,
    },
    falseIndicator: {
        position: "absolute",
        left: 1,
        top: 1,
        width: 16,
        height: 16,
        borderRadius: 16,
        backgroundColor: Color.BACK_BLACK,
    },
    toggleTrueBack: {
        position: "relative",
        width: 40,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: "center",
        borderColor: Color.BACK_DARKYELLOW,
    },
    trueIndicator: {
        position: "absolute",
        left: 21,
        top: 1,
        width: 16,
        height: 16,
        borderRadius: 16,
        backgroundColor: Color.BACK_DARKYELLOW,
    },
    falseLabel: {
        fontSize: Font.FONTSIZE_12,
        fontFamily: Font.MYRIAD_REGULAR,
        color: Color.TXT_BLACK,
        marginTop: 5,
        textAlign: "right",
    },
    trueLabel: {
        fontSize: Font.FONTSIZE_12,
        fontFamily: Font.MYRIAD_REGULAR,
        color: Color.TXT_DARKYELLOW,
        marginTop: 5,
        textAlign: "right",
    },
});

export default styles;
