import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

export default StyleSheet.create({
  head: {
    backgroundColor: '#ed1c24',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingTop: 30,
    flex: 0.5
  },
  headTitle: {
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 20
  },
  contact: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: StyleSheet.hairlineWidth,
    paddingHorizontal: 60,
    flex: 1 / 6
  },
  screen: {
    flex: 1
  },
  sosText: {
    color: 'white'
  },
  contactText: {
    color: '#ed1c24',
    alignSelf: 'center'
  },
  contactNumber: {
    fontSize: 30
  }
})
