import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View
} from 'react-native'
import Axios from 'axios'
import { API_URL } from 'react-native-dotenv'
import BackButton from '../components/BackButton'
import { MonthsFull, PaymentMethodTypes } from '../constants/utils'
import styles from './styles/Pay'

class Pay extends React.Component {
  static navigationOptions = () => ({
    headerTitle: 'Gastos Comunes',
    headerLeft: (<BackButton />)
  });

  constructor(props) {
    super(props)

    this.state = {
      paymentMethods: []
    }
  }

  componentDidMount = () => {
    const { authToken } = this.props
    const { unit } = this.props.navigation.state.params
    Axios.get(
      `${API_URL}/units/${unit.id}/payment_methods`,
      {
        headers: {
          Authorization: authToken
        }
      }
    ).then(response => {
      this.setState({
        paymentMethods: response.data.payment_methods
      })
    })
  }

  render() {
    const { total, month, unit } = this.props.navigation.state.params
    const { paymentMethods } = this.state
    return (
      <View style={styles.screen}>
        <Text>Monto</Text>
        <Text style={styles.total}>
          $ {total}
        </Text>
        <Text>Concepto</Text>
        <Text style={styles.methodHead}>
          Gastos Comunes {MonthsFull[month]}
        </Text>
        <Text style={styles.unitName}>{unit.name}</Text>
        <Text style={styles.methodSection}>Métodos de pago</Text>
        {paymentMethods.map(method => (
          <View key={method.id} style={styles.method}>
            <Text style={styles.methodHead}>
              {PaymentMethodTypes[method.type_of].label}
            </Text>
            <Text>{method.name}</Text>
            {PaymentMethodTypes[method.type_of].attrs.map(attr => (
              <Text key={attr.key}>
                {attr.label}: {method[attr.key]}
              </Text>
            ))}
          </View>
        ))}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken
})

export default connect(mapStateToProps)(Pay)
