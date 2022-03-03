import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Rating = (props) => {
  const { rating } = props;

  function ratingCount() {
    let stars = [];
    for (let index = 0; index < rating; index++) {
      stars.push(
        <FontAwesome
          key={[index]}
          style={[styles.rating, props.style]}
          name="star"
        />
      );
    }
    return stars;
  }

  return <View style={styles.ratingContainer}>{ratingCount()}</View>;
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#000',
    fontSize: 15,
    marginRight: 2,
  },
});

export default Rating;
