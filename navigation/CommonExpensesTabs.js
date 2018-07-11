import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'
import Colors from '../constants/Colors'

class CommonExpensesTabs extends React.Component {
  constructor(props) {
    super(props)

    const { navigation: { navigate } } = props
    this.tabs = [
      {
        key: 'Expenses',
        label: 'Gastos Comunes',
        callback: () => navigate('Expenses')
      },
      {
        key: 'PersonalExpenses',
        label: 'Gasto Personal',
        callback: () => navigate('Expenses', { personal: true })
      },
      {
        key: 'PaymentMethods',
        label: 'Métodos de Pago',
        callback: () => navigate('PaymentMethods')
      }
    ]
    this.state = {}
  }
  render() {
    const { currentTab } = this.props
    return (
      <View style={styles.bar}>
        {this.tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            onPress={tab.callback}
            disabled={currentTab === tab.key}
          >
            <Text style={[styles.tabText, currentTab === tab.key && styles.current]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

export default withNavigation(CommonExpensesTabs)

CommonExpensesTabs.propTypes = {
  currentTab: PropTypes.string
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: '#e9efef',
    top: 0,
    left: 0,
    right: 0
  },
  tabText: {
    color: Colors.subHeading,
    fontSize: 12
  },
  current: {
    color: Colors.orange
  }
})
