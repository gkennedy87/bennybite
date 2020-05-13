import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage"
import { connect } from "react-redux";
import { get } from "lodash";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { authOperations } from "./../../state/ducks/auth";
import HeaderTitle from "../../components/Header/HeaderTitle";
import HeaderRight from "../../components/Header/HeaderRight";
import styles from "./styles";
import { Globals } from "../../utils/variable";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <HeaderTitle title={"Settings"} />,
      headerTitle: () => <HeaderTitle title={"Settings"} />,
      headerRight: (
        <HeaderRight
          buttonTitle="Edit"
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
        />
      ),
    };
  };

  render() {
    const { user } = this.props;
    let pic = require('../../assets/Images/user.png');
    if (user.pic)
      pic = { uri: user.pic }

    return (
      <View style={styles.safeareaview}>
        <SafeAreaView style={styles.contentcenter}>
          <View style={styles.centeredView}>
            <View style={styles.profilecontentcenter}>
              <View style={styles.profilecontent}>
                <Text style={styles.prfltxt}>User Profile</Text>
                <TouchableOpacity style={styles.profileview}>
                  <Image style={styles.profilepic} source={pic} />
                </TouchableOpacity>
                <Text style={styles.usertxt}>{user.name}</Text>
                <Text style={styles.emailtxt}>{user.email}</Text>
                <View style={styles.bottomtxt}>
                  <View style={styles.line}></View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("ChangePassword");
                    }}
                  >
                    <Text style={styles.chnpasstxt}>Change password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.onLogout}>
                    <Text style={styles.logouttxt}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  onLogout = async () => {
    try {
      const device_token = await AsyncStorage.getItem(Globals.kDeviceToken);
      const device_type = await AsyncStorage.getItem(Globals.kDeviceType);
      await this.props.logout({
        device_type
      });
      await AsyncStorage.clear()
      await AsyncStorage.setItem(Globals.kDeviceToken, device_token);
      await AsyncStorage.setItem(Globals.kDeviceType, device_type);
      this.props.navigation.navigate("Login");
    } catch (err) {
      console.log("Errror", err);
    }
  };
}

const mapStateToProps = (state) => ({
  user: get(state, "auth.session.user", {}),
});

const mapDispatchToProps = { logout: authOperations.logout };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
