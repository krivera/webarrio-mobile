import React from 'react';
import{
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Header } from 'react-navigation';
import firebase from '../api/firebase';
import Colors from '../constants/Colors';
import BackButton from '../components/BackButton';
import Avatar from '../components/Avatar';
import { fetchMessages, sendMessage } from '../actions/chat';

const MESSAGE_ZERO = name => ({
  _id: 0,
  text: `Este es el comienzon de tu conversación con ${name}`,
  createdAt: new Date(),
  system: true
});

const { height: fullHeight } = Dimensions.get('window');

class ChatScreen extends React.Component{
  static navigationOptions = ({ navigation }) => {
    const { user } = navigation.state.params;
    return {
      headerTitle: user.name + (user.apartments && user.apartments.length ? ` (${user.apartments[0].number})` : ''),
      headerLeft: (<BackButton navigation={navigation} />),
      headerRight: (<Avatar source={{uri: user.avatar}} name={user.name} />),
      tabBarVisible: false
    };
  }

  constructor(props){
    super(props);
    const { params } = props.navigation.state;
    this.chatId = params.chatId || (props.chats.find(
      chat =>
        chat.userId.toString() === params.user.id.toString()
      ) || { chatId: null }).chatId;
    this.state = {
      offset: 0
    };
  }

  componentWillMount(){
    if(this.chatId){
      this.props.dispatch(fetchMessages(this.chatId));
    }
  }

  onLayout = ({
    nativeEvent: { layout: { height } }
  }) => {
    const offset = fullHeight - height;
    this.setState({ offset });
  }

  send = (messages) => {
    const { user } = this.props.navigation.state.params;
    const {
      currentUser,
      currentNeighborhood,
      currentApartment,
      dispatch,
      authToken,
    } = this.props;
    if(!this.chatId){
      const createdAt = new Date();
      const ref = firebase.database().ref();
      const newRef = ref.child('/messages').push();
      this.chatId = newRef.key;
      const chatRef1 = ref.child(`/users/${currentUser.id}/chats/${currentNeighborhood.id}/${user.id}`).set({
        createdAt: createdAt,
        personPhoto: user.avatar,
        personName: user.name,
        personApartment: user.apartments && user.apartments.length ? user.apartments[0].number : '',
        chatId: this.chatId
      });
      const chatRef2 = ref.child(`/users/${user.id}/chats/${currentNeighborhood.id}/${currentUser.id}`).set({
        createdAt: createdAt,
        personPhoto: currentUser.avatar,
        personName: currentUser.name,
        personApartment: currentApartment ? currentApartment.number : '',
        chatId: this.chatId
      });
    }

    for(let message of messages){
      dispatch(sendMessage(
        this.chatId,
        { ...message, createdAt: message.createdAt.getTime() },
        currentNeighborhood.id,
        currentUser.id,
        user.id,
        authToken
      ));
    }
  }

  renderSend = (props) => (
    <Send {...props}>
      <View style={styles.sendButton}>
        <Text style={styles.sendText}>Enviar</Text>
      </View>
    </Send>);

  render(){
    const { currentUser, messages, currentApartment } = this.props;
    const chatUser = {
      _id: currentUser.id,
      avatar: currentUser.avatar,
      name: currentUser.name,
      apartment: currentApartment ? currentApartment.number : ''
    }
    const { user } = this.props.navigation.state.params;
    let this_messages = this.chatId && messages[this.chatId]
      ? Object.values(messages[this.chatId]).sort((a, b) => b.createdAt - a.createdAt)
      : [MESSAGE_ZERO(user.name)];
    return (
      <View style={styles.screen} onLayout={this.onLayout}>
        <GiftedChat
          renderAvatar={null}
          messages={this_messages}
          onSend={this.send}
          user={chatUser}
          renderSend={this.renderSend}
          placeholder="Mensaje..."
          listViewProps={{
            style: {
              backgroundColor: 'white',
            },
          }}
        />
        {Platform.OS === 'android' && (
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={this.state.offset}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentsReducer.user,
  currentNeighborhood: state.currentsReducer.neighborhood,
  currentApartment: state.currentsReducer.apartment,
  messages: state.chatReducer.messages,
  chats: state.chatReducer.chats,
  authToken: state.authReducer.authToken,
});

export default connect(mapStateToProps)(ChatScreen);

const styles = StyleSheet.create({
  sendText: {
    color: Colors.tintColor,
    fontSize: 18,
    fontWeight: 'bold'
  },
  sendButton: {
    alignSelf: 'center',
    padding: 5
  },
  screen: {
    flex: 1
  },
});
