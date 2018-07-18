import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  form: {
    padding: 15
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 5
  },
  picker: {
    borderBottomColor: Colors.subHeading,
    borderBottomWidth: 1,
    height: 27
  },
  label: {
    color: Colors.subHeading
  },
  accountType: {
    width: 130
  },
  accountNumber: {
    flex: 0.9
  },
  pickerIos: {
    fontSize: 18
  },
  formControl: {
    marginTop: 5
  }
})
