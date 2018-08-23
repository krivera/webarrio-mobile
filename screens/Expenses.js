import React from 'react'
import { connect } from 'react-redux'
import {
  TouchableOpacity,
  View
} from 'react-native'
import { API_URL } from 'react-native-dotenv'
import { Feather } from '@expo/vector-icons'
import RefreshingList from '../components/RefreshingList'
import Expense from '../components/Expense'
import CommonExpensesTabs from '../navigation/CommonExpensesTabs'
import styles from './styles/Expenses'

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
  })

  constructor(props) {
    super(props)

    this.state = {
      treasurerView: false
    }
    this.refreshList = this.refreshList.bind(this)
  }

  componentDidMount = () => {
    this.props.navigation.setParams({ refreshList: this.refreshList })
    this.updateView()
  }

  componetnDidUpdate = prevProps => {
    const { neighborhood } = this.props
    const { prevNgbrhood } = prevProps
    if (neighborhood !== prevNgbrhood) {
      this.updateView()
      this.refreshList()
    }
  }

  refreshList = () => {
    this.list.onRefresh()
  }

  updateView = () => {
    const { neighborhood, navigation } = this.props
    const treasurerUnit = neighborhood.neighborhood_units.find(
      unit => unit.user_roles.includes('treasurer')
    )
    this.setState({
      treasurerView: treasurerUnit && !(navigation.state.params && navigation.state.params.personal)
    }, () => {
      this.setState({
        url: `${API_URL}/${this.state.treasurerView
          ? 'units/' + treasurerUnit.id
          : 'neighborhoods/' + neighborhood.id
        }/common_expenses`
      })
      navigation.setParams({ treasurerView: this.state.treasurerView })
    })
  }

  goToPayment = expense => {
    this.props.navigation.navigate(
      'Pay',
      {
        total: expense.total,
        month: expense.month,
        unit: { id: expense.unit_id, name: expense.unit_name }
      })
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
    const { authToken, neighborhood } = this.props
    const { treasurerView, url } = this.state
    const treasurerUnit = neighborhood.neighborhood_units.find(
      unit => unit.user_roles.includes('treasurer')
    )
    return (
      <View style={styles.screen}>
        {treasurerUnit && (
          <CommonExpensesTabs
            currentTab={treasurerView ? 'Expenses' : 'PersonalExpenses'}
          />
        )}
        {url && (
          <RefreshingList
            url={url}
            authorization={authToken}
            dataName='common_expenses'
            renderItem={this.renderExpense}
            ref={r => {
              this.list = r
            }}
          />
        )}
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
