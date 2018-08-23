import React from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SimpleLineIcons, Feather } from '@expo/vector-icons'
import { API_URL } from 'react-native-dotenv'
import Colors from '../constants/Colors'
import RefreshingList from '../components/RefreshingList'
import CommonExpensesTabs from '../navigation/CommonExpensesTabs'
import { PaymentMethodTypes } from '../constants/utils'


class PaymentMethods extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Métodos de pago',
    headerRight: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'AddPaymentMethod',
            { methodsList: navigation.state.params.methodsList }
          )
        }
      >
        <Feather name='plus' size={25} color='white' />
      </TouchableOpacity>
    )
  })

  renderMethod = ({ item: method }) => {
    return (
      <View style={styles.method}>
        <View style={styles.methodHead}>
          <Text style={styles.methodHeadText}>
            {PaymentMethodTypes[method.type_of].label}
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(
                'AddPaymentMethod',
                { method, methodsList: this.methodsList }
              )
            }
          >
            <SimpleLineIcons name='pencil' size={20} color={Colors.orange} />
          </TouchableOpacity>
        </View>
        <Text>{method.name}</Text>
        {PaymentMethodTypes[method.type_of].attrs.map(
          (attr, index) => (
            <Text key={`${index}`}>
              {attr.label}: {method[attr.key]}
            </Text>
          )
        )}
        {method.comments && (
          <Text>Comentarios: {method.comments}</Text>
        )}
      </View>
    )
  }

  componentDidMount = () => {
    this.props.navigation.setParams({ methodsList: this.methodsList })
  }

  render() {
    const { authToken, unit } = this.props
    return (
      <View style={styles.screen}>
        <CommonExpensesTabs currentTab='PaymentMethods' />
        <RefreshingList
          url={`${API_URL}/units/${unit.id}/payment_methods`}
          dataName='payment_methods'
          authorization={authToken}
          renderItem={this.renderMethod}
          ref={r => {
            this.methodsList = r
          }}
        />
      </View>
    )
  }
}


const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  unit: state.currentsReducer.unit
})

export default connect(mapStateToProps)(PaymentMethods)

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  methodHead: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5
  },
  methodHeadText: {
    color: Colors.orange,
    fontSize: 18
  },
  method: {
    padding: 15,
    borderBottomColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})
