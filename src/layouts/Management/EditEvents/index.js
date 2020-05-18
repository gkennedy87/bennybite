import React, { Component } from "react";
import moment from "moment";
import { get, trim } from "lodash";
import { connect } from "react-redux";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { eventOperations } from "./../../../state/ducks/event";

import CustomButton from "../../../components/CustomButton";
import CustomToast from "../../../components/CustomToast";
import CustomTextfield from "../../../components/CustomTextfield";
import HeaderTitle from "../../../components/Header/HeaderTitle";
import { ErrorMessage } from "../../../utils/message";

import styles from "./styles";
import { Globals } from "../../../utils/variable";

export class EditEvents extends Component {
  constructor(props) {
    super(props);
    const event = this.props.navigation.state.params.event;
    this.state = {
      showStartDate: false,
      showEndDate: false,
      showDeleteModel: false,
      eventId: event._id,
      name: {
        value: event.name,
        message: [],
        isValid: true,
      },
      info: {
        value: event.info,
        message: [],
        isValid: true,
      },
      location: {
        value: event.location,
        message: [],
        isValid: true,
      },
      startDate: {
        value: new Date(event.startDate),
        message: [],
        isValid: true,
      },
      endDate: {
        value: new Date(event.endDate),
        message: [],
        isValid: true,
      },
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <HeaderTitle title={"Edit Event"} />,
    };
  };

  onUpdateEvent = async () => {
    let toastMessage = "",
      toastType = "";
    const { name, info, location, startDate, endDate, eventId } = this.state;
    try {
      const response = await this.props.updateEvent(eventId, {
        name: name.value,
        info: info.value,
        location: location.value,
        startDate: startDate.value,
        endDate: endDate.value,
      });
      toastMessage = response.message;
      this.props.navigation.navigate("Events");
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

  onDeleteEvent = async () => {
    let toastMessage = "",
      toastType = "";
    try {
      const response = await this.props.deleteEvent(this.state.eventId);
      toastMessage = response.message;
      this.props.navigation.navigate("Events");
    } catch (err) {
      toastMessage = get(err, "response.data.message", "Something went wrong!");
      toastType = "warning";
    }
    this.setState({
      showToast: true,
      toastMessage,
      toastType,
      showDeleteModel: false,
    });
  };

  setActionModalVisible = (visible) => {
    this.setState({ showDeleteModel: visible });
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
    } else if (
      endDate.value &&
      startDate.value.getTime() > endDate.value.getTime()
    ) {
      startDate.message.push(ErrorMessage.START_DATE);
      startDate.isValid = false;
    } else if (
      startDate.value.getTime() <
      new Date(new Date().toISOString().slice(0, 10)).getTime()
    ) {
      startDate.message.push(ErrorMessage.START_DATE_TODAY);
      startDate.isValid = false;
    } else {
      if (
        endDate.value &&
        endDate.value.getTime() >
          new Date(new Date().toISOString().slice(0, 10)).getTime()
      ) {
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
    } else if (
      startDate.value &&
      startDate.value.getTime() > endDate.value.getTime()
    ) {
      endDate.message.push(ErrorMessage.END_DATE);
      endDate.isValid = false;
    } else if (
      endDate.value.getTime() <
      new Date(new Date().toISOString().slice(0, 10)).getTime()
    ) {
      endDate.message.push(ErrorMessage.END_DATE_TODAY);
      endDate.isValid = false;
    } else {
      if (
        startDate.value.getTime() >
        new Date(new Date().toISOString().slice(0, 10)).getTime()
      ) {
        startDate.message = [];
        startDate.isValid = true;
      }
    }
    this.setState({ endDate, startDate });
  };

  render() {
    const {
      startDate,
      endDate,
      showStartDate,
      showEndDate,
      name,
      info,
      location,
      toastMessage,
      toastType,
      showToast,
      showDeleteModel,
    } = this.state;
    const startDateValue = startDate.value
      ? moment(startDate.value).format("hh:mma, DD-MM-YYYY")
      : "";
    const endDateValue = endDate.value
      ? moment(endDate.value).format("hh:mma, DD-MM-YYYY")
      : "";
    const isValid =
      name.isValid &&
      info.isValid &&
      location.isValid &&
      startDate.isValid &&
      endDate.isValid;
    return (
      <View style={styles.safeareaview}>
        <CustomToast
          message={toastMessage}
          isToastVisible={showToast}
          type={toastType}
          onHide={() => this.setState({ showToast: false })}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDeleteModel}
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
                    this.setState({ showDeleteModel: false }, () =>
                      this.onDeleteEvent()
                    );
                  }}
                />
                <CustomButton
                  width="48%"
                  btnText="Cancel"
                  mainStyle={styles.actioncancelbtn}
                  btnStyle={styles.actioncancelbtntxt}
                  onClick={() => {
                    this.setActionModalVisible(!showDeleteModel);
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
                onChangeText={this.onEventName}
                txtvalue={name.value}
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
                txtvalue={info.value}
                errorMsgs={info.message}
              ></CustomTextfield>
              <CustomTextfield
                keyboardType={"ascii-capable"}
                placeholder="Event location "
                editable={true}
                inputmainstyle={{ marginBottom: 20 }}
                inputstyle={{ paddingRight: 40 }}
                ifIcon={true}
                iconname={"map"}
                onChangeText={this.onEventLocation}
                txtvalue={location.value}
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
                  onPress={() => {
                    this.setState({ showStartDate: true });
                  }}
                ></TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={showStartDate}
                mode="datetime"
                onConfirm={(date) => {
                  this.setState(
                    {
                      showStartDate: false,
                    },
                    () => {
                      this.onEventStartDate(date);
                    }
                  );
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
                  onPress={() => {
                    this.setState({ showEndDate: true });
                  }}
                ></TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={showEndDate}
                mode="datetime"
                onConfirm={(date) => {
                  this.setState(
                    {
                      showEndDate: false,
                    },
                    () => {
                      this.onEventEndDate(date);
                    }
                  );
                }}
                onCancel={() => {
                  this.setState({
                    showEndDate: false,
                  });
                }}
              />

              <View style={styles.CreateEventMain}>
                <CustomButton
                  width="48%"
                  btnText="Save Event"
                  mainStyle={[
                    isValid ? styles.createventgray : styles.createventyellow,
                    styles.createvent,
                  ]}
                  btnStyle={[
                    isValid
                      ? styles.createventxtyellow
                      : styles.createventxtgray,
                    styles.createventxt,
                  ]}
                  value={false}
                  disabled={!isValid}
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
