import 'react-native';
import React from 'react';
import NewPublication from '../screens/NewPublication';
import renderer from 'react-test-renderer';
import configStore from '../store';

const { store, persistor } = configStore();
const navigation = { navigate: jest.fn(), state: {params: {}} };

it('renders Add Publication screen', () => {
  const tree = renderer.create(
    <NewPublication store={store} navigation={navigation} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
