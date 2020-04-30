/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 **/

import React, { Component, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage"
import PubNub from 'pubnub'
import PubNubReact from 'pubnub-react';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

// import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';

import Login from './src/layouts/Login';
import ForgotPassword from './src/layouts/ForgotPassword';
import ChangePassword from './src/layouts/ChangePassword';

import Events from './src/layouts/Management/Events';
import EventsDetails from './src/layouts/Management/EventsDetails';
import CreateEvent from './src/layouts/Management/CreateEvent';
import EditEvents from './src/layouts/Management/EditEvents';
import Profile from './src/layouts/Profile';
import EditProfile from './src/layouts/EditProfile';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { withAuthentication, withoutAuthentication } from "./src/hoc";

import HeaderLeft from './src/components/Header/HeaderLeft';
import GlobalStyles from './src/utils/GlobalStyles';
import { isIOS } from './src/utils/theme';

import configureStore from "./src/state/store";

const store = configureStore({});

const AppNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    ForgotPassword: { screen: ForgotPassword },
    Events: { screen: Events },
    EventsDetails: { screen: EventsDetails },
    CreateEvent: { screen: CreateEvent },
    EditEvents: { screen: EditEvents },
    ChangePassword: { screen: ChangePassword },
    Profile: { screen: Profile },
    EditProfile: { screen: EditProfile },
  },
  {
    initialRouteName: 'Login',
    // headerMode: "none",
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: ({ navigation }) => ({
      gesturesEnabled: false,
      headerTransparent: false,
      headerStyle: GlobalStyles.headerStyle,
      headerLeft: (
        <HeaderLeft iconName="back" onPress={() => navigation.goBack()} />
      ),
      headerRight: isIOS() ? null : <View style={{ width: 30 }}></View>,
    }),
  },
);

const RootNavigator = createAppContainer(AppNavigator);

export default class App extends Component {
  //_subscription = null;

  constructor() {
    super();

    // this.pubnub = new PubNubReact({
    //   publishKey: 'pub-c-7adf56d8-74eb-4a78-b508-35748bbb2271',
    //   subscribeKey: 'sub-c-37cdfa88-885d-11ea-965b-8ea1ff3ad6ee'
    // });
    // this.pubnub.init(this);

    PushNotification.configure({
      // Called when Token is generated.
      onRegister: function (token) {
        console.log('TOKEN:', token);
        this.pubnub = new PubNub({
          publishKey: 'pub-c-7adf56d8-74eb-4a78-b508-35748bbb2271',
          subscribeKey: 'sub-c-37cdfa88-885d-11ea-965b-8ea1ff3ad6ee',
          uuid : token.token
        });
        if (token.os == "ios") {
          this.pubnub.push.addChannels({
            channels: ['notifications'],
            device: token.token,
            pushGateway: 'apns'
          });
          // Send iOS Notification from debug console: {"pn_apns":{"aps":{"alert":"Hello World."}}}
        } else if (token.os == "android") {
          this.pubnub.push.addChannels({
            channels: ['notifications'],
            device: token.token,
            pushGateway: 'gcm' // apns, gcm, mpns
          });
          // Send Android Notification from debug console: {"pn_gcm":{"data":{"message":"Hello World."}}}
        }
      }.bind(this),
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // ANDROID: GCM or FCM Sender ID
      senderID: "sender-id",
    });

    PushNotificationIOS.addEventListener('registrationError', console.log)

    this.state = {
      isConnected: false,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  _handleConnectivityChange = (state) => {
    console.log('handleConnectivityChange', state.isConnected);
    this.setState({
      isConnected: state.isConnected,
    });
  };

  render() {
    const { isConnected } = this.state;
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <RootNavigator screenProps={{ isConnected: isConnected }} />
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
