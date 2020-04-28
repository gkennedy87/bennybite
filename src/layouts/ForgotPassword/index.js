import React, {Component} from 'react';
import {View, Image, SafeAreaView, Text} from 'react-native';
import CustomTextfield from '../../components/CustomTextfield';
import {REGEX} from '../../utils/validation';
import {ErrorMessage} from '../../utils/message';
import CustomButton from '../../components/CustomButton';

import styles from './styles';

export default class ForgotPassword extends Component {
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
    this.setState({email});
  };

  render() {
    const {email} = this.state;
    const {navigate} = this.props.navigation;

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
                  inputstyle={{paddingRight: 40}}
                  ifIcon={true}
                  iconname={'email'}
                  onChangeText={this.onEmailTextChange}
                  value={email.value}
                  errorMsgs={email.message}></CustomTextfield>

                <View style={styles.loginbtnmain}>
                  <CustomButton
                    btnText="Submit"
                    // mainStyle={styles.loginyellow}
                    // btnStyle={styles.withlogin}
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
