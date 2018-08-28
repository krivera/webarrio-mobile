import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class Avatar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }
  render() {
    const { containerStyle, source, size, name } = this.props
    let size_ = size || 40
    const avatar_size = {
      width: size_,
      height: size_,
      borderRadius: size_ / 2
    }
    const fontSize = size_ * 0.75
    let name_ = name || 'W'

    return (
      <View style={containerStyle}>
        <View style={[styles.avatarContainer, avatar_size]}>
          {!this.state.loaded && (
            <View style={styles.letterContainer}>
              <Text style={[styles.letterAvatar, { fontSize }]}>
                {name_.slice(0, 1).toUpperCase()}
              </Text>
            </View>
          )}
          <Image
            style={avatar_size}
            source={source}
            onLoad={() => {
              this.setState({ loaded: true })
            }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: '#92a2a2',
    alignSelf: 'center',
    marginRight: 5,
    justifyContent: 'center'
  },
  letterAvatar: {
    color: 'white',
  },
  letterContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
