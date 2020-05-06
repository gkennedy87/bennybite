import { StyleSheet, Dimensions } from "react-native";
import { Color, Font } from "../../utils/variable";
import { isIOS } from "../../utils/theme";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  inputview: {},
  txtfield: {
    borderWidth: 1,
    borderColor: Color.INPUT_BORDER,
    color: Color.TXT_BLACK,
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_REGULAR,
    paddingLeft: 15,
    paddingRight: 15,
    height: 48,
    alignItems: "center",
    borderRadius: 5,
  },
  error: {
    color: Color.TXT_RED,
    fontSize: Font.FONTSIZE_13,
    fontFamily: Font.MYRIAD_REGULAR,
    position: "relative",
    top: isIOS() ? 2 : 0,
  },
  errorView: {
    backgroundColor: Color.BACK_WHITE,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.TXT_RED,
    paddingLeft: 15,
    paddingRight: 15,
    height: 38,
    justifyContent: "center",
  },
  showbtn: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    right: 5,
    top: 9,
    position: "absolute",
  },
  showbtnicon: {
    color: Color.PLACEHOLDER,
    fontSize: Font.FONTSIZE_18,
  },
  inputiconmain: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    right: 5,
    top: 8,
    position: "absolute",
  },
  inputicon: {
    color: Color.PLACEHOLDER,
    fontSize: Font.FONTSIZE_18,
  },
});

export default styles;
