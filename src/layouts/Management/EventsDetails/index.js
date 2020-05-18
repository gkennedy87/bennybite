import moment from "moment";
import { get } from "lodash";
import { connect } from "react-redux";
import React, { Component, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Modal,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { eventOperations } from "./../../../state/ducks/event";

import CustomIcon from "../../../components/CustomIcon";
import CustomToast from "../../../components/CustomToast";
import CustomButton from "../../../components/CustomButton";
import CustomTextfield from "../../../components/CustomTextfield";

import styles from "./styles";
import { Font, userRole } from "../../../utils/variable";

const Timer = (props) => {
  const TWELVE_HOUR = 60 * 60 * 1000 * 12;
  const endDate = new Date(props.endDate);
  const startDate = new Date(props.startDate);
  const eventTime = startDate.getTime();
  const currentTime = new Date().getTime();
  let timeFormat = "";
  const [time, setTime] = useState(timeFormat);
  if (eventTime - currentTime < TWELVE_HOUR) {
    useEffect(() => {
      if (eventTime - currentTime < TWELVE_HOUR) {
        var diffTime = eventTime - currentTime;
        var duration = moment.duration(diffTime, "milliseconds");
        var interval = 1000 * 60;
        setTime(duration.hours() + ":" + duration.minutes() + " Hours left");
        setInterval(function () {
          duration = moment.duration(duration - interval, "milliseconds");
          let hours = duration.hours();
          hours = hours < 10 ? `0${hours}` : hours;
          let minutes = duration.minutes();
          minutes = minutes < 10 ? `0${minutes}` : minutes;
          setTime(hours + ":" + minutes + " Hours left");
        }, interval);
      }
    }, [props.startDate, props.endDate]);
  }

  return <Text style={styles.upcomingtime}>{time}</Text>;
};

export class EventsDetails extends Component {
  constructor(props) {
    super(props);
    this.offset = 0;
    this.state = {
      modalVisible: false,
      ActionModalVisible: false,
      scrollOffset: new Animated.Value(0),
      titleWidth: 0,
      event: {},
      notification: {
        title: "",
        message: "",
      },
    };
  }

  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    try {
      const response = await this.props.getEvent(
        this.props.navigation.state.params.eventId
      );
      const { event } = response.payload;
      this.setState({
        event,
        notification: {
          title: event.name,
          message: "",
        },
      });
    } catch (err) {}
    this.state.scrollOffset.addListener(({ value }) => (this.offset = value));
  }

  onScroll = (e) => {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollOffset.setValue(offset);
  };

  setModalVisible = (visible) => {
    if (!visible) {
      this.setState({
        modalVisible: visible,
        notification: {
          title: this.state.event.name,
          message: "",
        },
      });
    }
    this.setState({ modalVisible: visible });
  };

  setActionModalVisible = (visible) => {
    this.setState({ ActionModalVisible: visible });
  };

  onDeleteEvent = async (eventId) => {
    try {
      await this.props.deleteEvent(eventId);
      this.props.navigation.navigate("Events");
    } catch (err) {
      console.log(err);
    }
  };

  onSendNotification = async (eventId) => {
    let toastMessage = "",
      toastType = "";
    try {
      const response = await this.props.sendNotification(
        eventId,
        this.state.notification
      );
      toastMessage = response.message;
    } catch (err) {
      toastMessage = get(err, "response.data.message", "Something went wrong!");
      toastType = "warning";
    }
    this.setModalVisible(false);
    this.setState({
      showToast: true,
      toastMessage,
      toastType,
    });
  };

  getEventStatus = (startDate, endDate) => {
    startDate = new Date(startDate).getTime();
    endDate = new Date(endDate).getTime();
    const current = new Date().getTime();
    if (startDate > current) return "Upcoming";
    else if (startDate < current && endDate > current) return "On going";
    else return "Past";
  };

  onNotificationChange = (key, value) => {
    const { notification } = this.state;
    if (key === "title") notification.title = value;
    else notification.message = value;

    this.setState({
      notification,
    });
  };

  isSendDisabled = () => {
    const { notification } = this.state;
    return notification.title.length == 0 || notification.message.length == 0;
  };

  render() {
    const screenWidth = Dimensions.get("window").width;
    const {
      modalVisible,
      ActionModalVisible,
      scrollOffset,
      event,
    } = this.state;
    const { role, id } = this.props.user;
    const { notification, toastMessage, showToast, toastType } = this.state;
    const eventStatus = this.getEventStatus(event.startDate, event.endDate);

    let isEventOwner = false;
    if (role === "admin") isEventOwner = true;
    else if (role === "staff" && event.createdBy === id) isEventOwner = true;

    return (
      <View style={styles.container}>
        <CustomToast
          message={toastMessage}
          isToastVisible={showToast}
          type={toastType}
          onHide={() => this.setState({ showToast: false })}
        />
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
                    this.setState({ ActionModalVisible: false }, () => {
                      this.onDeleteEvent(event._id);
                    });
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

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <TouchableOpacity
            style={styles.centeredViewsend}
            activeOpacity={1}
            onPress={() => Keyboard.dismiss()}
          >
            <View style={styles.modalView}>
              <CustomTextfield
                placeholder={"Enter title"}
                txtvalue={notification.title}
                editable={true}
                inputmainstyle={{ marginBottom: 20 }}
                inputstyle={{
                  fontFamily: Font.MYRIAD_SEMIBOLD,
                  fontSize: Font.FONTSIZE_16,
                }}
                onChangeText={(value) =>
                  this.onNotificationChange("title", value)
                }
              />
              <CustomTextfield
                placeholder="Start typing..."
                txtvalue={notification.message}
                editable={true}
                inputmainstyle={{ marginBottom: 20 }}
                inputstyle={{
                  height: 120,
                  paddingTop: 14,
                  paddingBottom: 14,
                  textAlignVertical: "top",
                }}
                multiline={true}
                onChangeText={(value) =>
                  this.onNotificationChange("message", value)
                }
              />
              <View style={styles.sendcancelmain}>
                <CustomButton
                  width="48%"
                  btnText="Send"
                  mainStyle={styles.sendbtn}
                  btnStyle={styles.sendbtntxt}
                  disabled={this.isSendDisabled()}
                  onClick={() => {
                    this.onSendNotification(event._id);
                  }}
                />
                <CustomButton
                  width="48%"
                  btnText="Cancel"
                  mainStyle={styles.cancelbtn}
                  btnStyle={styles.cancelbtntxt}
                  onClick={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <View style={styles.eventbackbtn}>
          <TouchableOpacity
            style={styles.btnpad}
            onPress={() => {
              this.props.navigation.navigate("Events");
            }}
          >
            <CustomIcon style={styles.backicon} name="back" />
          </TouchableOpacity>
        </View>

        {isEventOwner && (
          <View style={styles.editbtn}>
            <TouchableOpacity
              style={styles.btnpad}
              onPress={() => {
                this.props.navigation.navigate("EditEvents", { event });
              }}
            >
              <CustomIcon style={styles.editicon} name="edit" />
            </TouchableOpacity>
          </View>
        )}

        <Animated.View
          style={[
            styles.header,
            {
              paddingHorizontal: screenWidth * 0.05,
              width: screenWidth,
              marginTop: scrollOffset.interpolate({
                inputRange: [0, 200],
                outputRange: [40, -0],
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          <Animated.Text
            onLayout={(e) => {
              // if (this.offset === 0 && this.state.titleWidth === 0) {
              const titleWidth = e.nativeEvent.layout.width;
              this.setState({ titleWidth });
              // }
            }}
            style={[
              styles.eventitle,
              {
                fontSize: scrollOffset.interpolate({
                  inputRange: [0, 200],
                  outputRange: [24, 18],
                  extrapolate: "clamp",
                }),
              },
            ]}
          >
            {event.name}
          </Animated.Text>
          <Animated.View
            style={{
              width: scrollOffset.interpolate({
                inputRange: [0, 200],
                outputRange: [screenWidth * 0.92 - this.state.titleWidth, 0],
                extrapolate: "clamp",
              }),
            }}
          />
        </Animated.View>

        <ScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{ width: "100%" }}
          onScroll={this.onScroll}
          scrollEventThrottle={20}
        >
          <View style={styles.contentspacing}>
            <View style={styles.timestatus}>
              <Text style={styles.timetitle}>Time</Text>
              <Text style={styles.eventstatus}>{eventStatus}</Text>
              {eventStatus === "Upcoming" && (
                <View>
                  <Timer
                    startDate={event.startDate}
                    endDate={event.endDate}
                  ></Timer>
                  <Text style={styles.eventstatus}>
                    {moment(event.startDate).format("hh:mma DD/MM/YYYY")}
                  </Text>
                </View>
              )}
            </View>
            {eventStatus === "On going" && (
              <View>
                <Text style={styles.eventstatus}>
                  Food Available Until:
                  {moment(event.endDate).format("hh:mma DD/MM/YYYY")}
                </Text>
              </View>
            )}
          </View>

          {role !== userRole[2] && (
            <View style={styles.btnview}>
              <CustomButton
                btnText="Send notification"
                mainStyle={styles.sendnotification}
                btnStyle={styles.sendnotificationtxt}
                onClick={() => {
                  this.setModalVisible(true);
                }}
              />
            </View>
          )}
          <View style={styles.contentspacing}>
            <Text style={styles.locationtxt}>Location</Text>
            <Text style={styles.addresstxt}>{event.location}</Text>
            <Text style={styles.eventdetailsttl}>Event Details</Text>
            <Text style={styles.eventdetailstxt}>{event.info}</Text>
          </View>
        </ScrollView>
        {isEventOwner && (
          <View style={styles.reatbtnview}>
            <CustomButton
              btnText="Delete event"
              mainStyle={styles.createvent}
              btnStyle={styles.createventxt}
              onClick={() => {
                this.setActionModalVisible(true);
              }}
            />
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  user: get(state, "auth.session.user", {}),
});

const mapDispatchToProps = {
  deleteEvent: eventOperations.deleteEvent,
  sendNotification: eventOperations.sendNotification,
  getEvent: eventOperations.getEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsDetails);
