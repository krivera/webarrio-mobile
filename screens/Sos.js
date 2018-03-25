import React from 'react';
import {
  View
} from 'react-native';

export default class SosScreen extends React.Component {
  static navigationOptions = {
    title: 'SOS',
    tabBarOptions: {
      tabStyle: {
        backgroundColor: 'red'
      },
      inactiveTintColor: 'white'
    }
  }
  render(){
    return (
      <View/>
    );
  }
}
