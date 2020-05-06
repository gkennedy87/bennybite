import React from "react";
import { Text } from "react-native";
import styles from "./styles";
import Toast from "react-native-root-toast";
import { Color } from "../../utils/variable";

const CustomToast = (props) => {
  return (
    <Toast
      containerStyle={styles.toastView}
      visible={props.isToastVisible}
      shadow={false}
      animation={true}
      hideOnPress={true}
      opacity={1}
      backgroundColor={Color.BACK_WHITE}
      position={60}
      textColor={props.type == "warning" ? Color.TXT_RED : Color.TXT_GREEN}
    >
      <Text style={styles.toasttxt}>{props.message}</Text>
    </Toast>
  );
};

export default CustomToast;
