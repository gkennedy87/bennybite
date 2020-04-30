import React, {Component} from 'react';
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
import {Color, Font} from '../../../utils/variable';

export default class EventsDetails extends Component {
  constructor(props) {
    super(props);
    this.offset = 0;
    this.state = {
      modalVisible: false,
      ActionModalVisible: false,
      scrollOffset: new Animated.Value(0),
      titleWidth: 0,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.state.scrollOffset.addListener(({value}) => (this.offset = value));
  }

  onScroll = (e) => {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollOffset.setValue(offset);
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  setActionModalVisible = (visible) => {
    this.setState({ActionModalVisible: visible});
  };

  render() {
    const {navigate} = this.props.navigation;
    const {modalVisible, ActionModalVisible, scrollOffset} = this.state;
    const screenWidth = Dimensions.get('window').width;

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={ActionModalVisible}>
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
                    this.setState({ActionModalVisible: false}, () => {
                      this.props.navigation.navigate('Events');
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CustomTextfield
                placeholder="TEDx talks"
                editable={true}
                inputmainstyle={{marginBottom: 20}}
                inputstyle={{
                  fontFamily: Font.MYRIAD_SEMIBOLD,
                  fontSize: Font.FONTSIZE_16,
                }}
                //onChangeText={this.onEmailTextChange}
                //value={email.value}
                //errorMsgs={email.message}
              ></CustomTextfield>
              <CustomTextfield
                placeholder="Start typing..."
                editable={true}
                inputmainstyle={{marginBottom: 20}}
                inputstyle={{
                  height: 150,
                  paddingTop: 14,
                  paddingBottom: 14,
                  textAlignVertical: 'top',
                }}
                multiline={true}
                //onChangeText={this.onEmailTextChange}
                //value={email.value}
                //errorMsgs={email.message}
              ></CustomTextfield>
              <View style={styles.sendcancelmain}>
                <CustomButton
                  width="48%"
                  btnText="Send"
                  mainStyle={styles.sendbtn}
                  btnStyle={styles.sendbtntxt}
                  onClick={() => {
                    this.setModalVisible(!modalVisible);
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
              this.props.navigation.navigate('EditEvents');
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
                this.setState({titleWidth});
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
            TEDx talks
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
          style={{flex: 1, width: '100%'}}
          contentContainerStyle={{width: '100%'}}
          onScroll={this.onScroll}
          scrollEventThrottle={20}>
          <View style={styles.contentspacing}>
            <View style={styles.timestatus}>
              <Text style={styles.timetitle}>Time</Text>
              <Text style={styles.eventstatus}>Food Available Until:</Text>
            </View>
            <View>
              <Text style={styles.available}>12:30pm</Text>
            </View>
            {/* <View style={styles.titlecount}>
              <Text style={styles.conftitle}>RSVP Confirmed</Text>
              <View style={styles.countmain}>
                <Text style={styles.count}>10</Text>
              </View>
            </View> */}
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
                Ryder Avenue Seattle, WA 98109
              </Text>
              <Text style={styles.eventdetailsttl}>Event Details</Text>
              <Text style={styles.eventdetailstxt}>
                Millennials love expressing their values online, but 80% of them
                feel it’s essential for people to come together in Did you know
                that the iconic idea-sharing forum TEDx started as a campus
                event at USC in 2009? Now, the platform encourages campuses to
                start their own version of the digitally evolved lecture series.
                Capturing such talks on video makes for powerful, potentially
                viral social media. For details on how to start a campus TEDx,
                visit the website.Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
              <Text style={styles.eventdetailstxt}>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages,Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages,Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages,simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages,Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages,
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.reatbtnview}>
          <CustomButton
            btnText="Delete event"
            mainStyle={styles.createvent}
            btnStyle={styles.createventxt}
            // onClick={() => {
            //   this.props.navigation.navigate('Events');
            // }}
            onClick={() => {
              this.setActionModalVisible(true);
            }}
          />
        </View>
      </View>
    );
  }
}
