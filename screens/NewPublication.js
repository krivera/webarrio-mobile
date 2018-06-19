import React from 'react'
import {
  ActivityIndicator,
  DatePickerIOS,
  DatePickerAndroid,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TimePickerAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { Permissions } from 'expo'
import { connect } from 'react-redux'
import { ImagePicker } from 'expo'
import { Feather, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { API_URL } from 'react-native-dotenv'
import axios from 'axios'
import Categories from '../constants/Categories'
import Colors from '../constants/Colors'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import WebarrioIcon from '../components/WebarrioIcon'
import FloatingLabelInput from '../components/FloatingLabel'
import KeyboardAwareView from '../components/KeyboardAwareView'

class NewPublicationScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Nueva Publicación',
    headerLeft: (<BackButton />)
  })

  constructor(props) {
    super(props)
    const { publication, category } = (props.navigation.state.params || { publication: null })
    const date = publication && publication.date ? publication.date : new Date()
    this.state = {
      title: publication ? publication.title : '',
      publication_type: publication ? publication.publication_type : category,
      date,
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seats_available: publication ? publication.spaces : '',
      destination: publication ? publication.destination : '',
      description: publication ? publication.description : '',
      image: publication ? publication.image_url : null,
      datePickerOpen: false,
      loading: false
    }
    this.now = new Date()
    this.savePublication = this.savePublication.bind(this)
  }

  openDatePicker = async () => {
    if (Platform.OS === 'ios') {
      this.setState({ datePickerOpen: true })
    } else {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.state.date,
        minDate: new Date()
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ date: new Date(year, month, day) })
      }
    }
  }
  openTimePicker = async () => {
    const { action, hour, minute } = await TimePickerAndroid.open({
      hour: this.state.hours,
      minute: this.state.minutes
    })
    if (action !== TimePickerAndroid.dismissedAction) {
      this.setState({
        hours: hour, minutes: minute
      })
    }
  }

  datePicker = () => {
    const { date, hours, minutes } = this.state
    let month = date.getMonth() + 1
    month = ('0' + month).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const hour = ('0' + hours).slice(-2)
    const minute = ('0' + minutes).slice(-2)
    return (
      <View style={styles.rowContainer}>
        <TouchableWithoutFeedback
          onPress={this.openDatePicker}
        >
          <View style={[styles.row, styles.date]}>
            <Feather name='calendar' size={20} color={Colors.orange} />
            <Text style={styles.datetimeText}>
              {`${day}/${month}/${date.getFullYear()}`}
            </Text>
            <Ionicons name='ios-arrow-down' size={20} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.openTimePicker}
        >
          <View style={[styles.row, styles.time]}>
            <SimpleLineIcons name='clock' size={20} color={Colors.orange} />
            <Text style={styles.datetimeText}>
              {`${hour}:${minute}`}
            </Text>
            <Ionicons name='ios-arrow-down' size={20} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  setDate = date => {
    this.setState({ date })
  }

  selectPicture = async () => {
    Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL)
    ]).then(res =>
      res.filter(r => r.status === 'granted')
    ).then(async (permissions) => {
      if (permissions.length === 2) {
        let image = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: false,
          mediaTypes: 'Images'
        })

        if (!image.cancelled) {
          this.setState({ image: image.uri })
        }
      }
    })
  }

  savePublication = () => {
    const {
      title,
      description,
      publication_type,
      date,
      hours,
      minutes,
      destination,
      seats_available
    } = this.state
    if (title && description && publication_type) {
      this.setState({ loading: true })
      const { authToken, currentNeighborhood, navigation } = this.props
      const { publication } = navigation.state.params
      let date_ = new Date(date)
      date_.setHours(hours, minutes, 0)
      axios({
        url: API_URL + '/publications/' + (publication ? publication.id : ''),
        method: publication ? 'PATCH' : 'POST',
        data: {
          title,
          description,
          publication_type,
          neighborhood: currentNeighborhood.id,
          date: date_.getTime(),
          seats_available,
          destination
        },
        headers: {
          Authorization: authToken
        }
      }).then(response => {
        if ((!publication && this.state.image)
          || (publication && this.state.image !== publication.image_url)) {
          let formData = new FormData()
          let filename = this.state.image.split('/').pop()
          let match = /\.(\w+)$/.exec(filename)
          let type = match ? `image/${match[1]}` : `image`
          formData.append('file', { uri: this.state.image, name: filename, type })
          axios({
            url: API_URL + '/publications/' + response.data.publication.id + '/image',
            Accept: 'application/json, text/javascript, */*; q=0.01',
            method: 'POST',
            headers: {
              'Content-type': 'multipart/form-data',
              'Authorization': authToken
            },
            data: formData
          }).then(response_ => {
            this.setState({ loading: false })
            navigation.navigate('Publication', { publication: response_.data.publication })
          })
        } else {
          this.setState({ loading: false })
          navigation.navigate('Publication', { publication: response.data.publication })
        }
        this.props.navigation.state.params.pubList.onRefresh()
      })
    }
  }

  clear = field => {
    this.setState({ [field]: '' })
  }

  render() {
    const show_date = ['event', 'car_pooling'].includes(this.state.publication_type)
    const is_car = ['car_pooling'].includes(this.state.publication_type)
    const category = Categories.find(cat => cat.key === this.state.publication_type)
    return (
      <KeyboardAwareView style={styles.screen}>
        <ScrollView ref={r => {
          this.scrollview = r
        }}>
          <TouchableOpacity
            onPress={this.selectPicture}
            style={styles.imageSection}
          >
            {!this.state.image && (<Text>Subir una foto</Text>)}
            {this.state.image && (
              <Image
                style={styles.image}
                source={{ uri: this.state.image }}
              />)}
          </TouchableOpacity>
          <View style={styles.form}>
            <View>
              <FloatingLabelInput
                value={this.state.title}
                label='Título'
                labelColor={Colors.subHeading}
                onChangeText={t => this.setState({ title: t })}
                style={styles.title}
              />
              {this.state.title ? (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => this.clear('title')}
                >
                  <Feather name='x' size={18} color={Colors.subHeading} />
                </TouchableOpacity>
              ) : (<View />)}
            </View>
            <View style={styles.category}>
              <WebarrioIcon
                name={category.icon}
                size={23}
                color={Colors.orange}
              />
              <Text style={styles.categoryLabel}>{category.name}</Text>
            </View>
            {is_car && (
              <View style={styles.rowContainer}>
                <FloatingLabelInput
                  label='Destino'
                  labelColor={Colors.subHeading}
                  containerStyle={styles.half}
                  value={this.state.destination}
                  onChangeText={t => this.setState({ destination: t })}
                />
                <FloatingLabelInput
                  label='Lugares disponibles'
                  labelColor={Colors.subHeading}
                  containerStyle={styles.half}
                  onChangeText={t => this.setState({ seats_available: t })}
                  value={this.state.seats_available}
                  keyboardType='numeric'
                />
              </View>
            )}
            {show_date && (
              <View style={styles.row}>
                {this.datePicker()}
              </View>
            )}
            <View>
              <FloatingLabelInput
                label='Detalles'
                labelColor={Colors.subHeading}
                onChangeText={t => this.setState({ description: t })}
                value={this.state.description}
                multiline={true}
              />
              
            </View>
            <Button onPress={this.savePublication}>
              Publicar
            </Button>
          </View>
        </ScrollView>
        {(this.state.loading || this.state.datePickerOpen) && (
          <View style={styles.lightBoxBackground}>
            {this.state.datePickerOpen && (
              <View style={styles.lightBox}>
                <DatePickerIOS
                  date={this.state.date}
                  minimumDate={new Date()}
                  mode='datetime'
                  onDateChange={this.setDate}
                  minuteInterval={5}
                />
                <TouchableOpacity
                  style={styles.lightBoxButton}
                  onPress={() => this.setState({ datePickerOpen: false })}
                >
                  <Text style={styles.lightBoxOk}>
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {this.state.loading && (
              <ActivityIndicator />
            )}
          </View>
        )}
      </KeyboardAwareView>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  currentNeighborhood: state.currentsReducer.neighborhood,
  user: state.currentsReducer.user
})

export default connect(mapStateToProps)(NewPublicationScreen)

const styles = StyleSheet.create({
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
  categoryLabel: {
    fontSize: 20,
    marginHorizontal: 10
  },
  date: {
    flex: 0.6,
    borderBottomColor: Colors.subHeading,
    borderBottomWidth: 1
  },
  time: {
    flex: 0.35,
    borderBottomColor: Colors.subHeading,
    borderBottomWidth: 1
  },
  datetimeText: {
    fontSize: 18
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  form: {
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    color: Colors.orange
  },
  imageSection: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#f6f6f7'
  },
  image: {
    height: 150,
    width: 200
  },
  publicationType: {
    borderBottomColor: Colors.subHeading,
    borderBottomWidth: 1,
    paddingBottom: 1
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
  lightBox: {
    backgroundColor: 'white'
  },
  lightBoxOk: {
    color: Colors.tintColor,
    margin: 10,
    fontWeight: 'bold'
  },
  lightBoxButton: {
    alignSelf: 'flex-end'
  },
  pickerPlaceholder: {
    position: 'absolute',
    top: 5,
    left: 10,
    fontSize: 12,
    color: '#92a2a2'
  },
  clearButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 5
  }
});
