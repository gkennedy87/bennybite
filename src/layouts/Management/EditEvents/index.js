import React, { Component } from "react";
import { Modal, View, Text } from "react-native";
import DatePicker from "react-native-datepicker";
import { connect } from "react-redux";

import { eventOperations } from "./../../../state/ducks/event";

import CustomTextfield from "../../../components/CustomTextfield";
import CustomButton from "../../../components/CustomButton";
import HeaderTitle from "../../../components/Header/HeaderTitle";
import CustomIcon from "../../../components/CustomIcon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { isIOS } from "../../../utils/theme";

import styles from "./styles";
import { Color, Font, Globals } from "../../../utils/variable";

export class EditEvents extends Component {
  constructor(props) {
    super(props);
    const event = this.props.navigation.state.params.event;
    this.state = {
      ...event,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      ActionModalVisible: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <HeaderTitle title={"Edit Event"} />,
    };
  };

  onUpdateEvent = async () => {
    try {
      await this.props.updateEvent(this.state._id, {
        name: this.state.name,
        info: this.state.info,
        location: this.state.location
      });
      this.props.navigation.navigate('Events');
    }
    catch (err) {
      console.log(err)
    }
  }

  onDeleteEvent = async () => {
    try {
      await this.props.deleteEvent(this.state._id);
      this.props.navigation.navigate('Events');
    } catch (err) {
      console.log(err)
    }
  }

