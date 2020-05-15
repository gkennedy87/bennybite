import React, { Component } from "react";
import moment from "moment";
import { get, trim } from "lodash";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomToast from "../../../components/CustomToast";
import CustomTextfield from "../../../components/CustomTextfield";
import CustomButton from "../../../components/CustomButton";
import HeaderTitle from "../../../components/Header/HeaderTitle";
import { ErrorMessage } from "../../../utils/message";
import { eventOperations } from "./../../../state/ducks/event";

import styles from "./styles";
import { Globals } from "../../../utils/variable";

export class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStartDate: false,
      showEndDate: false,
      name: {
        value: "",
        message: [],
        isValid: false,
      },
      info: {
        value: "",
        message: [],
        isValid: false,
      },
      location: {
        value: "",
        message: [],
        isValid: false,
      },
      startDate: {
        value: "",
        message: [],
        isValid: false,
      },
      endDate: {
        value: "",
        message: [],
        isValid: false,
      },
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <HeaderTitle title={"Create Event"} />,
    };
  };

  onInsertEvent = async () => {
    const { name, info, location, startDate, endDate } = this.state
    let toastMessage = '', toastType = '';
    try {
      const response = await this.props.insertEvent({
        name: name.value,
        info: info.value,
        location: location.value,
        startDate: startDate.value.toISOString(),
        endDate: endDate.value.toISOString(),
      });
      toastMessage = response.message
      this.props.navigation.navigate("Events");
    } catch (err) {
      toastMessage = get(err, 'response.data.message', 'Something went wrong!')
      toastType = 'warning'
    }
    this.setState({
      showToast: true,
      toastMessage,
      toastType
    })
  };

  onEventName = (text) => {
    const name = this.state.name;
    name.value = trim(text);
    name.message = [];
    name.isValid = true;

    if (name.value.length == 0 || name.value == "") {
      name.message.push(ErrorMessage.EMPTY_EVENT);
      name.isValid = false;
    }
    this.setState({ name });
  };

  onEventInfo = (text) => {
    const info = this.state.info;
    info.value = trim(text);
    info.message = [];
    info.isValid = true;

    if (info.value.length == 0 || info.value == "") {
      info.message.push(ErrorMessage.EMPTY_EVENT_INFO);
      info.isValid = false;
    }
    this.setState({ info });
  };

  onEventLocation = (text) => {
    const location = this.state.location;
    location.value = trim(text);
    location.message = [];
    location.isValid = true;

    if (location.value.length == 0 || location.value == "") {
      location.message.push(ErrorMessage.EMPTY_EVENT_LOCATION);
      location.isValid = false;
    }
    this.setState({ location });
  };

  onEventStartDate = (date) => {
    const endDate = this.state.endDate;
    const startDate = this.state.startDate;
    startDate.value = date;
    startDate.message = [];
    startDate.isValid = true;

    if (!startDate.value) {
      startDate.message.push(ErrorMessage.EMPTY_EVENT_START_DATE);
      startDate.isValid = false;
    } else if (endDate.value && startDate.value.getTime() > endDate.value.getTime()) {
      startDate.message.push(ErrorMessage.START_DATE);
      startDate.isValid = false;
    } else if (startDate.value.getTime() < new Date(new Date().toISOString().slice(0, 10)).getTime()) {
      startDate.message.push(ErrorMessage.START_DATE_TODAY);
      startDate.isValid = false;
    } else {
      if (endDate.value && endDate.value.getTime() > new Date(new Date().toISOString().slice(0, 10)).getTime()) {
        endDate.message = [];
        endDate.isValid = true;
      }
    }
    this.setState({ startDate, endDate });
  };

  onEventEndDate = (date) => {
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    endDate.value = date;
    endDate.message = [];
    endDate.isValid = true;

    if (!endDate.value) {
      endDate.message.push(ErrorMessage.EMPTY_EVENT_END_DATE);
      endDate.isValid = false;
    } else if (startDate.value && startDate.value.getTime() > endDate.value.getTime()) {
      endDate.message.push(ErrorMessage.END_DATE);
      endDate.isValid = false;
    } else if (endDate.value.getTime() < new Date(new Date().toISOString().slice(0, 10)).getTime()) {
      endDate.message.push(ErrorMessage.END_DATE_TODAY);
      endDate.isValid = false;
    } else {
      if (startDate.value.getTime() > new Date(new Date().toISOString().slice(0, 10)).getTime()) {
        startDate.message = [];
        startDate.isValid = true;
      }
    }
    this.setState({ endDate, startDate });
  };

  render() {
    const { startDate, endDate, showStartDate, showEndDate, name, info, location, toastMessage, toastType, showToast } = this.state;;
    const startDateValue = startDate.value ? moment(startDate.value).format("hh:mma, DD-MM-YYYY") : ''
    const endDateValue = endDate.value ? moment(endDate.value).format("hh:mma, DD-MM-YYYY") : ''
    const isValid = name.isValid && info.isValid && location.isValid && startDate.isValid && endDate.isValid
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
                onChangeText={this.onEventName}
                value={name.value}
                errorMsgs={name.message}
              ></CustomTextfield>
              <CustomTextfield
                placeholder="Event info"
                editable={true}
                inputmainstyle={{ marginBottom: 20 }}
                inputstyle={{
                  height: 130,
                  paddingTop: 14,
                  paddingBottom: 14,
                  textAlignVertical: "top",
                }}
                multiline={true}
                onChangeText={this.onEventInfo}
                value={info.value}
                errorMsgs={info.message}
              ></CustomTextfield>
              <CustomTextfield
                placeholder="Event location "
                editable={true}
                inputmainstyle={{ marginBottom: 20 }}
                inputstyle={{ paddingRight: 40 }}
                ifIcon={true}
                iconname={"map"}
                onChangeText={this.onEventLocation}
                value={location.value}
                errorMsgs={location.message}
              ></CustomTextfield>

              <View style={{ position: "relative", marginBottom: 25 }}>
                <CustomTextfield
                  placeholder="Food Available"
                  editable={false}
                  inputmainstyle={{}}
                  inputstyle={{}}
                  ifIcon={true}
                  iconname={"map"}
                  txtvalue={startDateValue}
                  errorMsgs={startDate.message}
                />

                <TouchableOpacity
                  style={styles.touchableinput}
                  onPress={() => { this.setState({ showStartDate: true }) }}
                ></TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={showStartDate}
                mode="datetime"
                onConfirm={(date) => {
                  this.setState({
                    showStartDate: false
                  }, () => {
                    this.onEventStartDate(date)
                  });
                }}
                onCancel={() => {
                  this.setState({
                    showStartDate: false,
                  });
                }}
              />

              <View style={{ position: "relative", marginBottom: 25 }}>
                <CustomTextfield
                  placeholder="Clean Up Time"
                  editable={false}
                  inputmainstyle={{}}
                  inputstyle={{}}
                  ifIcon={true}
                  iconname={"map"}
                  txtvalue={endDateValue}
                  errorMsgs={endDate.message}
                />

                <TouchableOpacity
                  style={styles.touchableinput}
                  onPress={() => { this.setState({ showEndDate: true }) }}
                ></TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={showEndDate}
                mode="datetime"
                onConfirm={(date) => {
                  this.setState({
                    showEndDate: false
                  }, () => {
                    this.onEventEndDate(date)
                  });
                }}
                onCancel={() => {
                  this.setState({
                    showEndDate: false,
                  });
                }}
              />

              <View style={styles.CreateEventMain}>
                <CustomButton
                  btnText="Create Event"
                  mainStyle={[
                    isValid ? styles.createventgray : styles.createventyellow,
                    styles.createventbtn,
                  ]}
                  btnStyle={[
                    isValid ? styles.createventxtyellow : styles.createventxtgray,
                    styles.createventxt,
                  ]}
                  value={false}
                  disabled={!isValid}
                  onClick={this.onInsertEvent}
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
  insertEvent: eventOperations.insertEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
