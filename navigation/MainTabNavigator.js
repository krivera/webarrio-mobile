import React from 'react';
import { Platform, View } from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom
} from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/Dashboard';
import ChatListScreen from '../screens/ChatList';
import ChatScreen from '../screens/Chat';
import NeighborsScreen from '../screens/Neighbors';
import CommunityScreen from '../screens/Community';
import NewPublicationScreen from '../screens/NewPublication';
import SosScreen from '../screens/Sos';
import PublicationScreen from '../screens/Publication';
import WebarrioIcon from '../components/WebarrioIcon';

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

const ChatStack = StackNavigator(
  {
    ChatList: ChatListScreen,
    Chat: ChatScreen,
    Neighbors: NeighborsScreen
  },
  {
    headerMode: 'screen',
    navigationOptions: header,
  }
)

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
    Chats: ChatStack,
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
            iconName = 'dashboard';
            break;
          case 'Chats':
            iconName = 'chat';
            break;
          case 'Community':
            iconName = 'people';
            break;
          case 'Sos':
            return(
              <View style={sosStyle}>
                <WebarrioIcon
                  name='sos'
                  size={28}
                  style={{ marginBottom: -3 }}
                  color="white"
                />
              </View>)
          iconName = 'sos'
        }
        return (
          <WebarrioIcon
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

const sosStyle = {
  position: 'absolute',
  backgroundColor: 'red',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center'
};
