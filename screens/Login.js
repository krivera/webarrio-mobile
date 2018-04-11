import React from 'react';
import {
  AsyncStorage,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  WebView
} from 'react-native';
import { Svg } from 'expo';
import { API_URL } from 'react-native-dotenv';
import { connect } from 'react-redux';
import axios from 'axios';
import FloatingLabelInput from '../components/FloatingLabel';
import Colors from '../constants/Colors';
import { updateToken } from '../actions/auth';
import { setInitialData } from '../actions/currents';

class LoginScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.authToken !== this.props.authToken){
      this.props.navigation.navigate('AuthLoading');
    }
  }

  login = () => {
    const { email, password } = this.state;
    this.setState({error: false});
    if(email && password){
      axios.post(API_URL + '/users/sign_in', {
        user: {
          email: email,
          password: password
        }
      },
      {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then((response) => {
        this.props.dispatch(updateToken(response.headers.authorization || response.headers.Authorization));
        this.props.dispatch(setInitialData(response.data));
      })
      .catch(error => {
        if (error.response.status === 401)
          this.setState({error: 'Usuario y/o contraseña invalidos.'});
        else
          this.setState({error: 'Hubo un problema al conectarse.'});
      });
      return true;
    }
    return false;
  }

  render(){
    const firstHtml = `<html>
      <head>
        <style>
          html, body { margin:0; padding:0; overflow:hidden }
          svg { position:fixed; top:0; left:0; height:100%; width:100% }
        </style>
      </head>
      <body>`;
    const lastHtml = '</body></html>'
    return (
      <ImageBackground
        style={styles.screen}
        source={require('../assets/images/bg-home.jpg')}
      >
        <WebView
          style={styles.logo}
          scrollEnabled={false}
          source={{html: `${firstHtml}${logo}${lastHtml}`}}
        />
        <KeyboardAvoidingView style={styles.form}>
          {this.state.error &&
            (<View style={styles.errorBox}>
              <Text style={styles.errorText}>{this.state.error}</Text>
            </View>)
          }
          <FloatingLabelInput
            style={styles.input}
            value={this.state.email}
            label="Email"
            keyboardType="email-address"
            onChangeText={t => this.setState({email: t})}
            autoCapitalize="none"
          />
          <FloatingLabelInput
            style={styles.input}
            value={this.state.password}
            label="Contraseña"
            onChangeText={t => this.setState({password: t})}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={this.login}>
            <Text style={styles.buttonText}>CONECTARSE</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    authToken: state.authReducer.authToken
  };
}
export default connect(mapStateToProps)(LoginScreen);

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    flex:1,
  },
  logo: {
    height: 10,
    width: 150,
    alignSelf: 'center',
    top: -100,
    backgroundColor: 'transparent'
  },
  button: {
    backgroundColor: Colors.orange,
    padding: 10,
    marginTop: 20,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  input: {
    color: 'white',
    borderBottomColor: 'white'
  },
  form: {
    top: -180
  },
  errorBox: {
    backgroundColor: Colors.errorBox,
    alignItems: 'center',
    padding: 10,
  },
  errorText: {
    color: Colors.errorText
  }
});
 
