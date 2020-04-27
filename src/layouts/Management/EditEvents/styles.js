import {StyleSheet, Dimensions} from 'react-native';
import {Font, Color} from '../../../utils/variable';
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createvent: {
    width: '50%',
    backgroundColor: Color.BACK_DARKYELLOW,
    paddingTop: 18,
    paddingBottom: 13,
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
    paddingTop: 18,
    paddingBottom: 13,
    borderRadius: 5,
  },
  deleteeventxt: {
    color: Color.TXT_DARKYELLOW,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_16,
  },
});

export default styles;
