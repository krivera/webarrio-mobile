import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import Categories from '../components/Categories'
import Avatar from '../components/Avatar'
import Colors from '../constants/Colors'
import { setFilter } from '../actions/feed'
import { menuRef } from '../navigation/MainTabNavigator'

class Menu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  changeFilter = category => {
    this.props.dispatch(setFilter(category.key))
    menuRef.openMenu(false)
  }

  render() {
    const { user, apartment } = this.props
    return (
      <View style={styles.menu}>
        <View style={styles.userSection}>
          <Avatar source={user.avatar_url} name={user.name} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name} {user.last_name}</Text>
            <Text style={styles.apartment}>{apartment.number}</Text>
            <TouchableOpacity>
              <Text style={styles.signout}>Cerrar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.configBtn}>
              <SimpleLineIcons name='settings' size={20} color={Colors.subHeading} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <Categories
            callback={this.changeFilter}
          />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.currentsReducer.user,
  neighborhood: state.currentsReducer.neighborhood,
  apartment: state.currentsReducer.apartment
})

export default connect(mapStateToProps)(Menu)

const styles = StyleSheet.create({
  menu: {
    backgroundColor: 'white',
    flex: 1
  },
  userSection: {
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomColor: Colors.subHeading,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row'
  },
  userName: {
    color: Colors.orange,
    fontSize: 18
  },
  apartment: {
    color: Colors.orange
  },
  signout: {
    color: Colors.subHeading,
    marginTop: 15
  },
  userDetails: {
    flex: 1
  },
  configBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingTop: 5
  }
})
