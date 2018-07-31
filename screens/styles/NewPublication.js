import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

export default StyleSheet.create({
  categoryLabel: {
    fontSize: 20,
    marginHorizontal: 10
  },
  datetimeText: {
    fontSize: 18
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  half: {
    flex: 0.48
  },
  category: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center'
  },
  clearButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 5
  },
  date: {
    flex: 0.6,
    borderBottomColor: Colors.subHeading,
    borderBottomWidth: 1
  },
  form: {
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: 150,
    width: 200
  },
  imageSection: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#f6f6f7'
  },
  lightBox: {
    backgroundColor: 'white'
  },
  lightBoxBackground: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10
  },
  lightBoxButton: {
    alignSelf: 'flex-end'
  },
  lightBoxOk: {
    color: Colors.tintColor,
    margin: 10,
    fontWeight: 'bold'
  },
  publicationType: {
    borderBottomColor: Colors.subHeading,
    borderBottomWidth: 1,
    paddingBottom: 1
  },
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  time: {
    flex: 0.35,
    borderBottomColor: Colors.subHeading,
    borderBottomWidth: 1
  },
  title: {
    color: Colors.orange
  },
  unitPicker: {
    flex: 0.7,
    marginTop: 0
  }
})
