import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

const NoData = (props) => {
  return (
    <View style={styles.NoDataMain}>
      <Text style={[styles.nodatatitle, props.nodatitlestyle]}>
        {props.NodataTxt}
      </Text>
    </View>
  );
};

export default NoData;
