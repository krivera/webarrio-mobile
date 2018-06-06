import React from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { Feather } from '@expo/vector-icons';
import Expense from '../components/Expense';
import WebarrioIcon from '../components/WebarrioIcon';
import Colors from '../constants/Colors';

class ExpensesScreen extends React.Component{
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Gastos Comunes',
    headerLeft: (<View>{navigation.state.params && navigation.state.params.showMenu && (
        <TouchableOpacity onPress={navigation.state.params.toggleMenu}>
          <Feather name="menu" size={25} color="white" />
        </TouchableOpacity>
      )}
    </View>),
    headerRight: (<View>
        <TouchableOpacity onPress={() => navigation.navigate('AddExpense')}>
          <Feather name="plus" size={25} color="white" />
        </TouchableOpacity>
      
    </View>)
  });

  constructor(props) {
    super(props);
  
    this.state = {
      expenses: [],
      menuOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.goToPayment = this.goToPayment.bind(this);
  }

  componentWillMount = () => {
    const { authToken, currentApartment, currentNeighborhood, navigation } = this.props;
    const treasurer = currentNeighborhood.user_roles.includes('treasurer');
    this.treasurerView = treasurer && !(navigation.state.params && navigation.state.params.personal);
    const url = `${API_URL}/${this.treasurerView ? 'neighborhoods/' + currentNeighborhood.id : 'apartments/' + currentApartment.id}/common_expenses`;
    Axios.get(
      url,
      {
        headers: {
          Authorization: authToken
        }
      }
    ).then(response => {
      console.log(response.data)
      this.setState({
        expenses: response.data.common_expenses
      })
    });
    if(treasurer){
      navigation.setParams({
        showMenu: true,
        toggleMenu: this.toggleMenu
      })
    }
  }

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  goToPayment = expense => this.props.navigation.navigate('Payment', { expense });

  renderExpense = ({ item: expense}) => {
    return (
      <Expense
        expense={expense}
        treasurerView={this.treasurerView}
        goToPayment={this.goToPayment}
      />);
  }

  goToPersonal = () => {
    this.props.navigation.navigate('Expenses', {personal: true});
  }

  render(){
    return (
      <View style={styles.screen}>
        <FlatList
          data={this.state.expenses}
          renderItem={this.renderExpense}
          keyExtractor={(item, index) => `id-${index}`}
        />
        {this.state.menuOpen && (
          <TouchableWithoutFeedback
            onPress={this.toggleMenu}
          >
            <View style={styles.menuContainer}>
              <View style={styles.menu}>
                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={() => this.props.navigation.navigate('Expenses')}
                >
                  <View style={styles.menuIcon}>
                    <WebarrioIcon
                      name="dashboard"
                      size={25}
                      color={Colors.orange}
                    />
                  </View>
                  <Text>Gastos Comunes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={this.goToPersonal}
                >
                  <View style={styles.menuIcon}>
                    <WebarrioIcon
                      name="user"
                      size={25}
                      color={Colors.orange}
                    />
                  </View>
                  <Text>Gastos Comunes Personal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={() => this.props.navigation.navigate('PaymentMethods')}
                >
                  <View style={styles.menuIcon}>
                    <Feather
                      name="credit-card"
                      size={25}
                      color={Colors.orange}
                    />
                  </View>
                  <Text>Medios de pago</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  currentApartment: state.currentsReducer.apartment,
  currentNeighborhood: state.currentsReducer.neighborhood
});

export default connect(mapStateToProps)(ExpensesScreen);

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
    left:0,
    bottom: 0,
    right: 0
  },
  menuIcon: {
    width: 30,
    alignItems: 'center'
  }
});
