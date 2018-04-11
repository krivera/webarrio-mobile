import React from 'react';
import {
  Animated,
  Keyboard,
  Platform,
  View} from 'react-native';

export default class KeyboardAwareView extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        keyboardHeight: new Animated.Value(0),
      }
  }
  componentWillMount () {
    if(Platform.OS === 'ios'){
      this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardDidShow.bind(this));
      this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardDidHide.bind(this));
    }
    else{
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

	keyboardDidShow = (event) => {
    Animated.parallel([
      Animated.timing(this.state.keyboardHeight, {
        duration: event.duration + .8,
        toValue: event.endCoordinates.height + (this.props.extraPadding || 0),
      })
    ]).start(() => {
      if(this.props.onOpenKeyboard)
        this.props.onOpenKeyboard();
      });
  };

  keyboardDidHide = (event) => {
    Animated.parallel([
      Animated.timing(this.state.keyboardHeight, {
        duration: 100,
        toValue: 0,
      })
    ]).start();
  };

  render(){
    if(Platform.OS === 'ios'){
      return (
        <KeyboardAvoidingView style={this.props.style}>
          {this.props.chidlren}
        </KeyboardAvoidingView>
      )
    }
    return (<Animated.View style={[this.props.style, {flex: 1, paddingBottom: this.state.keyboardHeight}]}>
      {this.props.children}
      </Animated.View>);
  }
}

