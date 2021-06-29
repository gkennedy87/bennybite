import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import GlobalStyles from '../../utils/GlobalStyles.js';
import CustomIcon from '../CustomIcon';

const HeaderRight = ({
  onPress,
  iconName,
  iconStyle,
  buttonTitle,
  disable,
  buttonStyle,
}) => (
  <TouchableOpacity
    disabled={disable}
    style={GlobalStyles.viewRightStyle}
    onPress={onPress}>
    {iconName || !buttonTitle ? (
      <CustomIcon
        name={iconName}
        style={[GlobalStyles.iconRightStyle, iconStyle]}
      />
    ) : (
      <Text style={GlobalStyles.headerTxt}>{buttonTitle}</Text>
    )}
  </TouchableOpacity>
);

HeaderRight.defaultProps = {
  disable: false,
};

export default HeaderRight;
