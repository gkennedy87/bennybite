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
      eventinfo: {
        value: "",
        message: [],
        isValid: false,
      },
      eventlocation: {
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
        name: this.state.name,
        info: this.state.info,
        location: this.state.location,
        startDate: startDate,
        endDate: endDate,
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

  render() {
    const { navigate } = this.props.navigation;
    const { startDate, endDate, isStartDate, isEndDate, name } = this.state;

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
                //onChangeText={(name) => this.setState({ name })}
                onChangeText={this.onEventname}
                value={name.value}
                errorMsgs={name.message}
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
                onChangeText={(location) => this.setState({ location })}
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
                  mainStyle={styles.createvent}
                  btnStyle={styles.createventxt}
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
