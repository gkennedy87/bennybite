import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import styles from "./styles";
import Toast from "react-native-root-toast";
import { Color } from "../../utils/variable";

const CustomToast = (props) => {
  const [showToast, setShowToast] = useState(props.isToastVisible)

  useEffect(() => {
    console.log('isToastVisible', props.isToastVisible)
    if(props.isToastVisible && props.isToastVisible != showToast){
      setShowToast(props.isToastVisible)
      setTimeout(()=> {
        setShowToast(false)
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
      position={150}
      textColor={props.type == "warning" ? Color.TXT_RED : Color.TXT_GREEN}
    >
      <Text style={styles.toasttxt}>{props.message}</Text>
    </Toast>
  );
};

export default CustomToast;
