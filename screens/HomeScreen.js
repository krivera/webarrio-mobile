import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import SideMenu from 'react-native-side-menu';

import SvgImage from '../components/svgImage';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import Icon from '@expo/vector-icons/MaterialIcons';
import MessageIcon from '../assets/icons/message';
import ContactsIcon from '../assets/icons/contacts';
import CommunityIcon from '../assets/icons/community';
import MoneyIcon from '../assets/icons/money'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerRight: (
      <TouchableOpacity onPress={this.openDrawer}>
        <Icon
          name="person-outline"
          color="white"
          size={24}
        />
      </TouchableOpacity>
    )
  };

  constructor(props){
    super(props);
    this.state = {
      profileMenuOpen: false
    }
    this.openDrawer = this.openDrawer.bind(this);
  }

  openDrawer = () => {
    this.setState({
      profileMenuOpen: true
    });
  }

  componentWillMount(){
    return;
  }

  go = screen => {
    return () => {
      this.props.navigation.navigate(screen);
    };
  }

  render() {
    return (
      <SideMenu menuPosition="right" isOpen={this.state.profileMenuOpen}>
        <View>
          <TouchableOpacity
            style={[styles.section, ]}
            onPress={this.go('Dashboard')}
          >
            <MoneyIcon/>
            <Text>Adminstración</Text>
          </TouchableOpacity>
          <View style={styles.middle}>
            <TouchableOpacity
              style={[styles.section, styles.middleSection, styles.messageSection]}
              onPress={this.go('Chat')}
            >
              <MessageIcon/>
              <Text>Mensajes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.section, styles.middleSection]}
              onPress={this.go('Contacts')}
            >
              <ContactsIcon size={80}/>
              <Text>Agenda</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.section, ]}
            onPress={this.go('Community')}
          >
            <CommunityIcon/>
            <Text>Comunidad</Text>
          </TouchableOpacity>
        </View>
      </SideMenu>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  icon: {
    height: 50,
    width: 150
  },
  middle:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  section: {
    alignItems: 'center',
    paddingVertical: 10
  },
  middleSection: {
    flex: 1,
    borderBottomColor: Colors.orange,
    borderTopColor: Colors.orange,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  messageSection: {
    borderRightColor: Colors.orange,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