  setActionModalVisible = (visible) => {
    this.setState({ ActionModalVisible: visible });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { startDate, endDate, ActionModalVisible, name, info, location } = this.state;

    return (
      <View style={styles.safeareaview}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={ActionModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.confirmtxt}>
                Are you sure you want to delete this event
              </Text>
              <View style={styles.actionbuttons}>
                <CustomButton
                  width="48%"
                  btnText="Delete"
                  mainStyle={styles.actiondelete}
                  btnStyle={styles.actiondeletetxt}
                  onClick={() => {
                    this.setState({ ActionModalVisible: false }, () => this.onDeleteEvent());
                  }}
                />
                <CustomButton
                  width="48%"
                  btnText="Cancel"
                  mainStyle={styles.actioncancelbtn}
                  btnStyle={styles.actioncancelbtntxt}
                  onClick={() => {
                    this.setActionModalVisible(!ActionModalVisible);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <KeyboardAwareScrollView
          contentContainerStyle={{
            alignItems: "center",
            flexGrow: 1,
            justifyContent: Globals.isIpad ? "center" : "flex-start",
          }}
          scrollEnabled={true}
          enableOnAndroid={false}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.contentcenter}>
            <View style={styles.createventview}>
              <CustomTextfield
                placeholder="Event name"
                editable={true}
                inputmainstyle={{ marginBottom: 20 }}
                txtvalue={name}
                onChangeText={(name) => this.setState({ name })}
              ></CustomTextfield>
              <CustomTextfield
                placeholder="Event info"
                editable={true}
                inputmainstyle={{ marginBottom: 20 }}
                inputstyle={{
                  height: 150,
                  paddingTop: 14,
                  paddingBottom: 14,
                  textAlignVertical: "top",
                }}
                multiline={true}
                txtvalue={info}
                onChangeText={(info) => this.setState({ info })}
              //value={email.value}
              //errorMsgs={email.message}
              ></CustomTextfield>
              <CustomTextfield
                placeholder="Event location "
                editable={true}
                inputmainstyle={{ marginBottom: 20 }}
                inputstyle={{ paddingRight: 40 }}
                ifIcon={true}
                iconname={"map"}
                txtvalue={location}
                onChangeText={(location) => this.setState({ location })}
              // onChangeText={this.onEmailTextChange}
              // value={email.value}
              //errorMsgs={email.message}
              ></CustomTextfield>
              <DatePicker
                date={startDate}
                mode="datetime"
                placeholder="Start time"
                format="hh:mma, DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconComponent={
                  <CustomIcon
                    name="picker"
                    style={{
                      fontSize: Font.FONTSIZE_18,
                      color: Color.TXT_BLACK,
                      position: "relative",
                      top: 2,
                    }}
                  ></CustomIcon>
                }
                style={{
                  marginBottom: 25,
                  width: "100%",
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
                    alignItems: "flex-start",
                    justifyContent: "center",
                    borderWidth: 0,
                    padding: 0,
                    borderRadius: 0,
                    color: Color.TXT_BLACK,
                    fontSize: Font.FONTSIZE_16,
                    fontFamily: Font.MYRIAD_REGULAR,
                  },
                  placeholderText: {
                    color: Color.TXT_LIGHTGRAY,
                    position: "relative",
                    top: isIOS() ? 6 : 2,
                    fontSize: Font.FONTSIZE_16,
                    fontFamily: Font.MYRIAD_REGULAR,
                  },
                  dateText: {
                    position: "relative",
                    top: isIOS() ? 6 : 2,
                    color: Color.TXT_BLACK,
                    fontFamily: Font.MYRIAD_REGULAR,
                    fontSize: Font.FONTSIZE_16,
                  },
                  btnTextConfirm: {
                    position: "relative",
                    top: isIOS() ? 3 : 0,
                    color: Color.TXT_BLACK,
                    fontFamily: Font.MYRIAD_SEMIBOLD,
                    fontSize: Font.FONTSIZE_16,
                  },
                  btnTextCancel: {
                    position: "relative",
                    top: isIOS() ? 3 : 0,
                    color: Color.TXT_BLACK,
                    fontFamily: Font.MYRIAD_SEMIBOLD,
                    fontSize: Font.FONTSIZE_16,
                  },
                }}
                onDateChange={(date) => {
                  this.setState({ startDate: date });
                }}
              />
              <DatePicker
                date={endDate}
                mode="datetime"
                placeholder="End time"
                format="hh:mma, DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconComponent={
                  <CustomIcon
                    name="picker"
                    style={{
                      fontSize: Font.FONTSIZE_18,
                      color: Color.TXT_BLACK,
                      position: "relative",
                      top: 2,
                    }}
                  ></CustomIcon>
                }
                style={{
                  marginBottom: 25,
                  width: "100%",
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
                    alignItems: "flex-start",
                    justifyContent: "center",
                    borderWidth: 0,
                    padding: 0,
                    borderRadius: 0,
                    color: Color.TXT_BLACK,
                    fontSize: Font.FONTSIZE_16,
                    fontFamily: Font.MYRIAD_REGULAR,
                  },
                  placeholderText: {
                    color: Color.TXT_LIGHTGRAY,
                    position: "relative",
                    top: isIOS() ? 6 : 2,
                    fontSize: Font.FONTSIZE_16,
                    fontFamily: Font.MYRIAD_REGULAR,
                  },
                  dateText: {
                    position: "relative",
                    top: isIOS() ? 6 : 2,
                    color: Color.TXT_BLACK,
                    fontFamily: Font.MYRIAD_REGULAR,
                    fontSize: Font.FONTSIZE_16,
                  },
                  btnTextConfirm: {
                    position: "relative",
                    top: isIOS() ? 3 : 0,
                    color: Color.TXT_BLACK,
                    fontFamily: Font.MYRIAD_SEMIBOLD,
                    fontSize: Font.FONTSIZE_16,
                  },
                  btnTextCancel: {
                    position: "relative",
                    top: isIOS() ? 3 : 0,
                    color: Color.TXT_BLACK,
                    fontFamily: Font.MYRIAD_SEMIBOLD,
                    fontSize: Font.FONTSIZE_16,
                  },
                }}
                onDateChange={(date) => {
                  this.setState({ endDate: date });
                }}
              />
              <View style={styles.CreateEventMain}>
                <CustomButton
                  width="48%"
                  btnText="Save Event"
                  mainStyle={styles.createvent}
                  btnStyle={styles.createventxt}
                  onClick={this.onUpdateEvent}
                />
                <CustomButton
                  width="48%"
                  btnText="Delete Event"
                  mainStyle={styles.deleteevent}
                  btnStyle={styles.deleteeventxt}
                  onClick={() => {
                    this.setActionModalVisible(true);
                  }}
                />
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
  updateEvent: eventOperations.updateEvent,
  deleteEvent: eventOperations.deleteEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvents);