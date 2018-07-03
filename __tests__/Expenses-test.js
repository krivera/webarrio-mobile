/* global
  it
  expect
*/
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Expense from '../components/Expense'
import { FormattedProvider } from 'react-native-globalize'
import AddExpenseScreen from '../screens/AddExpense'
import configStore from '../store'

const { store } = configStore()

it('renders individual expense', () => {
  const expense = {
    total: 123123,
    month: 'Enero',
    year: 2018,
    electricity: 123,
    water: 124,
    staff: 125,
    gas: 126,
    extras: 127,
    paid: false
  }
  const tree = renderer.create(
    <FormattedProvider locale='es'>
      <Expense expense={expense} />
    </FormattedProvider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders expenses form', () => {
  const tree = renderer.create(<AddExpenseScreen store={store} />).toJSON()
  expect(tree).toMatchSnapshot()
})
