import React from 'react'
import { connect } from 'react-redux'
import {
  Dimensions,
  KeyboardAvoidingView,
  View
} from 'react-native'

export default class KeyboardAwareView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { offset: 0 }
  }

  onLayout = ({
    nativeEvent: { layout: { height } }
  }) => {
    this.setState({ offset: Dimensions.get('window').height - height - this.props.tabbarHeight })
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

const mapStateToProps = state => ({
  tabbarHeight: state.layoutReducer.tabbarHeight
})
