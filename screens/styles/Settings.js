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
    padding: 25
  },
  space: {
    height: 35
  }
})
