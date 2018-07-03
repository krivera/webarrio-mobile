import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import Colors from '../constants/Colors';
import BackButton from '../components/BackButton';
import { MonthsFull, PaymentMethodTypes } from '../constants/utils';

class Pay extends React.Component{
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Gastos Comunes',
    headerLeft: (<BackButton />)
  });

  constructor(props) {
    super(props);
  
    this.state = {
      paymentMethods: []
    };
  }

  componentWillMount = () => {
    const { authToken, neighborhood } = this.props;
    Axios.get(
      `${API_URL}/neighborhoods/${neighborhood.id}/payment_methods`,
      {
        headers: {
          Authorization: authToken
        }
      }
    ).then(response => {
      this.setState({
        paymentMethods: response.data.payment_methods
      });
    })
  }

  render(){
    const { total, month } = this.props.navigation.state.params;
    const { paymentMethods } = this.state;
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
  authToken: state.authReducer.authToken,
  neighborhood: state.currentsReducer.neighborhood,
});

export default connect(mapStateToProps)(Pay);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 15,
    flex: 1
  },
  total: {
    color: Colors.orange,
    fontSize: 20,
    borderBottomColor: Colors.subHeading,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10
  },
  method: {
    alignItems: 'center',
    margin: 10,
  },
  methodHead: {
    color: Colors.orange
  },
  methodSection: {
    fontWeight: 'bold',
    marginTop: 30
  }
});
