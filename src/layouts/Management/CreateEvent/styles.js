import {StyleSheet, Dimensions} from 'react-native';
import {Font, Color} from '../../../utils/variable';
import {isIOS} from '../../../utils/theme';

import {ifIphoneX} from 'react-native-iphone-x-helper';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    alignItems: 'center',
  },
  contentcenter: {
    width: Dimensions.get('window').width - 40,
  },
  createventview: {
    marginTop: 15,
  },
  CreateEventMain: {
    marginTop: 10,
  },
  createvent: {
    backgroundColor: Color.BACK_DARKYELLOW,
    height: 48,
    borderRadius: 5,
  },
  createventxt: {
    color: Color.TXT_WHITE,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
    position: 'relative',
    top: isIOS() ? 2 : 0,
  },
});

export default styles;
