import moment from "moment";
import { get } from "lodash";
import { connect } from "react-redux";
import React, { Component, useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import {
  View,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  Image,
  Modal,
} from "react-native";

import { safeJSONParser, sameDayEvent } from "./../../../utils/helper";
import { authOperations } from "./../../../state/ducks/auth";
import { userOperations } from "./../../../state/ducks/user";
import { eventOperations } from "./../../../state/ducks/event";

import Navbar from "../../../components/Navbar";
import Tabbutton from "../../../components/Tabbutton";
import CustomIcon from "../../../components/CustomIcon";
import CustomToast from "../../../components/CustomToast";

import styles from "./styles";
import { Color } from "../../../utils/variable";
import Switch from "./../../../components/Switch";
import CustomButton from "./../../../components/CustomButton";

const Timer = (props) => {
  const TWELVE_HOUR = 60 * 60 * 1000 * 12;
  const endDate = new Date(props.endDate);
  const startDate = new Date(props.startDate);
  const eventTime = startDate.getTime();
  const currentTime = new Date().getTime();
  let timeFormat = "";

  if (eventTime - currentTime > TWELVE_HOUR) {
    timeFormat = `${moment(startDate).format("hh:mma")} - ${moment(
      endDate
    ).format("hh:mma")}, ${moment(startDate).format("DD/MM/YYYY")}`;
  }

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

export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FoodModalVisible: false,
      UsersModalVisible: false,
      selected: "FoodonCampus",
      userId: null,
      eventId: null,
    };
  }

  async componentDidMount() {
    const isAuthenticated = safeJSONParser(
      await AsyncStorage.getItem("isAuthenticated")
    );
    const user = safeJSONParser(await AsyncStorage.getItem("user"));
    const tokens = safeJSONParser(await AsyncStorage.getItem("tokens"));
    if (isAuthenticated) {
      this.props.initializeSession({ user, tokens });
      this.props.fetchEventList();
      if (user.role != "user") this.props.fetchUserList();
    }
  }

  static navigationOptions = {
    header: null,
  };

  getEventStatus = (startDate, endDate) => {
    startDate = new Date(startDate).getTime();
    endDate = new Date(endDate).getTime();
    const current = new Date().getTime();
    if (startDate > current) return "Upcoming";
    else if (startDate < current && endDate > current) return "On going";
    else return "Past";
  };

  onDeleteEvent = async () => {
    let toastMessage = "",
      toastType = "";
    try {
      const response = await this.props.deleteEvent(this.state.eventId);
      this.setEventModalVisible(false);
      toastMessage = response.message;
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

  setEventModalVisible = (visible) => {
    this.setState({ FoodModalVisible: visible });
  };

  setUsersModalVisible = (visible) => {
    const state = { UsersModalVisible: visible };
    if (!visible) state.userId = null;
    this.setState(state);
  };

  checkEventOwner = (event) => {
    const { role, id } = this.props.user;

    let isEventOwner = false;
    if (role === "admin") isEventOwner = true;
    else if (role === "staff" && event.createdBy === id) isEventOwner = true;

    return isEventOwner;
  };

  onRoleChange = async (userId, value) => {
    let toastMessage = "",
      toastType = "";
    const role = value ? "user" : "staff";
    try {
      const response = await this.props.assignRole(userId, role);
      toastMessage = response.message;
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

  onDeleteUser = async () => {
    let toastMessage = "",
      toastType = "";
    try {
      const response = await this.props.deleteUser(this.state.userId);
      toastMessage = response.message;
      this.setUsersModalVisible(false);
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

  changeUserStatus = async (user) => {
    let toastMessage = "",
      toastType = "";
    let response;
    try {
      if (user.status === 1) {
        response = await this.props.disableUser(user.id);
      } else if (user.status === 0) {
        response = await this.props.enableUser(user.id);
      }
      toastMessage = response.message;
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

  showDeleteUserModel = (userId) => {
    this.setUsersModalVisible(true);
    this.setState({ userId });
  };

  showDeleteEventModel = (eventId) => {
    this.setEventModalVisible(true);
    this.setState({ eventId });
  };

  getEventTime = (startDate, endDate) => {};

  renderUsers = ({ item }) => {
    const isAdmin = this.props.user.role === "admin";
    const disableLeftSwipe = !isAdmin && item.role !== "user";

    return (
      <SwipeRow rightOpenValue={-170} disableLeftSwipe={disableLeftSwipe}>
        <View style={styles.swipeBack}>
          <TouchableOpacity
            style={[styles.swipebtnusers, styles.btnusers]}
            onPress={() => this.changeUserStatus(item)}
          >
            <CustomIcon style={styles.swipeicon} name="user" />
            <Text style={styles.swipetxt}>
              {item.status === 1 ? "Disable User" : "Enable User"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.swipebtnusers, styles.btndeleteusers]}
            onPress={() => this.showDeleteUserModel(item.id)}
          >
            <CustomIcon style={styles.swipeicon} name="delete" />
            <Text style={styles.swipetxt}>Delete</Text>
          </TouchableOpacity>
        </View>
        <TouchableHighlight
          style={styles.swiperowpadd}
          underlayColor={"#ffffff"}
        >
          <View style={styles.swiperowborder}>
            <View style={styles.userlistingborder}>
              <Image source={{ uri: item.pic }} style={styles.userprofile} />
              <View style={styles.usremail}>
                <Text style={styles.usernametxt}>{item.name}</Text>
                <Text style={styles.usertxtemail}>{item.email}</Text>
              </View>
              {isAdmin && (
                <Switch
                  showLabel={true}
                  trueLabel={"staff"}
                  falseLabel={"student"}
                  defaultValue={item.role === "staff"}
                  onChange={(value) => this.onRoleChange(item.id, value)}
                ></Switch>
              )}
            </View>
          </View>
        </TouchableHighlight>
      </SwipeRow>
    );
  };

  renderEvents = ({ item }) => {
    const eventStatus = this.getEventStatus(item.startDate, item.endDate);
    return (
      <SwipeRow
        rightOpenValue={-150}
        disableLeftSwipe={!this.checkEventOwner(item)}
      >
        <View style={styles.swipeBack}>
          <TouchableOpacity
            style={[styles.SwipeBtn, styles.btndelete]}
            onPress={() => {
              this.showDeleteEventModel(item._id);
            }}
          >
            <CustomIcon style={styles.swipeicon} name="delete" />
            <Text style={styles.swipetxt}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.SwipeBtn, styles.btnedit]}
            onPress={() => {
              this.props.navigation.navigate("EditEvents", { event: item });
            }}
          >
            <CustomIcon style={styles.swipeicon} name="edit" />
            <Text style={styles.swipetxt}>Edit</Text>
          </TouchableOpacity>
        </View>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("EventsDetails", {
              eventId: item._id,
            });
          }}
          style={styles.swiperowpadd}
          underlayColor={"#ffffff"}
        >
          <View style={styles.swiperowborder}>
            <View style={styles.listingtitle}>
              <Text numberOfLines={1} style={styles.title}>
                {item.name}
              </Text>
              {eventStatus === "Upcoming" && (
                <Timer
                  startDate={item.startDate}
                  endDate={item.endDate}
                ></Timer>
              )}
            </View>
            <Text style={styles.subtxt} numberOfLines={2}>
              {item.info}
            </Text>
            <View style={styles.row}>
              <Text numberOfLines={1} style={styles.evtaddress}>
                {item.location}
              </Text>
              {eventStatus === "Upcoming" ? (
                <Text style={styles.evtstatusup}>{eventStatus}</Text>
              ) : (
                <Text style={styles.evtstatus}>{eventStatus} </Text>
              )}
            </View>
          </View>
        </TouchableHighlight>
      </SwipeRow>
    );
  };

  render() {
    const {
      selected,
      FoodModalVisible,
      UsersModalVisible,
      toastType,
      toastMessage,
      showToast,
    } = this.state;
    const isStudent = this.props.user.role === "user";
    return (
      <View style={{ flex: 1 }}>
        <CustomToast
          message={toastMessage}
          isToastVisible={showToast}
          type={toastType}
          onHide={() => this.setState({ showToast: false })}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={FoodModalVisible}
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
                  onClick={this.onDeleteEvent}
                />
                <CustomButton
                  width="48%"
                  btnText="Cancel"
                  mainStyle={styles.actioncancelbtn}
                  btnStyle={styles.actioncancelbtntxt}
                  onClick={() => {
                    this.setEventModalVisible(!FoodModalVisible);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={UsersModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.confirmtxt}>
                Are you sure you want to delete this user
              </Text>
              <View style={styles.actionbuttons}>
                <CustomButton
                  width="48%"
                  btnText="Delete"
                  mainStyle={styles.actiondelete}
                  btnStyle={styles.actiondeletetxt}
                  onClick={this.onDeleteUser}
                />
                <CustomButton
                  width="48%"
                  btnText="Cancel"
                  mainStyle={styles.actioncancelbtn}
                  btnStyle={styles.actioncancelbtntxt}
                  onClick={() => {
                    this.setUsersModalVisible(!UsersModalVisible);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Navbar />

        <View style={styles.tabmain}>
          <View style={styles.tabbutton}>
            <Tabbutton
              MenubuttonStyle={{}}
              MenutextStyle={{
                color:
                  selected === "FoodonCampus"
                    ? Color.TXT_BLACK
                    : Color.TXT_DARKGRAY,
              }}
              MenuactiveStyle={{
                backgroundColor:
                  selected === "FoodonCampus" ? Color.TXT_BLACK : "transparent",
              }}
              onClick={() => {
                this.setState({
                  selected: "FoodonCampus",
                });
              }}
              Menutext="Food on Campus"
            ></Tabbutton>
            {!isStudent && (
              <Tabbutton
                MenubuttonStyle={{}}
                MenutextStyle={{
                  color:
                    selected === "Users" ? Color.TXT_BLACK : Color.TXT_DARKGRAY,
                }}
                MenuactiveStyle={{
                  backgroundColor:
                    selected === "Users" ? Color.TXT_BLACK : "transparent",
                }}
                onClick={() => {
                  this.setState({
                    selected: "Users",
                  });
                }}
                Menutext="Users"
              ></Tabbutton>
            )}
          </View>
        </View>
        {selected === "FoodonCampus" && (
          <View style={{ flex: 1 }}>
            <SwipeListView
              data={this.props.events.map((e) => ({ ...e, key: e._id }))}
              previewRowKey={"0"}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              renderItem={this.renderEvents}
            />
            {!isStudent && (
              <View style={styles.reatbtnview}>
                <CustomButton
                  btnText="Create Event"
                  mainStyle={styles.createvent}
                  btnStyle={styles.createventxt}
                  onClick={() => {
                    this.props.navigation.navigate("CreateEvent");
                  }}
                />
              </View>
            )}
          </View>
        )}
        {selected === "Users" && !isStudent && (
          <View style={{ flex: 1 }}>
            <SwipeListView
              data={this.props.users
                .filter((u) => u.id != this.props.user.id)
                .map((e) => ({ ...e, key: e.id }))}
              renderItem={this.renderUsers}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user.list,
    events: state.event.list,
    user: get(state, "auth.session.user", {}),
  };
};

const mapDispatchToProps = {
  fetchUserList: userOperations.fetchList,
  fetchEventList: eventOperations.fetchList,
  deleteEvent: eventOperations.deleteEvent,
  initializeSession: authOperations.initializeSession,
  assignRole: userOperations.assignRole,
  deleteUser: userOperations.deleteUser,
  enableUser: userOperations.enableUser,
  disableUser: userOperations.disableUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
