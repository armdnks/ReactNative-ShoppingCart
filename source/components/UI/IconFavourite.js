import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../constants/themes';

const IconFavourite = (props) => {
  return (
    <View style={[styles.iconContainer, props.style]}>
      <FontAwesome style={styles.icon} name="heart" />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 15,
  },
  icon: {
    color: '#FFF',
    fontSize: 10,
  },
});

export default IconFavourite;
