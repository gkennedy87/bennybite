import React, { Component } from "react";
import { get, cloneDeep } from "lodash";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { REGEX } from "../../utils/validation";
import { ErrorMessage } from "../../utils/message";
import CustomButton from "../../components/CustomButton";
import CustomTextfield from "../../components/CustomTextfield";
import HeaderTitle from "../../components/Header/HeaderTitle";
import CustomToast from "../../components/CustomToast";

import { authOperations } from "./../../state/ducks/auth";

import styles from "./styles";

const INITIAL_STATE = {
  hidePassword: true,
  hideCurrentPassword: true,
  hideConfirmPassword: true,
  currentPassword: {
    value: "",
    message: [],
    isValid: false,
  },
  password: {
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

export class ChangePassword extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: () => <HeaderTitle title={"Change password"} />,
    };
  };

  constructor(props) {
    super(props);
    this.state = cloneDeep(INITIAL_STATE);
  }

  onCurrentPasswordChange = (text) => {
    const currentPassword = this.state.currentPassword;
    currentPassword.value = text;
    currentPassword.message = [];
    currentPassword.isValid = true;

    if (currentPassword.value.length == 0 || currentPassword.value == "") {
      currentPassword.message.push(ErrorMessage.EMPTY_PASS);
      currentPassword.isValid = false;
    }

    this.setState({ currentPassword });
  };

  onPasswordChange = (text) => {
    const password = this.state.password;
    password.value = text;
    password.message = [];
    password.isValid = true;

    if (password.value.length == 0 || password.value == "") {
      password.message.push(ErrorMessage.EMPTY_PASS);
      password.isValid = false;
    }
    if (password.value.length < 8) {
      password.message.push(ErrorMessage.PASSWORD_LENGTH);
      password.isValid = false;
    }
    if (
      !password.value.match(REGEX.LOWERCASE) ||
      !password.value.match(REGEX.UPPERCASE)
    ) {
      password.message.push(ErrorMessage.LOWER_UPPER);
      password.isValid = false;
    }
    if (password.value.match(REGEX.SPECIAL_CHARECTERS)) {
      password.message.push(ErrorMessage.SPECIAL_CHARACTER);
      password.isValid = false;
    }
    if (!password.value.match(REGEX.MIN_NUMBERS)) {
      password.message.push(ErrorMessage.MIN_NUMBER);
      password.isValid = false;
    }

    this.setState({ password });
  };

  onConfrimPasswordChange = (text) => {
    const { confirmPassword, password } = this.state;
    confirmPassword.value = text;
    confirmPassword.message = [];
    confirmPassword.isValid = true;

    if (password.value != confirmPassword.value) {
      confirmPassword.message.push(ErrorMessage.CONFIRM_PASS);
      confirmPassword.isValid = false;
    }
    this.setState({ confirmPassword });
  };

  onCurrentPasswordVisible = () => {
    const { hideCurrentPassword } = this.state;
    this.setState({ hideCurrentPassword: !hideCurrentPassword });
  };

  onPasswordVisible = () => {
    const { hidePassword } = this.state;
    this.setState({ hidePassword: !hidePassword });
  };

  onConfirmPasswordVisible = () => {
    const { hideConfirmPassword } = this.state;
    this.setState({ hideConfirmPassword: !hideConfirmPassword });
  };

  onChangePassword = async () => {
    let toastMessage = "",
      toastType = "";
    try {
      const { currentPassword, password } = this.state;
      const response = await this.props.changePassword(this.props.user.id, {
        oldPassword: currentPassword.value,
        password: password.value,
      });
      toastMessage = response.message;
      this.props.navigation.navigate("Profile");
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
      password,
      confirmPassword,
      currentPassword,
      hideCurrentPassword,
      hidePassword,
      hideConfirmPassword,
      toastMessage,
      showToast,
      toastType,
    } = this.state;

    const isValid =
      currentPassword.isValid && password.isValid && confirmPassword.isValid;

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
                Please enter old password to change your password
              </Text>
              <View style={styles.form}>
                <CustomTextfield
                  placeholder="Current Password"
                  inputmainstyle={{ marginBottom: 25 }}
                  inputstyle={{ paddingRight: 40 }}
                  editable={true}
                  passwordField={true}
                  passVisible={hideCurrentPassword}
                  onPassVisi={this.onCurrentPasswordVisible}
                  isPassword={true}
                  onChangeText={this.onCurrentPasswordChange}
                  value={currentPassword.value}
                  txtvalue={currentPassword.value}
                  errorMsgs={currentPassword.message}
                ></CustomTextfield>
                <CustomTextfield
                  placeholder="New Password"
                  inputmainstyle={{ marginBottom: 25 }}
                  inputstyle={{ paddingRight: 40 }}
                  editable={true}
                  passwordField={true}
                  passVisible={hidePassword}
                  onPassVisi={this.onPasswordVisible}
                  isPassword={true}
                  onChangeText={this.onPasswordChange}
                  value={password.value}
                  txtvalue={password.value}
                  errorMsgs={password.message}
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
                    onClick={this.onChangePassword}
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

const mapStateToProps = (state) => ({
  user: get(state, "auth.session.user", {}),
});

const mapDispatchToProps = {
  changePassword: authOperations.changePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
