import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.menubkg
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  menuContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  menuIcon: {
    width: 30,
    alignItems: 'center'
  }
})
