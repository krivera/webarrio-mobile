import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
// import { SimpleLineIcons } from '@expo/vector-icons'
import Categories from '../components/Categories'
import Avatar from '../components/Avatar'
import Picker from '../components/Picker'
import { setFilter } from '../actions/feed'
import { signOut } from '../actions/auth'
import { setCurrent } from '../actions/currents'
import { menuRef } from '../navigation/MainTabNavigator'
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

  setNeighborhood = ngbrhoodId => {
    const { neighborhoods, dispatch } = this.props
    const neighborhood = neighborhoods.find(n => n.id === ngbrhoodId)
    dispatch(setCurrent(
      'neighborhood',
      neighborhood
    ))
    dispatch(setCurrent(
      'neighborhood_unit',
      neighborhood.neighborhood_units[0]
    ))
    const condo = neighborhood.neighborhood_units.find(unit => unit.unit_type === 'condo')
    dispatch(setCurrent(
      'apartment',
      condo ? condo.apartments[0] : null
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
          <Avatar source={user.avatar_url} name={user.name} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name} {user.last_name}</Text>
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
            <TouchableOpacity>
              <Text
                style={styles.signout}
                onPress={this.signOut}
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
// TODO add settings button
/* <TouchableOpacity
  style={styles.configBtn}
>
  <SimpleLineIcons name='settings' size={20} color={Colors.subHeading} />
</TouchableOpacity> */

const mapStateToProps = state => ({
  user: state.currentsReducer.user,
  neighborhood: state.currentsReducer.neighborhood,
  neighborhoods: state.neighborhoodReducer.neighborhoods,
  apartment: state.currentsReducer.apartment
})

export default connect(mapStateToProps)(Menu)
