import { StyleSheet, Dimensions } from "react-native";
import { Font, Color } from "../../utils/variable";
import { isIOS } from "../../utils/theme";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  contentcenter: {
    width: Dimensions.get("window").width - 40,
    marginTop: -60,
  },
  logocenter: {
    alignItems: "center",
    marginBottom: 50,
  },
  prfltxt: {
    marginBottom: 20,
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_LIGHTGRAY,
  },
  logintxt: {
    fontSize: Font.FONTSIZE_16,
    color: Color.TXT_BLACK,
    marginBottom: 30,
    fontFamily: Font.MYRIAD_REGULAR,
  },
  profileview: {
    width: 130,
    height: 130,
    backgroundColor: "#F2F1F1",
    borderRadius: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  profilepic: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 130,
    height: 130,
    borderRadius: 130,
  },
  profileicon: {
    fontSize: Font.FONTSIZE_24,
  },
  loginbtnmain: {
    marginTop: 30,
  },
  withoutlogin: {
    color: Color.TXT_BLACK,
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    position: "relative",
    top: isIOS() ? 2 : 0,
  },
  withlogin: {
    fontSize: Font.FONTSIZE_16,
    color: Color.TXT_WHITE,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    position: "relative",
    top: isIOS() ? 2 : 0,
  },
  logingray: {
    backgroundColor: Color.BACK_LIGHTGRAY,
    height: 48,
    borderRadius: 5,
  },
  loginyellow: {
    backgroundColor: Color.BACK_DARKYELLOW,
    height: 48,
    borderRadius: 5,
  },
});

export default styles;
