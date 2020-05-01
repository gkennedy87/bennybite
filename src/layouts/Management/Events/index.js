import React, { useState, Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  Image,
  Modal,
} from "react-native";
import Navbar from "../../../components/Navbar";
import CustomButton from "../../../components/CustomButton";
import Tabbutton from "../../../components/Tabbutton";
import CustomIcon from "../../../components/CustomIcon";

import styles from "./styles";
import { Color } from "../../../utils/variable";

import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";

const Eventlist = [
  {
    key: "1",
    title: "TEDx talks",
    subtxt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s",
    evtaddress: "Ryder Avenue Seattle, WA 98109",
    evtstatus: "On going",
    upcomingtime: "",
  },
  {
    key: "2",
    title: "College campus farmer’s dsd  ff f ds ss gsdg s",
    subtxt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s",
    evtaddress: "Ryder Avenue Seattle, WA 98109",
    evtstatus: "On going",
    upcomingtime: "",
  },
  {
    key: "3",
    title: "Community service events Community service events",
    subtxt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s",
    evtaddress: "Ryder Avenue Seattle, WA 98109",
    evtstatus: "Upcoming",
    upcomingtime: "1pm-3pm, 23/12/2020",
    upcomingtime: "",
  },
  {
    key: "4",
    title: "Craft workshops",
    subtxt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s",
    evtaddress: "Ryder Avenue Seattle, WA 98109",
    evtstatus: "Upcoming",
    upcomingtime: "1pm-3pm, 23/12/2020",
    upcomingtime: "",
  },
  {
    key: "5",
    title: "TEDx talks",
    subtxt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s",
    evtaddress: "Ryder Avenue Seattle, WA 98109",
    evtstatus: "On going",
    upcomingtime: "",
  },
  {
    key: "6",
    title: "College campus farmer’s",
    subtxt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s",
    evtaddress: "Ryder Avenue Seattle, WA 98109",
    evtstatus: "On going",
    upcomingtime: "",
  },
  {
    key: "7",
    title: "Community service events",
    subtxt:
      "Millennials love expressing their values online, but 80% of them feel it’s essential for people to come together in",
    evtaddress: "Ryder Avenue Seattle, WA 98109",
    evtstatus: "Upcoming",
    upcomingtime: "1pm-3pm, 23/12/2020",
  },
  {
    key: "8",
    title: "Craft workshops 123",
    subtxt:
      "Host a workshop where students can make their own dorm room décor — think plant hangers, terrariu...",
    evtaddress: "Ryder Avenue Seattle, WA 98109",
    evtstatus: "Upcoming",
    upcomingtime: "1pm-3pm, 23/12/2020",
  },
];

const Userlist = [
  {
    key: 1,
    name: "Miyah Myles",
    email: "miyah.myles@gmail.com",
    userprofile:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6",
  },
  {
    key: 2,
    name: "June Cha",
    email: "june.cha@gmail.com",
    userprofile: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    key: 3,
    name: "Iida Niskanen",
    email: "iida.niskanen@gmail.com",
    userprofile: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    key: 4,
    name: "Renee Sims",
    email: "renee.sims@gmail.com",
    userprofile: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    key: 5,
    name: "Jonathan Nu\u00f1ez",
    email: "jonathan.nu\u00f1ez@gmail.com",
    userprofile: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    key: 6,
    name: "Sasha Ho",
    email: "sasha.ho@gmail.com",
    userprofile:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb",
  },
  {
    key: 7,
    name: "Abdullah Hadley",
    email: "abdullah.hadley@gmail.com",
    userprofile:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f",
  },
  {
    key: 8,
    name: "Thomas Stock",
    email: "thomas.stock@gmail.com",
    userprofile:
      "https://tinyfac.es/data/avatars/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg",
  },
  {
    key: 9,
    name: "Veeti Seppanen",
    email: "veeti.seppanen@gmail.com",
    userprofile: "https://randomuser.me/api/portraits/men/97.jpg",
  },
  {
    key: 10,
    name: "Bonnie Riley",
    email: "bonnie.riley@gmail.com",
    userprofile: "https://randomuser.me/api/portraits/women/26.jpg",
  },
];

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FoodModalVisible: false,
      UsersModalVisible: false,
      selected: "FoodonCampus",
    };
  }

  static navigationOptions = {
    header: null,
  };

  setActionModalVisible = (visible) => {
    this.setState({ FoodModalVisible: visible });
  };
  setUsersModalVisible = (visible) => {
    this.setState({ UsersModalVisible: visible });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { selected, FoodModalVisible, UsersModalVisible } = this.state;

    const renderItem = (data, rowMap) => (
      <SwipeRow rightOpenValue={-150}>
        <View style={styles.swipeBack}>
          <TouchableOpacity
            style={[styles.SwipeBtn, styles.btndelete]}
            onPress={() => {
              this.setActionModalVisible(true);
            }}
            //onPress={() => deleteRow(rowMap, data.item.key)}
          >
            <CustomIcon style={styles.swipeicon} name="delete" />
            <Text style={styles.swipetxt}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.SwipeBtn, styles.btnedit]}
            //onPress={() => closeRow(rowMap, data.item.key)}
            onPress={() => {
              this.props.navigation.navigate("EditEvents");
            }}
          >
            <CustomIcon style={styles.swipeicon} name="edit" />
            <Text style={styles.swipetxt}>Edit</Text>
          </TouchableOpacity>
        </View>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("EventsDetails");
          }}
          //onPress={() => console.log('You touched me')}
          style={styles.swiperowpadd}
          underlayColor={"#ffffff"}
        >
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

    const renderItemUsers = (data, rowMap) => (
      <SwipeRow rightOpenValue={-170}>
        <View style={styles.swipeBack}>
          <TouchableOpacity
            style={[styles.swipebtnusers, styles.btnusers]}
            //onPress={() => deleteRow(rowMap, data.item.key)}
          >
            <CustomIcon style={styles.swipeicon} name="user" />
            <Text style={styles.swipetxt}>Enable Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.swipebtnusers, styles.btndeleteusers]}
            onPress={() => {
              this.setUsersModalVisible(true);
            }}
            //onPress={() => closeRow(rowMap, data.item.key)}
          >
            <CustomIcon style={styles.swipeicon} name="delete" />
            <Text style={styles.swipetxt}>Delete</Text>
          </TouchableOpacity>
        </View>
        <TouchableHighlight
          //onPress={() => console.log('You touched me')}
          style={styles.swiperowpadd}
          underlayColor={"#ffffff"}
        >
          <View style={styles.swiperowborder}>
            <View style={styles.userlistingborder}>
              <Image
                source={{ uri: data.item.userprofile }}
                style={styles.userprofile}
              />
              <View style={styles.usremail}>
                <Text style={styles.usernametxt}>{data.item.name}</Text>
                <Text style={styles.usertxtemail}>{data.item.email}</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </SwipeRow>
    );

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
              Menutext="Food on Campus"
            ></Tabbutton>
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
          </View>
        </View>
        {selected === "FoodonCampus" && (
          <View style={{ flex: 1 }}>
            <SwipeListView
              data={Eventlist}
              previewRowKey={"0"}
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
                  this.props.navigation.navigate("CreateEvent");
                }}
              />
            </View>
          </View>
        )}
        {selected === "Users" && (
          <View style={{ flex: 1 }}>
            <SwipeListView data={Userlist} renderItem={renderItemUsers} />
          </View>
        )}
      </View>
    );
  }
}
