import React from 'react'
import {
  View,
  TextInput,
  Animated
} from 'react-native'
import PropTypes from 'prop-types'

export default class FloatingLabelInput extends React.Component {
  state = {
    isFocused: false
  };

  componentWillMount() {
    this.animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1)
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this.animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200
    }).start()
  }

  render() {
    const { label, labelColor, containerStyle, ...props } = this.props
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0]
      }),
      fontSize: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 14]
      }),
      color: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', labelColor]
      })
    }
    return (
      <View style={[{ paddingTop: 18 }, containerStyle]}>
        <Animated.Text
          style={labelStyle}
          numberOfLines={1}
        >
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          underlineColorAndroid='transparent'
          style={[{...style, borderBottomColor: labelColor }, props.style]}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    )
  }
}

FloatingLabelInput.propTypes = {
  label: PropTypes.string,
  labelColor: PropTypes.string
}

const style = {
  minHeight: 24,
  fontSize: 18,
  borderBottomWidth: 1
}
