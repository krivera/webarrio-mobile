import React from 'react'
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Colors from '../constants/Colors'
import WebarrioLogo from '../assets/icons/webarrioUnderTitle'

export default class AuthContainer extends React.Component {
  render() {
    const { hideLogo } = this.props
    return (
      <ImageBackground
        style={authStyles.screen}
        source={require('../assets/images/webarrio-bg.png')}
      >
        <ScrollView>
          {!hideLogo && (
            <View style={authStyles.logo}>
              <WebarrioLogo />
            </View>
          )}
          {this.props.error &&
            (<View style={authStyles.errorBox}>
              <Text style={authStyles.errorText}>
                {this.props.error}
              </Text>
            </View>)
          }
          {this.props.children}
        </ScrollView>
        <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={0}
        />
      </ImageBackground>
    )
  }
}

export const authStyles = StyleSheet.create({
  screen: {
    padding: 20,
    flex: 1
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 20
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 20,
    alignItems: 'center'
  },
  buttonText: {
    color: Colors.orange,
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
    padding: 10
  },
  errorText: {
    color: Colors.errorText
  },
  otherOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 5,
    padding: 3
  },
  helperText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  loading: {
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.6)'
  }
})
