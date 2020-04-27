import {Color, Font} from '../utils/variable';
import {ifIphoneX} from 'react-native-iphone-x-helper';

export default Style = {
  headerStyle: {
    backgroundColor: Color.BACK_WHITE,
    borderBottomWidth: 0,
  },
  headerTitleViewStyle: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    top: 1,
  },
  headerTxt: {
    fontSize: Font.FONTSIZE_16,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    color: Color.TXT_BLACK,
  },
  viewLeftStyle: {
    paddingHorizontal: 15,
  },
  iconLeftStyle: {
    fontSize: 20,
  },
  viewRightStyle: {
    paddingHorizontal: 15,
  },
  iconRightStyle: {
    fontSize: 20,
  },
  bottomButtonStyle: {
    backgroundColor: Color.BACK_WHITE,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    ...ifIphoneX(
      {
        height: 84,
      },
      {
        height: 64,
      },
    ),
  },
  //Button css
};
