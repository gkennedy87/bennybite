import React, {Component} from 'react';
import {SafeAreaView, View, Platform, ScrollView} from 'react-native';
import DatePicker from 'react-native-datepicker';
import CustomTextfield from '../../../components/CustomTextfield';
import CustomButton from '../../../components/CustomButton';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import CustomIcon from '../../../components/CustomIcon';
import styles from './styles';
import {Color, Font} from '../../../utils/variable';

export default class EditEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {date: '2016-05-15'};
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: () => <HeaderTitle title={'Edit Event'} />,
    };
  };

  render() {
    const {navigate} = this.props.navigation;
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
              inputstyle={{height: 150}}
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
              date={this.state.date}
              mode="datetime"
              placeholder="Start time"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              iconComponent={
                <CustomIcon
                  name="picker"
                  style={{
                    fontSize: Font.FONTSIZE_18,
                    color: Color.TXT_BLACK,
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
                paddingTop: 1,
                paddingBottom: 1,
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
                dateText: {
                  position: 'relative',
                  top: 3,
                  color: Color.TXT_BLACK,
                  fontFamily: Font.MYRIAD_REGULAR,
                  fontSize: Font.FONTSIZE_16,
                },
                btnTextConfirm: {
                  position: 'relative',
                  top: 3,
                  color: Color.TXT_BLACK,
                  fontFamily: Font.MYRIAD_SEMIBOLD,
                  fontSize: Font.FONTSIZE_16,
                },
                btnTextCancel: {
                  position: 'relative',
                  top: 3,
                  color: Color.TXT_BLACK,
                  fontFamily: Font.MYRIAD_SEMIBOLD,
                  fontSize: Font.FONTSIZE_16,
                },
              }}
              onDateChange={(date) => {
                this.setState({date: date});
              }}
            />
            <DatePicker
              date={this.state.date}
              mode="datetime"
              placeholder="Start time"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              iconComponent={
                <CustomIcon
                  name="picker"
                  style={{
                    fontSize: Font.FONTSIZE_18,
                    color: Color.TXT_BLACK,
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
                paddingTop: 1,
                paddingBottom: 1,
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
                dateText: {
                  position: 'relative',
                  top: 3,
                  color: Color.TXT_BLACK,
                  fontFamily: Font.MYRIAD_REGULAR,
                  fontSize: Font.FONTSIZE_16,
                },
                btnTextConfirm: {
                  position: 'relative',
                  top: 3,
                  color: Color.TXT_BLACK,
                  fontFamily: Font.MYRIAD_SEMIBOLD,
                  fontSize: Font.FONTSIZE_16,
                },
                btnTextCancel: {
                  position: 'relative',
                  top: 3,
                  color: Color.TXT_BLACK,
                  fontFamily: Font.MYRIAD_SEMIBOLD,
                  fontSize: Font.FONTSIZE_16,
                },
              }}
              onDateChange={(date) => {
                this.setState({date: date});
              }}
            />
            <View style={styles.CreateEventMain}>
              <CustomButton
                width="48%"
                btnText="Save Event"
                mainStyle={styles.createvent}
                btnStyle={styles.createventxt}
                onClick={() => {
                  this.props.navigation.navigate('Events');
                }}
              />
              <CustomButton
                width="48%"
                btnText="Delete Event"
                mainStyle={styles.deleteevent}
                btnStyle={styles.deleteeventxt}
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
