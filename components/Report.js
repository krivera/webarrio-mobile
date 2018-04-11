import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from '../api/firebase';
import Reasons from '../constants/Reasons';
import Colors from '../constants/Colors';

export default class ReportForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      reason: '',
      comment: '',
    }
  }

  send = () => {
    const { currentUser, currentUnitId, resourceId, resourceType, close } = this.props;
    firebase.database().ref(`/reports/${currentUnitId}`).push({
      reason: this.state.reason,
      comment: this.state.comment,
      user: currentUser,
      resourceType,
      resourceId,
      read: false
    });
    this.setState({sending: true});
    setTimeout(close, 5000);
  }

  sendInactive = () => {
    if(this.state.reason === 'other'){
      return this.state.comment.trim().length === 0;
    }
    return this.state.reason === '';
  }

  render() {
    const sendInactive = this.sendInactive();
    return (
      <View style={styles.screen}>
        {!this.state.sending && (
          <View style={styles.lightBox}>
            <Text style={styles.header}>
              ¿Por qué estás denunciando este contenido?
            </Text>
            {Reasons.map(reason => (
              <TouchableOpacity
                onPress={() => this.setState({reason: reason.key})}
                style={styles.reason}
                key={reason.key}
              >
                <MaterialIcons
                  name={this.state.reason === reason.key ? 'radio-button-checked' : 'radio-button-unchecked'}
                  size={20}
                  color={this.state.reason === reason.key ? Colors.tintColor : 'black'}
                />
                <Text>{reason.text}</Text>
              </TouchableOpacity>
            ))}
            <TextInput
              placeholder="Escribe un comentario..."
              multiline={true}
              underlineColorAndroid="transparent"
              style={styles.comment}
              value={this.state.comment}
              onChangeText={t => this.setState({comment: t})}
            />
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={this.props.close}
              >
                <Text style={styles.buttonText}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.send}
                disabled={sendInactive}
              >
                <Text
                  style={[
                    styles.buttonText,
                    sendInactive && styles.buttonTextInactive
                  ]}
                >
                  ENVIAR
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {this.state.sending && (
          <View style={styles.lightBox}>
            <Text>Un administrador revisará tu denuncia.</Text>
            <ActivityIndicator />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10
  },
  lightBox: {
    backgroundColor: 'white',
    padding: 10
  },
  reason: {
    flexDirection: 'row',
    paddingVertical: 5
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7
  },
  buttonText: {
    color: Colors.tintColor,
    padding: 5
  },
  buttonTextInactive: {
    color: Colors.placeholder
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  comment: {
    borderColor: Colors.inputBorder,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 5,
  }
})