import { Dimensions, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

export default StyleSheet.create({
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
  category: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  comment: {
    marginVertical: StyleSheet.hairlineWidth,
    padding: 20,
    backgroundColor: '#E6EDEC'
  },
  commentSection: {
    backgroundColor: 'white'
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
  commentButton: {
    position: 'absolute',
    bottom: 25,
    right: 25
  },
  commentButtonActive: {
    color: Colors.tintColor
  },
  commentButtonText: {
    color: '#E6EDEC'
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
  description: {
    marginVertical: 10,
    marginHorizontal: 20,
    alignSelf: 'stretch'
  },
  details: {
    backgroundColor: 'white'
  },
  image: {
    height: 150,
    width: Dimensions.get('window').width
  },
  info: {
    padding: 20,
    paddingBottom: 10
  },
  label: {
    color: '#92a2a2'
  },
  menu: {
    position: 'absolute',
    right: 15
  },
  menuClose: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  options: {
    alignItems: 'flex-start',
    alignSelf: 'stretch'
  },
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  subHeading: {
    color: Colors.subHeading
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: Colors.orange
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
