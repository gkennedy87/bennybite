import React from "react";
import {
  Text,
  View,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

import styles from "./styles";
import { Color } from "../../utils/variable";
import CustomIcon from "../CustomIcon";
const { width } = Dimensions.get("window");

const CustomTextfield = (props) => {
  return (
    <View style={[styles.inputview, props.inputmainstyle]}>
      <TextInput
        onChangeText={props.onChangeText}
        value={props.txtvalue}
        style={[
          styles.txtfield,
          props.inputstyle,
          {
            borderColor:
              props.errorMsgs && props.errorMsgs.length > 0
                ? Color.TXT_RED
                : Color.INPUT_BORDER,
          },
        ]}
        maxLength={props.maxLength}
        autoCorrect={false}
        autoCapitalize={false}
        keyboardType={props.keyboardType}
        editable={props.editable}
        placeholder={props.placeholder}
        placeholderTextColor={Color.TXT_DARKGRAY}
        secureTextEntry={props.passVisible}
        name={props.name}
        onBlur={props.onBlur}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
      ></TextInput>
      {props.isPassword && (
        <TouchableOpacity style={styles.showbtn} onPress={props.onPassVisi}>
          <CustomIcon
            name={props.passVisible ? "eye-off" : "eye-on"}
            style={[
              styles.showbtnicon,
              {
                color:
                  props.errorMsgs && props.errorMsgs.length > 0
                    ? Color.TXT_RED
                    : Color.INPUT_BORDER,
              },
            ]}
          />
        </TouchableOpacity>
      )}
      {props.ifIcon && (
        <View style={styles.inputiconmain} onPress={props.onPassVisi}>
          <CustomIcon
            name={props.iconname}
            style={[
              styles.inputicon,
              {
                color:
                  props.errorMsgs && props.errorMsgs.length > 0
                    ? Color.TXT_RED
                    : Color.INPUT_BORDER,
              },
            ]}
          />
        </View>
      )}
      {props.errorMsgs && (
        <FlatList
          data={props.errorMsgs}
          renderItem={({ item }) => (
            <View style={styles.errorView}>
              <Text title={item.title} style={styles.error}>
                {item}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

CustomTextfield.defaultProps = {
  // title: "Demo",
  //width: '100%',
};

export default CustomTextfield;
