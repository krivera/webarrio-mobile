import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Expense from '../components/Expense';
import { FormattedProvider } from 'react-native-globalize';
import AddExpenseScreen from '../screens/AddExpense';

it('renders individual expense', () => {
  const expense = {
    total: 123123,
    month: 'Enero',
    year: 2018,
    total_electricity: 123,
    total_water: 124,
    total_staff: 125,
    total_gas: 126,
    total_extras: 127,
  }
  const tree = renderer.create(
    <FormattedProvider locale='es'>
      <Expense expense={expense} />
    </FormattedProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders expenses form', () => {
  const tree = renderer.create(<AddExpenseScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
