import React from 'react';
import { connect } from 'react-redux'
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import SideMenu from 'react-native-side-menu';

import SvgImage from '../components/svgImage';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import MessageIcon from '../assets/icons/message';
import ContactsIcon from '../assets/icons/contacts';
import CommunityIcon from '../assets/icons/community';
import MoneyIcon from '../assets/icons/money';
import WebarrioIcon from '../components/WebarrioIcon';
import { closeSession } from '../actions/auth';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.toggleProfileMenu()}>
        <WebarrioIcon
          name="user"
          color="white"
          size={24}
        />
      </TouchableOpacity>
    )
  });

  constructor(props){
    super(props);
    this.state = {
      profileMenuOpen: false,
      profileMenuWidth: new Animated.Value(0),
    }
    this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
  }

  toggleProfileMenu() {
    const toMenuOpen = !this.state.profileMenuOpen;
    this.setState({profileMenuOpen: toMenuOpen});
    Animated.timing(this.state.profileMenuWidth, {
      toValue: toMenuOpen ? 150 : 0,
      duration: 250,
    }).start();
  }

  componentWillReceiveProps(newProps) {
    if(newProps.authToken !== this.props.authToken)
      this.props.navigation.navigate('AuthLoading')
  }

  componentWillMount(){
    return;
  }

  componentDidMount = () => {
    this.props.navigation.setParams({
      toggleProfileMenu: this.toggleProfileMenu
    });
  }

  go = screen => {
    return () => {
      this.props.navigation.navigate(screen);
    };
  }

  closeSession = () => {
    this.props.dispatch(closeSession());
  }

  render() {
    const { currentApartment, currentNeighborhood, currentUnit } = this.props;
    return (
      <View>
        <TouchableOpacity style={styles.current}>
          <Text>{currentNeighborhood.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.current}>
          <Text>{currentUnit.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.current}>
          <Text>{currentApartment.number}</Text>
        </TouchableOpacity>
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
            onPress={this.go('Chats')}
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
        {this.state.profileMenuOpen && (
          <TouchableWithoutFeedback
            onPress={this.toggleProfileMenu}
            style={styles.closeMenu}
          ><View /></TouchableWithoutFeedback>
        )}
        <Animated.View style={[styles.profileMenu, {width: this.state.profileMenuWidth}]}>
          <TouchableOpacity onPress={this.closeSession}>
            <Text>Cerrar Sesión</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentNeighborhood: state.currentsReducer.neighborhood,
  currentUnit: state.currentsReducer.unit,
  currentApartment: state.currentsReducer.apartment,
  neighborhoods: state.neighborhoodReducer.neighborhoods,
  authToken: state.authReducer.authToken,
});

export default connect(mapStateToProps)(HomeScreen);

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
    paddingVertical: 10,
    backgroundColor: 'white'
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
  profileMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#555',
    overflow: 'hidden',
  },
  closeMenu: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  current: {
    alignItems: 'center',
    borderBottomColor: '#92a2a2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 5
  }
});
