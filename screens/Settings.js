import React from 'react'
import { connect } from 'react-redux'
import {
  ImagePicker,
  Permissions
} from 'expo'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Axios from 'axios'
import { API_URL } from 'react-native-dotenv'
import { updateCurrentUser } from '../actions/currents'
import Avatar from '../components/Avatar'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import Input from '../components/ClearableInput'
import Loading from '../components/Loading'
import styles from './styles/Settings'

const PASSWORD_TOKEN = 'xxxxxxx'

class Settings extends React.Component {
  static navigationOptions = () => ({
    title: 'Configuración',
    headerLeft: (<BackButton />)
  })

  constructor(props) {
    super(props)

    this.state = {
      name: props.user.name,
      last_name: props.user.last_name,
      email: props.user.email,
      image: props.user.avatar_url,
      password: PASSWORD_TOKEN,
      currentPassword: '',
      loading: false
    }
  }

  selectPicture = async () => {
    Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL)
    ]).then(res =>
      res.filter(r => r.status === 'granted')
    ).then(async (permissions) => {
      if (permissions.length === 2) {
        let image = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
          mediaTypes: 'Images'
        })

        if (!image.cancelled) {
          this.setState({ image: image.uri })
        }
      }
    })
  }

  passwordFocus = () => {
    if (this.state.password === PASSWORD_TOKEN) {
      this.setState({ password: '' })
    }
  }

  promptPassword = () => {
    this.setState({ promptPassword: true })
  }

  cancelSave = () => {
    this.setState({
      currentPassword: '',
      promptPassword: false
    })
  }

  save = () => {
    const { user, authToken } = this.props
    this.setState({ loading: true })
    let data = {
      name: this.state.name,
      last_name: this.state.last_name,
      new_email: this.state.email,
      email: user.email,
      password: this.state.currentPassword
    }
    if (this.state.password !== PASSWORD_TOKEN) {
      data.new_password = this.state.password
    }
    Axios.post(
      `${API_URL}/users/update`,
      data
    ).then(() => {
      if (this.state.image !== user.avatar_url) {
        let formData = new FormData()
        let filename = this.state.image.split('/').pop()
        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`
        formData.append('file', { uri: this.state.image, name: filename, type })
        Axios.post(
          `${API_URL}/users/picture`,
          formData,
          {
            headers: {
              'Content-type': 'multipart/form-data',
              'Authorization': authToken
            }
          }
        ).then(response => {
          this.saveSuccess({ ...data, avatar_url: response.data.avatar_url })
        })
      } else {
        this.saveSuccess(data)
      }
    }).catch(error => {
      if (error && error.response && error.code === 401) {
        this.setState({
          loading: false,
          error: 'La contraseña es incorrecta'
        })
      } else {
        this.setState({
          loading: false,
          error: 'Hubo un problema al conectarse al servidor'
        })
      }
    })
  }

  saveSuccess = data => {
    this.setState({
      loading: false,
      currentPassword: '',
      promptPassword: false
    })
    this.props.dispatch(updateCurrentUser(data))
  }

  render() {
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.section}>
          <Text>Perfil</Text>
          <TouchableOpacity
            onPress={this.selectPicture}
          >
            <Avatar
              source={{ uri: this.state.image }}
              name={this.props.user.name}
              size={80}
            />
          </TouchableOpacity>
          <View>
            <Input
              value={this.state.name}
              label='Nombre'
              onChangeText={t => this.setState({ name: t })}
            />
            <Input
              value={this.state.last_name}
              label='Apellido'
              onChangeText={t => this.setState({ last_name: t })}
            />
            <Input
              value={this.state.email}
              label='E-mail'
              onChangeText={t => this.setState({ email: t })}
              keyboardType='email-address'
              autoCapitalize='none'
            />
            <Input
              value={this.state.password}
              label='Contraseña'
              onFocus={this.passwordFocus}
              onChangeText={t => this.setState({ password: t })}
              autoCapitalize='none'
              secureTextEntry
            />
          </View>
          <View style={styles.space} />
          <Button onPress={this.promptPassword}>GUARDAR</Button>
        </View>
        {this.state.promptPassword && (
          <View style={styles.cover}>
            <View style={styles.prompt}>
              <Text>Para guardar los cambios ingrese su contraseña actual</Text>
              <Input
                label='contraseña'
                onChangeText={t => this.setState({ currentPassword: t })}
                value={this.state.currentPassword}
                secureTextEntry
              />
              <View style={styles.promptButtons}>
                <TouchableOpacity
                  onPress={this.cancelSave}
                  style={styles.promptButton}
                >
                  <Text
                    style={styles.promptButtonText}>CANCELAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.promptButton}
                  onPress={this.save}
                >
                  <Text style={styles.promptButtonText}>GUARDAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <Loading
          loading={this.state.loading}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  user: state.currentsReducer.user
})

export default connect(mapStateToProps)(Settings)
