import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Toast from 'react-native-root-toast'
import WebarrioIcon from '../components/WebarrioIcon'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Categories from '../constants/Categories'
import Colors from '../constants/Colors'

const size = (Dimensions.get('window').width - 30) / 3

export default class CategoriesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Nueva Publicación',
    headerLeft: (<BackButton />)
  })

  constructor(props) {
    super(props)

    this.state = {
      category: ''
    }
  }

  next = () => {
    const { category } = this.state
    if (category) {
      this.props.navigation.navigate(
        'NewPublication',
        {
          category,
          pubList: this.props.navigation.state.params.pubList
        }
      )
    } else {
      Toast.show(
        'Seleccione una categoría para continuar',
        {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER
        }
      )
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Elige una Categoría</Text>
        <View style={styles.categorySelector}>
          {Categories.filter(category =>
            category.key !== 'all' && !category.admin
          ).map(category => (
            <TouchableOpacity
              onPress={() => this.setState({ category: category.key })}
              style={styles.category}
              key={category.key}
            >
              <View style={[
                styles.categoryIcon,
                this.state.category === category.key && styles.selected]}
              >
                <WebarrioIcon
                  name={category.icon}
                  size={size * 0.65}
                  color={this.state.category === category.key ? 'white' : Colors.orange}
                />
              </View>
              <Text style={styles.categoryText}>
                {category.name}
              </Text>
            </TouchableOpacity>

          ))}
        </View>
        <Button onPress={this.next}>Siguiente</Button>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center'
  },
  title: {
    fontSize: 25,
    color: Colors.orange,
    margin: 20
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  category: {
    alignItems: 'center',
    width: size,
    minWidth: 80,
    maxWidth: 120
  },
  categoryIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: size * 0.8 / 2,
    height: size * 0.8,
    width: size * 0.8,
    margin: 10
  },
  categoryText: {
    fontSize: 12
  },
  selected: {
    backgroundColor: Colors.orange
  }
})
