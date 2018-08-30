import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView
} from 'react-native'
import Toast from 'react-native-root-toast'
import Axios from 'axios'
import { API_URL } from 'react-native-dotenv'
import KeyboardAwareView from '../components/KeyboardAwareView'
import Input from '../components/ClearableInput'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import Loading from '../components/Loading'
import styles from './styles/Settings'

class Invite extends React.Component {
  static navigationOptions = () => ({
    title: 'Dar acceso a casa',
    headerLeft: (<BackButton />)
  })

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      last_name: '',
      email: '',
      loading: false
    }
  }

  invite = () => {
    const { authToken, apartment, navigation } = this.props
    this.setState({ loading: true })
    Axios.post(
      `${API_URL}/users/add_to_home`,
      {
        user: {
          name: this.state.name,
          last_name: this.state.last_name,
          email: this.state.email
        },
        apartment_id: apartment.id
      },
      {
        headers: {
          Authorization: authToken
        }
      }
    ).then(response => {
      this.setState({ loading: false })
      Toast.show(
        'Se ha enviado la invitación con éxito.',
        { duration: Toast.durations.LONG }
      )
      navigation.pop()
    }).catch(() => {
      this.setState({ loading: false })
      Toast.show(
        'Hubo un problema al conectar al servidor.',
        { duration: Toast.durations.LONG }
      )
    })
  }

  render() {
    return (
      <KeyboardAwareView style={styles.screen}>
        <ScrollView style={styles.section}>
          <Input
            label='Nombre'
            value={this.state.name}
            onChangeText={t => this.setState({ name: t })}
          />
          <Input
            label='Apellido'
            value={this.state.last_name}
            onChangeText={t => this.setState({ last_name: t })}
          />
          <Input
            label='E-mail'
            onChangeText={t => this.setState({ email: t })}
            autoCapitalize='none'
            value={this.state.email}
            keyboardType='email-address'
          />
          <Button onPress={this.invite}>INVITAR</Button>
        </ScrollView>
        <Loading loading={this.state.loading} />
      </KeyboardAwareView>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  apartment: state.currentsReducer.apartment
})

export default connect(mapStateToProps)(Invite)
