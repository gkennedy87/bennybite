import { StyleSheet } from "react-native";
import { Color, Font } from "../../utils/variable";

const styles = StyleSheet.create({
  NoDataMain: {
    backgroundColor: Color.BACK_WHITE,
    borderRadius: 5,
    shadowColor: Color.BACK_BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  nodatatitle: {
    paddingTop: 15,
    paddingBottom: 12,
    paddingLeft: 15,
    paddingRight: 15,
    color: Color.TXT_DARKYELLOW,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
  },
});

export default styles;
