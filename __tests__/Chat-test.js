/* global
  it
  beforeEach
  jest
  expect
*/
import 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import sinon from 'sinon'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { mockActionCreators, createDispatchMockImplementation } from 'jest-mock-action-creators'
import Neighbors from '../screens/Neighbors'
import * as neighborsActions from '../actions/neighbors'
import Chat from '../screens/Chat'

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
  neighborsReducer: {
    neighbors: [
      {
        id: 1,
        name: 'test',
        last_name: 'neighbor',
        apartments: [
          {
            number: '1',
            id: 1
          }
        ]
      }
    ],
    isRequesting: false
  },
  authReducer: {
    authToken: 'test_token'
  },
  chatReducer: {
    messages: [],
    chats: []
  }
}
const dispatch = jest.fn()
let navigation
let store

beforeEach(() => {
  store = mockStore(initialState)
  navigation = { navigate: jest.fn() }
})

it('renders the neighbors list', async () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Neighbors navigation={navigation} dispatch={dispatch} />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders empty chat', async () => {
  navigation.state = {
    params: {
      user: {
        id: 1,
        name: 'test',
        last_name: 'neighbor',
        apartments: [
          { id: 1, number: '1' }
        ]
      }
    }
  }
  const tree = renderer.create(
    <Provider store={store}>
      <Chat navigation={navigation} dispatch={dispatch} />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders non-empty chat', async () => {
  navigation.state = {
    params: {
      chatId: 'test'
    }
  }
  store = mockStore({ ...initialState, chatReducer: {
    messages: {
      test: [
        {
          _id: 'test_1',
          text: 'Hola',
          createdAt: new Date('01/01/2018'),
          user: {
            name: 'test neighbor',
            _id: 1
          }
        }
      ]
    }
  } })
  const tree = renderer.create(
    <Provider store={store}>
      <Chat navigation={navigation} dispatch={dispatch} />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

// it('stacks messages', async () => {
//   navigation.state = {
//     params: {
//       chatId: 'test'
//     }
//   };
//   store = mockStore({...initialState, chatReducer: {
//     messages: {
//       test: []
//     }
//   }});
//   let chat = renderer.create(
//     <Provider store={store}>
//       <Chat navigation={navigation} dispatch={dispatch} />
//     </Provider>
//   ).getInstance();
//   console.log(chat)
//   chat.send([{
//     _id: 'test_1',
//     text: 'test 1',
//     createdAt: new Date('01/01/2018'),
//     user: {
//       name: 'tester',
//       _id: 2
//     }
//   }]);
//   chat.send([{
//     _id: 'test_2',
//     text: 'test 2',
//     createdAt: new Date('01/01/2018'),
//     user: {
//       name: 'tester',
//       _id: 2
//     }
//   }]);
//   expect(store.messages.test.length).toBe(2);
// });


export function findById(tree, testID) {
  if (tree.props && tree.props.testID === testID) {
    return tree
  }
  if (tree.children && tree.children.length > 0) {
    let childs = tree.children
    for (let i = 0; i < childs.length; i++) {
      let item = findById(childs[i], testID)
      if (typeof (item) !== 'undefined') {
        return item
      }
    }
  }
  return null
}
