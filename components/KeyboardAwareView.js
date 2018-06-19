import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  View
} from 'react-native';
import { tabBarHeight } from '../navigation/MainTabNavigator';

export default class KeyboardAwareView extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {offset: 0};
  }

  onLayout = ({
    nativeEvent: { layout: { height } }
  }) => {
    this.setState({offset: Dimensions.get('window').height - height - tabBarHeight})
  }

  render(){
    return (
      <View onLayout={this.onLayout} style={this.props.style}>
        {this.props.children}
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={this.state.offset}
        />
      </View>
    )
  }
}

