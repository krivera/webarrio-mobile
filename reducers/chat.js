import {
  CHATS_LOADED,
  ADD_MESSAGES_TO_CHAT,
  ADD_CHAT,
  REQUEST_CHATS
} from '../actions/chat';

let initialState = {
  chats: [],
  messages: {},
  isRequesting: false
};

const fbToGcMessages = messages => {
  return Object.keys(messages).map(
    key => ({
      _id: key,
      text: messages[key].text,
      createdAt: messages[key].sentAt,
      user: {
        name: messages[key].personName,
        _id: messages[key].personId
      }
    })
  ).sort((a,b) => (b.createdAt - a.createdAt));
}

const chatReducer = (state=initialState, action) => {
  switch(action.type){
    case CHATS_LOADED:
      return {
        messages: state.messages || {},
        chats: action.chats,
        isRequesting: false
      };
    case ADD_MESSAGES_TO_CHAT:
      let addedMessages = {
        [action.chatId]: state.messages[action.chatId]
          ? {...state.messages[action.chatId], ...action.messages}
          : action.messages
      };
      return {
        chats: state.chats,
        isRequesting: state.isRequesting,
        messages: Object.assign({}, state.messages, addedMessages)
      }
    case REQUEST_CHATS:
      return {
        messages: state.messages,
        chats: state.chats,
        isRequesting: true
      }
    default:
      return state;
  }
};

export default chatReducer;
