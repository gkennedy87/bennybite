import React, {Component} from 'react';
import {SafeAreaView, View, Platform, ScrollView} from 'react-native';
import DatePicker from 'react-native-datepicker';
import CustomTextfield from '../../../components/CustomTextfield';
import CustomButton from '../../../components/CustomButton';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import CustomIcon from '../../../components/CustomIcon';
import {isIOS} from '../../../utils/theme';

import styles from './styles';
import {Color, Font} from '../../../utils/variable';

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: () => <HeaderTitle title={'Create Event'} />,
    };
  };

  render() {
    const {navigate} = this.props.navigation;
    const {startDate, endDate} = this.state;

    return (
      <SafeAreaView style={styles.safeareaview}>
        <View style={styles.contentcenter}>
          <View style={styles.createventview}>
            <CustomTextfield
              placeholder="Event name"
              editable={true}
              inputmainstyle={{marginBottom: 20}}
              //onChangeText={this.onEmailTextChange}
              //value={email.value}
              //errorMsgs={email.message}
            ></CustomTextfield>
            <CustomTextfield
              placeholder="Event info"
              editable={true}
              inputmainstyle={{marginBottom: 20}}
              inputstyle={{
                height: 150,
                paddingTop: 14,
                paddingBottom: 14,
                textAlignVertical: 'top',
              }}
              multiline={true}
              //onChangeText={this.onEmailTextChange}
              //value={email.value}
              //errorMsgs={email.message}
            ></CustomTextfield>
            <CustomTextfield
              placeholder="Event location "
              editable={true}
              inputmainstyle={{marginBottom: 20}}
              inputstyle={{paddingRight: 40}}
              ifIcon={true}
              iconname={'map'}
              // onChangeText={this.onEmailTextChange}
              // value={email.value}
              //errorMsgs={email.message}
            ></CustomTextfield>
            <DatePicker
              date={startDate}
              mode="datetime"
              placeholder="Food Available"
              format="hh:mma, DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              iconComponent={
                <CustomIcon
                  name="picker"
                  style={{
                    fontSize: Font.FONTSIZE_18,
                    color: Color.TXT_BLACK,
                    position: 'relative',
                    top: 2,
                  }}></CustomIcon>
              }
              style={{
                marginBottom: 25,
                width: '100%',
                borderWidth: 1,
                borderColor: Color.INPUT_BORDER,
                color: Color.TXT_BLACK,
                fontSize: Font.FONTSIZE_16,
                fontFamily: Font.MYRIAD_REGULAR,
                paddingLeft: 15,
                paddingRight: 10,
                height: 48,
                borderRadius: 5,
              }}
              customStyles={{
                dateInput: {
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  borderWidth: 0,
                  padding: 0,
                  borderRadius: 0,
                  color: Color.TXT_BLACK,
                  fontSize: Font.FONTSIZE_16,
                  fontFamily: Font.MYRIAD_REGULAR,
                },
                placeholderText: {
                  color: Color.TXT_LIGHTGRAY,
                  position: 'relative',
                  top: isIOS() ? 6 : 2,
                  fontSize: Font.FONTSIZE_16,
                  fontFamily: Font.MYRIAD_REGULAR,
                },
                dateText: {
                  position: 'relative',
                  top: isIOS() ? 6 : 2,
                  color: Color.TXT_BLACK,
                  fontFamily: Font.MYRIAD_REGULAR,
                  fontSize: Font.FONTSIZE_16,
                },
                btnTextConfirm: {
                  position: 'relative',
                  top: isIOS() ? 3 : 0,
                  color: Color.TXT_BLACK,
                  fontFamily: Font.MYRIAD_SEMIBOLD,
                  fontSize: Font.FONTSIZE_16,
                },
                btnTextCancel: {
                  position: 'relative',
                  top: isIOS() ? 3 : 0,
                  color: Color.TXT_BLACK,
                  fontFamily: Font.MYRIAD_SEMIBOLD,
                  fontSize: Font.FONTSIZE_16,
                },
              }}
              onDateChange={(date) => {
                this.setState({startDate: date});
              }}
            />
            <DatePicker
              date={endDate}
              mode="datetime"
              placeholder="Clean Up Time"
              format="hh:mma, DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              iconComponent={
                <CustomIcon
                  name="picker"
                  style={{
                    fontSize: Font.FONTSIZE_18,
                    color: Color.TXT_BLACK,
                    position: 'relative',
                    top: 2,
                  }}></CustomIcon>
              }
              style={{
                marginBottom: 25,
                width: '100%',
                borderWidth: 1,
                borderColor: Color.INPUT_BORDER,
                color: Color.TXT_BLACK,
                fontSize: Font.FONTSIZE_16,
                fontFamily: Font.MYRIAD_REGULAR,
                paddingLeft: 15,
                paddingRight: 10,
                height: 48,
                borderRadius: 5,
              }}
              customStyles={{
                dateInput: {
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  borderWidth: 0,
                  padding: 0,
                  borderRadius: 0,
                  color: Color.TXT_BLACK,
                  fontSize: Font.FONTSIZE_16,
                  fontFamily: Font.MYRIAD_REGULAR,
                },
                placeholderText: {
                  color: Color.TXT_LIGHTGRAY,
                  position: 'relative',
                  top: isIOS() ? 6 : 2,
                  fontSize: Font.FONTSIZE_16,
                  fontFamily: Font.MYRIAD_REGULAR,
                },
                dateText: {
                  position: 'relative',
                  top: isIOS() ? 6 : 2,
                  color: Color.TXT_BLACK,
                  fontFamily: Font.MYRIAD_REGULAR,
                  fontSize: Font.FONTSIZE_16,
                },
                btnTextConfirm: {
                  position: 'relative',
                  top: isIOS() ? 3 : 0,
                  color: Color.TXT_BLACK,
                  fontFamily: Font.MYRIAD_SEMIBOLD,
                  fontSize: Font.FONTSIZE_16,
                },
                btnTextCancel: {
                  position: 'relative',
                  top: isIOS() ? 3 : 0,
                  color: Color.TXT_BLACK,
                  fontFamily: Font.MYRIAD_SEMIBOLD,
                  fontSize: Font.FONTSIZE_16,
                },
              }}
              onDateChange={(date) => {
                this.setState({endDate: date});
              }}
            />

            <View style={styles.CreateEventMain}>
              <CustomButton
                btnText="Create Event"
                mainStyle={styles.createvent}
                btnStyle={styles.createventxt}
                onClick={() => {
                  this.props.navigation.navigate('Events');
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
