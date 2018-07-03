import React from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import PropTypes from 'prop-types'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import WebarrioIcon from './WebarrioIcon'
import { withNavigation } from 'react-navigation'

const MenuText = props => (
  <Text style={styles.menuText} numberOfLines={1}>
    {props.children}
  </Text>
)

class PublicationMenu extends React.Component {
  constructor(props) {
    super(props)
    const { currentUserId, publication } = props
    this.state = {
      menuOpen: false,
      menuWidth: new Animated.Value(0),
      menuHeight: new Animated.Value(0),
      menuOpenHeight: currentUserId === publication.author.id ? 30 : 60
    }
  }

  menuChat = () => {
    const { navigate, publication } = this.props
    navigate('Chat', {
      user: publication.author
    })
    this.toggleMenu()
  }

  menuEdit = () => {
    const { navigation, publication } = this.props
    navigation.navigate('NewPublication', { publication })
    this.toggleMenu()
  }

  isOpen = () => this.state.menuOpen;

  toggleMenu = () => {
    const open = !this.state.menuOpen
    if (open) {
      this.setState({ menuOpen: open })
      this.props.toggleMenuCallback()
    }
    Animated.parallel([
      Animated.timing(this.state.menuWidth, {
        toValue: open ? 150 : 0,
        duration: 200
      }),
      Animated.timing(this.state.menuHeight, {
        toValue: open ? this.state.menuOpenHeight : 0,
        duration: 200
      })
    ]).start(() => {
      if (!open) {
        this.setState({ menuOpen: open })
        this.props.toggleMenuCallback()
      }
    })
  }

  report = () => {
    const { publication } = this.props
    this.props.report(publication.id)
    this.toggleMenu()
  }

  render() {
    const { publication, currentUserId, openDirection } = this.props
    let direction = {}
    direction[openDirection] = 10
    return (
      <View>
        {this.state.menuOpen && (
          <TouchableWithoutFeedback onPress={this.toggleMenu}>
            <View style={styles.closeMenu} />
          </TouchableWithoutFeedback>
        )}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={this.toggleMenu}
        >
          <MaterialCommunityIcons
            name='dots-horizontal'
            size={18}
            color={Colors.orange}
          />
        </TouchableOpacity>
        {this.state.menuOpen && (
          <Animated.View
            style={[
              styles.menu,
              direction,
              { width: this.state.menuWidth, height: this.state.menuHeight }]
            }
          >
            {publication.author.id !== currentUserId && (
              <View>
                <TouchableOpacity
                  onPress={this.menuChat}
                  style={styles.option}
                >
                  <WebarrioIcon name='chat' size={15} />
                  <MenuText>Enviar mensaje</MenuText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.report}
                  style={styles.option}
                >
                  <Feather name='x' size={15} />
                  <MenuText>Denunciar</MenuText>
                </TouchableOpacity>
              </View>
            )}
            {publication.author.id === currentUserId && (
              <TouchableOpacity
                style={styles.option}
                onPress={this.menuEdit}
              >
                <Feather name='edit-2' size={15} />
                <MenuText>Editar</MenuText>
              </TouchableOpacity>
            )}
          </Animated.View>
        )}
      </View>
    )
  }
}

export default withNavigation(PublicationMenu)

PublicationMenu.propTypes = {
  publication: PropTypes.object,
  currentUserId: PropTypes.integer,
  openDirection: PropTypes.string,
  toggleMenuCallback: PropTypes.func,
  report: PropTypes.func
}

const styles = StyleSheet.create({
  menuButton: {
    marginRight: 10
  },
  menu: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#f6f6f7',
    borderColor: Colors.border,
    borderWidth: StyleSheet.hairlineWidth
  },
  menuText: {
    marginLeft: 5
  },
  option: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  }
})
