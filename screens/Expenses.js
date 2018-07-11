import React from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { API_URL } from 'react-native-dotenv'
import { Feather } from '@expo/vector-icons'
import RefreshingList from '../components/RefreshingList'
import Expense from '../components/Expense'
import Colors from '../constants/Colors'
import CommonExpensesTabs from '../navigation/CommonExpensesTabs'

class ExpensesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Gastos Comunes',
    headerRight: (<View>
      {navigation.state.params && navigation.state.params.treasurerView && (
        <TouchableOpacity onPress={() =>
          navigation.navigate(
            'AddExpense',
            {
              refreshList: navigation.state.params.refreshList
            }
          )
        }>
          <Feather name='plus' size={25} color='white' />
        </TouchableOpacity>
      )}
    </View>)
  });

  constructor(props) {
    super(props)

    this.state = { }
    this.refreshList = this.refreshList.bind(this)
  }

  componentDidMount = () => {
    this.props.navigation.setParams({ refreshList: this.refreshList })
  }

  refreshList = () => {
    this.list.onRefresh()
  }

  componentWillMount = () => {
    const { unit, neighborhood, navigation } = this.props
    const treasurer = unit.user_roles.includes('treasurer')
    this.treasurerView = treasurer && !(navigation.state.params && navigation.state.params.personal)
    this.url = `${API_URL}/${this.treasurerView ? 'units/' + unit.id : 'neighborhoods/' + neighborhood.id}/common_expenses`
    navigation.setParams({ treasurerView: this.treasurerView })
  }

  goToPayment = expense => {
    this.props.navigation.navigate(
      'Pay',
      { total: expense.total, month: expense.month, unit: { id: expense.unit_id, name: expense.unit_name } })
  }

  renderExpense = ({ item: expense }) => {
    return (
      <Expense
        expense={expense}
        treasurerView={this.treasurerView}
        goToPayment={this.goToPayment}
      />)
  }

  render() {
    const { authToken, unit } = this.props
    const treasurer = unit.user_roles.includes('treasurer')
    return (
      <View style={styles.screen}>
        {treasurer && (
          <CommonExpensesTabs
            currentTab={this.treasurerView ? 'Expenses' : 'PersonalExpenses'}
          />
        )}
        <RefreshingList
          url={this.url}
          authorization={authToken}
          dataName='common_expenses'
          renderItem={this.renderExpense}
          ref={r => {
            this.list = r
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  unit: state.currentsReducer.unit,
  neighborhood: state.currentsReducer.neighborhood
})

export default connect(mapStateToProps)(ExpensesScreen)

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.menubkg
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  menuContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  menuIcon: {
    width: 30,
    alignItems: 'center'
  }
})
