import React, { Component } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { eventOperations } from "./../../../state/ducks/event";
import CustomTextfield from "../../../components/CustomTextfield";
import CustomButton from "../../../components/CustomButton";
import HeaderTitle from "../../../components/Header/HeaderTitle";
import { REGEX } from "../../../utils/validation";
import { ErrorMessage } from "../../../utils/message";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { Globals } from "../../../utils/variable";

export class EditEvents extends Component {
  constructor(props) {
    super(props);
    const event = this.props.navigation.state.params.event;
    this.state = {
      isStartDate: false,
      startDate: "",
      isEndDate: false,
      endDate: "",
      ...event,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      ActionModalVisible: false,
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
        location: this.state.location,
      });
      this.props.navigation.navigate("Events");
    } catch (err) {
      console.log(err);
    }
  };

  onDeleteEvent = async () => {
    try {
      await this.props.deleteEvent(this.state._id);
      this.props.navigation.navigate("Events");
    } catch (err) {
      console.log(err);
    }
  };

  setActionModalVisible = (visible) => {
    this.setState({ ActionModalVisible: visible });
  };

  render() {
    const { navigate } = this.props.navigation;
    const {
      startDate,
      endDate,
      isStartDate,
      isEndDate,
      ActionModalVisible,
      name,
      info,
      location,
    } = this.state;

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
                    this.setState({ ActionModalVisible: false }, () =>
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
