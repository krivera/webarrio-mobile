/* global
  describe
  beforeEach
  it
  expect
*/
import React from 'react'
import 'react-native'
import * as types from '../actions/chat'
import reducer from '../reducers/chat'

describe('chat reducer', () => {
  let initialState
  beforeEach(() => {
    initialState = reducer(undefined, {})
  })

  it('should return initial state', () => {
    expect(initialState).toEqual({
      chats: [],
      messages: {},
      isRequesting: false
    })
  })

  it('should stack messages on ADD_MESSAGES_TO_CHAT', () => {
    const msg1 = { test_1: {
      _id: 'test_1',
      text: 'test 1',
      createdAt: new Date('01/01/2018').getTime(),
      user: {
        _id: 2,
        name: 'tester'
      }
    } }
    const msg2 = { test_2: {
      _id: 'test_2',
      text: 'test 2',
      createdAt: new Date('01/02/2018').getTime(),
      user: {
        _id: 2,
        name: 'tester'
      }
    } }
    const addMessageAction = {
      type: types.ADD_MESSAGES_TO_CHAT,
      chatId: 'test',
      messages: msg1
    }
    const addMessageAction2 = {
      type: types.ADD_MESSAGES_TO_CHAT,
      chatId: 'test',
      messages: msg2
    }
    expect(
      reducer(
        reducer(initialState, addMessageAction),
        addMessageAction2
      ).messages
    ).toEqual({
      test: {
        test_1: {
          _id: 'test_1',
          createdAt: new Date('01/01/2018').getTime(),
          text: 'test 1',
          user: {
            _id: 2,
            name: 'tester'
          }
        },
        test_2: {
          _id: 'test_2',
          createdAt: new Date('01/02/2018').getTime(),
          text: 'test 2',
          user: {
            _id: 2,
            name: 'tester'
          }
        }
      }
    })
  })
})
