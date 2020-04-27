import {StyleSheet, Dimensions} from 'react-native';
import {Color, Font} from '../../utils/variable';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  headermain: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 45,
    paddingBottom: 10,
  },
  userview: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  usericonview: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginLeft: 20,
  },
  usericon: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  notificationview: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  newnoti: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: Color.BACK_RED,
    borderWidth: 2,
    borderColor: Color.BACK_WHITE,
    zIndex: 1,
  },
  notificationicon: {
    fontSize: Font.FONTSIZE_24,
    color: Color.TXT_BLACK,
  },
  centeredView: {
    height: '100%',
    backgroundColor: Color.BACK_WHITE,
  },
  profiletop: {
    paddingTop: 45,
    paddingLeft: 15,
    paddingRight: 15,
  },
  profiletopview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closebtn: {
    padding: 5,
    fontSize: Font.FONTSIZE_24,
    color: Color.TXT_BLACK,
  },
  settingtitle: {
    position: 'relative',
    top: 3,
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_BLACK,
  },
  edittxt: {
    position: 'relative',
    top: 3,
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_BLACK,
  },
});

export default styles;
