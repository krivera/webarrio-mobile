import 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import Login from '../screens/Login';
import renderer from 'react-test-renderer';
import configStore from '../store';

const { store, persistor } = configStore();
const navigation = { navigate: jest.fn() };

it('renders the login screen', async () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Login navigation={navigation} />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

//const navigateFNSpy = sinon.spy(Login.prototype, '_navigateFN');
