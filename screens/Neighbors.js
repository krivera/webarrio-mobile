import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';
import { fetchNeighbors } from '../actions/neighbors';
import Colors from '../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

class NeighborsScreen extends React.Component{
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Vecinos',
    headerLeft: (<BackButton navigation={navigation} />)
  });

  constructor(props){
    super(props);
    this.state = {
      search: ''
    }
  }

  componentWillMount(){
    const { authToken, dispatch, currentNeighborhood } = this.props;
    dispatch(fetchNeighbors(currentNeighborhood.id, authToken));
  }

  renderNeighbor = ({ item: neighbor }) => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        style={styles.neighbor}
        onPress={() => navigation.navigate('Chat', {user: neighbor})}
      >
        <Avatar source={{uri: neighbor.avatar}} name={neighbor.name} />
        <Text>
          {neighbor.name} de {neighbor.apartments[0].number}
        </Text>
      </TouchableOpacity>
    )
  }

  render(){
    const { isLoading, neighbors } = this.props;
    let filteredNeighbors = neighbors.filter(
      n => {
        let name = n.name + ' ' + n.apartments.map(a => a.number).join(' ');
        return new RegExp(this.state.search, 'i').test(name);
      }
    );
    return(
      <View style={styles.screen}>
        <View style={styles.searchBar}>
          <Ionicons name="ios-search" size={20} color="#c7c7cd" />
          <TextInput
            placeholder="Buscar"
            value={this.state.search}
            onChangeText={t => this.setState({search: t})}
            underlineColorAndroid="transparent"
            style={styles.searchInput}
          />
        </View>
        {isLoading && (
          <View><ActivityIndicator /></View>
        )}
        <FlatList
          data={filteredNeighbors}
          renderItem={this.renderNeighbor}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  neighbors: state.neighborsReducer.neighbors,
  isLoading: state.neighborsReducer.isRequesting,
  authToken: state.authReducer.authToken,
  currentNeighborhood: state.currentsReducer.neighborhood
});

export default connect(mapStateToProps)(NeighborsScreen);

const styles = StyleSheet.create({
  neighbor: {
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.inputBorder,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.inputBorder,
    alignItems: 'center',
  },
  searchInput: {
    paddingHorizontal: 10,
    flex: 1
  },
  screen: {
    flex: 1,
  }
})