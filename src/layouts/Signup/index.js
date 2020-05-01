import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import CustomTextfield from "../../components/CustomTextfield";
import CustomIcon from "../../components/CustomIcon";

import { REGEX } from "../../utils/validation";
import { ErrorMessage } from "../../utils/message";
import CustomButton from "../../components/CustomButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: true,
      // isModalVisible: false,
      // isToastVisible: false,
      hidePassword: true,
      passVisible: true,

      username: {
        value: "",
        message: [],
        isValid: false,
      },

      email: {
        value: "",
        message: [],
        isValid: false,
      },

      password: {
        value: "",
        message: [],
        isValid: false,
      },
    };
  }

  onUserTextChange = (text) => {
    const username = this.state.username;
    username.value = text;
    username.message = [];
    username.isValid = true;

    if (username.value.length == 0 || username.value == "") {
      // username.message = ErrorMsg.emailRequired // import
      username.message.push(ErrorMessage.EMPTY_USER);
      username.isValid = false;
    }
    this.setState({ username });
  };

  onPasswordChange = (text) => {
    const password = this.state.password;
    password.value = text;
    password.message = [];
    password.isValid = true;

    if (password.value.length == 0 || password.value == "") {
      // email.message = ErrorMsg.emailRequired // import
      password.message.push(ErrorMessage.EMPTY_PASS);
      password.isValid = false;
    }

    // else if (password.value.length < 8) {
    //   password.message.push(ErrorMessage.WRONG_PASS);
    //   password.isValid = false;
    // }

    this.setState({ password });
  };

  onEmailTextChange = (text) => {
    const email = this.state.email;
    email.value = text;
    email.message = [];
    email.isValid = true;

    if (email.value.length == 0 || email.value == "") {
      email.message.push(ErrorMessage.EMPTY_EMAIL);
      email.isValid = false;
    } else if (!email.value.match(REGEX.EMAIL)) {
      email.message.push(ErrorMessage.EMAIL_VALID);
      email.isValid = false;
    }
    this.setState({ email });
  };

  onPassVisi = () => {
    this.setState({
      passVisible: !this.state.passVisible,
    });
  };

  render() {
    const { username, email, password } = this.state;
    const { navigate } = this.props.navigation;

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
              <View style={styles.logocenter}>
                <Text style={styles.prfltxt}>User Profile</Text>
                <TouchableOpacity style={styles.profileview}>
                  {/* <Image source="" style={styles.profilepic} */}
                  <CustomIcon style={styles.profileicon} name="profilepic" />
                </TouchableOpacity>
              </View>
              <Text style={styles.logintxt}>Enter your details to signup</Text>
              <View style={styles.form}>
                <CustomTextfield
                  placeholder="User name"
                  editable={true}
                  inputmainstyle={{ marginBottom: 25 }}
                  inputstyle={{ paddingRight: 40 }}
                  ifIcon={true}
                  iconname={"user"}
                  onChangeText={this.onUserTextChange}
                  value={username.value}
                  errorMsgs={username.message}
                ></CustomTextfield>

                <CustomTextfield
                  placeholder="Email Id"
                  editable={true}
                  inputmainstyle={{ marginBottom: 25 }}
                  inputstyle={{ paddingRight: 40 }}
                  ifIcon={true}
                  iconname={"email"}
                  onChangeText={this.onEmailTextChange}
                  value={email.value}
                  errorMsgs={email.message}
                ></CustomTextfield>

                <CustomTextfield
                  placeholder="Password"
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

                <View style={styles.loginbtnmain}>
                  <CustomButton
                    btnText="Signup"
                    mainStyle={[
                      this.state.username.isValid &&
                      this.state.email.isValid &&
                      this.state.password.isValid
                        ? styles.loginyellow
                        : styles.logingray,
                      styles.loginbtn,
                    ]}
                    btnStyle={
                      this.state.username.isValid &&
                      this.state.email.isValid &&
                      this.state.password.isValid
                        ? styles.withlogin
                        : styles.withoutlogin
                    }
                    value={false}
                    disabled={
                      !(
                        this.state.username.isValid &&
                        this.state.email.isValid &&
                        this.state.password.isValid
                      )
                    }
                    onClick={() => {
                      // this.setState({isToastVisible: true});
                      // setTimeout(
                      //   () =>
                      //     this.setState({
                      //       isToastVisible: false,
                      //     }),
                      //   2000,
                      // );
                      this.props.navigation.navigate("TermsConditions");
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
