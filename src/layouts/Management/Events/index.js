import React, { Component } from 'react';
import { connect } from "react-redux"
import { View, FlatList, Text, Image } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from "@react-native-community/async-storage"

import Navbar from '../../../components/Navbar';
import Tabbutton from '../../../components/Tabbutton';
import CustomButton from '../../../components/CustomButton';

import styles from './styles';
import { Color } from '../../../utils/variable';

import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';

import { eventOperations } from "./../../../state/ducks/event";
import { userOperations } from "./../../../state/ducks/user";
import { authOperations } from "./../../../state/ducks/auth";

import { safeJSONParser } from "./../../../utils/helper"

const Row = ({ item }) => (
  <RectButton style={styles.userlistingspace}>
    <View style={styles.userlistingborder}>
      <Image source={{ uri: item.pic }} style={styles.userprofile} />
      <View style={styles.usremail}>
        <Text style={styles.usernametxt}>{item.name}</Text>
        <Text style={styles.usertxtemail}>{item.email}</Text>
      </View>
    </View>
  </RectButton>
);

const SwipeableRow = ({ item, index }) => {
  return (
    <AppleStyleSwipeableRow>
      <Row item={item} />
    </AppleStyleSwipeableRow>
  );
};

export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'Users',
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

  renderItem(event) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('EventsDetails', { event: event });
        }}
        style={styles.listingspace}>
        <View style={styles.listingborder}>
          <View style={styles.listingtitle}>
            <Text numberOfLines={1} style={styles.title}>
              {event.name}
            </Text>
            <Text style={styles.upcomingtime}>{event.upcomingtime}</Text>
          </View>
          <Text style={styles.subtxt} numberOfLines={2}>
            {event.info}
          </Text>
          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.evtaddress}>
              {event.location}
            </Text>
            <Text style={styles.evtstatus}>{this.getEventStatus(event.startDate, event.endDate)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { selected } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Navbar />

        <View style={styles.tabmain}>
          <View style={styles.tabbutton}>
            <Tabbutton
              MenubuttonStyle={{}}
              MenutextStyle={{
                color:
                  selected === 'FoodonCampus'
                    ? Color.TXT_BLACK
                    : Color.TXT_DARKGRAY,
              }}
              MenuactiveStyle={{
                backgroundColor:
                  selected === 'FoodonCampus' ? Color.TXT_BLACK : 'transparent',
              }}
              onClick={() => {
                this.setState({
                  selected: 'FoodonCampus',
                });
              }}
              Menutext="Food on Campus"></Tabbutton>
            <Tabbutton
              MenubuttonStyle={{}}
              MenutextStyle={{
                color:
                  selected === 'Users' ? Color.TXT_BLACK : Color.TXT_DARKGRAY,
              }}
              MenuactiveStyle={{
                backgroundColor:
                  selected === 'Users' ? Color.TXT_BLACK : 'transparent',
              }}
              onClick={() => {
                this.setState({
                  selected: 'Users',
                });
              }}
              Menutext="Users"></Tabbutton>
          </View>
        </View>
        {selected === 'FoodonCampus' && (
          <View style={{ flex: 1 }}>
            <FlatList
              data={this.props.events}
              renderItem={({ item }) => this.renderItem(item)}
              keyExtractor={(item) => item.id}
            />
            <View style={styles.reatbtnview}>
              <CustomButton
                btnText="Create Event"
                mainStyle={styles.createvent}
                btnStyle={styles.createventxt}
                onClick={() => {
                  this.props.navigation.navigate('CreateEvent');
                }}
              />
            </View>
          </View>
        )}
        {selected === 'Users' && (
          <View style={{ flex: 1 }}>
            <FlatList
              data={this.props.users.filter(u => u.role == 'user')}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item, index }) => (
                <SwipeableRow item={item} index={index} />
              )}
              keyExtractor={(item, index) => `message ${index}`}
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
    events: state.event.list
  }
};

const mapDispatchToProps = {
  fetchUserList: userOperations.fetchList,
  fetchEventList: eventOperations.fetchList,
  initializeSession: authOperations.initializeSession
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);