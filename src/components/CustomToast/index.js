import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import styles from "./styles";
import Toast from "react-native-root-toast";
import { Color } from "../../utils/variable";

const CustomToast = (props) => {
  const [showToast, setShowToast] = useState(props.isToastVisible)

  useEffect(() => {
    setShowToast(props.isToastVisible)
    if (props.isToastVisible) {
      setTimeout(() => {
        setShowToast(false);
        props.onHide()
      }, 5000)
    }
  }, [props.isToastVisible])

  return (
    <Toast
      containerStyle={styles.toastView}
      duration={500}
      visible={showToast}
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
