import { StyleSheet, Dimensions } from "react-native";
import { Font, Color } from "../../../utils/variable";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { isIOS } from "../../../utils/theme";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  tabmain: {
    overflow: "hidden",
    paddingBottom: 5,
  },
  tabbutton: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 10,
    backgroundColor: Color.BACK_WHITE,
    shadowColor: Color.BACK_BLACK,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
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

  backTextWhite: {
    color: "#FFF",
  },

  swiperowpadd: {
    backgroundColor: Color.BACK_WHITE,
    paddingLeft: 15,
    paddingRight: 15,
  },

  swiperowborder: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Color.BACK_LIGHTGRAY,
  },

  listingtitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    width: "60%",
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_BLACK,
  },
  upcomingtime: {
    position: "relative",
    top: -2,
    fontSize: Font.FONTSIZE_12,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_BLACK,
  },
  subtxt: {
    fontSize: Font.FONTSIZE_14,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_LIGHTGRAY,
    marginBottom: 10,
  },
  evtaddress: {
    fontSize: Font.FONTSIZE_12,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_LIGHTGRAY,
  },
  evtstatus: {
    fontSize: Font.FONTSIZE_12,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_GREEN,
  },

  //**** user listong ***/
  swipebtnusers: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 85,
  },

  btnusers: {
    right: 85,
    backgroundColor: Color.BACK_LIGHTYELLOW,
  },

  btndeleteusers: {
    backgroundColor: Color.BACK_RED,
    right: 0,
  },

  userlistingborder: {
    flexDirection: "row",
    alignItems: "center",
  },
  userprofile: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  usremail: {
    paddingLeft: 25,
  },
  usernametxt: {
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_BLACK,
    marginBottom: 5,
  },
  usertxtemail: {
    fontSize: Font.FONTSIZE_14,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_BLACK,
  },

  /***** swipe buttons */

  swipeBack: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SwipeBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  btndelete: {
    backgroundColor: Color.BACK_RED,
    right: 75,
  },
  btnedit: {
    backgroundColor: Color.BACK_LIGHTYELLOW,
    right: 0,
  },
  swipeicon: {
    color: Color.TXT_WHITE,
    fontSize: Font.FONTSIZE_20,
  },
  swipetxt: {
    marginTop: 10,
    color: Color.TXT_WHITE,
    fontSize: Font.FONTSIZE_14,
    fontFamily: Font.MYRIAD_REGULAR,
  },

  /********/

  container: {
    flex: 1,
  },
  titleBackLine: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#9C9C9C",
  },
  titlecenter: {
    fontSize: Font.FONTSIZE_14,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_BLACK,
    textAlign: "center",
    backgroundColor: Color.BACK_WHITE,
    position: "relative",
    top: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  listingspacing: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  adminborder: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Color.BACK_LIGHTGRAY,
  },
  adminlisting: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgviewwidth: {
    width: "18%",
  },
  adminprofile: {
    borderRadius: 30,
  },
  toggleswitch: {
    width: "18%",
    paddingLeft: 15,
    textAlign: "right",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  adminemail: {
    paddingLeft: 15,
    width: "64%",
  },
  adminnametxt: {
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_BLACK,
    marginBottom: 5,
  },
  admintxtemail: {
    fontSize: Font.FONTSIZE_14,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_BLACK,
  },
  toggleback: {
    position: "relative",
    width: 40,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.BACK_BLACK,
  },
  toggleround: {
    position: "absolute",
    left: 1,
    top: 1,
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: Color.BACK_BLACK,
  },
  togglebackstaff: {
    position: "relative",
    width: 40,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    borderColor: Color.BACK_DARKYELLOW,
  },
  toggleroundstaff: {
    position: "absolute",
    left: 21,
    top: 1,
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: Color.BACK_DARKYELLOW,
  },
  stdnttxt: {
    fontSize: Font.FONTSIZE_12,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_BLACK,
    marginTop: 5,
    textAlign: "right",
  },
  stafftxt: {
    fontSize: Font.FONTSIZE_12,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_DARKYELLOW,
    marginTop: 5,
    textAlign: "right",
  },
});

export default styles;
