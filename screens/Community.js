import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { API_URL } from 'react-native-dotenv'
import { connect } from 'react-redux'
import KeyboardAwareView from '../components/KeyboardAwareView'
import RefreshingList from '../components/RefreshingList'
import PublicationCard from '../components/publicationCard'
import Report from '../components/Report'
import { Feather } from '@expo/vector-icons'
import Categories from '../constants/Categories'
import { menuRef } from '../navigation/MainTabNavigator'
import { setFilter } from '../actions/feed'

class CommunityScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reportOpen: false,
      reportingId: '',
      loading: false
    }

    this.report = this.report.bind(this)
    this.closeReport = this.closeReport.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params.title,
      headerLeft: (
        <TouchableOpacity onPress={() => menuRef.openMenu(true)}>
          <Feather name='menu' size={25} color='white' />
        </TouchableOpacity>
      )
    }
  }

  componentDidMount = () => {
    this.props.navigation.setParams({
      title: 'Comunidad',
      pubList: this.list
    })
    this.props.dispatch(setFilter('all'))
  }

  componentDidUpdate = prevProps => {
    const { filter } = this.props
    if (prevProps.filter !== filter) {
      this.list.onRefresh()
      const category = Categories.find(cat => cat.key === filter)
      this.props.navigation.setParams({
        title: filter === 'all' ? 'Comunidad' : category.name
      })
    }
  }

  renderPublication = ({ item: publication }) => {
    const { currentUser, navigation, neighborhood } = this.props
    return (
      <PublicationCard
        publication={publication}
        navigate={navigation.navigate}
        currentUserId={currentUser.id}
        report={this.report}
        neighborhood={neighborhood}
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
    const { currentUser, currentUnit, authToken, filter } = this.props
    const {
      reportOpen,
      reportingId
    } = this.state
    let url = `${API_URL}/units/${currentUnit.id}/publications/feed`
    if (filter !== 'all') {
      url = `${url}/${filter}`
    }
    return (
      <KeyboardAwareView style={styles.screen}>
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
      </KeyboardAwareView>
    )
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.authReducer.authToken,
    currentUnit: state.currentsReducer.unit,
    currentUser: state.currentsReducer.user,
    neighborhood: state.currentsReducer.neighborhood,
    filter: state.feedReducer.filter
  }
}

export default connect(mapStateToProps)(CommunityScreen)

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})
