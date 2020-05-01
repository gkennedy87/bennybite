import { StyleSheet } from "react-native";
import { Color, Font } from "../../utils/variable";

const styles = StyleSheet.create({
  toastView: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
    shadowColor: Color.BACK_BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  toasttxt: {
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
  },
});

export default styles;
