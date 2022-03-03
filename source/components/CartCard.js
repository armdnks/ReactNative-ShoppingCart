import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useCartContext } from '../shop/CartProvider';
import { COLORS, PLATFORM, SIZES } from '../constants/themes';
import Row from './UI/Row';
import Button from './UI/Button';

const CartCard = (props) => {
  const { item } = props;

  // MARK: FUNCTION CONTEXT
  const { addItemToCart, removeItemFromCart, cancelProduct } = useCartContext();
  function increment() {
    addItemToCart({
      ...item,
      quantity: 1,
    });
  }
  function decrement() {
    removeItemFromCart({
      id: item.id,
    });
  }
  function cancelItem() {
    cancelProduct({ id: item.id });
  }

  return (
    <View style={styles.container}>
      <Row style={styles.contentContainer}>
        <View style={styles.COL_IMAGE}>
          <Image style={styles.image} source={item.image} />
        </View>
        <View style={styles.COL_CONTENT}>
          <Row style={styles.ROW_TITLE_REMOVE}>
            <View style={styles.COL_TITLE}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>IDR {item.price}.K</Text>
            </View>
            <View style={styles.COL_REMOVE}>
              <Button
                style={styles.remove}
                title="cancel"
                onPress={cancelItem}
              />
            </View>
          </Row>
          <Row style={styles.ROW_BUTTON_TOTAL}>
            <Row style={styles.COL_BUTTON}>
              <Button style={styles.button} title="-" onPress={decrement} />
              <View style={styles.quantityContainer}>
                <Text style={styles.quantity}>{item.quantity}</Text>
              </View>
              <Button style={styles.button} title="+" onPress={increment} />
            </Row>
            <View style={styles.borderVertical} />
            <View style={styles.COL_TOTAL}>
              <Text style={styles.currency}>IDR</Text>
              <Text style={styles.totalItemPrice}>
                {item.price * item.quantity}.K
              </Text>
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
    // backgroundColor: 'red',
    width: SIZES.WIDTH - 40,
    height: 125,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },

  // NOTE: COLUMN IMAGE
  COL_IMAGE: {
    width: '30%',
    height: 140,
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

  // NOTE: ROW TITLE AND REMOVE
  ROW_TITLE_REMOVE: {
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
  price: {
    fontFamily: 'POPPINS_600',
    fontSize: 15,
    marginRight: 4,
    marginBottom: 5,
  },

  // MARK: COLUMN REMOVE
  COL_REMOVE: {
    backgroundColor: COLORS.orange,
    // width: '35%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: STYLES.borderRadius,
    paddingHorizontal: 3,
  },
  remove: {
    // backgroundColor: 'green',
    fontSize: 12,
    color: '#FFF',
    padding: 5,
  },

  // NOTE: ROW BUTTON AND TOTAL
  ROW_BUTTON_TOTAL: {
    // backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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

  borderVertical: {
    width: '7%',
    borderRightWidth: 1,
    borderColor: '#CCC',
    height: '80%',
  },

  // MARK: COLUMN PRICE
  COL_TOTAL: {
    // backgroundColor: 'purple',
    width: '38%',
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  currency: {
    fontFamily: 'POPPINS_400',
    fontSize: 13,
    color: COLORS.gray,
  },
  totalItemPrice: {
    fontFamily: 'POPPINS_600',
    fontSize: 23,
  },

  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#CCC',
    marginBottom: 15,
  },
});

export default CartCard;
