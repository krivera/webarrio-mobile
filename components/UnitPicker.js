import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Text,
  View
} from 'react-native'
import { setCurrent } from '../actions/currents'
import Picker from './Picker'
import styles from './styles/UnitPicker'

class UnitPicker extends React.Component {
  state = {
    units: []
  }

  updateUnitList = () => {
    const { neighborhood, role } = this.props
    this.setState({
      units: neighborhood.neighborhood_units.filter(unt => unt.user_roles.includes(role))
    })
  }

  componentDidUpdate = prevProps => {
    const { neighborhood: prevNghbrhood } = prevProps
    const { neighborhood } = this.props
    if (prevNghbrhood !== neighborhood) {
      this.updateUnitList()
    }
  }

  componentDidMount = () => {
    console.log(this.props.unit.id)
    this.updateUnitList()
  }

  changeUnit = unitId => {
    const { neighborhood, dispatch } = this.props
    const unit = neighborhood.neighborhood_units.find(unt => unt.id === unitId)
    dispatch(setCurrent('unit', unit))
  }

  render() {
    const { unit } = this.props
    const { units } = this.state
    return (
      <View style={styles.container}>
        <Text>En </Text>
        <Picker
          onValueChange={this.changeUnit}
          selectedValue={unit.id}
          style={styles.picker}
        >
          {units.map(unt => (
            <Picker.Item
              value={unt.id}
              label={unt.name}
              key={`${unt.id}`}
            />
          ))}
        </Picker>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  neighborhood: state.currentsReducer.neighborhood,
  unit: state.currentsReducer.unit
})

export default connect(mapStateToProps)(UnitPicker)

UnitPicker.propTypes = {
  role: PropTypes.oneOf(['treasurer', 'secretary']).isRequired
}
