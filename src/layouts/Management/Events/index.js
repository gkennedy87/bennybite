import React, {Component} from 'react';
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import Navbar from '../../../components/Navbar';
import CustomButton from '../../../components/CustomButton';
import Tabbutton from '../../../components/Tabbutton';
import styles from './styles';
import {Color} from '../../../utils/variable';

import {RectButton} from 'react-native-gesture-handler';

import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';

const Eventlist = [
  {
    id: '1',
    title: 'TEDx talks',
    subtxt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'On going',
    upcomingtime: '',
  },
  {
    id: '2',
    title: 'College campus farmer’s dsd  ff f ds ss gsdg s',
    subtxt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'On going',
    upcomingtime: '',
  },
  {
    id: '3',
    title: 'Community service events Community service events',
    subtxt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'Upcoming',
    upcomingtime: '1pm-3pm, 23/12/2020',
    upcomingtime: '',
  },
  {
    id: '4',
    title: 'Craft workshops',
    subtxt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'Upcoming',
    upcomingtime: '1pm-3pm, 23/12/2020',
    upcomingtime: '',
  },
  {
    id: '1',
    title: 'TEDx talks',
    subtxt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'On going',
    upcomingtime: '',
  },
  {
    id: '2',
    title: 'College campus farmer’s',
    subtxt:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'On going',
    upcomingtime: '',
  },
  {
    id: '3',
    title: 'Community service events',
    subtxt:
      'Millennials love expressing their values online, but 80% of them feel it’s essential for people to come together in',
    evtaddress: 'Ryder Avenue Seattle, WA 98109',
    evtstatus: 'Upcoming',
    upcomingtime: '1pm-3pm, 23/12/2020',
  },
  {
    id: '4',
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

const Row = ({item}) => (
  <RectButton
    style={styles.userlistingspace}
    //onPress={() => alert(item.userprofile, item.name, item.email)}
  >
    <View style={styles.userlistingborder}>
      <Image source={{uri: item.userprofile}} style={styles.userprofile} />
      <View style={styles.usremail}>
        <Text style={styles.usernametxt}>{item.name}</Text>
        <Text style={styles.usertxtemail}>{item.email}</Text>
      </View>
    </View>
  </RectButton>
);

const SwipeableRow = ({item, index}) => {
  return (
    <AppleStyleSwipeableRow>
      <Row item={item} />
    </AppleStyleSwipeableRow>
  );
};

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'FoodonCampus',
    };
  }

  static navigationOptions = {
    header: null,
  };

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
    const {navigate} = this.props.navigation;
    const {selected} = this.state;
    const {children} = this.props;

    return (
      <View style={{flex: 1}}>
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
          <View style={{flex: 1}}>
            <FlatList
              data={Eventlist}
              renderItem={({item}) => this.renderItem(item)}
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
          <View style={{flex: 1}}>
            <FlatList
              data={Userlist}
              // ItemSeparatorComponent={() => }
              renderItem={({item, index}) => (
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
