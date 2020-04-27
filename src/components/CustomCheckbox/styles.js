import {StyleSheet, Dimensions} from 'react-native';
import {Color, Font} from '../../utils/variable';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
  },
  btn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  unchecktxt: {
    color: Color.TXT_LIGHTGRAY,
    fontSize: Font.fontSize_18,
    fontFamily: Font.MYRIAD_REGULAR,
    marginLeft: 8,
  },
  checktxt: {
    color: Color.TXT_BLACK,
    fontSize: Font.fontSize_18,
    fontFamily: Font.MYRIAD_REGULAR,
    marginLeft: 8,
  },
  unchecked: {
    fontSize: 16,
    color: Color.TXT_LIGHTGRAY,
  },
  checked: {
    fontSize: 16,
    color: Color.TXT_BLACK,
  },
});

export default styles;
