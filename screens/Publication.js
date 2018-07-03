import React from 'react'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Colors from '../constants/Colors'
import Categories from '../constants/Categories'
import { Months } from '../constants/utils'
import Avatar from '../components/Avatar'
import WebarrioIcon from '../components/WebarrioIcon'
import PublicationMenu from '../components/PublicationMenu'
import Report from '../components/Report'
import BackButton from '../components/BackButton'
import firebase from '../api/firebase'
import { getDate } from '../api/utils'

const { height: fullHeight } = Dimensions.get('window')

class PublicationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.publication.title,
    headerLeft: (<BackButton behavior='top' />)
  })

  constructor(props) {
    super(props)
    this.category = Categories.find(
      category =>
        category.key === props.navigation.state.params.publication.publication_type)
      || { icon: 'loop', name: 'Otros' }

    this.state = {
      offset: 0,
      menuOpen: false,
      loadingComments: true,
      comments: [],
      reportOpen: false,
      reportingId: ''
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.report = this.report.bind(this)
    this.closeReport = this.closeReport.bind(this)
  }

  toggleMenu = () => this.setState({ menuOpen: !this.state.menuOpen })

  componentWillMount = () => {
    const { publication } = this.props.navigation.state.params
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

  renderComment = ({ item: comment }) => {
    const date = getDate(comment.createdAt)
    return (
      <View style={styles.comment}>
        <View style={styles.commentHeader}>
          <View style={styles.commentAuthor}>
            <Avatar source={{ uri: comment.author.avatar }} name={comment.author.name} size={25} />
            <Text style={styles.commentHeaderText}>{comment.author.name}</Text>
          </View>
          <Text style={styles.commentHeaderText}>{date}</Text>
        </View>
        <Text>{comment.text}</Text>
      </View>
    )
  }

  report = () => {
    const { publication } = this.props.navigation.state.params
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
    const { publication } = this.props.navigation.state.params
    const { navigation, currentUser, currentUnit } = this.props
    const { menuOpen, offset, reportOpen, reportingId } = this.state
    const menuTop = { top: publication.image_url ? 170 : 20 }
    let date = new Date(publication.created_at)
    date = (`0${date.getDate()}`).slice(-2) + ' ' + Months[date.getMonth()]
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
                <View style={styles.category}>
                  <WebarrioIcon
                    name={this.category.icon}
                    size={20}
                    color={Colors.subHeading}
                  />
                  <Text style={styles.subHeading}>{this.category.name}</Text>
                </View>
                <Text style={styles.title}>{publication.title}</Text>
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
                      {date}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.description}>
                {publication.description}
              </Text>
            </View>
            {!this.category.admin && (
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

const mapStateToProps = state => ({
  currentUser: state.currentsReducer.user,
  currentUnit: state.currentsReducer.unit
})

export default connect(mapStateToProps)(PublicationScreen)

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: Dimensions.get('window').width
  },
  screen: {
    flex: 1
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: Colors.orange
  },
  description: {
    marginVertical: 10,
    marginHorizontal: 20,
    alignSelf: 'stretch'
  },
  details: {
    backgroundColor: 'white'
  },
  info: {
    padding: 20,
    paddingBottom: 10
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  authorName: {
    color: Colors.subHeading,
    fontWeight: 'bold',
    fontSize: 16
  },
  subHeading: {
    color: Colors.subHeading
  },
  category: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  label: {
    color: '#92a2a2'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  menuClose: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  menu: {
    position: 'absolute',
    right: 15
  },
  commentSection: {
    backgroundColor: 'white'
  },
  comment: {
    marginVertical: StyleSheet.hairlineWidth,
    padding: 20,
    backgroundColor: '#E6EDEC'
  },
  commentHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 7
  },
  commentAuthor: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  commentHeaderText: {
    color: '#92A2A2',
    fontSize: 12
  },
  commentInput: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    padding: 5,
    paddingBottom: 20,
    minHeight: 40
  },
  commentButton: {
    position: 'absolute',
    bottom: 25,
    right: 25
  },
  commentButtonText: {
    color: '#E6EDEC'
  },
  commentButtonActive: {
    color: Colors.tintColor
  }
})
