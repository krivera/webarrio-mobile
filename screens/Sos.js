import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from "react-redux";
import call from 'react-native-phone-call';
import Axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import WebarrioIcon from '../components/WebarrioIcon';
import Colors from '../constants/Colors';

const SosText = props => (
  <Text style={[styles.sosText, props.style]}>{props.children}</Text>
);
class SosScreen extends React.Component {
  call = number => {
    call({number, prompt: false});
  }

  sendSos = () => {
    const {
      currentApartment,
      currentNeighborhood,
      authToken
    } = this.props;
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
    );
  }

  render(){
    const EmergencyContacts = [
      {
        name: 'AMBULANCIA',
        icon: 'cross',
        phone_key: 'ambulance_phone'
      },
      {
        name: 'BOMBEROS',
        icon: 'fire',
        phone_key: 'fireman_phone'
      },
      {
        name: 'CARABINEROS',
        icon: 'cop',
        phone_key: 'police_phone'
      }
    ];
    const { currentNeighborhood } = this.props;
    return (
      <View>
        <TouchableOpacity
          style={styles.head}
          onPress={this.confirmSos}
        >
          <WebarrioIcon name="sos" size={60} color="white" />
          <SosText style={styles.headTitle}>ALERTA VECINAL</SosText>
          <SosText>Usar con responsabilidad y respeto a sus vecinos</SosText>
        </TouchableOpacity>
        {EmergencyContacts.map((ec, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contact}
            onPress={() => this.call(currentNeighborhood[ec.phone_key])}
          >
            <SosText>{ec.name}</SosText>
            <WebarrioIcon
              name={ec.icon}
              color="white"
              size={50}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  currentNeighborhood: state.currentsReducer.neighborhood,
  currentApartment: state.currentsReducer.apartment,
});

export default connect(mapStateToProps)(SosScreen);

const styles = StyleSheet.create({
  head: {
    backgroundColor: Colors.orange,
    alignItems: 'center',
    padding: 15,
    paddingTop: 30
  },
  headTitle: {
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 20
  },
  contact: {
    backgroundColor: "#ed1c24",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: StyleSheet.hairlineWidth,
    padding: 10
  },
  sosText: {
    color: 'white'
  }
});
