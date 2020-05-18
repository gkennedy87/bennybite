import { StyleSheet, Dimensions } from "react-native";
import { Font, Color } from "../../utils/variable";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { isIOS } from "../../utils/theme";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  contentpadd: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  maintitle: {
    color: Color.TXT_BLACK,
    fontSize: Font.FONTSIZE_16,
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: Font.MYRIAD_SEMIBOLD,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
  },
  txtcontent: {
    color: Color.TXT_BLACK,
    fontSize: Font.FONTSIZE_14,
    fontFamily: Font.MYRIAD_REGULAR,
    marginBottom: 30,
    lineHeight: 18,
  },
  reatbtnview: {
    width: "100%",
  },
  createvent: {
    backgroundColor: Color.BACK_DARKYELLOW,
    alignItems: "center",
    justifyContent: "center",
    ...ifIphoneX(
      {
        height: 70,
      },
      {
        height: 48,
      }
    ),
  },
  createventxt: {
    color: Color.TXT_WHITE,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
    position: "relative",
    ...ifIphoneX(
      {
        top: isIOS() ? -5 : 0,
      },
      {
        top: isIOS() ? 3 : 0,
      }
    ),
  },
});

export default styles;
