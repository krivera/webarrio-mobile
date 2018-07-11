import React from 'react'
import { connect } from 'react-redux'
import {
  Dimensions,
  KeyboardAvoidingView,
  Picker,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { API_URL } from 'react-native-dotenv'
import { Picker as PickerIOS } from 'react-native-picker-dropdown'
import Axios from 'axios'
import { Feather } from '@expo/vector-icons'
import FloatingLabelInput from '../components/FloatingLabel'
import Loading from '../components/Loading'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import { ExpenseDetails, MonthsFull } from '../constants/utils'
import Colors from '../constants/Colors'
import { styles as expenseStyles } from '../components/Expense'

class AddExpenseScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Nuevo Gasto',
    headerLeft: (<BackButton navigation={navigation} />)
  })

  constructor(props) {
    super(props)
    const now = new Date()
    this.state = {
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      total: 0,
      details: [],
      portion: 0,
      loading: false
    }
    this.maxYear = now.getFullYear()
  }

  componentDidMount = () => {
    const { unit } = this.props
    console.log(unit)
    if (unit.unit_type === 'condo') {
      this.prorateBy = unit.number_of_homes
      this.setState({
        details: ExpenseDetails.reduce(
          (detailList, detail) =>
            detailList.concat({ label: detail.label, ammount: '' }),
          []
        )
      })
    } else {
      this.prorateBy = unit.number_of_members
    }
  }

  handleChange = (idx, field, value) => {
    const { details } = this.state
    this.setState(
      { details: details.map((detail, index) =>
        index === idx ? { ...detail, [field]: value } : detail
      ) },
      () => {
        const total = this.state.details.reduce(
          (result, detail) => {
            return result + (parseInt(detail.ammount, 10) || 0)
          },
          0
        )
        const portion = Math.ceil(total / this.prorateBy)
        this.setState({ total, portion })
      }
    )
  }

  addExpense = () => {
    this.setState({
      loading: true
    }, () => {
      const { authToken, unit, navigation } = this.props
      const { total, portion, year, month, details } = this.state
      let data = { total, portion, year, month, details: {} }
      details.map(detail => {
        data.details[detail.label] = parseInt(detail.ammount || 0, 10)
      })
      Axios.post(
        `${API_URL}/units/${unit.id}/common_expenses`,
        data,
        {
          headers: {
            Authorization: authToken
          }
        }
      ).then(response => {
        this.setState({ loading: false })
        navigation.goBack()
        navigation.state.params.refreshList()
      })
    })
  }

  render() {
    const { total, portion, loading, details } = this.state
    const Picker_ = Platform.OS === 'ios' ? PickerIOS : Picker
    return (
      <View style={styles.screen}>
        <ScrollView>
          <View style={styles.pickers}>
            <Picker_
              selectedValue={this.state.month}
              onValueChange={value => this.setState({ month: value })}
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
              onValueChange={value => this.setState({ year: value })}
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
            <View>
              {details.map((detail, index) => (
                <View key={`${index}`} style={styles.form}>
                  <FloatingLabelInput
                    style={styles.detailInput}
                    label='Gasto'
                    value={detail.label}
                    onChangeText={t => this.handleChange(index, 'label', t)}
                    labelColor={Colors.subHeading}
                  />
                  <FloatingLabelInput
                    style={styles.detailInput}
                    label='Monto'
                    keyboardType='numeric'
                    value={detail.ammount}
                    onChangeText={t => this.handleChange(index, 'ammount', t)}
                    labelColor={Colors.subHeading}
                  />
                  <TouchableOpacity onPress={() =>
                    this.setState({ details: details.filter((detail, idx) => index !== idx) })
                  }>
                    <Feather name='trash-2' size={20} color={Colors.subHeading} />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                onPress={() => this.setState(
                  { details: details.concat({ label: '', ammount: '' }) }
                )}
                style={styles.addExpense}
              >
                <Feather name='plus' color={Colors.subHeading} size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.form}>
              <FloatingLabelInput
                labelColor='#000'
                style={[styles.detailInput, styles.total]}
                label='Total mes'
                value={`\$ ${total}`}
              />
              <FloatingLabelInput
                labelColor='#000'
                style={[styles.detailInput, styles.total]}
                label='Prorratear'
                value={`\$ ${portion}`}
              />
            </View>
          </View>
          <Button onPress={this.addExpense}>Agregar</Button>
        </ScrollView>
        <KeyboardAvoidingView behavior='padding'/>
        <Loading loading={loading} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  unit: state.currentsReducer.unit,
  authToken: state.authReducer.authToken
})

export default connect(mapStateToProps)(AddExpenseScreen)

const { width } = Dimensions.get('window')

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
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  addExpense: {
    padding: 5,
    alignSelf: 'flex-end'
  }
})
