import React, {Component} from 'react';
import {View, TouchableOpacity, Text, TouchableHighlight} from 'react-native';
import Navbar from '../../../components/Navbar';
import CustomButton from '../../../components/CustomButton';
import CustomIcon from '../../../components/CustomIcon';

import styles from './styles';
import {Color} from '../../../utils/variable';

import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';

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

export default class EventStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const {navigate} = this.props.navigation;

    const renderItem = (data, rowMap) => (
      <SwipeRow rightOpenValue={-150}>
        <View style={styles.swipeBack}>
          <TouchableOpacity
            style={[styles.SwipeBtn, styles.btndelete]}
            //onPress={() => deleteRow(rowMap, data.item.key)}
          >
            <CustomIcon style={styles.swipeicon} name="delete" />
            <Text style={styles.swipetxt}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.SwipeBtn, styles.btnedit]}
            //onPress={() => closeRow(rowMap, data.item.key)}
            onPress={() => {
              this.props.navigation.navigate('EditEvents');
            }}>
            <CustomIcon style={styles.swipeicon} name="edit" />
            <Text style={styles.swipetxt}>Edit</Text>
          </TouchableOpacity>
        </View>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate('EventsDetails');
          }}
          //onPress={() => console.log('You touched me')}
          style={styles.swiperowpadd}
          underlayColor={'#ffffff'}>
          <View style={styles.swiperowborder}>
            <View style={styles.listingtitle}>
              <Text numberOfLines={1} style={styles.title}>
                {data.item.title}
              </Text>
              <Text style={styles.upcomingtime}>{data.item.upcomingtime}</Text>
            </View>
            <Text style={styles.subtxt} numberOfLines={2}>
              {data.item.subtxt}
            </Text>
            <View style={styles.row}>
              <Text numberOfLines={1} style={styles.evtaddress}>
                {data.item.evtaddress}
              </Text>
              <Text style={styles.evtstatus}>{data.item.evtstatus}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </SwipeRow>
    );

    return (
      <View style={{flex: 1}}>
        <Navbar />

        <View style={styles.tabmain}>
          <View style={styles.tabbutton}>
            <Text>Food on Campus</Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <SwipeListView
            data={Eventlist}
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
      </View>
    );
  }
}
