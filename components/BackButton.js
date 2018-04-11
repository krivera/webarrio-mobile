import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class BackButton extends React.PureComponent{
  render(){
    return (
      <TouchableOpacity onPress={this.props.navigation.popToTop}>
        <Ionicons name="ios-arrow-back" size={25} color="white" />
      </TouchableOpacity>
    );
  }
}