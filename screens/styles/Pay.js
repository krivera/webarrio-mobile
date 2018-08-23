import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

export default StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 15,
    flex: 1
  },
  total: {
    color: Colors.orange,
    fontSize: 20,
    borderBottomColor: Colors.subHeading,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10
  },
  method: {
    alignItems: 'center',
    margin: 10
  },
  methodHead: {
    color: Colors.orange
  },
  methodSection: {
    fontWeight: 'bold',
    marginTop: 30
  },
  unitName: {
    color: Colors.subHeading,
    fontSize: 12
  }
})
