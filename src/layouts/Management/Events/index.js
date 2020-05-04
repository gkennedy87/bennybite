import React, { Component } from 'react';
import { connect } from "react-redux";
import { get } from "lodash";
import AsyncStorage from "@react-native-community/async-storage"
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, Text, TouchableHighlight, Image, Modal } from 'react-native';

import { safeJSONParser } from "./../../../utils/helper"
import { authOperations } from "./../../../state/ducks/auth";
import { userOperations } from "./../../../state/ducks/user";
import { eventOperations } from "./../../../state/ducks/event";

import Navbar from '../../../components/Navbar';
import Tabbutton from '../../../components/Tabbutton';
import CustomIcon from '../../../components/CustomIcon';

import styles from './styles';
import { Color } from '../../../utils/variable';
import CustomButton from "./../../../components/CustomButton"

export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FoodModalVisible: false,
      UsersModalVisible: false,
      selected: "FoodonCampus",
    };
  }

  async componentDidMount() {
    const isAuthenticated = safeJSONParser(await AsyncStorage.getItem('isAuthenticated'));
    const user = safeJSONParser(await AsyncStorage.getItem('user'));
    const tokens = safeJSONParser(await AsyncStorage.getItem('tokens'));
    if (isAuthenticated) {
      this.props.initializeSession({ user, tokens });
      this.props.fetchEventList();
      this.props.fetchUserList();
    }
  }

  static navigationOptions = {
    header: null,
  };

  getEventStatus = (startDate, endDate) => {
    startDate = new Date(startDate).getTime();
    endDate = new Date(endDate).getTime();
    const current = new Date().getTime();
    if (startDate > current)
      return 'Upcoming'
    else if (startDate < current && endDate > current)
      return 'On going'
    else
      return 'Past'
  }

  onDeleteEvent = async (eventId) => {
    try {
      await this.props.deleteEvent(eventId);
    } catch (err) {
      console.log(err)
    }
  }

  setActionModalVisible = (visible) => {
    this.setState({ FoodModalVisible: visible });
  };

  setUsersModalVisible = (visible) => {
    this.setState({ UsersModalVisible: visible });
  };

  checkEventOwner = (event) => {
    const { role, id } = this.props.user;

    let isEventOwner = false;
    if (role === 'admin')
      isEventOwner = true;
    else if (role === 'staff' && event.createdBy === id)
      isEventOwner = true;

    return isEventOwner
  }

  renderUsers = ({ item }) => (
    <SwipeRow rightOpenValue={-170} disableLeftSwipe={!this.checkEventOwner(item)}>
      <View style={styles.swipeBack}>
        <TouchableOpacity
          style={[styles.swipebtnusers, styles.btnusers]}
        >
          <CustomIcon style={styles.swipeicon} name="user" />
          <Text style={styles.swipetxt}>Enable Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.swipebtnusers, styles.btndeleteusers]}
          onPress={() => {
            this.setUsersModalVisible(true);
          }}
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
            <Image
              source={{ uri: item.pic }}
              style={styles.userprofile}
            />
            <View style={styles.usremail}>
              <Text style={styles.usernametxt}>{item.name}</Text>
              <Text style={styles.usertxtemail}>{item.email}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </SwipeRow>
  );

  renderEvents = ({ item }) => (
    <SwipeRow rightOpenValue={-150} disableLeftSwipe={!this.checkEventOwner(item)}>
      <View style={styles.swipeBack}>
        <TouchableOpacity
          style={[styles.SwipeBtn, styles.btndelete]}
          onPress={() => {
            this.setActionModalVisible(true);
          }}
        >
          <CustomIcon style={styles.swipeicon} name="delete" />
          <Text style={styles.swipetxt}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.SwipeBtn, styles.btnedit]}
          onPress={() => {
            this.props.navigation.navigate('EditEvents', { event: item });
          }}>
          <CustomIcon style={styles.swipeicon} name="edit" />
          <Text style={styles.swipetxt}>Edit</Text>
        </TouchableOpacity>
      </View>
      <TouchableHighlight
        onPress={() => {
          this.props.navigation.navigate('EventsDetails', { event: item });
        }}
        style={styles.swiperowpadd}
        underlayColor={"#ffffff"}
      >
        <View style={styles.swiperowborder}>
          <View style={styles.listingtitle}>
            <Text numberOfLines={1} style={styles.title}>
              {item.name}
            </Text>
            <Text style={styles.upcomingtime}>{item.upcomingtime}</Text>
          </View>
          <Text style={styles.subtxt} numberOfLines={2}>
            {item.info}
          </Text>
          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.evtaddress}>
              {item.location}
            </Text>
            <Text style={styles.evtstatus}>{this.getEventStatus(item.startDate, item.endDate)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </SwipeRow>
  );

  render() {
    const { selected, FoodModalVisible, UsersModalVisible } = this.state;
    const isStudent = this.props.user.role === 'user'
    return (
      <View style={{ flex: 1 }}>
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
                  onClick={() => {
                    this.setState({ FoodModalVisible: false }, () => {
                      this.props.navigation.navigate("Events");
                    });
                  }}
                />
                <CustomButton
                  width="48%"
                  btnText="Cancel"
                  mainStyle={styles.actioncancelbtn}
                  btnStyle={styles.actioncancelbtntxt}
                  onClick={() => {
                    this.setActionModalVisible(!FoodModalVisible);
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
                Are you sure you want to delete this event
              </Text>
              <View style={styles.actionbuttons}>
                <CustomButton
                  width="48%"
                  btnText="Delete"
                  mainStyle={styles.actiondelete}
                  btnStyle={styles.actiondeletetxt}
                  onClick={() => {
                    this.setState({ UsersModalVisible: false }, () => {
                      this.props.navigation.navigate("Events");
                    });
                  }}
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
              Menutext="Food on Campus"></Tabbutton>
            {!isStudent && <Tabbutton
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
              Menutext="Users"></Tabbutton>}
          </View>
        </View>
        {selected === 'FoodonCampus' && (
          <View style={{ flex: 1 }}>
            <SwipeListView
              data={this.props.events}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              renderItem={this.renderEvents}
            />
            {!isStudent && <View style={styles.reatbtnview}>
              <CustomButton
                btnText="Create Event"
                mainStyle={styles.createvent}
                btnStyle={styles.createventxt}
                onClick={() => {
                  this.props.navigation.navigate("CreateEvent");
                }}
              />
            </View>}
          </View>
        )}
        {selected === 'Users' && !isStudent && (
          <View style={{ flex: 1 }}>
            <SwipeListView data={this.props.users.filter(u => u.role != 'admin')} renderItem={this.renderUsers} />
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
    user: get(state, 'auth.session.user', {})
  }
};

const mapDispatchToProps = {
  fetchUserList: userOperations.fetchList,
  fetchEventList: eventOperations.fetchList,
  deleteEvent: eventOperations.deleteEvent,
  initializeSession: authOperations.initializeSession
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);