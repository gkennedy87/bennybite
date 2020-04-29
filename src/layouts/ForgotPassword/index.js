
import { toLower } from "lodash";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { View, Image, SafeAreaView, Text } from 'react-native';

import { authOperations } from "./../../state/ducks/auth";

import { REGEX } from '../../utils/validation';
import { ErrorMessage } from '../../utils/message';
import CustomButton from '../../components/CustomButton';
import CustomTextfield from '../../components/CustomTextfield';

import styles from './styles';

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: true,

      email: {
        value: '',
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

    if (email.value.length == 0 || email.value == '') {
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

  onResetPassword = async () => {
    try {
      await this.props.forgotPassword({ email: toLower(this.state.email.value )})
      this.props.navigation.navigate('Login');
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  render() {
    const { email } = this.state;

    return (
      <View style={styles.safeareaview}>
        <SafeAreaView style={styles.contentcenter}>
          <View style={styles.container}>
            <View style={styles.logocenter}>
              <Image
                style={styles.logo}
                source={require('../../assets/Images/logo.png')}></Image>
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
                  iconname={'email'}
                  onChangeText={this.onEmailTextChange}
                  value={email.value}
                  errorMsgs={email.message}></CustomTextfield>

                <View style={styles.loginbtnmain}>
                  <CustomButton
                    btnText="Submit"
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
<<<<<<< HEAD
                    onClick={this.onResetPassword}
=======
                    onClick={() => {
                      // this.setState({isToastVisible: true});
                      // setTimeout(
                      //   () =>
                      //     this.setState({
                      //       isToastVisible: false,
                      //     }),
                      //   2000,
                      // );
                      this.props.navigation.navigate('Events');
                    }}
>>>>>>> Design-Integrations
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

export const mapStateToProps = (state) => ({});

const mapDispatchToProps = { forgotPassword: authOperations.forgotPassword };

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);