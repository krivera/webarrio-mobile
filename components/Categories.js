import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import WebarrioIcon from './WebarrioIcon';
import Colors from '../constants/Colors';

const ICON_SIZE = 40;
const ICON_COLOR = Colors.orange;
const CATEGORIES = [
  {
    name: 'Eventos',
    icon: 'event',
    filter: 'event'
  },
  {
    name: 'Mascotas',
    icon: 'pet',
    filter: 'pet'
  },
  {
    name: 'Recomendaciones',
    icon: 'recommendation',
    filter: 'recommendation'
  },
  {
    name: 'Compartir Auto',
    icon: 'car',
    filter: 'car_pooling'
  },
  {
    name: 'Anuncios',
    icon: 'announcement',
    filter: 'announcement'
  },
  {
    name: 'Compra / Vende',
    icon: 'listing',
    filter: 'listing'
  },
  {
    name: 'Todos',
    icon: 'bucle',
    filter: 'all'
  },
];

export default class Categories extends React.Component{
  render(){
    const { callback } = this.props;
    return (
      <View>
        {CATEGORIES.map(category =>
          (<TouchableOpacity
            style={styles.option}
            key={category.name}
            onPress={() => callback(category.filter)}>
            <View style={styles.icon}>
              <WebarrioIcon
                size={ICON_SIZE}
                color={ICON_COLOR}
                name={category.icon}
              />
            </View>
            <Text
              numberOfLines={1}
              lineBreakMode='clip'
            >
              {category.name}
            </Text>
          </TouchableOpacity>))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  icon: {
    paddingHorizontal: 5
  }
});
