import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { API_URL } from 'react-native-dotenv';
import { connect } from 'react-redux';
import axios from 'axios';
import PublicationCard from '../components/publicationCard';
import { Feather } from '@expo/vector-icons';
import SideMenu from 'react-native-side-menu';
import Categories from '../components/Categories';
import Report from '../components/Report';

const { height: fullHeight } = Dimensions.get('window');

class CommunityScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      publications: [],
      filterOpen: false,
      filter: 'all',
      filterWidth: new Animated.Value(0),
      reportOpen: false,
      reportingId: '',
      offset: 0,
      loading: true
    }
    this.toggleFilter = this.toggleFilter.bind(this);
    this.newPublication = this.newPublication.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.report = this.report.bind(this);
    this.closeReport = this.closeReport.bind(this);
  }

  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    return {
      title: params.title,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('NewPublication')}>
          <Feather name="plus" size={25} color="white" />
        </TouchableOpacity>),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.state.params.toggleFilter()}>
          <Feather name="menu" size={25} color="white" />
        </TouchableOpacity>
      )
    };
  }

  getFeed = () => {
    const { authToken, currentUnit } = this.props;
    const filter = this.state.filter;
    let url_end = filter !== 'all' ? '/' + filter : '';
    this.setState({loading: true});
    axios.get(API_URL + '/units/' + currentUnit.id + '/publications/feed' + url_end, {
      headers: {
        'Authorization': authToken
      }
    })
    .then((response) => {
      this.setState({
        publications: response.data.publications,
        loading: false
      });
    });
  }

  setFilter = category => {
    if(this.state.filter !== category.filter) {
      this.setState({filter: category.filter, publications: []}, this.getFeed);
      this.props.navigation.setParams({title: category.filter === 'all' ? 'Comunidad' : category.name});
    }
    this.toggleFilter();
  }

  componentWillMount(){
    this.getFeed();
  }

  componentDidMount = () => {
    this.props.navigation.setParams({toggleFilter: this.toggleFilter, title: 'Comunidad'});
  }

  onLayout = ({
    nativeEvent: { layout: { height }
  }}) => {
    const offset = fullHeight - height - 50;
    this.setState({ offset });
  }

  toggleFilter() {
    const toFilterOpen = !this.state.filterOpen;
    this.setState({filterOpen: toFilterOpen});
    Animated.timing(this.state.filterWidth, {
      toValue: toFilterOpen ? 220 : 0,
      duration: 250,
    }).start();
  }

  newPublication = () => {
    this.props.navigation.navigate('NewPublication');
  }

  renderPublication = ({item}) => {
    const publication = item;
    const { currentUser, navigation } = this.props;
    return (
      <PublicationCard
       publication={publication}
       navigate={navigation.navigate}
       currentUserId={currentUser.id}
       report={this.report}
      />
    )
  }

  report = (reportingId) => {
    this.setState({
      reportOpen: true,
      reportingId
    });
  }

  closeReport = () => this.setState({reportOpen: false});

  render(){
    const { currentUser, currentUnit } = this.props;
    const {
      filterOpen,
      reportOpen,
      reportingId,
      offset,
      publications,
      filterWidth,
      loading
    } = this.state;
    return (
      <View style={styles.screen} onLayout={this.onLayout}>
        <View style={styles.screen}>
        <FlatList
          data={publications}
          keyExtractor={(item, index) => index}
          renderItem={this.renderPublication}
        />
        {loading && (<ActivityIndicator />)}
        {!loading && publications.length == 0 && (
          <Text>No hay publicaciones aún</Text>
        )}
        {filterOpen && (
          <TouchableWithoutFeedback onPress={this.toggleFilter}>
            <View style={styles.touchToClose} />
          </TouchableWithoutFeedback>
        )}
        <Animated.View style={[styles.menu, {width: filterWidth}]}>
          <Categories callback={this.setFilter} />
        </Animated.View>
        {reportOpen && (
          <Report
            currentUser={{id: currentUser.id}}
            resourceType="publication"
            resourceId={reportingId}
            currentUnitId={currentUnit.id}
            close={this.closeReport}
          />
        )}
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={offset}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.authReducer.authToken,
    currentUnit: state.currentsReducer.unit,
    currentUser: state.currentsReducer.user
  }
};

export default connect(mapStateToProps)(CommunityScreen);

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#f6f6f7',
    overflow: 'hidden'
  },
  touchToClose: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  screen: {
    flex: 1
  }
});
