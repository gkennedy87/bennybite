import {StyleSheet, Dimensions} from 'react-native';
import {Font, Color} from '../../utils/variable';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    alignItems: 'center',
  },
  contentcenter: {
    width: Dimensions.get('window').width - 40,
  },
  logintxt: {
    marginTop: 45,
    fontSize: Font.FONTSIZE_16,
    color: Color.TXT_BLACK,
    marginBottom: 30,
    fontFamily: Font.MYRIAD_REGULAR,
  },

  loginbtnmain: {
    marginTop: 50,
  },
  withoutlogin: {
    color: Color.TXT_BLACK,
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_SEMIBOLD,
  },
  withlogin: {
    fontSize: Font.FONTSIZE_16,
    color: Color.TXT_WHITE,
    fontFamily: Font.MYRIAD_SEMIBOLD,
  },
  logingray: {
    backgroundColor: Color.BACK_LIGHTGRAY,
    paddingTop: 17,
    paddingBottom: 13,
    borderRadius: 5,
  },
  loginyellow: {
    backgroundColor: Color.BACK_DARKYELLOW,
    paddingTop: 17,
    paddingBottom: 13,
    borderRadius: 5,
  },
});

export default styles;
