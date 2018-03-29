import React from 'react';
import { Platform, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom
} from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/Dashboard';
import ChatScreen from '../screens/Chat';
import CommunityScreen from '../screens/Community';
import NewPublicationScreen from '../screens/NewPublication';
import SosScreen from '../screens/Sos';
import PublicationScreen from '../screens/Publication';

const header = {
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
}

const CommunityStack = StackNavigator(
  {
    Feed: CommunityScreen,
    NewPublication: NewPublicationScreen,
    Publication: PublicationScreen
  },
  {
    headerMode: 'screen',
    navigationOptions: header,
    initialRouteParams: {
      title: 'Comunidad'
    }
  }
);

const HomeStack = StackNavigator(
  {
    Home: HomeScreen
  },
  {
    headerMode: 'screen',
    navigationOptions: header
  }
);

export default TabNavigator(
  {
    Home: HomeStack,
    Dashboard: DashboardScreen,
    Chat: ChatScreen,
    Community: CommunityStack,
    Sos: SosScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
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
