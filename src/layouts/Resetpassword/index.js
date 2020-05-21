import React, { Component } from "react";
import { get, cloneDeep } from "lodash";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { REGEX } from "../../utils/validation";
import { ErrorMessage } from "../../utils/message";
import CustomToast from "../../components/CustomToast";
import CustomButton from "../../components/CustomButton";
import CustomTextfield from "../../components/CustomTextfield";
import HeaderTitle from "../../components/Header/HeaderTitle";

import { authOperations } from "./../../state/ducks/auth";

import styles from "./styles";

const INITIAL_STATE = {
  hideNewPassword: true,
  hideConfirmPassword: true,
  newPassword: {
    value: "",
    message: [],
    isValid: false,
  },
  confirmPassword: {
    value: "",
    message: [],
    isValid: false,
  },
};

export class ResetPassword extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: () => <HeaderTitle title={"Reset password"} />,
    };
  };

  constructor(props) {
    super(props);
    this.state = cloneDeep(INITIAL_STATE);
  }

  onNewPasswordChange = (text) => {
    const newPassword = this.state.newPassword;
    newPassword.value = text;
    newPassword.message = [];
    newPassword.isValid = true;

    if (newPassword.value.length == 0 || newPassword.value == "") {
      newPassword.message.push(ErrorMessage.NEW_PASS_EMPTY);
      newPassword.isValid = false;
    }
    if (
      !newPassword.value.match(REGEX.LOWERCASE) ||
      !newPassword.value.match(REGEX.UPPERCASE)
    ) {
      newPassword.message.push(ErrorMessage.LOWER_UPPER);
      newPassword.isValid = false;
    }
    if (newPassword.value.length < 8) {
      newPassword.message.push(ErrorMessage.PASSWORD_LENGTH);
      newPassword.isValid = false;
    }
    if (
      !newPassword.value.match(REGEX.LOWERCASE) ||
      !newPassword.value.match(REGEX.UPPERCASE)
    ) {
      newPassword.message.push(ErrorMessage.LOWER_UPPER);
      newPassword.isValid = false;
    }
    if (newPassword.value.match(REGEX.SPECIAL_CHARECTERS)) {
      newPassword.message.push(ErrorMessage.SPECIAL_CHARACTER);
      newPassword.isValid = false;
    }
    if (!newPassword.value.match(REGEX.MIN_NUMBERS)) {
      newPassword.message.push(ErrorMessage.MIN_NUMBER);
      newPassword.isValid = false;
    }

    this.setState({ newPassword });
  };

  onConfrimPasswordChange = (text) => {
    const { confirmPassword, newPassword } = this.state;
    confirmPassword.value = text;
    confirmPassword.message = [];
    confirmPassword.isValid = true;

    if (confirmPassword.value.length == 0 || confirmPassword.value == "") {
      confirmPassword.message.push(ErrorMessage.CONFIRM_PASS);
      confirmPassword.isValid = false;
    }

    if (newPassword.value != confirmPassword.value) {
      confirmPassword.message.push(ErrorMessage.CONFIRM_PASS_NOT_MATCH);
      confirmPassword.isValid = false;
    }

    this.setState({ confirmPassword });
  };

  onNewPasswordVisible = () => {
    const { hideNewPassword } = this.state;
    this.setState({ hideNewPassword: !hideNewPassword });
  };

  onConfirmPasswordVisible = () => {
    const { hideConfirmPassword } = this.state;
    this.setState({ hideConfirmPassword: !hideConfirmPassword });
  };

  onResetPassword = async () => {
    let toastMessage = "",
      toastType = "";
    try {
      const { newPassword } = this.state;
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWMzNzAyZWY3ZjJmNzAwMTc5YzkyNDAiLCJpYXQiOjE1OTAwMzY0NTIsImV4cCI6MTU5MDAzNzA1Mn0.NvREdCvuqZpBtan8CMVocXpJOOGGmZJitqNptnyuGcA"//this.props.navigation.state.params;
      const response = await this.props.resetPassword(token, {
        password: newPassword.value,
      });
      toastMessage = response.message;
      await AsyncStorage.clear();
      this.props.navigation.navigate("Login");
    } catch (err) {
      toastMessage = get(err, "response.data.message", "Something went wrong!");
      toastType = "warning";
    }
    this.setState({
      showToast: true,
      toastMessage,
      toastType,
    });
  };

  render() {
    const {
      newPassword,
      confirmPassword,
      hideNewPassword,
      hideConfirmPassword,
      toastMessage,
      showToast,
      toastType,
    } = this.state;

    const isValid = newPassword.isValid && confirmPassword.isValid;

    return (
      <View style={styles.safeareaview}>
        <CustomToast
          message={toastMessage}
          isToastVisible={showToast}
          type={toastType}
          onHide={() => this.setState({ showToast: false })}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={{
            alignItems: "center",
            flexGrow: 1,
          }}
          scrollEnabled={true}
          enableOnAndroid={false}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.contentcenter}>
            <View style={styles.container}>
              <Text style={styles.logintxt}>
                Please enter new password to reset your password
              </Text>
              <View style={styles.form}>
                <CustomTextfield
                  placeholder="New Password"
                  inputmainstyle={{ marginBottom: 25 }}
                  inputstyle={{ paddingRight: 40 }}
                  editable={true}
                  passwordField={true}
                  passVisible={hideNewPassword}
                  onPassVisi={this.onNewPasswordVisible}
                  isPassword={true}
                  onChangeText={this.onNewPasswordChange}
                  value={newPassword.value}
                  txtvalue={newPassword.value}
                  errorMsgs={newPassword.message}
                ></CustomTextfield>
                <CustomTextfield
                  placeholder="Confirm Password"
                  inputstyle={{ paddingRight: 40 }}
                  editable={true}
                  passwordField={true}
                  passVisible={hideConfirmPassword}
                  onPassVisi={this.onConfirmPasswordVisible}
                  isPassword={true}
                  onChangeText={this.onConfrimPasswordChange}
                  value={confirmPassword.value}
                  txtvalue={confirmPassword.value}
                  errorMsgs={confirmPassword.message}
                ></CustomTextfield>

                <View style={styles.loginbtnmain}>
                  <CustomButton
                    btnText="Submit"
                    mainStyle={[
                      isValid ? styles.loginyellow : styles.logingray,
                      styles.loginbtn,
                    ]}
                    btnStyle={isValid ? styles.withlogin : styles.withoutlogin}
                    disabled={!isValid}
                    onClick={this.onResetPassword}
                  />
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  resetPassword: authOperations.resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
