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
    marginTop: 10,
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
    top: isIOS() ? 2 : 0,
  },
});

export default styles;
