import React, {Component} from 'react';
import {View, Image, SafeAreaView, Text} from 'react-native';
import CustomTextfield from '../../components/CustomTextfield';
import {REGEX} from '../../utils/validation';
import {ErrorMessage} from '../../utils/message';
import CustomButton from '../../components/CustomButton';

import HeaderTitle from '../../components/Header/HeaderTitle';

import styles from './styles';

export default class ResetPassword extends Component {
  static navigationOptions = ({}) => {
    return {
      headerTitle: () => <HeaderTitle title={'Reset password'} />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      hasError: true,
      isModalVisible: false,
      isToastVisible: false,
      hidePassword: true,
      passVisible: true,
      email: {
        value: '',
        message: [],
        isValid: false,
      },
      password: {
        value: '',
        message: [],
        isValid: false,
      },
      confirmPassword: {
        value: '',
        message: [],
        isValid: false,
      },
    };
  }

  onPasswordChange = (text) => {
    const password = this.state.password;
    password.value = text;
    password.message = [];
    password.isValid = true;

    if (password.value.length == 0 || password.value == '') {
      // email.message = ErrorMsg.emailRequired // import
      password.message.push(ErrorMessage.EMPTY_PASS);
      password.isValid = false;
    } else {
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
        // email.message = ErrorMsg.emailInvalid
        password.message.push(ErrorMessage.SPECIAL_CHARACTER);
        password.isValid = false;
      }
      if (!password.value.match(REGEX.MIN_NUMBERS)) {
        // email.message = ErrorMsg.emailInvalid
        password.message.push(ErrorMessage.MIN_NUMBER);
        password.isValid = false;
      }
    }

    this.setState({password});
  };
  onConfrimPasswordChange = (text) => {
    const confirmPassword = this.state.confirmPassword;
    confirmPassword.value = text;
    confirmPassword.message = [];
    confirmPassword.isValid = true;

    if (this.state.password.value != confirmPassword.value) {
      // email.message = ErrorMsg.emailRequired // import
      confirmPassword.message.push(ErrorMessage.CONFIRM_PASS);
      confirmPassword.isValid = false;
    }
    this.setState({confirmPassword});
  };

  onPassVisi = () => {
    this.setState({
      passVisible: !this.state.passVisible,
    });
  };

  render() {
    const {email, password, confirmPassword} = this.state;
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.safeareaview}>
        <SafeAreaView style={styles.contentcenter}>
          <View style={styles.container}>
            <View style={styles.form}>
              <Text style={styles.logintxt}>
                Please enter new password to reset your password
              </Text>
              <View style={styles.form}>
                <CustomTextfield
                  placeholder="New Password"
                  inputmainstyle={{marginBottom: 25}}
                  inputstyle={{paddingRight: 40}}
                  editable={true}
                  passwordField={true}
                  passVisible={this.state.passVisible}
                  onPassVisi={this.onPassVisi}
                  isPassword={true}
                  onChangeText={this.onPasswordChange}
                  value={password.value}
                  errorMsgs={password.message}></CustomTextfield>
                <CustomTextfield
                  placeholder="Confirm Password"
                  inputstyle={{paddingRight: 40}}
                  editable={true}
                  passwordField={true}
                  onChangeText={this.onConfrimPasswordChange}
                  value={confirmPassword.value}
                  errorMsgs={confirmPassword.message}></CustomTextfield>

                <View style={styles.loginbtnmain}>
                  <CustomButton
                    btnText="Reset"
                    mainStyle={styles.loginyellow}
                    btnStyle={styles.withlogin}
                    // mainStyle={[
                    //   this.state.email.isValid
                    //     ? styles.loginyellow
                    //     : styles.logingray,
                    //   styles.loginbtn,
                    // ]}
                    // btnStyle={
                    //   this.state.email.isValid
                    //     ? styles.withlogin
                    //     : styles.withoutlogin
                    // }
                    //value={false}
                    //disabled={!this.state.email.isValid}
                    onClick={() => {
                      // this.setState({isToastVisible: true});
                      // setTimeout(
                      //   () =>
                      //     this.setState({
                      //       isToastVisible: false,
                      //     }),
                      //   2000,
                      // );
                      this.props.navigation.navigate('ResetPassword');
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
