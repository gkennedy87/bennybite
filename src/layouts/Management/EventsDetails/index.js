import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Modal,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CustomTextfield from '../../../components/CustomTextfield';
import CustomButton from '../../../components/CustomButton';
import CustomIcon from '../../../components/CustomIcon';
import styles from './styles';
import { Color, Font } from '../../../utils/variable';
import { cos } from 'react-native-reanimated';

export default class EventsDetails extends Component {
  constructor(props) {
    super(props);
    this.offset = 0;
    this.state = {
      modalVisible: false,
      scrollOffset: new Animated.Value(0),
      titleWidth: 0,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.state.scrollOffset.addListener(({ value }) => (this.offset = value));
  }

  onScroll = (e) => {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollOffset.setValue(offset);
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
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

  render() {
    const { modalVisible, scrollOffset } = this.state;
    const event = this.props.navigation.state.params.event;
    const screenWidth = Dimensions.get('window').width;

    return (
      <View style={styles.container}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CustomTextfield
                placeholder={event.name}
                editable={true}
                inputmainstyle={{ marginBottom: 20 }}
                inputstyle={{
                  fontFamily: Font.MYRIAD_SEMIBOLD,
                  fontSize: Font.FONTSIZE_16,
                }}
              ></CustomTextfield>
              <CustomTextfield
                placeholder="Start typing..."
                editable={true}
                inputmainstyle={{ marginBottom: 20 }}
                inputstyle={{
                  height: 150,
                  paddingTop: 14,
                  paddingBottom: 14,
                  textAlignVertical: 'top',
                }}
                multiline={true}
              ></CustomTextfield>
              <View style={styles.CreateEventMain}>
                <CustomButton
                  width="48%"
                  btnText="Send"
                  mainStyle={styles.createvent}
                  btnStyle={styles.createventxt}
                  onClick={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                />
                <CustomButton
                  width="48%"
                  btnText="Cancel"
                  mainStyle={styles.deleteevent}
                  btnStyle={styles.deleteeventxt}
                  onClick={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.eventbackbtn}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Events');
            }}>
            <CustomIcon style={styles.backicon} name="back" />
          </TouchableOpacity>
        </View>

        <View style={styles.editbtn}>
          <TouchableOpacity
            onPress={() => {
              console.log(event)
              this.props.navigation.navigate('EditEvents', { event });
            }}>
            <CustomIcon style={styles.editicon} name="edit" />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.header,
            {
              paddingHorizontal: screenWidth * 0.05,
              width: screenWidth,
              marginTop: scrollOffset.interpolate({
                inputRange: [0, 200],
                outputRange: [30, -5],
                extrapolate: 'clamp',
              }),
            },
          ]}>
          <Animated.Text
            onLayout={(e) => {
              if (this.offset === 0 && this.state.titleWidth === 0) {
                const titleWidth = e.nativeEvent.layout.width;
                this.setState({ titleWidth });
              }
            }}
            style={[
              styles.eventitle,
              {
                fontSize: scrollOffset.interpolate({
                  inputRange: [0, 200],
                  outputRange: [34, 16],
                  extrapolate: 'clamp',
                }),
              },
            ]}>
            {event.name}
          </Animated.Text>
          <Animated.View
            style={{
              width: scrollOffset.interpolate({
                inputRange: [0, 200],
                outputRange: [screenWidth * 0.95 - this.state.titleWidth, 0],
                extrapolate: 'clamp',
              }),
            }}
          />
        </Animated.View>

        <ScrollView
          style={{ flex: 1, width: '100%' }}
          contentContainerStyle={{ width: '100%' }}
          onScroll={this.onScroll}
          scrollEventThrottle={20}>
          <View style={styles.contentspacing}>
            <View style={styles.timestatus}>
              <Text style={styles.timetitle}>Time</Text>
              <Text style={styles.eventstatus}>{this.getEventStatus(event.startDate, event.endDate)}</Text>
            </View>
            <View>
              <Text style={styles.available}>Food available until</Text>
            </View>
            <View style={styles.titlecount}>
              <Text style={styles.conftitle}>RSVP Confirmed</Text>
              <View style={styles.countmain}>
                <Text style={styles.count}>{event.rsvp.length}</Text>
              </View>
            </View>
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
            <View>
              <Text style={styles.locationtxt}>Location</Text>
              <Text style={styles.addresstxt}>
                {event.location}
              </Text>
              <Text style={styles.eventdetailsttl}>Event Details</Text>
              <Text style={styles.eventdetailstxt}>
                {event.info}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
