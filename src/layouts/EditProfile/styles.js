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
    // alignSelf: "center",
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
    textAlign: "center",
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
    textAlign: "center",
    marginTop: 30,
    fontSize: Font.FONTSIZE_32,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_BLACK,
  },
  uploadtxt: {
    textAlign: "center",
    marginTop: 10,
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_BLACK,
  },
  emailtxt: {
    textAlign: "center",
    marginTop: 0,
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_BLACK,
  },
  sendcancelmain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 30,
  },
  sendbtn: {
    backgroundColor: Color.BACK_DARKYELLOW,
    height: 48,
    borderRadius: 5,
    marginRight: "2%",
  },
  sendbtntxt: {
    color: Color.TXT_WHITE,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
    position: "relative",
    top: isIOS() ? 3 : 0,
  },
  cancelbtn: {
    marginLeft: "2%",
    backgroundColor: Color.BACK_WHITE,
    borderColor: Color.BACK_DARKYELLOW,
    borderWidth: 1,
    height: 48,
    borderRadius: 5,
  },
  cancelbtntxt: {
    color: Color.TXT_DARKYELLOW,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
    position: "relative",
    top: isIOS() ? 3 : 0,
  },
});

export default styles;
