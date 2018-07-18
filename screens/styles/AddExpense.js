import { Dimensions, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

const { width } = Dimensions.get('window')
export default StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1
  },
  pickers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  monthPicker: {
    width: 160
  },
  yearPicker: {
    width: 100
  },
  picker: {
    marginTop: 10,
    height: 25
  },
  unitPicker: {
    flex: 0.7
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  pickerText: {
    fontSize: 18
  },
  detailInput: {
    width: Math.min(width * 0.38, 150),
    borderBottomColor: Colors.subHeading
  },
  total: {
    fontSize: 22,
    color: Colors.orange
  },
  form: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  addExpense: {
    padding: 5,
    alignSelf: 'flex-end'
  }
})
