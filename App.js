/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 **/

import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import {
  createAppContainer,
  withNavigation,
  NavigationActions,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AsyncStorage from "@react-native-community/async-storage";

import { configPushNotification } from "./src/config/pushNotification";

import Login from "./src/layouts/Login";
import Signup from "./src/layouts/Signup";
import ForgotPassword from "./src/layouts/ForgotPassword";
import ChangePassword from "./src/layouts/ChangePassword";

import Events from "./src/layouts/Management/Events";
import EventStudents from "./src/layouts/Management/EventStudents";

import Profile from "./src/layouts/Profile";
import EditProfile from "./src/layouts/EditProfile";
import EditEvents from "./src/layouts/Management/EditEvents";
import CreateEvent from "./src/layouts/Management/CreateEvent";
import EventsDetails from "./src/layouts/Management/EventsDetails";

import Loader from "./src/components/Loader";

import TermsConditions from "./src/layouts/TermsConditions";

import { isIOS } from "./src/utils/theme";
import GlobalStyles from "./src/utils/GlobalStyles";
import HeaderLeft from "./src/components/Header/HeaderLeft";

import ResetPassword from "./src/layouts/ResetPassword";

import configureStore from "./src/state/store";

const store = configureStore({});

const Authenticate = withNavigation((props) => {
  AsyncStorage.getItem("isAuthenticated").then((authenticated) => {
    if (authenticated) {
      props.navigation.replace("Events");
    } else {
      props.navigation.replace("Login");
    }
  });
  return <></>;
});

Authenticate.navigationOptions = {
  header: null,
};

const AppNavigator = createStackNavigator(
  {
    Authenticate: { screen: Authenticate },
    Login: { screen: Login },
    Signup: { screen: Signup },
    ForgotPassword: { screen: ForgotPassword },
    Events: { screen: Events },
    EventsDetails: { screen: EventsDetails },
    CreateEvent: { screen: CreateEvent },
    EditEvents: { screen: EditEvents },
    ChangePassword: { screen: ChangePassword },
    Profile: { screen: Profile },
    EditProfile: { screen: EditProfile },
    ResetPassword: { screen: ResetPassword, path: "ResetPassword/:token" },
    EventStudents: { screen: EventStudents },
    TermsConditions: { screen: TermsConditions },
  },
  {
    initialRouteName: "Authenticate",
    defaultNavigationOptions: ({ navigation }) => ({
      gesturesEnabled: false,
      headerTransparent: false,
      headerStyle: GlobalStyles.headerStyle,
      headerLeft: (
        <HeaderLeft iconName="back" onPress={() => navigation.goBack()} />
      ),
      headerRight: isIOS() ? null : <View style={{ width: 30 }}></View>,
    }),
  }
);

const RootNavigator = createAppContainer(AppNavigator);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isConnected: false,
    };
    configPushNotification(this.onNotification);
    this.navigation = null;
  }

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }

  _handleConnectivityChange = (state) => {
    console.log("handleConnectivityChange", state.isConnected);
    this.setState({
      isConnected: state.isConnected,
    });
  };

  //Gets called when the notification comes in
  onNotification = async (notif) => {
    //console.log("onNotification receive", notif);
    const authenticate = await AsyncStorage.getItem("isAuthenticated");
    if (authenticate) {
      //console.log("Authenticate :", authenticate);
      if (notif.userInteraction) {
        let eventId =
          Platform.OS === "ios" ? notif.data.eventId : notif.eventId;
        console.log("EventId :", eventId);
        if (eventId) {
          this.navigation.dispatch(
            NavigationActions.navigate({
              routeName: "EventsDetails",
              params: { eventId },
            })
          );
        }
      }
    }
  };

  render() {
    const { isConnected } = this.state;
    return (
      <Provider store={store}>
        <Loader></Loader>
        <View style={styles.container}>
          <RootNavigator
            screenProps={{ isConnected: isConnected }}
            ref={(nav) => {
              this.navigation = nav;
            }}
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
