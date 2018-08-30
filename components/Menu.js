import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
import Categories from '../components/Categories'
import Avatar from '../components/Avatar'
import Picker from '../components/Picker'
import Colors from '../constants/Colors'
import { setFilter } from '../actions/feed'
import { signOut } from '../actions/auth'
import { setCurrent } from '../actions/currents'
import { navigatorRef, menuRef } from '../navigation/MainTabNavigator'
import styles from './styles/Menu'

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

  goToSettings = () => {
    menuRef.openMenu(false)
    navigatorRef.dispatch(
      NavigationActions.navigate({
        routeName: 'Settings'
      })
    )
  }

  setNeighborhood = ngbrhoodId => {
    const { neighborhoods, dispatch } = this.props
    const neighborhood = neighborhoods.find(n => n.id === ngbrhoodId)
    dispatch(setCurrent(
      'neighborhood',
      neighborhood
    ))
    dispatch(setCurrent(
      'unit',
      neighborhood.neighborhood_units[0]
    ))
    const condo = neighborhood.neighborhood_units.find(unit => unit.unit_type === 'condo')
    dispatch(setCurrent(
      'apartment',
      condo && condo.apartments && condo.apartments.length ? condo.apartments[0] : null
    ))
  }

  signOut = () => {
    this.props.dispatch(signOut())
  }

  render() {
    const { user, apartment, neighborhood, neighborhoods } = this.props
    return (
      <View style={styles.menu}>
        <View style={styles.userSection}>
          <TouchableOpacity onPress={this.goToSettings}>
            <Avatar source={{ uri: user.avatar_url }} name={user.name} />
          </TouchableOpacity>
          <View style={styles.userDetails}>
            <TouchableOpacity onPress={this.goToSettings}>
              <Text style={styles.userName}>{user.name} {user.last_name}</Text>
            </TouchableOpacity>
            {apartment && (
              <Text style={styles.apartment}>{apartment.number}</Text>
            )}
            {neighborhoods.length > 1 && (
              <Picker
                selectedValue={neighborhood.id}
                onValueChange={this.setNeighborhood}
                style={styles.neigborhoodPicker}
                itemStyle={styles.pickerLabel}
              >
                {neighborhoods.map(ngbrhood => (
                  <Picker.Item
                    value={ngbrhood.id}
                    label={ngbrhood.name}
                    key={`${ngbrhood.id}`}
                  />
                ))}
              </Picker>
            )}
            <TouchableOpacity
              onPress={this.signOut}
            >
              <Text
                style={styles.signout}
              >Cerrar Sesión</Text>
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
  neighborhoods: state.neighborhoodReducer.neighborhoods,
  apartment: state.currentsReducer.apartment
})

export default connect(mapStateToProps)(Menu)
