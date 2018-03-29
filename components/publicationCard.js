import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Categories from '../constants/Categories';
import WebarrioIcon from './WebarrioIcon';
import Colors from '../constants/Colors';

export default class PublicationCard extends React.Component{
  constructor(props){
    super(props);
    const { publication } = this.props;
    this.iconName = (Categories.find(
      category =>
        category.filter === publication.publication_type) || {icon: 'loop'})
      .icon;
  }

  render(){
    const { publication, navigate } = this.props;
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
      'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const published = new Date(publication.created_at);
    return(
      <View style={styles.layout}>
        <View style={styles.imageSection}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{uri: publication.author.avatar_url}} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.content}
          onPress={() => navigate('Publication', { publication })}
        >
          <Text style={styles.title}>
            {publication.title}
          </Text>
          <Text style={styles.author}>
            por {publication.author.name}
          </Text>
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail" >
            {publication.description}
          </Text>
          {publication.image_url && (
            <Image
              style={styles.previewImage}
              source={{uri: publication.image_url}}
            />
          )}
        </TouchableOpacity>
        <View style={styles.optionsSection}>
          <Text style={styles.date}>{published.getDate() + ' ' + months[published.getMonth()]}</Text>
          <View style={styles.horizontal}>
            <WebarrioIcon
              name={this.iconName}
              size={18}
              color={Colors.orange}
            />
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={18}
                color={Colors.orange}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  author: {
    fontSize: 10,
    color: '#92a2a2'
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
    alignItems:   'flex-start',
    flex: 0.75,
    paddingBottom: 15
  },
  imageSection: {
    flex: 0.15
  },
  avatar:{
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    borderRadius: 20,
    height: 40,
    width: 40,
    backgroundColor: '#e6edec',
    alignSelf: 'center',
    marginTop: 10
  },
  previewImage: {
    height: 150,
    width: 250,
    alignSelf: 'center'
  },
  optionsSection: {
    paddingTop: 10,
    justifyContent: 'space-between'
  },
  horizontal: {
    flexDirection: 'row'
  }
});