import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      disabled={props.disabled}
      style={[props.mainStyle, styles.btnView, {width: props.width}]}>
      <Text style={props.btnStyle}>{props.btnText}</Text>
      {props.children}
    </TouchableOpacity>
  );
};

CustomButton.defaultProps = {
  value: false,
  width: '100%',
};

export default CustomButton;
