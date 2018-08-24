import React from 'react'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Axios from 'axios'
import { API_URL } from 'react-native-dotenv'
import { EvilIcons, Feather, SimpleLineIcons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import Categories from '../constants/Categories'
import { Months } from '../constants/utils'
import Avatar from '../components/Avatar'
import WebarrioIcon from '../components/WebarrioIcon'
import PublicationMenu from '../components/PublicationMenu'
import Report from '../components/Report'
import BackButton from '../components/BackButton'
import Loading from '../components/Loading'
import firebase from '../api/firebase'
import { getDate } from '../api/utils'
import styles from './styles/Publication'

const { height: fullHeight } = Dimensions.get('window')

class PublicationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.publication_title,
    headerLeft: (<BackButton behavior='top' />)
  })

  constructor(props) {
    super(props)

    this.state = {
      offset: 0,
      menuOpen: false,
      loadingComments: true,
      comments: [],
      reportOpen: false,
      reportingId: '',
      vote: null,
      voted: false,
      publication: null,
      laoding: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.report = this.report.bind(this)
    this.closeReport = this.closeReport.bind(this)
  }

  toggleMenu = () => this.setState({ menuOpen: !this.state.menuOpen })

  componentDidMount = () => {
    const { publication_id } = this.props.navigation.state.params
    const { authToken } = this.props
    Axios.get(
      `${API_URL}/publications/${publication_id}`,
      {
        headers: { Authorization: authToken }
      }
    ).then(response => {
      this.setState(
        { publication: response.data.publication },
        () => {
          const { neighborhood_units: units } = this.props.neighborhood
          const { publication } = this.state
          this.category = Categories.find(
            category =>
              category.key === publication.publication_type)
            || { icon: 'loop', name: 'Otros' }
          this.commentsRef = firebase.database().ref(`/comments/${publication.id}`)
          this.commentsRef.on('value', snapshot => {
            const comments = snapshot.val()
            if (comments) {
              this.setState({
                loadingComments: false,
                comments: Object.values(comments)
              })
            } else {
              this.setState({ loadingComments: false })
            }
          })
          this.setState({
            unit: units.find(unit => unit.id === publication.neighborhood_unit_id)
          }, () => {
            if (publication.publication_type === 'poll') {
              const { unit } = this.state
              this.setState({
                voted: publication.voted,
                results: publication.voted ? publication.options : null,
                total: unit.unit_type === 'condo'
                  ? unit.number_of_homes
                  : unit.number_of_members
              })
            }
          })
        }
      )
    })
  }

  componentWillUnmount = () => {
    this.commentsRef.off('value')
  }

  onLayout = ({ nativeEvent: { layout: { height } } }) => {
    const offset = fullHeight - height - 50
    this.setState({ offset })
  }

  comment = () => {
    const { currentUser } = this.props
    this.commentsRef.push({
      text: this.state.comment,
      createdAt: new Date().getTime(),
      author: {
        id: currentUser.id,
        name: currentUser.name,
        last_name: currentUser.last_name,
        avatar: currentUser.avatar
      }
    }, () => this.setState({ comment: '' }))
  }

  vote = () => {
    const { publication, vote } = this.state
    const { authToken } = this.props
    this.setState({ loading: true })
    Alert.alert(
      'Votar',
      `Votar por la opción "${publication.options[vote].label}"`,
      [
        { text: 'Cancelar', onPress: () => this.setState({ loading: false }) },
        { text: 'Aceptar', onPress: () => {
          Axios.post(
            `${API_URL}/publications/${publication.id}/vote`,
            { vote },
            {
              headers: { Authorization: authToken }
            }
          ).then(response => {
            this.setState({
              voted: true,
              results: response.data.results,
              loading: false
            })
          })
        } }
      ]
    )
  }

  renderComment = ({ item: comment }) => {
    const date = getDate(comment.createdAt)
    return (
      <View style={styles.comment}>
        <View style={styles.commentHeader}>
          <View style={styles.commentAuthor}>
            <Avatar
              source={{ uri: comment.author.avatar }}
              name={comment.author.name}
              size={25}
            />
            <Text style={styles.commentHeaderText}>{comment.author.name}</Text>
          </View>
          <Text style={styles.commentHeaderText}>{date}</Text>
        </View>
        <Text>{comment.text}</Text>
      </View>
    )
  }

  report = () => {
    const { publication } = this.state
    this.setState({
      reportOpen: true,
      reportingId: publication.id,
      reportingType: 'publication'
    })
  }

  closeReport = () => {
    this.setState({ reportOpen: false })
  }

  render() {
    const { publication } = this.state
    if (!publication) {
      return (
        <View style={styles.screen}>
          <Loading loading={true} />
        </View>)
    }
    const { currentUser, unit } = this.props
    const { menuOpen, offset, reportOpen, reportingId, voted, results, loading } = this.state
    const menuTop = { top: publication.image_url ? 170 : 20 }
    const { publication_type } = publication
    let published = new Date(publication.created_at)
    published = (`0${published.getDate()}`).slice(-2) + ' ' + Months[published.getMonth()]
    const dateTime = new Date(publication.date)
    const date = (`0${dateTime.getDate()}`).slice(-2) + '/' + `0${dateTime.getMonth() + 1}`.slice(-2) + '/' + dateTime.getFullYear()
    const time = `${dateTime.getHours()}:${('0' + dateTime.getMinutes()).slice(-2)}`
    return (
      <View style={styles.screen} onLayout={this.onLayout}>
        <View style={styles.screen}>
          <ScrollView ref={r => {
            this.sv = r
          }}>
            {publication.image_url && (
              <Image source={{ uri: publication.image_url }} style={styles.image} />
            )}
            <View style={styles.details}>
              <View style={styles.info}>
                {this.category && (
                  <View style={styles.category}>
                    <WebarrioIcon
                      name={this.category.icon}
                      size={20}
                      color={Colors.subHeading}
                    />
                    <Text style={styles.subHeading}>{this.category.name}</Text>
                  </View>
                )}
                {this.state.unit && (
                  <Text style={styles.subHeading}>
                    {this.state.unit.name}
                  </Text>
                )}
                {publication_type === 'poll' && (
                  <Text style={styles.subHeading}>
                    CIERRA EL {getDate(publication.end)}
                  </Text>
                )}
                <Text style={styles.title}>{publication.title}</Text>
                {publication_type !== 'poll' && (
                  <View style={styles.author}>
                    <Avatar
                      source={{ uri: publication.author.avatar }}
                      name={publication.author.name}
                    />
                    <View>
                      <Text style={styles.authorName}>
                        {publication.author.name} {publication.author.last_name}
                      </Text>
                      <Text style={styles.subHeading}>
                        {published}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              {['car_pooling', 'event'].includes(publication_type) && (
                <View style={[styles.info, styles.row]}>
                  <View style={styles.row}>
                    <Feather name='calendar' size={20} color={Colors.orange} />
                    <Text>
                      {date}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <SimpleLineIcons name='clock' size={20} color={Colors.orange} />
                    <Text>
                      {time}
                    </Text>
                  </View>
                </View>
              )}
              {publication_type === 'car_pooling' && (
                <View style={styles.info}>
                  <View style={styles.row}>
                    <Text>Destino: </Text>
                    <Text>{publication.destination}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text>Lugares disponibles: </Text>
                    <Text>{publication.spaces}</Text>
                  </View>
                </View>
              )}
              <Text style={styles.description}>
                {publication.description}
              </Text>
              {publication_type === 'poll' && !voted && (
                <View style={styles.voteSection}>
                  <TouchableOpacity
                    style={[styles.optionBox, styles.yes]}
                    onPress={() => this.setState({ vote: 0 }, this.vote)}
                  >
                    <EvilIcons name='like' size={40} color='white' />
                    <Text style={styles.optionText}>SI</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.optionBox, styles.no]}
                    onPress={() => this.setState({ vote: 1 }, this.vote)}
                  >
                    <EvilIcons style={styles.iconNo} name='like' size={40} color='white' />
                    <Text style={styles.optionText}>NO</Text>
                  </TouchableOpacity>
                </View>
              )}
              {publication_type === 'poll' && voted && (
                <View style={styles.voteSection}>
                  <View
                    style={[
                      styles.row,
                      results[1].votes < results[0].votes && styles.winner
                    ]}
                  >
                    <EvilIcons name='like' size={40} color={Colors.orange} />
                    <Text style={styles.orange}>SI ({results[0].votes})</Text>
                  </View>
                  <View
                    style={[
                      styles.row,
                      results[1].votes > results[0].votes && styles.winner
                    ]}
                  >
                    <EvilIcons name='like' size={40} color={Colors.no} style={styles.iconNo} />
                    <Text>NO ({results[1].votes})</Text>
                  </View>
                </View>
              )}
            </View>
            {this.category && !this.category.admin && (
              <View style={styles.commentSection}>
                {this.state.loadingComments && (
                  <ActivityIndicator />
                )}
                <FlatList
                  data={this.state.comments}
                  renderItem={this.renderComment}
                  keyExtractor={ (item, index) => index }
                />
                <View style={styles.comment}>
                  <TextInput
                    multiline={true}
                    underlineColorAndroid='transparent'
                    value={this.state.comment}
                    onChangeText={t => this.setState({ comment: t })}
                    placeholder='Escribe un comentario...'
                    style={styles.commentInput}
                    onFocus={() => this.sv.scrollToEnd()}
                  />
                  <TouchableOpacity
                    onPress={this.comment}
                    disabled={!this.state.comment}
                    style={styles.commentButton}
                  >
                    <Text
                      style={[
                        styles.commentButtonText,
                        this.state.comment && styles.commentButtonActive
                      ]}
                    >
                      Comentar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {menuOpen && (
              <TouchableWithoutFeedback onPress={this.menu.toggleMenu}>
                <View style={styles.menuClose} />
              </TouchableWithoutFeedback>
            )}
            <View style={[styles.menu, menuTop]}>
              <PublicationMenu
                publication={publication}
                currentUserId={currentUser.id}
                toggleMenuCallback={this.toggleMenu}
                report={this.report}
                openDirection='top'
                ref={r => {
                  this.menu = r
                }}
              />
            </View>
          </ScrollView>
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
        <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={offset}
        />
        <Loading loading={loading} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  currentUser: state.currentsReducer.user,
  unit: state.currentsReducer.unit,
  neighborhood: state.currentsReducer.neighborhood
})

export default connect(mapStateToProps)(PublicationScreen)
