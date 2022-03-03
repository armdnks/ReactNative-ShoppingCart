import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      <View style={[styles.container, props.style]}>
        <Text style={[styles.title, props.style]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'POPPINS_400',
    fontSize: 23,
  },
});

export default Button;
