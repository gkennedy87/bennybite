import { connect } from "react-redux";
import { get } from "lodash";
import React, { Component } from "react";
import ImagePicker from "react-native-image-picker";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import CustomTextfield from "../../components/CustomTextfield";
import CustomButton from "../../components/CustomButton";
import { authOperations } from "./../../state/ducks/auth";
import HeaderTitle from "../../components/Header/HeaderTitle";
import styles from "./styles";

const options = {
  noData: true,
};

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pic: "",
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <HeaderTitle title={"Settings"} />,
    };
  };

  onUpload = async () => {
    ImagePicker.showImagePicker(options, async (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        try {
          const payload = new FormData();
          payload.append("pic", {
            uri: response.uri,
            type: response.type,
            name: response.fileName || "pic",
          });
          const result = await this.props.uploadProfilePic(
            this.props.user.id,
            payload
          );
          await AsyncStorage.setItem(
            "user",
            JSON.stringify(result.payload.user)
          );
        } catch (err) {}
      }
    });
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
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.profileview}
                    onPress={this.onUpload}
                  >
                    <Image style={styles.profilepic} source={pic} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.uploadtxt}>Edit</Text>
                <CustomTextfield
                  placeholder="John Doe"
                  editable={true}
                  inputmainstyle={{ marginBottom: 15, marginTop: 20 }}
                  inputstyle={{ paddingRight: 40 }}
                  ifIcon={true}
                  iconname={"user"}
                />
                <Text style={styles.emailtxt}>johndoe@gmail.com</Text>
              </View>
              <View style={styles.sendcancelmain}>
                <CustomButton
                  width="48%"
                  btnText="Save"
                  mainStyle={styles.sendbtn}
                  btnStyle={styles.sendbtntxt}
                  onClick={() => {
                    this.props.navigation.navigate("Profile");
                  }}
                />
                <CustomButton
                  width="48%"
                  btnText="Cancel"
                  mainStyle={styles.cancelbtn}
                  btnStyle={styles.cancelbtntxt}
                  onClick={() => {
                    this.props.navigation.navigate("Profile");
                  }}
                />
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

const mapDispatchToProps = {
  uploadProfilePic: authOperations.updateProfilePic,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
