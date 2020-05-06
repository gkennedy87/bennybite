import React, { Component } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import HeaderTitle from "../../components/Header/HeaderTitle";
import HeaderRight from "../../components/Header/HeaderRight";
import styles from "./styles";

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
    let pic = require("../../assets/Images/user.png");
    if (this.props.user.pic) pic = { uri: this.props.user.pic };

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
                {/* <Text style={styles.uploadtxt}>Upload</Text> */}
                <Text style={styles.usertxt}>John Doe</Text>
                <Text style={styles.emailtxt}>johndoe@gmail.com</Text>
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
                    onPress={() => {
                      this.props.navigation.navigate("Login");
                    }}
                  >
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
}

const mapStateToProps = (state) => ({
  user: get(state, "auth.session.user", {}),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
