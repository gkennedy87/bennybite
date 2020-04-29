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

const Eventlist = [
  {
    id: '1',
    name: 'TEDx talks',
    info:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    location: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'On going',
    upcomingtime: '',
  },
  {
    id: '2',
    name: 'College campus farmer’s dsd  ff f ds ss gsdg s',
    info:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    location: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'On going',
    upcomingtime: '',
  },
  {
    id: '3',
    name: 'Community service events Community service events',
    info:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    location: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'Upcoming',
    upcomingtime: '1pm-3pm, 23/12/2020',
    upcomingtime: '',
  },
  {
    id: '4',
    name: 'Craft workshops',
    info:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    location: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'Upcoming',
    upcomingtime: '1pm-3pm, 23/12/2020',
    upcomingtime: '',
  },
  {
    id: '1',
    name: 'TEDx talks',
    info:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    location: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'On going',
    upcomingtime: '',
  },
  {
    id: '2',
    name: 'College campus farmer’s',
    info:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    location: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'On going',
    upcomingtime: '',
  },
  {
    id: '3',
    name: 'Community service events',
    info:
      'Millennials love expressing their values online, but 80% of them feel it’s essential for people to come together in',
    location: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'Upcoming',
    upcomingtime: '1pm-3pm, 23/12/2020',
  },
  {
    id: '4',
    name: 'Craft workshops 123',
    info:
      'Host a workshop where students can make their own dorm room décor — think plant hangers, terrariu...',
    location: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'Upcoming',
    upcomingtime: '1pm-3pm, 23/12/2020',
  },
];

const Userlist = [
  {
    name: 'Miyah Myles',
    email: 'miyah.myles@gmail.com',
    userprofile:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
  },
  {
    name: 'June Cha',
    email: 'june.cha@gmail.com',
    userprofile: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Iida Niskanen',
    email: 'iida.niskanen@gmail.com',
    userprofile: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Renee Sims',
    email: 'renee.sims@gmail.com',
    userprofile: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Jonathan Nu\u00f1ez',
    email: 'jonathan.nu\u00f1ez@gmail.com',
    userprofile: 'https://randomuser.me/api/portraits/men/43.jpg',
  },
  {
    name: 'Sasha Ho',
    email: 'sasha.ho@gmail.com',
    userprofile:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
  },
  {
    name: 'Abdullah Hadley',
    email: 'abdullah.hadley@gmail.com',
    userprofile:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f',
  },
  {
    name: 'Thomas Stock',
    email: 'thomas.stock@gmail.com',
    userprofile:
      'https://tinyfac.es/data/avatars/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg',
  },
  {
    name: 'Veeti Seppanen',
    email: 'veeti.seppanen@gmail.com',
    userprofile: 'https://randomuser.me/api/portraits/men/97.jpg',
  },
  {
    name: 'Bonnie Riley',
    email: 'bonnie.riley@gmail.com',
    userprofile: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
];

const Row = ({ item }) => (
  <RectButton  style={styles.userlistingspace}>
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
      console.log(user, tokens)
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

  renderItem(item) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('EventsDetails');
        }}
        style={styles.listingspace}>
        <View style={styles.listingborder}>
          <View style={styles.listingtitle}>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <Text style={styles.upcomingtime}>{item.upcomingtime}</Text>
          </View>
          <Text style={styles.subtxt} numberOfLines={2}>
            {item.subtxt}
          </Text>
          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.evtaddress}>
              {item.evtaddress}
            </Text>
            <Text style={styles.evtstatus}>{item.evtstatus}</Text>
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