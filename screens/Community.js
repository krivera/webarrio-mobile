import React from 'react'
import {
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
import styles from './styles/Community'

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
    const { filter, neighborhood } = this.props
    const { filter: prevFilter, neighborhood: prevNgbrhood } = prevProps
    if (prevFilter !== filter || prevNgbrhood !== neighborhood) {
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
    const { currentUser, neighborhood, unit, authToken, filter } = this.props
    const {
      reportOpen,
      reportingId
    } = this.state
    let url = `${API_URL}/neighborhoods/${neighborhood.id}/publications/feed`
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
              currentUnitId={unit.id}
              close={this.closeReport}
            />
          )}
        </View>
      </KeyboardAwareView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authToken: state.authReducer.authToken,
    unit: state.currentsReducer.unit,
    currentUser: state.currentsReducer.user,
    neighborhood: state.currentsReducer.neighborhood,
    filter: state.feedReducer.filter
  }
}

export default connect(mapStateToProps)(CommunityScreen)
