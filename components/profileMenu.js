import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';

import { logout } from '../actions/auth';

class ProfileMenu extends React.Component{
  logout = () => {
    dispatch(logout());
  }

  render(){
    return (
      <View>
        <TouchableOpacity onPress={this.logout}>
          <Text>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(() => ({}))(ProfileMenu);