const logo = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 215.4 118" style="enable-background:new 0 0 215.4 118;" xml:space="preserve">
<style type="text/css">
.st0{fill:#FFFFFF;}
</style>
<polygon id="XMLID_16_" class="st0" points="18.3,117.5 9.1,117.5 0,85.9 8.9,85.9 14.1,111 19.8,85.9 27.3,85.9 33.1,111 
38.3,85.9 46.8,85.9 37.7,117.5 28.7,117.5 25,102.2 23.5,94.4 23.4,94.4 22,102.2 "/>
<path id="XMLID_36_" class="st0" d="M70.8,107.9H54.4c0.5,3.1,2.3,4.4,5,4.4c2.4,0,3.9-1,4.4-2.6l6.6,2.1c-1.4,4.2-5.5,6.3-11,6.3
c-8.4,0-12.9-4.6-12.9-12.5c0-7.9,4.5-12.5,12.5-12.5c7.8,0,12,4.6,12,12.1C71,106,70.9,107.2,70.8,107.9 M54.4,103.5h9
c-0.4-3.1-1.9-4.7-4.4-4.7C56.4,98.8,54.9,100.2,54.4,103.5"/>
<path id="XMLID_32_" class="st0" d="M76.1,85.9h15.4c7.8,0,11.4,3,11.4,8.5c0,3.6-2.1,6.4-6.4,7.1v0c4.8,0.7,7.2,3.6,7.2,7.4
c0,5.5-3.9,8.5-11.5,8.5H76.1V85.9z M89.9,98.8c3,0,4.5-1.2,4.5-3.5s-1.5-3.4-4.5-3.4H84v6.9H89.9z M90.8,111.7c3,0,4.5-1.2,4.5-3.5
c0-2.2-1.5-3.4-4.5-3.4H84v7H90.8z"/>
<path id="XMLID_29_" class="st0" d="M132.9,112.7l-0.6,4.6c-1,0.5-2.1,0.8-3.3,0.8c-3.2,0-5.5-1.1-6.2-3.7c-1.3,2.3-4.1,3.7-8.5,3.7
c-4.7,0-7.4-2.1-7.4-6c0-4,2.5-6.5,9.3-7.9l5.4-1.1v-0.9c0-2.2-1.2-3.5-3.4-3.5c-2.3,0-4,0.9-4.5,3.7l-6.6-1.9
c0.8-4.6,4.6-7.4,11.1-7.4c7.4,0,11.5,3,11.5,9.2v8.7c0,1.2,0.6,1.9,1.7,1.9C132,112.8,132.5,112.8,132.9,112.7 M121.6,109.3v-2.1
l-3.9,0.9c-2,0.5-2.8,1.1-2.8,2.5c0,1.3,0.9,2.1,2.3,2.1C119.3,112.7,121.6,111.5,121.6,109.3"/>
<path id="XMLID_8_" class="st0" d="M153.5,93.6l-0.9,6.9c-0.6-0.4-1.8-0.7-3-0.7c-2.9,0-5.4,1.9-5.4,5.7v12.1h-8.1v-24h7.2l0.3,5.2
c1.2-3.5,3.5-5.7,7.3-5.7C152.1,93.1,153,93.3,153.5,93.6"/>
<path id="XMLID_7_" class="st0" d="M174.1,93.6l-0.9,6.9c-0.6-0.4-1.8-0.7-3-0.7c-2.9,0-5.4,1.9-5.4,5.7v12.1h-8.1v-24h7.2l0.3,5.2
c1.2-3.5,3.5-5.7,7.3-5.7C172.7,93.1,173.6,93.3,174.1,93.6"/>
<path id="XMLID_24_" class="st0" d="M176.6,86.9c0-2.7,1.4-3.9,4.7-3.9c3.3,0,4.7,1.2,4.7,3.9c0,2.7-1.4,3.9-4.7,3.9
C178.1,90.8,176.6,89.6,176.6,86.9 M185.5,117.5h-8.1v-24h8.1V117.5z"/>
<path id="XMLID_21_" class="st0" d="M215.4,105.5c0,7.9-4.6,12.5-12.7,12.5s-12.6-4.6-12.6-12.5c0-7.9,4.6-12.5,12.6-12.5
S215.4,97.7,215.4,105.5 M198.3,105.5c0,4.7,1.5,6.7,4.5,6.7s4.5-2,4.5-6.7c0-4.7-1.5-6.7-4.5-6.7S198.3,100.8,198.3,105.5"/>
<path id="XMLID_18_" class="st0" d="M133.7,0H83c-2.9,0-5.2,2.3-5.2,5.2v45.1c0,2.9,2.3,5.2,5.2,5.2h27.7l18,15l-2.9-15h4.5h3.3
c2.9,0,5.2-2.3,5.2-5.2V5.2C138.9,2.3,136.6,0,133.7,0 M120.6,26.9v15.5H96.2V26.9h-3.3l15.5-15.7l15.5,15.7H120.6z"/>
</svg>`;
