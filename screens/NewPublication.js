import React from 'react';
import {
  ActivityIndicator,
  DatePickerIOS,
  DatePickerAndroid,
  Image,
  KeyboardAvoidingView,
  Picker,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TimePickerAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { Feather } from '@expo/vector-icons';
import { API_URL } from 'react-native-dotenv';
import { Picker as PickerIOS } from 'react-native-picker-dropdown';
import axios from 'axios';
import Categories from '../constants/Categories';
import Colors from '../constants/Colors';
import BackButton from '../components/BackButton';

class NewPublicationScreen extends React.Component{
  static navigationOptions = ({navigation}) => ({
    title: 'Nueva Publicación',
    headerLeft: (<BackButton navigation={navigation} />),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.savePublication()}>
        <Feather name="upload" size={25} color="white" />
      </TouchableOpacity>
    )
  });

  constructor(props){
    super(props);
    const { publication } = (props.navigation.state.params || {publication: null});
    this.state = {
      title: publication ? publication.title : '',
      publication_type: publication ? publication.publication_type : '',
      date: publication && publication.date ? publication.date : new Date(),
      seats_available: publication ? publication.spaces : '0',
      destination: publication ? publication.destination : '',
      description: publication ? publication.description : '',
      image: publication ? publication.image_url : null,
      datePickerOpen: false,
      loading: false
    }
    this.now = new Date();
    this.savePublication = this.savePublication.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({savePublication: this.savePublication});
  }

  openDatePicker = async () => {
    if(Platform.OS === 'ios'){
      this.setState({datePickerOpen: true});
    }
    else {
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
  }

  picker = () => {
    const categories = Categories.filter(category => {
      return category.filter !== 'all' && !category.admin;
    });
    if(Platform.OS === 'ios'){
      return (
        <View>
          <PickerIOS
            selectedValue={this.state.publication_type}
            onValueChange={v => this.setState({publication_type: v})}
            style={styles.publication_type_text}
          >
            {categories.map(category => (
                <PickerIOS.Item
                  key={category.filter}
                  label={category.name}
                  value={category.filter}
                />
            ))}
          </PickerIOS>
          {this.state.publication_type === '' && (
            <Text style={styles.pickerPlaceholder}>Categoría</Text>
          )}
        </View>
      )
    }
    else {
      return (
        <Picker
          selectedValue={this.state.publication_type}
          onValueChange={v => this.setState({publication_type: v})}
          mode="dropdown"
          style={styles.publication_type_text}
        >
          <Picker.Item
            key="placeholder"
            value=""
            label="Categoría"
          />
          {categories.map(category => (
              <Picker.Item
                key={category.filter}
                label={category.name}
                value={category.filter}
              />
          ))}
        </Picker>
      )
    }
  }

  datePicker = () => {
    const { date } = this.state;
    let month = date.getMonth() + 1;
    month = ('0' + month).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    return (
      <TouchableWithoutFeedback
        onPress={this.openDatePicker}
      >
        <View style={styles.input}>
          <Text>
            {`${day}/${month}/${date.getFullYear()}, ${hour}:${minute}`}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  setDate = date => {
    this.setState({date: date});
  }

  selectPicture = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      mediaTypes: 'Images'
    });

    if (!image.cancelled) {
      this.setState({ image: image.uri });
    }
  }

  savePublication = () => {
    const {
      title,
      description,
      publication_type,
      date,
      destination,
      seats_available
    } = this.state;
    if(title && description && publication_type){
      this.setState({loading: true});
      const { authToken, currentNeighborhood, navigation } = this.props;
      const { publication } = navigation.state.params;
      axios({
        url:  API_URL + '/publications/' + (publication ? publication.id : ''),
        method: publication ? 'PATCH' : 'POST',
        data: {
          title,
          description,
          publication_type,
          neighborhood: currentNeighborhood.id,
          date: date.getTime(),
          seats_available,
        },
        headers: {
          Authorization: authToken
        }
      })
      .then(response => {
        if((!publication && this.state.image)
          || (publication && this.state.image !== publication.image_url)) {
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
            this.setState({loading: false});
            navigation.navigate('Publication', {publication: response.data.publication});
          });
        }
        else {
            this.setState({loading: false});
            navigation.navigate('Publication', {publication: response.data.publication});
        }
      });
    }
  }

  render(){
    const show_date = ['event', 'car_pooling'].includes(this.state.publication_type);
    const is_car = ['car_pooling'].includes(this.state.publication_type);
    let keyboardOffset = Platform.OS === 'ios' ? 55 : 75;
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={keyboardOffset} style={styles.screen}>
        <ScrollView ref={r => this.scrollview = r}>
          <View style={styles.publication_type}>
            {this.picker()}
          </View>
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
              <Text style={styles.label}>Cuándo</Text>
              {this.datePicker()}
            </View>
          )}
          {is_car && (
            <View style={[styles.row, {flex: 1}]}>
              <View style={[styles.horizontal, {flex: 0.65}]}>
                <Text style={styles.label}>Destino</Text>
                <TextInput
                  style={[styles.input]}
                  underlineColorAndroid="transparent"
                  value={this.state.destination}
                  onChangeText={t => this.setState({destination: t})}
                />
              </View>
              <View style={[styles.horizontal, {flex: 0.35}]}>
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
                onFocus={() => this.scrollview.scrollToEnd()}
                value={this.state.description}
                underlineColorAndroid="transparent"
                style={styles.detailInput}
                multiline={true}
              />
            </View>
          </View>
        </ScrollView>
        {(this.state.loading || this.state.datePickerOpen) && (
          <View style={styles.lightBoxBackground}>
            {this.state.datePickerOpen && (
              <View style={styles.lightBox}>
                <DatePickerIOS
                  date={this.state.date}
                  minimumDate={new Date()}
                  mode="datetime"
                  onDateChange={this.setDate}
                  minuteInterval={5}
                />
                <TouchableOpacity
                  style={styles.lightBoxButton}
                  onPress={() => this.setState({datePickerOpen: false})}
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
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.authReducer.authToken,
  currentNeighborhood: state.currentsReducer.neighborhood,
  user: state.currentsReducer.user
});

export default connect(mapStateToProps)(NewPublicationScreen);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center'
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
  },
  publication_type: {
    width: 180,
    borderColor: Colors.orange,
    borderWidth: StyleSheet.hairlineWidth,
    margin: 10,
    paddingLeft: 5,
    alignSelf: 'center'
  },
  publication_type_text: {
    margin: Platform.OS === 'android' ? -10 : 5,
    alignItems: 'center'
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
    backgroundColor: 'white',
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
    color: "#92a2a2"
  }
});
