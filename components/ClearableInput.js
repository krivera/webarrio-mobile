import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import FloatingLabelInput from './FloatingLabel'
import Colors from '../constants/Colors'

export default class ClearableInput extends React.Component {
  render() {
    const { onChangeText, ...props } = this.props
    return (
      <View>
        <FloatingLabelInput
          labelColor={Colors.subHeading}
          onChangeText={onChangeText}
          {...props}
        />
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => onChangeText('')}
        >
          <Feather name='x' color={Colors.subHeading} size={18} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 25
  }
})
