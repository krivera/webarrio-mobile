import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';

export default class PublicationCard extends React.Component{
  render(){
    const { publication } = this.props;
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
      'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const published = new Date(publication.created_at);
    return(
      <View style={styles.layout}>
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: publication.image}} />
          </View>
        </View>
        <TouchableOpacity style={styles.content}>
          <Text style={styles.title}>
            {publication.title}
          </Text>
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail" >
            {publication.description}
          </Text>
        </TouchableOpacity>
        <View style={styles.optionsSection}>
          <Text style={styles.date}>{published.getDate() + ' ' + months[published.getMonth()]}</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={15}
              color={Colors.orange}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
    backgroundColor: 'white',
    borderBottomColor: '#92a2a2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'left'
  },
  description: {
    fontSize: 14,
    color: '#92a2a2'
  },
  date: {
    fontSize: 12,
    color: '#92a2a2'
  },
  content: {
    alignItems: 'flex-start',
    flex: 0.75
  },
  imageSection: {
    flex: 0.15
  },
  image:{
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  imageContainer: {
    borderRadius: 20,
    height: 40,
    width: 40,
    backgroundColor: '#e6edec',
    alignSelf: 'center',
    marginTop: 10
  },
  optionsSection: {
    paddingTop: 10,
    justifyContent: 'space-between'
  }
});