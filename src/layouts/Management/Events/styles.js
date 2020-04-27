import {StyleSheet, Dimensions} from 'react-native';
import {Font, Color} from '../../../utils/variable';
import {ifIphoneX} from 'react-native-iphone-x-helper';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  listingspace: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  tabmain: {
    overflow: 'hidden',
    paddingBottom: 5,
  },
  tabbutton: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 10,
    backgroundColor: Color.BACK_WHITE,
    shadowColor: Color.BACK_BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listingborder: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Color.BACK_LIGHTGRAY,
  },
  listingtitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    width: '60%',
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_BLACK,
  },
  upcomingtime: {
    position: 'relative',
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
  reatbtnview: {
    width: '100%',
  },
  createvent: {
    backgroundColor: Color.BACK_DARKYELLOW,
    // paddingTop: 17,
    // paddingBottom: 13,
    ...ifIphoneX(
      {
        paddingTop: 26,
        paddingBottom: 25,
      },
      {
        paddingTop: 17,
        paddingBottom: 13,
      },
    ),
  },
  createventxt: {
    color: Color.TXT_WHITE,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
  },

  /*********** Userlistong ************/

  userlistingspace: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  userlistingborder: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Color.BACK_LIGHTGRAY,
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
});

export default styles;
