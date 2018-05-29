import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import firebase from '../api/firebase';
import { getDate } from '../api/utils';
import { receiveChats, requestChats } from '../actions/chat';
import Avatar from '../components/Avatar';
import Colors from '../constants/Colors';

class ChatListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Mensajes',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Neighbors')}>
        <Feather name="plus" size={25} color="white" />
      </TouchableOpacity>),
  })

  constructor(props){
    super(props);
  }

  componentWillMount = () => {
    const { currentUser, currentNeighborhood, dispatch } = this.props;
    dispatch(requestChats());
    let ref = firebase.database().ref();
    ref.child(`/users/${currentUser.id}/chats/${currentNeighborhood.id}`)
    .on('value', snapshot => dispatch(receiveChats(snapshot.val())));
  }

  renderChat = ({ item }) => {
    const chat = item;
    const { navigation } = this.props;
    const date = getDate(chat.updatedAt || chat.createdAt);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat', {
          user: {
            id: chat.userId,
            name: chat.personName,
            avatar: chat.personPhoto,
            apartments: [{number: chat.personApartment}]
          }
        })}
        style={styles.chat}
      >
        <Avatar source={{uri: chat.personPhoto}} name={chat.personName} />
        <View style={styles.middle}>
          <Text style={styles.name}>{chat.personName} del {chat.personApartment}</Text>
          <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
        </View>
        <Text style={[styles.lastMessage]}>{date}</Text>
      </TouchableOpacity>
    )
  }

  render(){
    const { chats, isRequestingChats } = this.props;
    return (
      <View style={styles.screen}>
        {isRequestingChats && (
          <View>
            <ActivityIndicator />
          </View>
        )}
        {!isRequestingChats && chats.length === 0 && (
          <Text>Aún no hay conversaciones</Text>
        )}
        <FlatList
          renderItem={this.renderChat}
          keyExtractor={(item, index) => `${index}`}
          data={chats}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentsReducer.user,
    currentNeighborhood: state.currentsReducer.neighborhood,
    chats: state.chatReducer.chats,
    isRequestingChats: state.chatReducer.isRequesting
  };
};

export default connect(mapStateToProps)(ChatListScreen);

const styles = StyleSheet.create({
  chat: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.inputBorder,
    padding: 10,
    justifyContent: 'space-between'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  middle: {
    flex: 1
  },
  lastMessage: {
    color: '#92a2a2',
    fontSize: 14,
  },
  screen: {
    flex: 1
  }
})
