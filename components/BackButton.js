import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { withNavigation, NavigationActions } from 'react-navigation'

class BackButton extends React.Component {
  back = () => {
    const { navigation, behavior } = this.props
    switch (behavior) {
    case 'back':
      navigation.goBack()
      break
    case 'top':
      navigation.dispatch(NavigationActions.popToTop())
      break
    default:
      navigation.dispatch(NavigationActions.pop())
    }
  }
  render() {
    return (
      <TouchableOpacity onPress={this.back} style={{width: 50}}>
        <Ionicons name='ios-arrow-back' size={25} color='white' />
      </TouchableOpacity>
    )
  }
}

export default withNavigation(BackButton)
