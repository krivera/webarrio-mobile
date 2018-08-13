import React from 'react'
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  View
} from 'react-native'

const TABBARHEIGHT = Platform.isPad ? 49 : 29

export default class KeyboardAwareView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { offset: 0 }
  }

  onLayout = ({
    nativeEvent: { layout: { height } }
  }) => {
    this.setState({ offset: Dimensions.get('window').height - height - TABBARHEIGHT })
  }

  render() {
    return (
      <View onLayout={this.onLayout} style={this.props.style}>
        {this.props.children}
        <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={this.state.offset}
        />
      </View>
    )
  }
}

