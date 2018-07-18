import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

export default StyleSheet.create({
  menu: {
    backgroundColor: 'white',
    flex: 1
  },
  userSection: {
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomColor: Colors.subHeading,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row'
  },
  userName: {
    color: Colors.orange,
    fontSize: 18
  },
  apartment: {
    color: Colors.orange
  },
  signout: {
    color: Colors.subHeading,
    marginTop: 15
  },
  userDetails: {
    flex: 1
  },
  configBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingTop: 5
  },
  neigborhoodPicker: {
    height: 18
  },
  pickerLabel: {
    fontSize: 12,
    color: Colors.subHeading
  }
})
