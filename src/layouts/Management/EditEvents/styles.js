import { StyleSheet, Dimensions } from "react-native";
import { Font, Color, Globals } from "../../../utils/variable";
import { isIOS } from "../../../utils/theme";

import { ifIphoneX } from "react-native-iphone-x-helper";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  contentcenter: {
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
  createventview: {
    marginTop: 15,
  },
  CreateEventMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  createvent: {
    backgroundColor: Color.BACK_DARKYELLOW,
    height: 48,
    borderRadius: 5,
  },
  createventxt: {
    color: Color.TXT_WHITE,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
    position: "relative",
    top: isIOS() ? 3 : 0,
  },
  deleteevent: {
    backgroundColor: Color.BACK_WHITE,
    borderColor: Color.BACK_DARKYELLOW,
    borderWidth: 1,
    height: 48,
    borderRadius: 5,
  },
  deleteeventxt: {
    color: Color.TXT_DARKYELLOW,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
    position: "relative",
    top: isIOS() ? 3 : 0,
  },
  centeredView: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    width: 312,
    backgroundColor: Color.BACK_WHITE,
    borderRadius: 5,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 16,
    paddingRight: 16,
  },
  confirmtxt: {
    color: Color.TXT_RED,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
  },
  actionbuttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actiondelete: {
    width: "50%",
    backgroundColor: Color.BACK_RED,
    height: 45,
    borderRadius: 5,
  },
  actiondeletetxt: {
    color: Color.TXT_WHITE,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
    position: "relative",
    top: isIOS() ? 3 : 0,
  },
  actioncancelbtn: {
    backgroundColor: Color.BACK_WHITE,
    borderColor: Color.BACK_DARKYELLOW,
    borderWidth: 1,
    height: 45,
    borderRadius: 5,
  },
  actioncancelbtntxt: {
    color: Color.TXT_DARKYELLOW,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
    position: "relative",
    top: isIOS() ? 3 : 0,
  },
});

export default styles;
