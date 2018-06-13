import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SimpleLineIcons, Feather } from '@expo/vector-icons';
import { API_URL } from 'react-native-dotenv';
import Colors from '../constants/Colors';
import RefreshingList from '../components/RefreshingList';
import CommonExpensesTabs from '../navigation/CommonExpensesTabs';
import { PaymentMethodTypes } from '../constants/utils';

class PaymentMethods extends React.Component{
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Métodos de pago",
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('AddPaymentMethod')}
      >
        <Feather name="plus" size={25} color="white" />
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
            onPress={() => this.props.navigation('AddPaymentMethod', { method })}
          >
            <SimpleLineIcons name="pencil" size={20} color={Colors.orange} />
          </TouchableOpacity>
        </View>
        <Text>{method.name}</Text>
        {PaymentMethodTypes[method.type].attrs.map(attr => (
          <Text>{attr.label}: {method[attr.key]}</Text>
        ))}
      </View>
    );
  }

  render(){
    const { authToken, currentNeighborhood } = this.props;
    return (
      <View style={styles.screen}>
        <CommonExpensesTabs currentTab="PaymentMethods" />
        <RefreshingList
          url={`${API_URL}/neighborhoods/${currentNeighborhood.id}/payment_methods`}
          dataName="payment_methods"
          authorization={authToken}
          renderItem={this.renderMethod}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  currentNeighborhood: state.currentsReducer.neighborhood
})

export default connect(mapStateToProps)(PaymentMethods);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  methodHead: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  method: {
    padding: 10,
    borderBottomColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
