import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { API_URL } from 'react-native-dotenv';
import axios from 'axios';
import BallScalePulse from '../components/BallScalePulse';

const mapStateToProps = (state) => {
  return {
    authToken: state.authReducer.authToken
  };
};

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount = () => {
    axios.get(API_URL + '/users/validate_token',{
      headers: {
        Authorization: this.props.authToken
      }
    })
    .then(response => {
      if(response.status === 200)
        this.props.navigation.navigate('App');
      else
        this.props.navigation.navigate('Auth');
    })
    .catch(error => {
      this.props.navigation.navigate('Auth')
    });
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <BallScalePulse size={40} outerColor="#ddd" innerColor="#eee" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default connect(mapStateToProps)(AuthLoadingScreen);
