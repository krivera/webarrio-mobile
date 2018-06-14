import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation, NavigationActions } from 'react-navigation';

class BackButton extends React.Component{
  render(){
    return (
      <TouchableOpacity onPress={() => this.props.navigation.dispatch(NavigationActions.pop())}>
        <Ionicons name="ios-arrow-back" size={25} color="white" />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(BackButton);