/* global
  it
  jest
  expect
*/
import 'react-native'
import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import renderer from 'react-test-renderer'
import { StackNavigator } from 'react-navigation'
import NewPublication from '../screens/NewPublication'
import Publication from '../screens/Publication'
import Categories from '../screens/Categories'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const initialState = {
  currentsReducer: {
    neighborhood: {
      id: 1,
      name: 'Test',
      address: 'test street 123'
    },
    user: {
      id: 2,
      name: 'current test',
      apartments: [
        {
          id: 2,
          number: '2'
        }
      ]
    },
    apartment: {
      number: '2',
      id: 2
    }
  },
  authReducer: {
    authToken: 'mockToken'
  }
}
const store = mockStore(initialState)
const navigation = { navigate: jest.fn(), state: { params: { category: 'pet' } } }
const publication = {
  id: 1,
  title: 'Test Publication',
  description: 'A publication to test the screen',
  publication_type: 'event',
  author: {
    name: 'Tester',
    last_name: 'Tester',
    id: 1,
    avatar: null
  },
  date: new Date('12/12/2018'),
  created_at: new Date('01/01/2018'),
  updated_at: new Date('01/01/2018')
}

it('renders Add Publication screen', async () => {
  const tree = renderer.create(
    <NewPublication store={store} navigation={navigation} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders Edit Publication screen', async () => {
  const tree = renderer.create(
    <NewPublication
      store={store}
      navigation={{ ...navigation, state: { params: { publication } } }}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders Publication', () => {
  const navigator = StackNavigator({
    Publication
  })
  const tree = renderer.create(
    <navigator store={store} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders Category selector screen', () => {
  const tree = renderer.create(
    <Categories />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
