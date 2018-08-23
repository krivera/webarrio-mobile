import React from 'react'
import {
  TouchableOpacity,
  Text,
  View
} from 'react-native'
import { API_URL } from 'react-native-dotenv'
import { connect } from 'react-redux'
import axios from 'axios'
import FloatingLabelInput from '../components/FloatingLabel'
import { updateToken } from '../actions/auth'
import AuthContainer, { authStyles } from '../components/AuthContainer'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: false
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.authToken !== this.props.authToken) {
      this.props.navigation.navigate('AuthLoading')
    }
  }

  login = () => {
    const { email, password } = this.state
    this.setState({ error: false })
    if (email && password) {
      axios.post(API_URL + '/users/sign_in', {
        user: {
          email: email,
          password: password
        }
      },
      {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((response) => {
        this.props.dispatch(
          updateToken(
            response.headers.authorization || response.headers.Authorization
          )
        )
      }).catch(error => {
        if (error.response && error.response.status === 401) {
          this.setState({ error: 'Usuario y/o contraseña invalidos.' })
        } else {
          this.setState({ error: 'Hubo un problema al conectarse.' })
        }
      })
      return true
    }
    return false
  }

  render() {
    const { error, email, password } = this.state
    const { navigation: { navigate } } = this.props
    return (
      <AuthContainer error={error}>
        <FloatingLabelInput
          style={authStyles.input}
          value={email}
          label='E-mail'
          labelColor='#fff'
          keyboardType='email-address'
          onChangeText={t => this.setState({ email: t })}
          autoCapitalize='none'
        />
        <FloatingLabelInput
          style={authStyles.input}
          value={password}
          label='Contraseña'
          labelColor='#fff'
          onChangeText={t => this.setState({ password: t })}
          secureTextEntry
        />
        <TouchableOpacity style={authStyles.button} onPress={this.login}>
          <Text style={authStyles.buttonText}>CONECTARSE</Text>
        </TouchableOpacity>
        <View style={authStyles.otherOptions}>
          <TouchableOpacity onPress={() => navigate('Forgot')}>
            <Text style={authStyles.helperText}>Olvidé mi clave</Text>
          </TouchableOpacity>
          <Text style={authStyles.helperText}>  |  </Text>
          <TouchableOpacity onPress={() => navigate('Forgot2')}>
            <Text style={authStyles.helperText}>Tengo una invitación</Text>
          </TouchableOpacity>
        </View>
      </AuthContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authToken: state.authReducer.authToken
  }
}

export default connect(mapStateToProps)(LoginScreen)
