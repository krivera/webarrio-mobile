import React from 'react';
import { Platform, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/Dashboard';
import ChatScreen from '../screens/Chat';
import CommunityScreen from '../screens/Community';
import SosScreen from '../screens/Sos';


export default TabNavigator(
  {
    Home: HomeScreen,
    Dashboard: DashboardScreen,
    Chat: ChatScreen,
    Community: CommunityScreen,
    Sos: SosScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerForceInset: {top: 5},
      headerStyle: {
        backgroundColor: Colors.orange,
        height: 50,
        paddingHorizontal: 10,
      },
      headerTitleStyle: {
        color: 'white',
        flex: 1,
        textAlign: 'center',
      },
      headerLeft: (<View/>),
      headerRight: (<View/>),
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Dashboard':
            iconName = 'attach-money';
            break;
          case 'Chat':
            iconName = 'chat-bubble-outline';
            break;
          case 'Community':
            iconName = 'people-outline';
            break;
          case 'Sos':
            iconName = 'info-outline'
        }
        return (
          <MaterialIcons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.orange : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);
