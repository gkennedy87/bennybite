import { connect } from "react-redux";
import { get, trimStart , trim} from "lodash";
import React, { Component } from "react";
import ImagePicker from "react-native-image-picker";
import AsyncStorage from "@react-native-community/async-storage";
import { View, SafeAreaView, Text, TouchableOpacity, Image } from "react-native";

import { authOperations } from "./../../state/ducks/auth";
import { ErrorMessage } from "../../utils/message";

import CustomToast from "../../components/CustomToast";
import CustomButton from "../../components/CustomButton";
import CustomTextfield from "../../components/CustomTextfield";
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
      name: {
        value: trim(this.props.user.name),
        message: [],
        isValid: false,
      },
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
        let toastMessage = '', toastType = '';
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
          toastMessage = result.message;
          await AsyncStorage.setItem("user", JSON.stringify(result.payload.user));
        } catch (err) {
          toastMessage = get(err, 'response.data.message', 'Something went wrong!')
          toastType = 'warning';
        }
        this.setState({
          showToast: true,
          toastMessage,
          toastType
        })
      }
    });
  };

  onNameChange = (text) => {
    const name = this.state.name;
    name.value = trimStart(text);
    name.message = [];
    name.isValid = true;

    if (name.value.length == 0 || name.value == "") {
      name.message.push(ErrorMessage.EMPTY_USER);
      name.isValid = false;
    }

    this.setState({ name });
  };

  onUpdateName = async () => {
    let toastMessage = '', toastType = '';
    try {
      const { name } = this.state
      const response = await this.props.updateProfile(this.props.user.id, { name: name.value });
      toastMessage = response.message;
      await AsyncStorage.setItem("user", JSON.stringify(response.payload.user));
      this.props.navigation.navigate('Profile')
    } catch (err) {
      toastMessage = get(err, 'response.data.message', 'Something went wrong!')
      toastType = 'warning';
    }
    this.setState({
      showToast: true,
      toastMessage,
      toastType
    })
  }

  onCancel = () => {
    // this.onNameChange(this.props.user.name);
    this.props.navigation.navigate('Profile')
  }

  render() {
    const { user } = this.props;
    const { name, toastMessage, showToast, toastType } = this.state;
    const isValid = name.isValid

    let pic = require("../../assets/Images/user.png");
    if (user.pic) pic = { uri: user.pic };

    return (
      <View style={styles.safeareaview}>
        <CustomToast
          message={toastMessage}
          isToastVisible={showToast}
          type={toastType}
          onHide={() => this.setState({ showToast: false })}
        />
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
                  txtvalue={name.value}
                  errorMsgs={name.message}
                  onChangeText={this.onNameChange}
                />
                <Text style={styles.emailtxt}>{user.email}</Text>
              </View>
              <View style={styles.sendcancelmain}>
                <CustomButton
                  width="48%"
                  btnText="Save"
                  mainStyle={isValid ? styles.sendbtn : styles.sendbtngray}
                  btnStyle={isValid ? styles.sendbtntxt : styles.sendbtntxtdisable}
                  disabled={!isValid}
                  onClick={this.onUpdateName}
                />
                <CustomButton
                  width="48%"
                  btnText="Cancel"
                  mainStyle={styles.cancelbtn}
                  btnStyle={styles.cancelbtntxt}
                  onClick={this.onCancel}
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
  updateProfile: authOperations.updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
