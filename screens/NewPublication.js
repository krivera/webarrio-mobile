import React from 'react';
import {
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
  View
} from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from 'react-native-picker-dropdown';
import { API_URL } from 'react-native-dotenv';
import axios from 'axios';
import Categories from '../constants/Categories';
import Colors from '../constants/Colors';
import FloatingLabelInput from '../components/FloatingLabel';

class NewPublicationScreen extends React.Component{
  static navigationOptions = ({navigation}) => ({
    title: 'Nueva Publicación',
    tabBarVisible: false,
    headerLeft: (
      <TouchableOpacity onPress={navigation.popToTop}>
        <Ionicons name="ios-arrow-back" size={25} color="white" />
      </TouchableOpacity>
    )
  });


  constructor(props){
    super(props);
    this.state = {
      publication_type: '',
      date: new Date(),
      seats_available: '0',
      destination: '',
      deatails: ''
    }
    this.now = new Date()
  }

  openDatePickerAndroid = async () => {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: this.state.date,
      minDate: new Date(),
    });
    if(action !== DatePickerAndroid.dismissedAction){
      const{ actionTime, hour, minute } = await TimePickerAndroid.open({
        hour: this.state.date.getHours(),
        minute: this.state.date.getMinutes(),
      });
      if(actionTime !== TimePickerAndroid.dismissedAction){
        this.setState({date: new Date(year, month, day, hour, minute)});
      }
    }
  }

  datePicker = () => {
    if(Platform.OS == 'iOs'){
      return (<DatePickerIOS
        date={this.state.date}
        onDateChange={d => this.setState({date: d})}
        minuteInterval={5}
        minimumDate={this.now}
      />)
    }
    else{
      const { date } = this.state;
      let month = date.getMonth() + 1;
      month = ('0' + month).slice(-2);
      let day = ('0' + date.getDate()).slice(-2);
      let hour = ('0' + date.getHour()).slice(-2);
      let minute = ('0' + date.getMinute()).slice(-2);
      return (
        <TextInput
          onFocus={this.openDatePickerAndroid}
          value={`${day}/${month}/${date.getFullYear()}, ${hour}:${minute}`}
          style={styles.input}
        />
      )
    }
  }

  selectPicture = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!image.cancelled) {
      this.setState({ image: image.uri });
    }
  }

  savePublication = () => {
    const { title, description, publication_type } = this.state;
    if(title && description && publication_type){
      const { authToken, currentNeighborhood, navigation } = this.props;
      axios.post(
        API_URL + '/publications/',
        {
          title,
          description,
          publication_type,
          neighborhood: currentNeighborhood.id
        },
        {
          headers: {
            Authorization: authToken
          }
        }
      )
      .then(response => {
        if(this.state.image){
          let formData = new FormData()
          let filename = this.state.image.split('/').pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          formData.append('file', { uri: this.state.image, name: filename, type });
          axios({
            'url': API_URL + '/publications/' + response.data.publication.id + '/image',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'method': 'POST',
            'headers': {
              'Content-type': 'multipart/form-data',
              'Authorization': authToken
            },
            'data': formData
          })
          .then(response => {
            navigation.navigate('Publication', {publication: response.data.publication});
          });
        }
        else {
          navigation.navigate('Publication', {publication: response.data.publication});
        }
      });
    }
  }

  render(){
    const show_date = ['event', 'car_pooling'].includes(this.state.publication_type);
    const is_car = ['car_pooling'].includes(this.state.publication_type);
    return (
      <View style={styles.screen}>
        <ScrollView>
          <Picker
            selectedValue={this.state.publication_type}
            onValueChange={v => this.setState({publication_type: v})}
            mode="dropdown"
          >
            {Categories.filter(category => category.filter !== 'all')
              .map(category => (
                <Picker.Item
                  key={category.filter}
                  label={category.name}
                  value={category.filter}
                />
            ))}
          </Picker>
          <TouchableOpacity onPress={this.selectPicture} style={styles.imageSection}>
            {!this.state.image && (<Text>Subir una foto</Text>)}
            {this.state.image && (<Image style={styles.image} source={{uri: this.state.image}} />)}
          </TouchableOpacity>
          <TextInput
            value={this.state.title}
            placeholder="Título de la publicación"
            onChangeText={t => this.setState({title: t})}
            underlineColorAndroid="transparent"
            style={styles.titleBox}
          />
          {show_date && (
            <View style={styles.row}>
              <Text style={styles.label}>Cuando</Text>
              {this.datePicker()}
            </View>
          )}
          {is_car && (
            <View style={[styles.row, {flex: 1, padding: 10}]}>
              <View style={[styles.row, {flex: 0.65}]}>
                <Text style={styles.label}>Destino</Text>
                <TextInput
                  style={[styles.input]}
                  underlineColorAndroid="transparent"
                  value={this.state.destination}
                  onChangeText={t => this.setState({destination: t})}
                />
              </View>
              <View style={[styles.row, {flex: 0.35}]}>
                <Text style={styles.label}>Lugares</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={t => this.setState({seats_available: t})}
                  value={this.state.seats_available}
                  keyboardType="numeric"
                />
              </View>
            </View>
          )}
          <View style={styles.row}>
            <View style={styles.detailBox}>
              <TextInput
                placeholder="Detalles"
                onChangeText={t => this.setState({description: t})}
                value={this.state.description}
                underlineColorAndroid="transparent"
                style={styles.detailInput}
                multiline={true}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.createButton}
          onPress={this.savePublication}
        >
          <Text style={styles.buttonText}>CREAR PUBLICACIÓN</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  currentNeighborhood: state.currentsReducer.neighborhood
});

export default connect(mapStateToProps)(NewPublicationScreen);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createButton: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.orange,
    left: 0,
    right: 0,
    padding: 15,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 40
  },
  titleBox: {
    alignSelf: 'center',
    width: 250,
    textAlign: 'center',
    color: Colors.orange,
    borderColor: Colors.orange,
    borderWidth: StyleSheet.hairlineWidth,
    margin: 30
  },
  input: {
    borderColor: Colors.inputBorder,
    borderWidth: StyleSheet.hairlineWidth,
    margin: 10,
    flex: 1,
    paddingHorizontal: 5
  },
  detailBox: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.inputBorder,
    height: 100,
    padding: 5,
    flex: 1,
    margin: 10
  },
  detailInput: {
    alignSelf: 'stretch'
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
  label: {
    color: '#92a2a2'
  }
});
