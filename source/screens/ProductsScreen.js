import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { PLATFORM, SIZES } from '../constants/themes';
import { DUMMY_DATA } from '../data/DUMMY-DATA';
import ProductCard from '../components/ProductCard';

const ProductsScreen = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.paddingSafeArea} />
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/header-image.jpg')}
          />
        </View>
        <Text style={styles.title}>Available Menu</Text>
        <View style={styles.borderBottom} />
        <View style={styles.productContainer}>
          {DUMMY_DATA.map((item, index) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </View>
        <View style={styles.paddingSafeArea} />
      </ScrollView>
    </View>
  );
};

// MARK: SCREEN OPTIONS
export function productsScreenOptions() {
  function TabBarIcon({ color }) {
    return <FontAwesome name="list" size={23} color={color} />;
  }

  return {
    tabBarIcon: TabBarIcon,
  };
}

// MARK: STYLE
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    alignItems: 'center',
  },
  paddingSafeArea: {
    height: PLATFORM.isSmallDevice ? 50 : 70,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SIZES.WIDTH - 40,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  title: {
    fontFamily: 'POPPINS_400',
    fontSize: 20,
    marginTop: 20,
    marginVertical: 10,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#CCC',
  },
  productContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default ProductsScreen;
