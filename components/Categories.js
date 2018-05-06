import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import WebarrioIcon from './WebarrioIcon';
import Colors from '../constants/Colors';
import CATEGORIES from '../constants/Categories';

const ICON_SIZE = 35;
const ICON_COLOR = Colors.orange;

export default class Categories extends React.Component{
  render(){
    const { callback } = this.props;
    return (
      <View>
        {CATEGORIES.map(category =>
          (<TouchableOpacity
            style={styles.option}
            key={category.name}
            onPress={() => callback(category)}>
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
              style={category.admin && styles.adminText}
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
  },
  adminText: {
    color: Colors.orange
  }
});
