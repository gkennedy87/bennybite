import {StyleSheet, Dimensions} from 'react-native';
import {Font, Color} from '../../../utils/variable';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  eventbackbtn: {
    paddingTop: 55,
    paddingLeft: 15,
    paddingRight: 15,
  },
  backbtnicon: {
    fontSize: Font.FONTSIZE_20,
  },
  container: {
    flex: 1,
  },
  contentspacing: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    backgroundColor: 'whitesmoke',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  eventitle: {
    color: Color.TXT_BLACK,
    fontFamily: Font.MYRIAD_SEMIBOLD,
  },
  timestatus: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timetitle: {
    color: Color.TXT_BLACK,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
  },
  eventstatus: {
    color: Color.TXT_GREEN,
    fontFamily: Font.MYRIAD_REGULAR,
    fontSize: Font.FONTSIZE_12,
  },
  available: {
    color: Color.TXT_BLACK,
    fontFamily: Font.MYRIAD_REGULAR,
    fontSize: Font.FONTSIZE_12,
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 25,
  },
  titlecount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conftitle: {
    color: Color.TXT_BLACK,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
    position: 'relative',
    top: 3.5,
  },
  countmain: {
    padding: 10,
    backgroundColor: Color.BACK_DARKYELLOW,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    color: Color.TXT_WHITE,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
    position: 'relative',
    top: 3,
  },
  btnview: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 15,
    paddingRight: 15,
  },
  sendnotification: {
    backgroundColor: Color.BACK_WHITE,
    borderColor: Color.BACK_DARKYELLOW,
    borderWidth: 1,
    paddingTop: 17,
    paddingBottom: 13,
    borderRadius: 5,
  },
  sendnotificationtxt: {
    color: Color.TXT_DARKYELLOW,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
  },
  locationtxt: {
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_BLACK,
    marginBottom: 15,
  },
  addresstxt: {
    fontSize: Font.FONTSIZE_12,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_BLACK,
    marginBottom: 15,
  },
  eventdetailsttl: {
    fontSize: Font.FONTSIZE_14,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_BLACK,
    marginBottom: 15,
  },
  eventdetailstxt: {
    fontSize: Font.FONTSIZE_14,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_LIGHTGRAY,
    marginBottom: 20,
  },
  listingspace: {
    paddingLeft: 15,
    paddingRight: 15,
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
    alignItems: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_BLACK,
  },
  upcomingtime: {
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
    position: 'absolute',
    left: 0,
    bottom: 50,
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  createvent: {
    backgroundColor: Color.BACK_DARKYELLOW,
    paddingTop: 17,
    paddingBottom: 13,
    borderRadius: 5,
  },
  createventxt: {
    color: Color.TXT_WHITE,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
  },
  centeredView: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
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
  CreateEventMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createvent: {
    width: '50%',
    backgroundColor: Color.BACK_DARKYELLOW,
    paddingTop: 16,
    paddingBottom: 11,
    borderRadius: 5,
  },
  createventxt: {
    color: Color.TXT_WHITE,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
  },
  deleteevent: {
    backgroundColor: Color.BACK_WHITE,
    borderColor: Color.BACK_DARKYELLOW,
    borderWidth: 1,
    paddingTop: 16,
    paddingBottom: 11,
    borderRadius: 5,
  },
  deleteeventxt: {
    color: Color.TXT_DARKYELLOW,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
  },
});

export default styles;
