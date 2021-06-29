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
  camputtxt: {
    fontSize: Font.FONTSIZE_24,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_BLACK,
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
