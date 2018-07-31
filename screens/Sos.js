import React from 'react'
import {
  Alert,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import call from 'react-native-phone-call'
import Axios from 'axios'
import { API_URL } from 'react-native-dotenv'
import WebarrioIcon from '../components/WebarrioIcon'
import styles from './styles/Sos'

const SosText = props => (
  <Text style={[styles.sosText, props.style]}>{props.children}</Text>
)
class SosScreen extends React.Component {
  call = number => {
    call({ number, prompt: false })
  }

  sendSos = () => {
    const {
      currentApartment,
      currentNeighborhood,
      authToken
    } = this.props
    Axios.post(
      `${API_URL}/neighborhoods/${currentNeighborhood.id}/sos`,
      {
        apartment_id: currentApartment ? currentApartment.id : null
      },
      {
        headers: {
          Authorization: authToken
        }
      }
    )
  }

  confirmSos = () => {
    Alert.alert(
      'Alerta Vecinal',
      '¿Estás seguro de activar la alerta vecinal, esto notificará a todos los vecinos',
      [
        { text: 'Cancelar' },
        { text: 'Activar', onPress: this.sendSos }
      ]
    )
  }

  render() {
    const EmergencyContacts = [
      {
        name: 'Ambulancia',
        icon: 'cross',
        phone_key: 'ambulance_phone'
      },
      {
        name: 'Bomberos',
        icon: 'fire',
        phone_key: 'fireman_phone'
      },
      {
        name: 'Carabineros',
        icon: 'cop',
        phone_key: 'police_phone'
      }
    ]
    const { currentNeighborhood } = this.props
    return (
      <View style={styles.screen}>
        <TouchableOpacity
          style={styles.head}
          onPress={this.confirmSos}
        >
          <WebarrioIcon name='sos' size={60} color='white' />
          <SosText style={styles.headTitle}>ALERTA VECINAL</SosText>
          <SosText>Usar con responsabilidad y respeto a sus vecinos</SosText>
        </TouchableOpacity>
        {EmergencyContacts.map((ec, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contact}
            onPress={() => this.call(currentNeighborhood[ec.phone_key])}
          >
            <View>
              <Text style={[styles.contactText, styles.contactNumber]}>
                {currentNeighborhood[ec.phone_key]}
              </Text>
              <Text style={styles.contactText}>{ec.name}</Text>
            </View>
            <WebarrioIcon
              name={ec.icon}
              color='#ed1c24'
              size={65}
            />
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  currentNeighborhood: state.currentsReducer.neighborhood,
  currentApartment: state.currentsReducer.apartment
})

export default connect(mapStateToProps)(SosScreen)
