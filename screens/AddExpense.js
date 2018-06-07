import React from 'react';
import { connect } from 'react-redux';
import {
  Dimensions,
  KeyboardAvoidingView,
  Picker,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { API_URL } from 'react-native-dotenv';
import { Picker as PickerIOS } from 'react-native-picker-dropdown';
import FloatingLabelInput from '../components/FloatingLabel';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import { ExpenseDetails, MonthsFull } from '../constants/utils';
import Colors from '../constants/Colors';
import { styles as expenseStyles } from '../components/Expense';

class AddExpenseScreen extends React.Component{
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Nuevo Gasto',
    headerLeft: (<BackButton navigation={navigation} />),
  })

  constructor(props) {
    super(props);
    const now = new Date();
    this.state = {
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      total: 0,
    };
    ExpenseDetails.map(detail => this.state[detail.key] = '')
    this.maxYear = now.getFullYear();
  }

  handleChange = (key, value) => {
    this.setState(
      {[key]: parseInt(value.replace('$', ''))}, 
      () => this.setState({
        total: ExpenseDetails.reduce((total, detail) => total + (parseInt(this.state[detail.key]) || 0), 0)
      })
    );
  }

  addExpense => () => {
    this.setState({
      loading: true,
    }, () => {
      const { authToken } = this.props;
      let data = {
        common_expense: {
          total: this.state.total,
          portion: this.state.portion,
        }
      }
      for(detail of ExpenseDetails){
        data.common_expense[detail.key] = this.state[detail.key];
      }
      Axios.post(
        `${API_URL}/neighborhoods/${currentNeighborhood.id}/common_expenses`,
        data,
        {
          headers: {
            Authorization: authToken
          }
        }
      ).then()
    })
  }

  render(){
    const { currentNeighborhood } = this.props;
    const { month, year, total } = this.state;
    const Picker_ = Platform.OS === 'ios' ? PickerIOS : Picker;
    return (
      <View style={styles.screen}>
        <ScrollView>
          <View style={styles.pickers}>
            <Picker_
              selectedValue={this.state.month}
              onValueChange={(value, index) => this.setState({month: value})}
              style={[styles.monthPicker, styles.picker]}
              textStyle={styles.pickerText}
            >
              {MonthsFull.map((month, index) => (
                <Picker_.Item
                  value={index + 1}
                  key={`key-${index}`}
                  label={month}
                />
              ))}
            </Picker_>
            <Picker_
              selectedValue={this.state.year}
              onValueChange={(value, index) => this.setState({year: value})}
              style={[styles.yearPicker, styles.picker]}
              textStyle={styles.pickerText}
            >
              {Array(this.maxYear - 2000).fill(1).map((_, index) => (
                <Picker_.Item
                  value={this.maxYear - index}
                  key={`key-${index}`}
                  label={`${this.maxYear - index}`}
                />
              ))}
            </Picker_>
          </View>
          <View style={expenseStyles.detail}>
            <Text style={expenseStyles.detailHeader}>Detalles de Gastos</Text>
            <View style={styles.form}>
              {ExpenseDetails.map(detail => (
                <View key={detail.key}>
                  <FloatingLabelInput
                    style={styles.detailInput}
                    label={detail.label}
                    value={this.state[detail.key] && `\$${this.state[detail.key]}`}
                    keyboardType="numeric"
                    onChangeText={t => this.handleChange(detail.key, t)}
                    labelColor={Colors.subHeading}
                  />
                </View>
              ))}
            </View>
            <View style={styles.form}>
              <FloatingLabelInput
                labelColor="#000"
                style={[styles.detailInput, styles.total]}
                label="Total mes"
                value={`\$ ${total}`}
              />
              <FloatingLabelInput
                labelColor="#000"
                style={[styles.detailInput, styles.total]}
                label="Prorratear"
                value={`\$ ${Math.ceil(total / currentNeighborhood.number_of_homes)}`}
              />
            </View>
          </View>
          <Button onPress={this.addExpense}>Agregar</Button>
        </ScrollView>
        <KeyboardAvoidingView behavior="padding"/>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  currentNeighborhood: state.currentsReducer.neighborhood
});

export default connect(mapStateToProps)(AddExpenseScreen);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1
  },
  pickers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  monthPicker: {
    width: 160
  },
  yearPicker: {
    width: 100
  },
  picker: {
    marginTop: 10,
    height: 25
  },
  pickerText: {
    fontSize: 18
  },
  detailInput: {
    width: Math.min(width * 0.38, 150),
    borderBottomColor: Colors.subHeading
  },
  total: {
    fontSize: 22,
    color: Colors.orange
  },
  form: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  }
});
