import React from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import Expense from '../components/Expense';

class ExpensesScreen extends React.Component{
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Gastos Comunes',
  });

  constructor(props) {
    super(props);
  
    this.state = {
      expenses: []
    };
  }

  componentWillMount = () => {
    const { authToken, currentApartment } = this.props;
    Axios.get(
      `${API_URL}/apartments/${currentApartment.id}/common_expenses`,
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
    })
  }

  renderExpense = ({ item: expense}) => {
    return (<Expense expense={expense} />);
  }

  render(){
    return (
      <View style={styles.screen}>
        <FlatList
          data={this.state.expenses}
          renderItem={this.renderExpense}
          keyExtractor={(item, index) => `id-${index}`}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  currentApartment: state.currentsReducer.apartment,
});

export default connect(mapStateToProps)(ExpensesScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  }
});
