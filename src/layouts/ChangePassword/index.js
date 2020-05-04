import React, { Component } from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { REGEX } from "../../utils/validation";
import { ErrorMessage } from "../../utils/message";
import CustomButton from "../../components/CustomButton";
import CustomTextfield from "../../components/CustomTextfield";

import HeaderTitle from "../../components/Header/HeaderTitle";

import styles from "./styles";

export default class ChangePassword extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: () => <HeaderTitle title={"Change password"} />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      hidePassword: true,
      oldPass: true,
      passVisible: true,
      Currentpassword: {
        value: "",
        message: [],
        isValid: false,
      },
      password: {
        value: "",
        message: [],
        isValid: false,
      },
      ConfirmPassword: {
        value: "",
        message: [],
        isValid: false,
      },
    };
  }

  onCurrentPassword = (text) => {
    const Currentpassword = this.state.Currentpassword;
    Currentpassword.value = text;
    Currentpassword.message = [];
    Currentpassword.isValid = true;

    if (Currentpassword.value.length == 0 || Currentpassword.value == "") {
      Currentpassword.message.push(ErrorMessage.EMPTY_PASS);
      Currentpassword.isValid = false;
    }

    this.setState({ Currentpassword });
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
    const ConfirmPassword = this.state.ConfirmPassword;
    ConfirmPassword.value = text;
    ConfirmPassword.message = [];
    ConfirmPassword.isValid = true;

    if (this.state.password.value != ConfirmPassword.value) {
      this.state.ConfirmPassword.message.push(ErrorMessage.CONFIRM_PASS);
      this.state.ConfirmPassword.isValid = false;
    }
    this.setState({ ConfirmPassword });
  };
  onPassVisi = () => {
    this.setState({
      passVisible: !this.state.passVisible,
    });
  };

  render() {
    const { password, ConfirmPassword, Currentpassword } = this.state;

    return (
      <View style={styles.safeareaview}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
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
                  passVisible={this.state.passVisible}
                  onPassVisi={this.onPassVisi}
                  isPassword={true}
                  onChangeText={this.onCurrentPassword}
                  value={Currentpassword.value}
                  errorMsgs={Currentpassword.message}
                ></CustomTextfield>
                <CustomTextfield
                  placeholder="New Password"
                  inputmainstyle={{ marginBottom: 25 }}
                  inputstyle={{ paddingRight: 40 }}
                  editable={true}
                  passwordField={true}
                  passVisible={this.state.passVisible}
                  onPassVisi={this.onPassVisi}
                  isPassword={true}
                  onChangeText={this.onPasswordChange}
                  value={password.value}
                  errorMsgs={password.message}
                ></CustomTextfield>
                <CustomTextfield
                  placeholder="Confirm Password"
                  inputstyle={{ paddingRight: 40 }}
                  editable={true}
                  passwordField={true}
                  passVisible={this.state.passVisible}
                  isPassword={true}
                  onChangeText={this.onConfrimPasswordChange}
                  value={ConfirmPassword.value}
                  errorMsgs={ConfirmPassword.message}
                ></CustomTextfield>

                <View style={styles.loginbtnmain}>
                  <CustomButton
                    btnText="Submit"
                    mainStyle={styles.loginyellow}
                    btnStyle={styles.withlogin}
                    onClick={() => {
                      this.props.navigation.navigate("ResetPassword");
                    }}
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
