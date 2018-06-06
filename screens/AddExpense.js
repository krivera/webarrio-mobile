import React from 'react';
import {
  Picker,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { API_URL } from 'react-native-dotenv';
import { Picker as PickerIOS } from 'react-native-picker-dropdown';
import BackButton from '../components/BackButton';
import { ExpenseDetails, MonthsFull } from '../constants/utils';
import Colors from '../constants/Colors';
import { styles as expenseStyles } from '../components/Expense';

export default class AddExpenseScreen extends React.Component{
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Nuevo Gasto',
    headerLeft: (<BackButton navigation={navigation} />),
  })

  constructor(props) {
    super(props);
    const now = new Date();
    this.state = {
      month: now.getMonth() + 1,
      year: now.getFullYear()
    };
    this.maxYear = now.getFullYear();
  }

  render(){
    const { month, year } = this.state;
    const Picker_ = Platform.OS === 'ios' ? PickerIOS : Picker;
    return (
      <View>
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
          {ExpenseDetails.map(detail => (
            <View style={expenseStyles.row} key={detail.key}>
              <View style={expenseStyles.iContainer}>
                {detail.icon}
              </View>
              <Text>{detail.label}</Text>
              <TextInput
                value={this.state[detail.key]}
                onTextChange={t => this.setState({[detail.key]: t})}
                keyboardType="numeric"
                style={styles.detailInput}
              />
            </View>
          ))}
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
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
    width: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    position: 'absolute',
    right: 0
  }
});
