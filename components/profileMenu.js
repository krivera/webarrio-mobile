import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { closeSession } from '../actions/auth';

class ProfileMenu extends React.Component{
  logout = () => {
    const { dispatch } = this.props;
    dispatch(closeSession());
  }

  render(){
    return (
      <View>
        <TouchableOpacity
          style={[styles.option, styles.border]}
          onPress={this.logout}
        >
          <Text
            style={styles.optionText}
            numberOfLines={1}
          >
            Perfil
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, styles.border]}
          onPress={this.logout}
        >
          <Text
            style={styles.optionText}
            numberOfLines={1}
          >
            Ayuda
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, styles.border]}
          onPress={this.logout}
        >
          <Text
            style={styles.optionText}
            numberOfLines={1}
          >
            Configuración
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, styles.border]}
          onPress={this.logout}
        >
          <Text
            style={styles.optionText}
            numberOfLines={1}
          >
            Términos y Condiciones
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option]}
          onPress={this.logout}
        >
          <Text
            style={styles.optionText}
            numberOfLines={1}
          >
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken
});

export default connect(mapStateToProps)(ProfileMenu);

const styles = StyleSheet.create({
  option: {
    padding: 10,
    alignItems: 'flex-end'
  },
  optionText: {
    color: 'white'
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'white'
  }
});
