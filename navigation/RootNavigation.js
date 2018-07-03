import React from 'react'
import { StackNavigator, SwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import LoginScreen from '../screens/Login'
import ForgotScreen from '../screens/Forgot'
import Forgot2Screen from '../screens/Forgot2'
import AuthLoadingScreen from '../screens/AuthLoading'

const AuthStack = StackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Forgot: ForgotScreen,
    Forgot2: Forgot2Screen
  },
  {
    headerMode: 'none'
  }
)

const AppStack = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator
    }
  },
  {
    headerMode: 'none'
  }
)

const RootSwitchNavigator = SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default class RootNavigator extends React.Component {
  render() {
    return <RootSwitchNavigator />
  }
}
