import React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Ionicons, Foundation, SimpleLineIcons } from '@expo/vector-icons';
import { withGlobalize } from 'react-native-globalize';
import { Bar as ProgressBar } from 'react-native-progress';
import WebarrioIcon from '../components/WebarrioIcon';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import { MonthsFull, ExpenseDetails } from '../constants/utils';

const ICON_SIZE = 25;

class Expense extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      collapsed: true,
      flip: new Animated.Value(0)
    };
    this.goToPayment = this.goToPayment.bind(this);
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    }, () =>
      Animated.timing(this.state.flip, {
        toValue: this.state.collapsed ? 0 : 1,
        duration: 300,
        easing: Easing.linear
      }).start()
    );
  }

  goToPayment = () => {
    this.props.goToPayment(this.props.expense)
  }

  render(){
    const { expense, globalize, treasurerView } = this.props;
    const formatter = globalize.getNumberFormatter({});
    let checkmark = 'ios-checkmark-circle';
    const spin = this.state.flip.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
      useNativeDriver: true
    });
    let percentCollected = 0;
    if(!expense.paid){
      checkmark += '-outline'
    }
    if(treasurerView){
      percentCollected = expense.collected / expense.total;
    }

    return (
      <View style={styles.expense}>
        <TouchableOpacity
          onPress={this.toggleCollapse}
          style={styles.header}
        >
          {!treasurerView && (
            <Ionicons
              size={25}
              name={checkmark}
              color={Colors.orange}
              style={styles.collapseButton}
            />
          )}
          <Text style={styles.month}>{MonthsFull[parseInt(expense.month) - 1]}</Text>
          <Animated.View style={{transform: [{rotateX: spin}]}}>
            <Ionicons name="ios-arrow-down" size={20} />
          </Animated.View>
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
                  <Ionicons name={detail.icon} color={Colors.subHeading} size={ICON_SIZE} />
                </View>
                <Text style={styles.detailText}>{detail.label}</Text>
                <Text style={styles.number}>
                  ${formatter(expense[`total_${detail.key}`])}
                </Text>
              </View>
            ))}
            {treasurerView && (
              <View style={styles.treasurer}>
                <View style={styles.row}>
                  <Text style={styles.detailHeader}>Total Recaudado</Text>
                  <Text style={[styles.number, styles.collected]}>
                    $ {formatter(expense.collected)}
                  </Text>
                </View>
                <View style={styles.progress}>
                  <Text
                    style={[styles.progressPercent, {width: 300 * percentCollected}]}
                    numberOfLines={1}
                  >
                    {formatter(Math.round(100 * percentCollected))}%
                  </Text>
                  <ProgressBar
                    progress={percentCollected}
                    width={300}
                    height={10}
                    borderRadius={0}
                    borderWidth={0}
                    color={Colors.orange}
                    unfilledColor={'#e9efef'}
                  />
                </View>
              </View>
            )}
            {!treasurerView && (
              <Button onPress={this.goToPayment}>
                Pagar
              </Button>
            )}
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
  month: {
    fontSize: 20,
    marginRight: 10
  },
  number: {
    flex: 1,
    textAlign: 'right',
  },
  total: {
    color: Colors.orange,
    fontSize: 22
  },
  collected: {
    color: Colors.orange,
    fontSize: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iContainer: {
    width: 30, 
    alignItems: 'center',
    marginLeft: -7
  },
  detail: {
    alignSelf: 'stretch',
    paddingBottom: 15,
    paddingHorizontal: 15
  },
  detailHeader: {
    fontWeight: 'bold'
  },
  detailText: {
    color: Colors.subHeading
  },
  collapseButton: {
    paddingRight: 10
  },
  expense: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border
  },
  progress: {
    alignSelf: 'center',
  },
  progressPercent: {
    color: Colors.orange,
    textAlign: 'right',
    fontSize: 20,
    minWidth: 28
  },
  treasurer: {
    paddingTop: 15
  }
});
