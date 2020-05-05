import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import CustomTextfield from "../../../components/CustomTextfield";
import CustomButton from "../../../components/CustomButton";
import HeaderTitle from "../../../components/Header/HeaderTitle";
import { REGEX } from "../../../utils/validation";
import { ErrorMessage } from "../../../utils/message";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { eventOperations } from "./../../../state/ducks/event";

import styles from "./styles";
import { Globals } from "../../../utils/variable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: true,
      name: "",
      info: "",
      location: "",
      isStartDate: false,
      startDate: "",
      isEndDate: false,
      endDate: "",
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
      startdate: {
        value: "",
        message: [],
        isValid: false,
      },
      enddate: {
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
    const dt = new Date();
    const startDate = new Date();
    startDate.setDate(dt.getDate() + 1);
    const endDate = new Date();
    endDate.setDate(dt.getDate() + 2);
    try {
      await this.props.insertEvent({
        name: this.state.name.value,
        info: this.state.info.value,
        location: this.state.location.value,
        startDate: startDate.value,
        endDate: endDate.value,
      });
      this.props.navigation.navigate("Events");
    } catch (err) {
      console.log(err);
    }
  };

  onEventname = (text) => {
    const name = this.state.name;
    name.value = text;
    name.message = [];
    name.isValid = true;

    if (name.value.length == 0 || name.value == "") {
      name.message.push(ErrorMessage.EMPTY_EVENT);
      name.isValid = false;
    }
    this.setState({ name });
  };

  onEventinfo = (text) => {
    const info = this.state.info;
    info.value = text;
    info.message = [];
    info.isValid = true;

    if (info.value.length == 0 || info.value == "") {
      info.message.push(ErrorMessage.EMPTY_EVENT_INFO);
      info.isValid = false;
    }
    this.setState({ info });
  };

  onEventlocation = (text) => {
    const location = this.state.location;
    location.value = text;
    location.message = [];
    location.isValid = true;

    if (location.value.length == 0 || location.value == "") {
      location.message.push(ErrorMessage.EMPTY_EVENT_LOCATION);
      location.isValid = false;
    }
    this.setState({ location });
  };

  render() {
    const { navigate } = this.props.navigation;
    const {
      startDate,
      endDate,
      isStartDate,
      isEndDate,
      name,
      info,
      location,
    } = this.state;

    return (
      <View style={styles.safeareaview}>
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
                onChangeText={this.onEventname}
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
                onChangeText={this.onEventinfo}
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
                onChangeText={this.onEventlocation}
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
                  txtvalue={startDate}
                  // onChangeText={this.onEventstart}
                  // value={startdate.value}
                  // errorMsgs={startdate.message}
                />

                <TouchableOpacity
                  style={styles.touchableinput}
                  onPress={() => {
                    this.setState({
                      isStartDate: true,
                    });
                  }}
                ></TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={isStartDate}
                mode="datetime"
                onConfirm={(date) => {
                  const formatedDate = moment(date).format(
                    "hh:mma, DD-MM-YYYY"
                  );
                  this.setState({
                    isStartDate: false,
                    startDate: formatedDate,
                  });
                }}
                onCancel={() => {
                  this.setState({
                    isStartDate: false,
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
                  txtvalue={endDate}
                />

                <TouchableOpacity
                  style={styles.touchableinput}
                  onPress={() => {
                    this.setState({
                      isEndDate: true,
                    });
                  }}
                ></TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={isEndDate}
                mode="datetime"
                onConfirm={(date) => {
                  const formatedDate = moment(date).format(
                    "hh:mma, DD-MM-YYYY"
                  );
                  this.setState({
                    isEndDate: false,
                    endDate: formatedDate,
                  });
                }}
                onCancel={() => {
                  this.setState({
                    isEndDate: false,
                  });
                }}
              />

              <View style={styles.CreateEventMain}>
                <CustomButton
                  btnText="Create Event"
                  mainStyle={[
                    this.state.name.isValid &&
                    this.state.info.isValid &&
                    this.state.location.isValid
                      ? styles.createventgray
                      : styles.createventyellow,
                    styles.createventbtn,
                  ]}
                  btnStyle={[
                    this.state.name.isValid &&
                    this.state.info.isValid &&
                    this.state.location.isValid
                      ? styles.createventxtyellow
                      : styles.createventxtgray,
                    styles.createventxt,
                  ]}
                  value={false}
                  disabled={
                    !(
                      this.state.name.isValid &&
                      this.state.info.isValid &&
                      this.state.location.isValid
                    )
                  }
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
