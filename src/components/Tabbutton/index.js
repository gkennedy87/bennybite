import React from 'react';
import {Text, TouchableOpacity, Dimensions, View} from 'react-native';
import styles from './styles';
const {width} = Dimensions.get('window');

const Tabbutton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.Menubutton, props.MenubuttonStyle]}
      onPress={props.onClick}
      disabled={props.disabled}>
      <Text style={[styles.Menutext, props.MenutextStyle]}>
        {props.Menutext}
      </Text>
      <View style={[styles.Menuactive, props.MenuactiveStyle]}></View>
    </TouchableOpacity>
  );
};

Tabbutton.defaultProps = {
  title: '',
  width: width,
};

export default Tabbutton;
