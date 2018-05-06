import React from 'react';
import Axios from 'axios';
import {
  Alert,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import AuthContainer, { authStyles } from '../components/AuthContainer';

export default class Register extends React.Component{
  state = {
    error: false,
    name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    apartment: '',
    loading: false,
    tokenValid: false
  }

  validateToken = () => {
    this.setState({
      error: false,
      loading: true
    })
    Axios.post(
      `${API_URL}/users/validate_invitation`,
      {
        token: this.state.token
      }
    ).then(response => {
      this.setState({
        apartment: response.data.apartment,
        loading: false,
        tokenValid: true
      });
    }).catch(error => {
      this.setState({
        loading: false,
        error: 'No se pudo validar su código.'
      });
    })
  }

  confirmAccount = () => {
    Axios.put(
      `${API_URL}/users/`,
      {
        "user": {
          name,
          last_name,
          password,
          password_confirmation,
          apartment
        }
      }
    ).then(response => {
      this.setState({
        loading: false
      });
      Alert.alert()
    }).catch(error => {
      this.setState({
        loading: false,
        error: 'Hubo un problema al crear su cuenta.'
      })
    })
  }

  render(){
    const {
      token,
      error,
      apartment,
      tokenValid,
      name,
      last_name
    } = this.state;
    return (
      <AuthContainer error={error}>
        <FloatingInputLabel
          value={token}
          label="Código"
          onChangeText={t => this.setState({invite_token: t})}
          style={authStyles.input}
          autoCapitalize="none"
        />
        {tokenValid && (
          <View>
            <Text>{apartment}</Text>
            <FloatingInputLabel
              value={name}
              label="Nombre"
              onChangeText={t => this.setState({name: t})}
              style={authStyles.input}
            />
            <FloatingInputLabel
              value={last_name}
              label="Apellido"
              onChangeText={t => this.setState({last_name: t})}
              style={authStyles.input}
            />
            <FloatingInputLabel
              value={password}
              label="Contraseña"
              onChangeText={t => this.setState({password: t})}
              style={authStyles.input}
              secureTextEntry
            />
            <FloatingInputLabel
              value={password_confirmation}
              label="Repetir contraseña"
              onChangeText={t => this.setState({password_confirmation: t})}
              style={authStyles.input}
              secureTextEntry
            />

          </View>
        )}
        {!tokenValid && (
          <TouchableOpacity style={authStyles.button} onPress={this.validateToken}>
            <Text style={authStyles.buttonText}>
              CONTINUAR
            </Text>
          </TouchableOpacity>
        )}
        {!tokenValid && (
          <TouchableOpacity style={authStyles.button} onPress={this.confirmAccount}>
            <Text style={authStyles.buttonText}>
              CREAR CUENTA
            </Text>
          </TouchableOpacity>
        )}
      </AuthContainer>
    )
  }
}
