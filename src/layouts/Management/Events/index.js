import React, { Component } from 'react';
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage"
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { View, TouchableOpacity, Text, TouchableHighlight, Image } from 'react-native';

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


const Eventlist = [
  {
    key: '1',
    title: 'TEDx talks',
    subtxt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'On going',
    upcomingtime: '',
  },
  {
    key: '2',
    title: 'College campus farmer’s dsd  ff f ds ss gsdg s',
    subtxt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'On going',
    upcomingtime: '',
  },
  {
    key: '3',
    title: 'Community service events Community service events',
    subtxt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'Upcoming',
    upcomingtime: '1pm-3pm, 23/12/2020',
    upcomingtime: '',
  },
  {
    key: '4',
    title: 'Craft workshops',
    subtxt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'Upcoming',
    upcomingtime: '1pm-3pm, 23/12/2020',
    upcomingtime: '',
  },
  {
    key: '5',
    title: 'TEDx talks',
    subtxt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'On going',
    upcomingtime: '',
  },
  {
    key: '6',
    title: 'College campus farmer’s',
    subtxt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'On going',
    upcomingtime: '',
  },
  {
    key: '7',
    title: 'Community service events',
    subtxt:
      'Millennials love expressing their values online, but 80% of them feel it’s essential for people to come together in',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'Upcoming',
    upcomingtime: '1pm-3pm, 23/12/2020',
  },
  {
    key: '8',
    title: 'Craft workshops 123',
    subtxt:
      'Host a workshop where students can make their own dorm room décor — think plant hangers, terrariu...',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'Upcoming',
    upcomingtime: '1pm-3pm, 23/12/2020',
  },
];

const Userlist = [
  {
    key: 1,
    name: 'Miyah Myles',
    email: 'miyah.myles@gmail.com',
    userprofile:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
  },
  {
    key: 2,
    name: 'June Cha',
    email: 'june.cha@gmail.com',
    userprofile: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    key: 3,
    name: 'Iida Niskanen',
    email: 'iida.niskanen@gmail.com',
    userprofile: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    key: 4,
    name: 'Renee Sims',
    email: 'renee.sims@gmail.com',
    userprofile: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    key: 5,
    name: 'Jonathan Nu\u00f1ez',
    email: 'jonathan.nu\u00f1ez@gmail.com',
    userprofile: 'https://randomuser.me/api/portraits/men/43.jpg',
  },
  {
    key: 6,
    name: 'Sasha Ho',
    email: 'sasha.ho@gmail.com',
    userprofile:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
  },
  {
    key: 7,
    name: 'Abdullah Hadley',
    email: 'abdullah.hadley@gmail.com',
    userprofile:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f',
  },
  {
    key: 8,
    name: 'Thomas Stock',
    email: 'thomas.stock@gmail.com',
    userprofile:
      'https://tinyfac.es/data/avatars/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg',
  },
  {
    key: 9,
    name: 'Veeti Seppanen',
    email: 'veeti.seppanen@gmail.com',
    userprofile: 'https://randomuser.me/api/portraits/men/97.jpg',
  },
  {
    key: 10,
    name: 'Bonnie Riley',
    email: 'bonnie.riley@gmail.com',
    userprofile: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
];



export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'FoodonCampus',
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

  render() {
    const { selected } = this.state;

    const renderItem = ({ item }) => (
      <SwipeRow rightOpenValue={-150}>
        <View style={styles.swipeBack}>
          <TouchableOpacity
            style={[styles.SwipeBtn, styles.btndelete]}
            onPress={() => this.onDeleteEvent(item._id)}
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
          underlayColor={'#ffffff'}>
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

    const renderItemUsers = ({ item }) => (
      <SwipeRow rightOpenValue={-170}>
        <View style={styles.swipeBack}>
          <TouchableOpacity
            style={[styles.swipebtnusers, styles.btnusers]}
          >
            <CustomIcon style={styles.swipeicon} name="user" />
            <Text style={styles.swipetxt}>Enable Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.swipebtnusers, styles.btndeleteusers]}
          >
            <CustomIcon style={styles.swipeicon} name="delete" />
            <Text style={styles.swipetxt}>Delete</Text>
          </TouchableOpacity>
        </View>
        <TouchableHighlight
          style={styles.swiperowpadd}
          underlayColor={'#ffffff'}>
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
            <SwipeListView
              data={this.props.events}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              renderItem={renderItem}
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
            <SwipeListView data={this.props.users.filter(u => u.role != 'admin')} renderItem={renderItemUsers} />
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
  deleteEvent: eventOperations.deleteEvent,
  initializeSession: authOperations.initializeSession
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);