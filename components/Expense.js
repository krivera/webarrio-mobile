import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Ionicons, Foundation, SimpleLineIcons } from '@expo/vector-icons';
import { withGlobalize } from 'react-native-globalize';
import WebarrioIcon from '../components/WebarrioIcon';
import Colors from '../constants/Colors';
import { MonthsFull, ExpenseDetails } from '../constants/utils';

class Expense extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      collapsed: true
    };
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render(){
    const { expense, globalize } = this.props;
    const formatter = globalize.getNumberFormatter({});
    let checkmark = 'ios-checkmark-circle';
    if(!this.state.collapsed){
      checkmark += '-outline'
    }
    return (
      <View style={styles.expense}>
        <TouchableOpacity
          onPress={this.toggleCollapse}
          style={styles.header}
        >
          <Ionicons
            size={25}
            name={checkmark}
            color={Colors.orange}
            style={styles.collapseButton}
          /> 
          <Text>{MonthsFull[parseInt(expense.month) - 1]}</Text>
          <Text style={[styles.number, styles.total]}>
            $ {formatter(expense.total)}
          </Text>
        </TouchableOpacity>
        <Collapsible collapsed={this.state.collapsed}>
          <View style={styles.detail}>
            <Text style={styles.detailHeader}>Detalle de gastos</Text>
            {ExpenseDetails.map(detail => (
              <View style={styles.row} key={detail.key}>
                <View style={styles.iContainer}>
                  {detail.icon}
                </View>
                <Text>{detail.label}</Text>
                <Text style={styles.number}>
                  $ {formatter(expense[`total_${detail.key}`])}
                </Text>
              </View>
            ))}
          </View>
        </Collapsible>
      </View>
    );
  }
}

export default withGlobalize(Expense);

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    flex: 1,
    padding: 15,
    alignItems: 'center'
  },
  number: {
    flex: 1,
    textAlign: 'right',
  },
  total: {
    color: Colors.border,
    fontSize: 22
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200
  },
  iContainer: {
    width: 30, 
    alignItems: 'center'
  },
  detail: {
    alignSelf: 'center',
    paddingBottom: 15
  },
  detailHeader: {
    fontWeight: 'bold'
  },
  collapseButton: {
    paddingRight: 10
  },
  expense: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border
  }
});
