import React from 'react'
import Axios from 'axios'
import {
  Alert,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { API_URL } from 'react-native-dotenv'
import { Octicons } from '@expo/vector-icons'
import AuthContainer, { authStyles } from '../components/AuthContainer'
import FloatingLabelInput from '../components/FloatingLabel'

export default class Forgot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  back = () => {
    this.props.navigation.navigate('Login')
  }

  recover = () => {
    Axios.post(
      `${API_URL}/users/password`,
      {
        user: {
          email: this.state.email
        }
      }
    ).catch().then(response => {
      Alert.alert(
        'Revisa tu correo',
        'Si tu email está registrado, enviaremos un correo de confirmación',
        {
          text: 'Ok',
          onPress: this.props.navigation.navigate('Forgot2')
        }
      )
    })
  }

  render() {
    return (
      <AuthContainer hideLogo={true}>
        <View style={styles.center}>
          <Octicons name='key' size={45} color='white' />
          <Text style={authStyles.helperText}>
            ¿Olvidaste tu contraseña?
          </Text>
          <Text style={styles.text}>
            Ingresa tu correo electrónico y te mandaremos las instrucciones para restablecer tu contraseña
          </Text>
        </View>
        <FloatingLabelInput
          label='Email'
          labelColor='white'
          value={this.state.email}
          onChangeText={t => this.setState({ email: t })}
          keyboardType='email-address'
          style={authStyles.input}
          autoCapitalize='none'
        />
        <TouchableOpacity style={authStyles.button} onPress={this.recover}>
          <Text style={authStyles.buttonText}>RECUPERAR CONTRASEÑA</Text>
        </TouchableOpacity>
        <View style={authStyles.otherOptions}>
          <TouchableOpacity onPress={this.back}>
            <Text style={authStyles.helperText}>Volver</Text>
          </TouchableOpacity>
          <Text style={authStyles.helperText}>  |  </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgot2')}>
            <Text style={authStyles.helperText}>Ingresar código</Text>
          </TouchableOpacity>
        </View>
      </AuthContainer>
    )
  }
}

const styles = {
  center: {
    marginTop: 100,
    alignItems: 'center'
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 40
  }
}