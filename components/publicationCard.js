import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {
  Feather,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import Categories from '../constants/Categories';
import WebarrioIcon from './WebarrioIcon';
import Colors from '../constants/Colors';
import { Months } from '../constants/utils';
import Avatar from './Avatar';
import PublicationMenu from './PublicationMenu';

export default class PublicationCard extends React.Component{
  constructor(props){
    super(props);
    const { publication, currentUserId } = this.props;
    this.state = {
      menuOpen: false,
      menuWidth: new Animated.Value(0),
      menuHeight: new Animated.Value(0),
      menuOpenHeight: currentUserId === publication.author.id ? 30 : 60
    }
    this.category = (Categories.find(
      category =>
        category.key === publication.publication_type) || {icon: 'loop', name: 'Otro'});
    this.toggleMenu = this.toggleMenu.bind(this);
  }


  toggleMenu = () => {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render(){
    const { publication, navigate, currentUserId, report } = this.props;
    const published = new Date(publication.created_at);
    return(
      <View style={[
        styles.layout,
        this.category.admin && styles.adminCard
      ]}>
        <View style={styles.imageSection}>
          <Avatar source={{uri: publication.author.avatar}} name={publication.author.name} />
        </View>
        <TouchableOpacity
          style={styles.content}
          onPress={() => navigate('Publication', { publication })}
        >
          <Text style={styles.title}>
            {publication.title}
          </Text>
          <View style={styles.underTitle}>
            <Text style={styles.author}>
              por {publication.author.name} {publication.author.last_name} ● {this.category.name}{' '}
            </Text>
            <WebarrioIcon name={this.category.icon} size={14} color="#92a2a2" />
          </View>
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail" >
            {publication.description}
          </Text>
          {publication.image_url && (
            <Image
              style={styles.previewImage}
              source={{uri: publication.image_url}}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
        {this.menu && this.state.menuOpen && (
          <TouchableWithoutFeedback onPress={this.menu.toggleMenu}>
            <View style={styles.closeMenu}/>
          </TouchableWithoutFeedback>
        )}
        <View style={styles.optionsSection}>
          <Text style={styles.date}>{published.getDate() + ' ' + Months[published.getMonth()]}</Text>
          <PublicationMenu
            publication={publication}
            navigate={navigate}
            currentUserId={currentUserId}
            toggleMenuCallback={this.toggleMenu}
            openDirection="bottom"
            ref={r => this.menu = r}
            report={report}
          />
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
  previewImage: {
    height: 150,
    width: 250,
    alignSelf: 'center',
    marginTop:10,
  },
  optionsSection: {
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  horizontal: {
    flexDirection: 'row'
  },
  underTitle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  closeMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
  adminCard: {
    backgroundColor: Colors.orangeLight
  }
});