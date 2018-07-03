import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native'

export default class Loading extends React.Component {
  render() {
    const { loading } = this.props
    const display = !loading ? { height: 0, display: 'none' } : {}
    return (
      <View style={[styles.screen, display]}>
        <ActivityIndicator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
