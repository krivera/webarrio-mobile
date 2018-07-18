import React from 'react'
import {
  DatePickerIOS,
  DatePickerAndroid,
  Image,
  Platform,
  ScrollView,
  Text,
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
import { NavigationActions } from 'react-navigation'
import { setCurrent } from '../actions/currents'
import Categories from '../constants/Categories'
import Colors from '../constants/Colors'
import UnitPicker from '../components/UnitPicker'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import WebarrioIcon from '../components/WebarrioIcon'
import Loading from '../components/Loading'
import FloatingLabelInput from '../components/FloatingLabel'
import KeyboardAwareView from '../components/KeyboardAwareView'
import styles from './styles/NewPublication'

class NewPublication extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Nueva Publicación',
    headerLeft: (<BackButton behavior={
      navigation.state.params && navigation.state.params.publication
        ? 'back'
        : 'pop'
    } />)
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
      timePickerOpen: false,
      loading: false
    }
    this.now = new Date()
    this.savePublication = this.savePublication.bind(this)
  }

  componentDidMount = () => {
    const { unit, neighborhood, dispatch, navigation } = this.props
    if (navigation.state.params.category.admin) {
      if (!unit.user_roles.includes('secretary')) {
        dispatch(setCurrent(
          'unit',
          neighborhood.neighborhood_units.find(
            nUnit => nUnit.user_roles.includes('secretary')
          )
        ))
      }
    }
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
    if (Platform.OS === 'ios') {
      this.setState({ timePickerOpen: true })
    } else {
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
    this.setState({
      date,
      hours: date.getHours(),
      minutes: date.getMinutes()
    })
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
      const { authToken, neighborhood, navigation, unit } = this.props
      const { publication } = navigation.state.params
      let date_ = new Date(date)
      date_.setHours(hours, minutes, 0)
      let data = {
        title,
        description,
        publication_type,
        date: date_.getTime(),
        seats_available,
        destination
      }
      if (Categories.find(category => category.key === publication_type).admin) {
        data.unit_id = unit.id
      } else {
        data.neighborhood = neighborhood.id
      }
      axios({
        url: `${API_URL}/publications/${publication ? publication.id : ''}`,
        method: publication ? 'PATCH' : 'POST',
        data,
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
            url: `${API_URL}/publications/${response.data.publication.id}/image`,
            Accept: 'application/json, text/javascript, */*; q=0.01',
            method: 'POST',
            headers: {
              'Content-type': 'multipart/form-data',
              'Authorization': authToken
            },
            data: formData
          }).then(response_ => {
            this.setState({ loading: false })
            navigation.dispatch(NavigationActions.pop())
            navigation.navigate(
              'Publication',
              { publication: response_.data.publication }
            )
          })
        } else {
          this.setState({ loading: false })
          navigation.dispatch(NavigationActions.pop())
          navigation.navigate(
            'Publication',
            { publication: response.data.publication }
          )
        }
      })
    }
  }

  clear = field => {
    this.setState({ [field]: '' })
  }

  changeUnit = unitId => {
    const { neighborhood, dispatch } = this.props
    const nextUnit = neighborhood.neighborhood_units.find(unit => unit.id === unitId)
    dispatch(setCurrent('unit', nextUnit))
    if (nextUnit.apartments && nextUnit.apartments.length) {
      dispatch(setCurrent('apartment', nextUnit.apartments))
    }
  }

  render() {
    const show_date = ['event', 'car_pooling'].includes(this.state.publication_type)
    const is_car = ['car_pooling'].includes(this.state.publication_type)
    const {
      image,
      title,
      description,
      destination,
      publication_type,
      seats_available,
      date,
      loading
    } = this.state
    const { neighborhood, unit } = this.props
    console.log(neighborhood)
    const category = Categories.find(cat => cat.key === publication_type)
    return (
      <KeyboardAwareView style={styles.screen}>
        <ScrollView ref={r => {
          this.scrollview = r
        }}>
          <TouchableOpacity
            onPress={this.selectPicture}
            style={styles.imageSection}
          >
            {!image && (<Text>Subir una foto</Text>)}
            {image && (
              <Image
                style={styles.image}
                source={{ uri: image }}
              />)}
          </TouchableOpacity>
          <View style={styles.form}>
            <View>
              <FloatingLabelInput
                value={title}
                label='Título'
                labelColor={Colors.subHeading}
                onChangeText={t => this.setState({ title: t })}
                style={styles.title}
              />
              {title ? (
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
              <Text style={styles.categoryLabel}>
                {category.name}
              </Text>
            </View>
            {category.admin && (
              <UnitPicker role='secretary' />
            )}
            {is_car && (
              <View style={styles.rowContainer}>
                <FloatingLabelInput
                  label='Destino'
                  labelColor={Colors.subHeading}
                  containerStyle={styles.half}
                  value={destination}
                  onChangeText={t => this.setState({ destination: t })}
                />
                <FloatingLabelInput
                  label='Lugares disponibles'
                  labelColor={Colors.subHeading}
                  containerStyle={styles.half}
                  onChangeText={t => this.setState({ seats_available: t })}
                  value={seats_available}
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
                value={description}
                multiline={true}
              />
              {description ? (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => this.clear('description')}
                >
                  <Feather name='x' size={18} color={Colors.subHeading} />
                </TouchableOpacity>
              ) : (<View />)}
            </View>
            <Button onPress={this.savePublication}>
              Publicar
            </Button>
          </View>
        </ScrollView>
        {this.state.datePickerOpen && (
          <View style={styles.lightBoxBackground}>
            <View style={styles.lightBox}>
              <DatePickerIOS
                date={date}
                minimumDate={new Date()}
                mode='date'
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
          </View>
        )}
        {this.state.timePickerOpen && (
          <View style={styles.lightBoxBackground}>
            <View style={styles.lightBox}>
              <DatePickerIOS
                date={date}
                mode='time'
                onDateChange={this.setDate}
                minuteInterval={5}
              />
              <TouchableOpacity
                style={styles.lightBoxButton}
                onPress={() => this.setState({ timePickerOpen: false })}
              >
                <Text style={styles.lightBoxOk}>
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Loading loading={loading} />
      </KeyboardAwareView>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  neighborhood: state.currentsReducer.neighborhood,
  unit: state.currentsReducer.unit,
  user: state.currentsReducer.user
})

export default connect(mapStateToProps)(NewPublication)
