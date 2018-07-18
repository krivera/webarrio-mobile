import React from 'react'
import { connect } from 'react-redux'
import { API_URL } from 'react-native-dotenv'
import {
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  View
} from 'react-native'
import ToastIOS from 'react-native-root-toast'
import Axios from 'axios'
import { setCurrent } from '../actions/currents'
import Picker from '../components/Picker'
import UnitPicker from '../components/UnitPicker'
import KeyboardAwareView from '../components/KeyboardAwareView'
import FloatingLabelInput from '../components/FloatingLabel'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import Loading from '../components/Loading'
import { PaymentMethodTypes } from '../constants/utils'
import Colors from '../constants/Colors'
import Banks from '../constants/Banks'
import styles from './styles/AddPaymentMethod'

class AddPaymentMethod extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Métodos de Pago',
    headerLeft: <BackButton />
  });

  constructor(props) {
    super(props)

    const { method } = props.navigation.state.params

    this.state = {
      ...method || {},
      bank: method && method.bank ? Banks.indexOf(method.bank) : 0,
      type_of: method ? method.type_of : 'bank_transfer',
      name: method ? method.name : '',
      offset: 0
    }
  }

  componentDidMount = () => {
    const { neighborhood, unit, dispatch } = this.props
    if (!unit.user_roles.includes('treasurer')) {
      dispatch(setCurrent(
        'unit',
        neighborhood.neighborhood_units.find(
          unt => unt.user_roles.includes('treasurer')
        )
      ))
    }
  }

  saveMethod = () => {
    const { authToken, unit, navigation } = this.props
    this.setState(
      { loading: true },
      () => {
        const {
          type_of,
          name,
          address,
          comments,
          rut,
          bank,
          account_type,
          account_number,
          email
        } = this.state
        const edit = navigation.state.params && navigation.state.params.method
        const reqMethod = edit ? 'put' : 'post'
        let url = `${API_URL}/units/${unit.id}/payment_methods`
        if (edit) {
          url = `${url}/${navigation.state.params.method.id}`
        }
        Axios[reqMethod](
          url,
          {
            payment_method: {
              type_of,
              name,
              address,
              comments,
              rut,
              bank: Banks[bank],
              account_type,
              account_number,
              email
            }
          },
          {
            headers: {
              Authorization: authToken
            }
          }
        ).then(response => {
          this.setState({ loading: false })
          this.props.navigation.goBack()
          this.props.navigation.state.params.methodsList.onRefresh()
        }).catch(err => {
          const msg = 'Revise su conexión y reintente'
          this.setState({ loading: false })
          if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.LONG)
          } else {
            ToastIOS.show(msg, { duration: ToastIOS.durations.LONG })
          }
        })
      }
    )
  }

  render() {
    const {
      type_of,
      name,
      rut,
      bank,
      account_type,
      account_number,
      comments,
      email,
      address,
      loading
    } = this.state
    return (
      <KeyboardAwareView style={styles.screen}>
        <ScrollView style={styles.form}>
          <Text>Método</Text>
          <Picker
            onValueChange={(value, index) => this.setState({ type_of: value })}
            selectedValue={type_of}
            style={styles.picker}
          >
            {Object.keys(PaymentMethodTypes).map(key => (
              <Picker.Item
                value={key}
                label={PaymentMethodTypes[key].label}
                key={key}
              />
            ))}
          </Picker>
          <UnitPicker role='treasurer' />
          <View>
            <FloatingLabelInput
              value={name}
              onChangeText={t => this.setState({ name: t })}
              label='Nombre'
              labelColor={Colors.subHeading}
            />
          </View>
          {type_of === 'bank_transfer' && (
            <View>
              <View style={styles.formControl}>
                <FloatingLabelInput
                  value={rut || ''}
                  onChangeText={t => this.setState({ rut: t })}
                  label='Rut'
                  labelColor={Colors.subHeading}
                />
              </View>
              <View style={styles.formControl}>
                <Text style={styles.label}>Banco</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={bank || ''}
                  onValueChange={(val, index) => this.setState({ bank: val })}
                >
                  {Banks.map((bankOpt, index) => (
                    <Picker.Item
                      value={index}
                      key={`${index}`}
                      label={bankOpt}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.row}>
                <View>
                  <Text style={styles.label}>Tipo de Cuenta</Text>
                  <Picker
                    selectedValue={account_type || ''}
                    onValueChange={(val, index) => this.setState({ account_type: val })}
                    style={[styles.picker, styles.accountType]}
                    textStyle={styles.pickerIos}
                    itemStyle={styles.picker}
                  >
                    <Picker.Item
                      value='checking'
                      label='Corriente'
                    />
                    <Picker.Item
                      value='savings'
                      label='Ahorro'
                    />
                    <Picker.Item
                      value='current'
                      label='Vista'
                    />
                  </Picker>
                </View>
                <FloatingLabelInput
                  value={account_number || ''}
                  onChangeText={t => this.setState({ account_number: t })}
                  label='Número de Cuenta'
                  labelColor={Colors.subHeading}
                  containerStyle={styles.accountNumber}
                />
              </View>
              <View style={styles.formControl}>
                <FloatingLabelInput
                  value={email || ''}
                  onChangeText={t => this.setState({ email: t })}
                  label='Email'
                  labelColor={Colors.subHeading}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
              </View>
            </View>
          )}
          {type_of === 'cash' && (
            <View style={styles.formControl}>
              <FloatingLabelInput
                value={address || ''}
                onChangeText={t => this.setState({ address: t })}
                label='Dirección'
                labelColor={Colors.subHeading}
              />
            </View>
          )}
          <View style={styles.formControl}>
            <FloatingLabelInput
              value={comments || ''}
              onChangeText={t => this.setState({ comments: t })}
              label='Comentarios'
              labelColor={Colors.subHeading}
            />
          </View>
          <Button onPress={this.saveMethod}>Guardar</Button>
        </ScrollView>
        <Loading loading={loading} />
      </KeyboardAwareView>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  unit: state.currentsReducer.unit
})

export default connect(mapStateToProps)(AddPaymentMethod)
