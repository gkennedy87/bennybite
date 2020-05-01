import { StyleSheet, Dimensions } from "react-native";
import { Font, Color, Globals } from "../../utils/variable";
import { isIOS } from "../../utils/theme";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  profilecontentcenter: {
    justifyContent: "center",
    alignItems: "center",
    height: Globals.isIpad ? "100%" : "auto",
  },
  profilecontent: {
    alignItems: "center",
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
  prfltxt: {
    marginBottom: 20,
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_LIGHTGRAY,
  },
  profileview: {
    width: 130,
    height: 130,
    backgroundColor: "#F2F1F1",
    borderRadius: 130,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
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
    fontSize: Font.FONTSIZE_22,
  },
  usertxt: {
    marginTop: 30,
    fontSize: Font.FONTSIZE_32,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_BLACK,
  },
  uploadtxt: {
    marginTop: 10,
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_BLACK,
  },
  emailtxt: {
    marginTop: 10,
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_BLACK,
  },
});

export default styles;
