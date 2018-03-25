import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/Login';
import AuthLoadingScreen from '../screens/AuthLoading';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import Colors from '../constants/Colors';

const AuthStack = StackNavigator(
  {
    Login: {
      screen: LoginScreen
    }
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
    headerMode: 'screen'
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

  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootSwitchNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
