import {StyleSheet, Dimensions} from 'react-native';
import {Color, Font} from '../../utils/variable';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  Menubutton: {
    alignSelf: 'flex-start',
    marginRight: 20,
  },
  Menutext: {
    fontSize: Font.FONTSIZE_24,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_DARKGRAY,
  },
  Menuactive: {
    position: 'absolute',
    left: 0,
    bottom: 3,
    height: 3,
    width: 30,
    backgroundColor: Color.BACK_BLACK,
  },

  // menutxtmainleft: {
  //   position: 'relative',
  //   marginRight: 10,
  // },
  // menutxtmainright: {
  //   position: 'relative',
  // },
  // menutxt: {
  //   fontSize: Font.FONTSIZE_34,
  //   fontFamily: Font.MYRIAD_SEMIBOLD,
  //   color: Color.TXT_DARKGRAY,
  // },
  // menutxtactv: {
  //   fontSize: Font.FONTSIZE_34,
  //   fontFamily: Font.MYRIAD_SEMIBOLD,
  //   color: Color.TXT_BLACK,
  // },
});

export default styles;
