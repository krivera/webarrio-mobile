import { Notifications } from 'expo';
import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/Login';
import ForgotScreen from '../screens/Forgot';
import Forgot2Screen from '../screens/Forgot2';
import AuthLoadingScreen from '../screens/AuthLoading';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import Colors from '../constants/Colors';

const AuthStack = StackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Forgot: ForgotScreen,
    Forgot2: Forgot2Screen,
  },
  {
    headerMode: 'none'
  }
);

const AppStack = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator
    },
  },
  {
    headerMode: 'none'
  }
);

const RootSwitchNavigator = SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default class RootNavigator extends React.Component {

  // componentDidMount() {
  //   this._notificationSubscription = this._registerForPushNotifications();
  // }

  // componentWillUnmount() {
  //   this._notificationSubscription && this._notificationSubscription.remove();
  // }

  render() {
    return <RootSwitchNavigator />;
  }
}
