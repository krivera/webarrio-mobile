import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom
} from 'react-navigation'
import { Notifications } from 'expo'
import Axios from 'axios'
import { API_URL } from 'react-native-dotenv'
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync'
import { handleNotification } from '../actions/navigation'
import { setInitialData } from '../actions/currents'

import Colors from '../constants/Colors'
import Expenses from '../screens/Expenses'
import AddExpense from '../screens/AddExpense'
import PaymentMethods from '../screens/PaymentMethods'
import AddPaymentMethod from '../screens/AddPaymentMethod'
import Pay from '../screens/Pay'
import ChatListScreen from '../screens/ChatList'
import ChatScreen from '../screens/Chat'
import NeighborsScreen from '../screens/Neighbors'
import CommunityScreen from '../screens/Community'
import NewPublicationScreen from '../screens/NewPublication'
import Categories from '../screens/Categories'
import SosScreen from '../screens/Sos'
import PublicationScreen from '../screens/Publication'
import WebarrioIcon from '../components/WebarrioIcon'

export let navigatorRef
export let tabBarHeight = 0

const getTabBarHeight = ({
  nativeEvent: { layout: { height } }
}) => {
  tabBarHeight = height
}

const header = {
  headerForceInset: { top: 5 },
  headerStyle: {
    backgroundColor: Colors.orange,
    height: 50,
    paddingHorizontal: 10
  },
  headerTitleStyle: {
    color: 'white',
    flex: 1,
    textAlign: 'center'
  },
  headerLeft: (<View/>),
  headerRight: (<View/>)
}

const ChatStack = StackNavigator(
  {
    ChatList: ChatListScreen,
    Chat: ChatScreen,
    Neighbors: NeighborsScreen
  },
  {
    headerMode: 'screen',
    navigationOptions: header
  }
)

const CommunityStack = StackNavigator(
  {
    Feed: CommunityScreen,
    NewPublication: NewPublicationScreen,
    Publication: PublicationScreen,
    Categories
  },
  {
    headerMode: 'screen',
    navigationOptions: header,
    initialRouteParams: {
      title: 'Comunidad'
    }
  }
)

const DashboardStack = StackNavigator(
  {
    Expenses,
    AddExpense,
    PaymentMethods,
    AddPaymentMethod,
    Pay
  },
  {
    headerMode: 'screen',
    navigationOptions: header
  }
)

const AppTabNavigator = TabNavigator(
  {
    Community: CommunityStack,
    Chats: ChatStack,
    Dashboard: DashboardStack,
    Sos: SosScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state
        let iconName
        switch (routeName) {
        case 'Home':
          iconName = 'home'
          break
        case 'Dashboard':
          iconName = 'dashboard'
          break
        case 'Chats':
          iconName = 'chat'
          break
        case 'Community':
          iconName = 'people'
          break
        case 'Sos':
          return (
            <View style={sosStyle} onLayout={getTabBarHeight}>
              <WebarrioIcon
                name='sos'
                size={28}
                style={{ marginBottom: -3 }}
                color='white'
              />
            </View>)
        default:
          return (<View />)
        }
        return (
          <WebarrioIcon
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.orange : Colors.tabIconDefault}
          />
        )
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false
    },
    animationEnabled: false,
    swipeEnabled: false
  }
)

class MainTabNavigator extends React.Component {
  componentDidMount = () => {
    navigatorRef = this.navigator
  }


  _handleNotification = ({ origin, data }) => {
    if (origin === 'selected') {
      this.props.dispatch(handleNotification(data))
    }
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`)
  };

  componentWillMount = () => {
    const { authToken, dispatch } = this.props
    Axios.get(
      `${API_URL}/users/me`,
      {
        headers: {
          Authorization: authToken
        }
      }
    ).then(response => {
      dispatch(setInitialData(response.data))
      // Send our push token over to our backend so we can receive notifications
      // You can comment the following line out if you want to stop receiving
      // a notification every time you open the app. Check out the source
      // for this function in api/registerForPushNotificationsAsync.js
      const { user, neighborhoods } = response.data
      registerForPushNotificationsAsync(user.id, neighborhoods[0].id, authToken)
      this._notificationSubscription = Notifications.addListener(this._handleNotification)
    })
  }

  componentWillUnmount = () =>
    this._notificationSubscription && this._notificationSubscription.remove()

  render() {
    return (<AppTabNavigator ref={r => {
      this.navigator = r
    }} />)
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentsReducer.user,
  currentNeighborhood: state.currentsReducer.neighborhood,
  authToken: state.authReducer.authToken
})

export default connect(mapStateToProps)(MainTabNavigator)

const sosStyle = {
  position: 'absolute',
  backgroundColor: 'red',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center'
}
