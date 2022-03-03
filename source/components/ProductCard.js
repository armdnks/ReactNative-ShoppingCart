import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useCartContext } from '../shop/CartProvider';
import { COLORS, PLATFORM, SIZES } from '../constants/themes';
import Row from './UI/Row';
import Button from './UI/Button';
import Rating from './UI/Rating';
import IconFavourite from './UI/IconFavourite';

const ProductCard = (props) => {
  const { item } = props;

  // MARK: FUNCTION CONTEXT
  const { addItemToCart } = useCartContext();
  const [itemQuantity, setItemQuantity] = useState(1);
  function increment() {
    return setItemQuantity(itemQuantity + 1);
  }
  function decrement() {
    return setItemQuantity(itemQuantity - 1);
  }
  function addToCart() {
    addItemToCart({
      ...item,
      quantity: itemQuantity,
    });
    setItemQuantity(1);
  }

  return (
    <View style={styles.container}>
      <Row style={[styles.contentContainer, props.bgColor]}>
        <View style={styles.COL_IMAGE}>
          {item.isFavourite && <IconFavourite style={styles.iconFavourite} />}
          <Image style={styles.image} source={item.image} />
        </View>
        <View style={styles.COL_CONTENT}>
          <Row style={styles.ROW_TITLE_PRICE}>
            <View style={styles.COL_TITLE}>
              <Text style={styles.title}>{item.name}</Text>
              <Rating style={styles.rating} rating={item.rating} />
            </View>
            <View style={styles.borderVertical} />
            <View style={styles.COL_PRICE}>
              <Text style={styles.currency}>IDR</Text>
              <Text style={styles.price}>{item.price}.K</Text>
            </View>
          </Row>
          <Row style={styles.ROW_BUTTON_CART}>
            <Row style={styles.COL_BUTTON}>
              <Button
                style={styles.button}
                title="-"
                onPress={decrement}
                disabled={itemQuantity === 1}
              />
              <View style={styles.quantityContainer}>
                <Text style={styles.quantity}>{itemQuantity}</Text>
              </View>
              <Button style={styles.button} title="+" onPress={increment} />
            </Row>
            <View style={styles.COL_CART}>
              <Button
                style={styles.addToCart}
                title="add to cart"
                onPress={addToCart}
              />
            </View>
          </Row>
        </View>
      </Row>
      <View style={styles.borderBottom} />
    </View>
  );
};

const STYLES = {
  borderRadius: 20,
  paddingLeft: 15,
};

// MARK: STYLE
const styles = StyleSheet.create({
  contentContainer: {
    // backgroundColor: '#FFF',
    width: SIZES.WIDTH - 40,
    height: 125,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 35,
  },

  // NOTE: COLUMN IMAGE
  COL_IMAGE: {
    width: '30%',
    height: 140,
  },
  iconFavourite: {
    position: 'absolute',
    top: 10,
    right: 7,
    zIndex: 9,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  // NOTE: COLUMN CONTENT
  COL_CONTENT: {
    width: '70%',
    flexDirection: 'column',
  },

  // NOTE: ROW TITLE AND PRICE
  ROW_TITLE_PRICE: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingLeft: STYLES.paddingLeft,
  },

  // MARK: COLUMN TITLE
  COL_TITLE: {
    // backgroundColor: 'lightblue',
    width: '60%',
    paddingRight: STYLES.paddingLeft,
  },
  title: {
    fontFamily: 'POPPINS_400',
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    marginRight: 4,
    color: COLORS.yellow,
  },

  borderVertical: {
    borderRightWidth: 1,
    borderColor: '#CCC',
    height: '70%',
  },

  // MARK: COLUMN PRICE
  COL_PRICE: {
    // backgroundColor: 'purple',
    width: '40%',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  currency: {
    fontFamily: 'POPPINS_400',
    fontSize: 13,
    color: COLORS.gray,
  },
  price: {
    fontFamily: 'POPPINS_600',
    fontSize: 23,
  },

  // NOTE: ROW BUTTON AND CART
  ROW_BUTTON_CART: {
    // backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: STYLES.paddingLeft,
  },

  // MARK: COLUMN BUTTON
  COL_BUTTON: {
    // backgroundColor: 'purple',
    width: '50%',
    height: 40,
    borderRadius: STYLES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  button: {
    // backgroundColor: 'green',
    paddingHorizontal: 5,
    marginTop: PLATFORM.isAndroid ? 1 : null,
  },
  quantityContainer: {
    // backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: 40,
  },
  quantity: {
    fontFamily: 'POPPINS_600',
    fontSize: 20,
    textAlign: 'center',
    marginTop: PLATFORM.isAndroid ? 2 : null,
  },

  // MARK: COLUMN CART
  COL_CART: {
    backgroundColor: COLORS.darkGray,
    // width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: STYLES.borderRadius,
    paddingHorizontal: 3,
  },
  addToCart: {
    // backgroundColor: 'green',
    fontSize: 12,
    color: '#FFF',
    padding: 5,
  },

  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#CCC',
    marginBottom: 20,
  },
});

export default ProductCard;
