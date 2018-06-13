import React from 'react';
import { connect } from 'react-redux';
import { API_URL } from 'react-native-dotenv';
import {
  Dimensions,
  KeyboardAvoidingView,
  Picker,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Picker as PickerIOS } from 'react-native-picker-dropdown';
import FloatingLabelInput from '../components/FloatingLabel';
import BackButton from '../components/BackButton';
import Button from "../components/Button";
import { PaymentMethodTypes } from '../constants/utils';
import Colors from '../constants/Colors';
import Banks from '../constants/Banks';
import { tabBarHeight } from '../navigation/MainTabNavigator';

class AddPaymentMethod extends React.Component{
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Métodos de Pago',
    headerLeft: <BackButton />
  });

  constructor(props) {
    super(props);
  
    this.state = {
      type_of: 'bank_transfer',
      name: '',
      offset: 0
    };
  }

  onLayout = ({ nativeEvent: { layout: { height } } }) => {
    this.setState({
      offset: Dimensions.get('window').height - height - tabBarHeight
    });
  }

  saveMethod = () => {
    const { authToken, currentNeighborhood } = this.props;
    this.setState(
      {loading: true},
      () => {
        Axios.post(
          `${API_URL}/neighborhood/${currentNeighborhood.id}/payment_methods`,
          {},
          {
            headers: {
              Authorization: authToken
            }
          }
        )
      }
    )
  }

  render() {
    const Picker_ = Platform.OS === 'ios' ? PickerIOS : Picker;
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
      offset
    } = this.state;
    return (
      <View style={styles.screen} onLayout={this.onLayout}>
        <ScrollView style={styles.form}>
          <Text>Método</Text>
          <Picker_
            onValueChange={(value, index) => this.setState({type_of: value})}
            selectedValue={type_of}
            style={styles.picker}
          >
            {Object.keys(PaymentMethodTypes).map(key => (
              <Picker_.Item
                value={key}
                label={PaymentMethodTypes[key].label}
                key={key}
              />
            ))}
          </Picker_>
          <View>
            <FloatingLabelInput
              value={name}
              onChangeText={t => this.setState({name: t})}
              label="Nombre"
              labelColor={Colors.subHeading}
            />
          </View>
          {type_of === 'bank_transfer' && (
            <View>
              <View style={styles.formControl}>
                <FloatingLabelInput
                  value={rut || ''}
                  onChangeText={t => this.setState({rut: t})}
                  label="Rut"
                  labelColor={Colors.subHeading}
                />
              </View>
              <View style={styles.formControl}>
                <Text style={styles.label}>Banco</Text>
                <Picker_
                  style={styles.picker}
                  selectedValue={bank || ''}
                  onValueChange={(val, index) => this.setState({bank: val})}
                >
                  {Banks.map((bank, index) => (
                    <Picker_.Item
                      value={index}
                      key={`${index}`}
                      label={bank}
                    />
                  ))}
                </Picker_>
              </View>
              <View style={styles.row}>
                <View>
                  <Text style={styles.label}>Tipo de Cuenta</Text>
                  <Picker_
                    selectedValue={account_type || ''}
                    onValueChange={(val, index) => this.setState({account_type: val})}
                    style={[styles.picker, styles.accountType]}
                    textStyle={styles.pickerIos}
                    itemStyle={styles.picker}
                  >
                    <Picker_.Item
                      value="checking"
                      label="Corriente"
                    />
                    <Picker_.Item
                      value="savings"
                      label="Ahorro"
                    />
                    <Picker_.Item
                      value="current"
                      label="Vista"
                    />
                  </Picker_>
                </View>
                <FloatingLabelInput
                  value={account_number || ''}
                  onChangeText={t => this.setState({account_number: t})}
                  label="Número de Cuenta"
                  labelColor={Colors.subHeading}
                  containerStyle={styles.accountNumber}
                />
              </View>
              <View style={styles.formControl}>
                <FloatingLabelInput
                  value={email || ''}
                  onChangeText={t => this.setState({email: t})}
                  label="Email"
                  labelColor={Colors.subHeading}
                  keyboardType="email-address"
                />
              </View>
            </View>
          )}
          {type_of === "cash" && (
            <View style={styles.formControl}>
              <FloatingLabelInput
                value={address || ''}
                onChangeText={t => this.setState({address: t})}
                label="Dirección"
                labelColor={Colors.subHeading}
              />
            </View>
          )}
          <View style={styles.formControl}>
            <FloatingLabelInput
              value={comments || ''}
              onChangeText={t => this.setState({comments: t})}
              label="Comentarios"
              labelColor={Colors.subHeading}
            />
          </View>
          <Button>Guardar</Button>
        </ScrollView>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={offset}
          enabled
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  currentNeighborhood: state.currentsReducer.neighborhood
});

export default connect(mapStateToProps)(AddPaymentMethod);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  form: {
    padding: 15
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 5
  },
  picker: {
    borderBottomColor: Colors.subHeading,
    borderBottomWidth: 1,
    height: 27
  },
  label: {
    color: Colors.subHeading
  },
  accountType: {
    width: 130
  },
  accountNumber: {
    flex: 0.9
  },
  pickerIos: {
    fontSize: 18,
  },
  formControl: {
    marginTop: 5
  }
});
