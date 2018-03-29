import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constants/Colors';

export default class PublicationScreen extends React.Component{
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.publication.title,
    headerLeft: (
      <TouchableOpacity onPress={navigation.popToTop}>
        <Ionicons name="ios-arrow-back" size={25} color="white" />
      </TouchableOpacity>
    )
  });

  render(){
    const { publication } = this.props.navigation.state.params;
    return (
      <View style={styles.screen}>
        <Image source={{uri: publication.image_url}} style={styles.image} />
        <Text style={styles.title}>{publication.title}</Text>
        <Text style={styles.description}>{publication.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 250,
    marginBottom: 30
  },
  screen: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: Colors.orange,
    marginBottom: 20
  },
  description: {
    marginHorizontal: 10,
    alignSelf: 'stretch'
  }
});
