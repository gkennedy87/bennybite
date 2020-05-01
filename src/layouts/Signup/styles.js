import { StyleSheet, Dimensions } from "react-native";
import { Font, Color, Globals } from "../../utils/variable";
import { isIOS } from "../../utils/theme";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  contentcenter: {
    marginTop: -60,
    backgroundColor: Globals.isIpad ? Color.BACK_WHITE : "transparent",
    width: Globals.isIpad ? 400 : Dimensions.get("window").width - 40,
    paddingLeft: Globals.isIpad ? 45 : 0,
    paddingRight: Globals.isIpad ? 45 : 0,
    paddingTop: Globals.isIpad ? 50 : 0,
    paddingBottom: Globals.isIpad ? 50 : 0,
    borderRadius: Globals.isIpad ? 4 : 0,
    shadowColor: Globals.isIpad ? Color.BACK_BLACK : "transparent",
    shadowOffset: {
      width: 0,
      height: Globals.isIpad ? 1 : 0,
    },
    shadowOpacity: Globals.isIpad ? 0.2 : 0,
    shadowRadius: Globals.isIpad ? 2 : 0,
    elevation: Globals.isIpad ? 3 : 0,
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
