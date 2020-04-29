import {StyleSheet, Dimensions} from 'react-native';
import {Font, Color} from '../../utils/variable';
import {isIOS} from '../../utils/theme';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  profilecontentcenter: {
    marginTop: 30,
    alignItems: 'center',
  },
  profilecontent: {
    width: Dimensions.get('window').width - 100,
    alignItems: 'center',
  },
  prfltxt: {
    marginBottom: 20,
    fontSize: Font.FONTSIZE_14,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_LIGHTGRAY,
  },
  profileview: {
    width: 130,
    height: 130,
    backgroundColor: '#F2F1F1',
    borderRadius: 130,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  profilepic: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 130,
    height: 130,
    borderRadius: 130,
  },
  profileicon: {
    fontSize: Font.FONTSIZE_22,
  },
  usertxt: {
    marginTop: 30,
    fontSize: Font.FONTSIZE_32,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_BLACK,
  },
  uploadtxt: {
    marginTop: 10,
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_BLACK,
  },
  emailtxt: {
    marginTop: 10,
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_REGULAR,
    color: Color.TXT_BLACK,
  },
});

export default styles;
