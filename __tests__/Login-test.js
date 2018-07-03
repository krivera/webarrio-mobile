/* global
  it
  jest
  expect
*/
import 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import sinon from 'sinon'
import Login from '../screens/Login'
import Forgot from '../screens/Forgot'
import NewPassword from '../screens/Forgot2'
import renderer from 'react-test-renderer'
import configStore from '../store'

const { store } = configStore()
const navigation = { navigate: jest.fn() }

it('renders the login screen', async () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Login navigation={navigation} />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders forgot password', () => {
  const tree = renderer.create(
    <Forgot />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders new password screen', () => {
  const tree = renderer.create(
    <NewPassword />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

//const navigateFNSpy = sinon.spy(Login.prototype, '_navigateFN');
