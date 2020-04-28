/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 **/

import React, {Component, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

// import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';

import Login from './src/layouts/Login';
import ForgotPassword from './src/layouts/ForgotPassword';
import ChangePassword from './src/layouts/ChangePassword';
import ResetPassword from './src/layouts/ResetPassword';

import Events from './src/layouts/Management/Events';
import EventsDetails from './src/layouts/Management/EventsDetails';
import CreateEvent from './src/layouts/Management/CreateEvent';
import EditEvents from './src/layouts/Management/EditEvents';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HeaderLeft from './src/components/Header/HeaderLeft';
import GlobalStyles from './src/utils/GlobalStyles';

import {isIOS} from './src/utils/theme';

const AppNavigator = createStackNavigator(
  {
    Login: {screen: Login},
    ForgotPassword: {screen: ForgotPassword},
    Events: {screen: Events},
    EventsDetails: {screen: EventsDetails},
    CreateEvent: {screen: CreateEvent},
    EditEvents: {screen: EditEvents},
    ChangePassword: {screen: ChangePassword},
    ResetPassword: {screen: ResetPassword},
  },
  {
    initialRouteName: 'Login',
    // headerMode: "none",
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: ({navigation}) => ({
      gesturesEnabled: false,
      headerTransparent: false,
      headerStyle: GlobalStyles.headerStyle,
      headerLeft: (
        <HeaderLeft iconName="back" onPress={() => navigation.goBack()} />
      ),
      headerRight: isIOS() ? null : <View style={{width: 30}}></View>,
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
    const {isConnected} = this.state;
    return (
      <View style={styles.container}>
        <RootNavigator screenProps={{isConnected: isConnected}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
