import axios from 'axios'
import { API_URL } from 'react-native-dotenv'
import firebase from '../api/firebase'

export const CHATS_LOADED = 'CHATS_LOADED'
export const ADD_CHAT = 'ADD_CHAT'
export const ADD_MESSAGES_TO_CHAT = 'ADD_MESSAGES_TO_CHAT'
export const REQUEST_CHATS = 'REQUEST_CHATS'

export function receiveChats(rawChats) {
  let chats = Object.keys(rawChats || {}).map(
    userId => Object.assign({}, rawChats[userId], { userId: userId })
  ).sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt))
  return {
    type: CHATS_LOADED,
    chats: chats
  }
}

export function requestChats() {
  return {
    type: REQUEST_CHATS
  }
}

function receiveMessages(chatId, messages) {
  return {
    type: ADD_MESSAGES_TO_CHAT,
    chatId: chatId,
    messages: messages
  }
}

export function fetchMessages(chatId) {
  return dispatch => {
    firebase.database().ref().child(`/messages/${chatId}`).on(
      'value',
      snapshot => dispatch(receiveMessages(chatId, snapshot.val()))
    )
  }
}

export function sendMessage(chatId, message, neighborhood, sender, recipient, authToken) {
  const ref = firebase.database().ref()
  const newMsgRef = ref.child(`/messages/${chatId}/${message._id}`)
    .set(message)
  ref.child(`/users/${sender}/chats/${neighborhood}/${recipient}`).update({
    lastMessage: message.text,
    updatedAt: message.createdAt
  })
  ref.child(`/users/${recipient}/chats/${neighborhood}/${sender}`).update({
    lastMessage: message.text,
    updatedAt: message.createdAt
  }).then(data => {
    axios.post(
      `${API_URL}/users/send_notification`,
      {
        from: sender,
        to: recipient,
        message: message.text,
        chatId
      },
      {
        headers: {
          Authorization: authToken
        }
      }
    )
  })
  let messages = {}
  messages[message._id] = message
  return {
    type: ADD_MESSAGES_TO_CHAT,
    chatId,
    messages
  }
}
