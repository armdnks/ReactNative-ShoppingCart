import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SIZES } from '../constants/themes';

const EmptyCartScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No Meals Added</Text>
      <Text style={styles.subtitle}>
        Hit the{' '}
        <Text style={[styles.subtitle, styles.subtitleBold]}>
          'add to cart'
        </Text>{' '}
        button{'\n'}for save into cart
      </Text>
      <Image
        style={styles.emptyCartImage}
        source={require('../assets/empty-cart.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'POPPINS_500',
    fontSize: 20,
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: 'POPPINS_400',
    fontSize: 15,
    textAlign: 'center',
  },
  subtitleBold: {
    fontFamily: 'POPPINS_600',
    fontSize: 15,
  },
  emptyCartImage: {
    width: SIZES.WIDTH,
    height: SIZES.WIDTH,
    resizeMode: 'contain',
  },
});

export default EmptyCartScreen;
