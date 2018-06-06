import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';

export default class Button extends React.Component{
  render(){
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.props.onPress}
      >
        <Text style={styles.text}>{this.props.children}</Text>
      </TouchableOpacity>
    )
  }
}

Button.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.string
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    padding: 13,
    alignItems: 'center',
    backgroundColor: Colors.orange,
    margin: 10
  },
  text: {
    color: 'white',
    fontSize: 18
  }
})