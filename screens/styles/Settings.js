import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

export default StyleSheet.create({
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 25
  },
  cover: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    backgroundColor: Colors.errorBox,
    padding: 5,
    marginVertical: 5
  },
  errorText: {
    color: Colors.errorText
  },
  navigate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15
  },
  navigateText: {
    color: Colors.orange,
    fontSize: 18
  },
  prompt: {
    backgroundColor: 'white',
    padding: 25,
    margin: 25
  },
  promptButton: {
    margin: 5,
    padding: 5
  },
  promptButtons: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  promptButtonText: {
    color: Colors.tintColor,
    fontWeight: 'bold'
  },
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  section: {
    padding: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.subHeading
  },
  space: {
    height: 35
  }
})
