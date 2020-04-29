/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 **/

import React, { Component, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage"

// import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';

import Login from './src/layouts/Login';
import ForgotPassword from './src/layouts/ForgotPassword';
import ChangePassword from './src/layouts/ChangePassword';
import ResetPassword from './src/layouts/ResetPassword';

import Events from './src/layouts/Management/Events';
import EventsDetails from './src/layouts/Management/EventsDetails';
import CreateEvent from './src/layouts/Management/CreateEvent';
import UsersListing from './src/layouts/Management/UsersListing';
import EditEvents from './src/layouts/Management/EditEvents';

import Profile from './src/layouts/Profile';
import Notification from './src/layouts/Notification';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { withAuthentication, withoutAuthentication } from "./src/hoc"
import HeaderLeft from './src/components/Header/HeaderLeft';
import GlobalStyles from './src/utils/GlobalStyles';
import { isIOS } from './src/utils/theme';

import configureStore from "./src/state/store";

const store = configureStore({});

const AppNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    ForgotPassword: { screen: ForgotPassword },
    ResetPassword: { screen: ResetPassword },
    Events: { screen: Events },
    EventsDetails: { screen: EventsDetails },
    CreateEvent: { screen: CreateEvent },
    EditEvents: { screen: EditEvents },
    UsersListing: { screen: UsersListing },
    Profile: { screen: Profile },
    Notification: { screen: Notification },
    ChangePassword: { screen: ChangePassword },
  },
  {
    initialRouteName: 'Events',
    // headerMode: "none",
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: ({ navigation }) => ({
      gesturesEnabled: false,
      //headerTransparent: true,
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
          <RootNavigator screenProps={{ isConnected: isConnected }}  />
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
