import React from 'react'
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { API_URL } from 'react-native-dotenv'
import { connect } from 'react-redux'
import axios from 'axios'
import RefreshingList from '../components/RefreshingList'
import PublicationCard from '../components/publicationCard'
import { Feather } from '@expo/vector-icons'
import Categories from '../components/Categories'
import Report from '../components/Report'
import Colors from '../constants/Colors'

const { height: fullHeight } = Dimensions.get('window')
const PAGE_SIZE = 25

class CommunityScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      publications: [],
      filterOpen: false,
      filter: 'all',
      filterWidth: new Animated.Value(0),
      reportOpen: false,
      reportingId: '',
      offset: 0,
      loading: false,
      endReached: false,
      refreshing: false
    }
    this.toggleFilter = this.toggleFilter.bind(this)
    this.newPublication = this.newPublication.bind(this)
    this.setFilter = this.setFilter.bind(this)
    this.report = this.report.bind(this)
    this.closeReport = this.closeReport.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params.title,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Categories', { pubList: params.pubList })}>
          <Feather name='plus' size={25} color='white' />
        </TouchableOpacity>),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.state.params.toggleFilter()}>
          <Feather name='menu' size={25} color='white' />
        </TouchableOpacity>
      )
    }
  }

  getFeed = () => {
    if (this.state.endReached || this.state.loading) {
      return
    }
    const { authToken, currentUnit } = this.props
    const filter = this.state.filter
    let url_end = filter !== 'all' ? '/' + filter : ''
    if (!this.state.refreshing) {
      url_end = url_end + ('?page=' + (1 + (this.state.publications.length / PAGE_SIZE)))
    }
    this.setState({ loading: true })
    axios.get(API_URL + '/units/' + currentUnit.id + '/publications/feed' + url_end, {
      headers: {
        Authorization: authToken
      }
    }).then((response) => {
      const publications = this.state.refreshing
        ? response.data.publications
        : this.state.publications.concat(response.data.publications)
      this.setState({
        publications: publications,
        loading: false,
        endReached: response.data.publications.length < PAGE_SIZE,
        refreshing: false
      })
    })
  }

  setFilter = category => {
    if (this.state.filter !== category.key) {
      this.setState({ filter: category.key }, this.list.onRefresh)
      this.props.navigation.setParams({
        title: category.key === 'all' ? 'Comunidad' : category.name
      })
    }
    this.toggleFilter()
  }

  componentDidMount = () => {
    this.props.navigation.setParams({
      toggleFilter: this.toggleFilter, title: 'Comunidad',
      pubList: this.list
    })
  }

  onLayout = ({
    nativeEvent: { layout: { height }}
  }) => {
    const offset = fullHeight - height - 50
    this.setState({ offset })
  }

  toggleFilter() {
    const toFilterOpen = !this.state.filterOpen
    this.setState({ filterOpen: toFilterOpen })
    Animated.timing(this.state.filterWidth, {
      toValue: toFilterOpen ? 220 : 0,
      duration: 250
    }).start()
  }

  newPublication = () => {
    this.props.navigation.navigate('NewPublication')
  }

  renderPublication = ({ item: publication }) => {
    const { currentUser, navigation } = this.props
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
    })
  }

  closeReport = () => this.setState({ reportOpen: false });

  render() {
    const { currentUser, currentUnit, authToken } = this.props
    const {
      filterOpen,
      reportOpen,
      reportingId,
      offset,
      filterWidth,
      filter
    } = this.state
    let url = `${API_URL}/units/${currentUnit.id}/publications/feed`
    if (filter !== 'all') {
      url = `${url}/${filter}`
    }
    return (
      <View style={styles.screen} onLayout={this.onLayout}>
        <View style={styles.screen}>
          <RefreshingList
            ref={r => {
              this.list = r
            }}
            renderItem={this.renderPublication}
            authorization={authToken}
            dataName='publications'
            url={url}
          />
          {filterOpen && (
            <TouchableWithoutFeedback onPress={this.toggleFilter}>
              <View style={styles.touchToClose} />
            </TouchableWithoutFeedback>
          )}
          <Animated.View style={[styles.menu, { width: filterWidth }]}>
            <Categories callback={this.setFilter} />
          </Animated.View>
          {reportOpen && (
            <Report
              currentUser={{ id: currentUser.id }}
              resourceType='publication'
              resourceId={reportingId}
              currentUnitId={currentUnit.id}
              close={this.closeReport}
            />
          )}
        </View>
        <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={offset}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.authReducer.authToken,
    currentUnit: state.currentsReducer.unit,
    currentUser: state.currentsReducer.user
  }
}

export default connect(mapStateToProps)(CommunityScreen)

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.menubkg,
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
  },
  loading: {
    alignSelf: 'stretch',
    alignItems: 'center'
  }
})
