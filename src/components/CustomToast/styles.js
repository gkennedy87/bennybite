import { StyleSheet, Dimensions } from "react-native";
import { Color, Font, Globals } from "../../utils/variable";
const styles = StyleSheet.create({
  toastView: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    shadowColor: Color.BACK_BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    width: Globals.isIpad ? 400 : Dimensions.get("window").width - 40,
  },
  toasttxt: {
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
  },
});

export default styles;
