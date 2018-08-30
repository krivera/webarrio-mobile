import React from 'react'
import Axios from 'axios'
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { API_URL } from 'react-native-dotenv'
import AuthContainer, { authStyles } from '../components/AuthContainer'
import FloatingLabelInput from '../components/FloatingLabel'

export default class Forgot extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      token: '',
      password: '',
      password_confirmation: '',
      validToken: false,
      loading: false,
      error: false
    }
  }

  back = () => {
    this.props.navigation.navigate('Login')
  }

  validate = () => {
    this.setState({ loading: true, error: false })
    Axios.post(
      `${API_URL}/users/validate_reset_password_token`,
      {
        token: this.state.token
      }
    ).then(response => {
      this.setState({
        validToken: true,
        loading: false
      })
    }).catch(error => {
      this.setState({
        error: 'Hubo un problema al validar el código',
        loading: false
      })
    })
  }

  updatePassword = () => {
    this.setState({ loading: true, error: false })
    const { password, password_confirmation, token } = this.state
    if (password !== password_confirmation) {
      this.setState({
        loading: false,
        error: 'Repetir contraseña y contraseña no coinciden'
      })
      return
    }
    Axios.put(
      `${API_URL}/users/password`,
      {
        user: {
          reset_password_token: token,
          password,
          password_confirmation
        }
      }
    ).then(response => {
      this.setState({
        loading: false
      })
      Alert.alert(
        'Contraseña actualizada',
        'Puedes iniciar sesión con tu nueva contraseña.',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.navigate('Login')
          }
        ]
      )
    }).catch(error => {
      if (error.response && error.response.data) {
        this.setState({
          loading: false,
          error: 'No se pudo crear la contraseña.\nPosibles causas: Contraseña no segura, el código ha expirado'
        })
      }
    })
  }

  render() {
    const {
      error,
      token,
      password,
      password_confirmation,
      validToken,
      loading
    } = this.state
    return (
      <AuthContainer error={error}>
        <FloatingLabelInput
          label='Código'
          labelColor='white'
          value={token}
          onChangeText={t => this.setState({ token: t })}
          style={authStyles.input}
          autoCapitalize='none'
          disabled={validToken}
        />
        {validToken && (
          <View>
            <FloatingLabelInput
              label='Nueva contraseña'
              labelColor='white'
              onChangeText={t => this.setState({ password: t })}
              secureTextEntry
              style={authStyles.input}
              value={password}
            />
            <FloatingLabelInput
              label='Repetir contraseña'
              labelColor='white'
              onChangeText={t => this.setState({ password_confirmation: t })}
              secureTextEntry
              style={authStyles.input}
              value={password_confirmation}
            />
          </View>
        )}
        {!validToken && (
          <TouchableOpacity style={authStyles.button} onPress={this.validate}>
            <Text style={authStyles.buttonText}>CONTINUAR</Text>
          </TouchableOpacity>
        )}
        {validToken && (
          <TouchableOpacity
            style={authStyles.button}
            onPress={this.updatePassword}
          >
            <Text style={authStyles.buttonText}>RESTABLECER CONTRASEÑA</Text>
          </TouchableOpacity>
        )}
        <View style={authStyles.otherOptions}>
          <TouchableOpacity onPress={this.back}>
            <Text style={authStyles.helperText}>Volver</Text>
          </TouchableOpacity>
        </View>
        {loading && (
          <View style={authStyles.loadingContainer}>
            <View style={authStyles.loading}>
              <ActivityIndicator />
            </View>
          </View>
        )}
      </AuthContainer>
    )
  }
}
