import {StyleSheet, Dimensions} from 'react-native';
import {Color, Font} from '../../utils/variable';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  inputview: {},
  txtfield: {
    borderWidth: 1,
    borderColor: Color.INPUT_BORDER,
    color: Color.TXT_BLACK,
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_REGULAR,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 11,
    borderRadius: 5,
  },
  error: {
    color: Color.TXT_RED,
    fontSize: Font.FONTSIZE_13,
    fontFamily: Font.MYRIAD_REGULAR,
  },
  errorView: {
    backgroundColor: Color.BACK_WHITE,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.TXT_RED,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 9,
    paddingBottom: 6,
  },

  showbtn: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    right: 5,
    top: 9,
    position: 'absolute',
  },
  showbtnicon: {
    color: Color.PLACEHOLDER,
    fontSize: Font.FONTSIZE_18,
  },
  inputiconmain: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    right: 5,
    top: 9,
    position: 'absolute',
  },
  inputicon: {
    color: Color.PLACEHOLDER,
    fontSize: Font.FONTSIZE_18,
  },
});

export default styles;
