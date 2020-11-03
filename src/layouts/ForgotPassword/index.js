import { toLower, get } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Image, Text } from "react-native";

import { authOperations } from "./../../state/ducks/auth";

import { REGEX } from "../../utils/validation";
import { ErrorMessage } from "../../utils/message";
import CustomToast from "../../components/CustomToast";
import CustomButton from "../../components/CustomButton";
import CustomTextfield from "../../components/CustomTextfield";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Logo from "../../assets/Images/logo.svg";

import styles from "./styles";

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: true,

      email: {
        value: "",
        message: [],
        isValid: false,
      },
    };
  }

  onEmailTextChange = (text) => {
    const email = this.state.email;
    email.value = text;
    email.message = [];
    email.isValid = true;

    if (email.value.length == 0 || email.value == "") {
      // email.message = ErrorMsg.emailRequired // import
      email.message.push(ErrorMessage.EMPTY_EMAIL);
      email.isValid = false;
    } else if (!email.value.match(REGEX.EMAIL)) {
      // email.message = ErrorMsg.emailInvalid
      email.message.push(ErrorMessage.EMAIL_VALID);
      email.isValid = false;
    }
    this.setState({ email });
  };

  onForgotPassword = async () => {
    let toastMessage = "",
      toastType = "";
    try {
      const response = await this.props.forgotPassword({
        email: toLower(this.state.email.value),
      });
      toastMessage = response.message;
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
    const { email } = this.state;
    const { toastMessage, showToast, toastType } = this.state;
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
            justifyContent: "center",
            flexGrow: 1,
          }}
          scrollEnabled={true}
          enableOnAndroid={false}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.contentcenter}>
            <View style={styles.container}>
              <View style={styles.logocenter}>
                <Logo width={265} height={58} />
              </View>
              <View style={styles.form}>
                <Text style={styles.logintxt}>
                  Enter your email id to reset the password
                </Text>
                <View style={styles.form}>
                  <CustomTextfield
                    placeholder="Email Id"
                    editable={true}
                    inputstyle={{ paddingRight: 40 }}
                    ifIcon={true}
                    iconname={"email"}
                    onChangeText={this.onEmailTextChange}
                    value={email.value}
                    errorMsgs={email.message}
                  ></CustomTextfield>

                  <View style={styles.loginbtnmain}>
                    <CustomButton
                      btnText="Submit"
                      mainStyle={[
                        this.state.email.isValid
                          ? styles.loginyellow
                          : styles.logingray,
                        styles.loginbtn,
                      ]}
                      btnStyle={
                        this.state.email.isValid
                          ? styles.withlogin
                          : styles.withoutlogin
                      }
                      value={false}
                      disabled={!this.state.email.isValid}
                      onClick={this.onForgotPassword}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export const mapStateToProps = (state) => ({});

const mapDispatchToProps = { forgotPassword: authOperations.forgotPassword };

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
