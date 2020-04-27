import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import CustomIcon from './../CustomIcon';
import styles from './styles';
import {Color} from '../../utils/variable';

const CustomCheckbox = (props) => {
  const [checked, setChecked] = useState({...props.isChecked});

  useEffect(() => {
    setChecked(props.isChecked);
  }, [props.isChecked]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setChecked(!checked);
        }}>
        <CustomIcon
          name={checked ? 'eye-off' : 'checked'}
          style={checked ? styles.unchecked : styles.checked}
        />
        <Text style={checked ? styles.unchecktxt : styles.checktxt}>
          {props.checktitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

CustomCheckbox.defaultProps = {
  title: 'Demo',
};

export default CustomCheckbox;
