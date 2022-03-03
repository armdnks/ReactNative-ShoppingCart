import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useCartContext } from '../shop/CartProvider';
import { PLATFORM, SIZES } from '../constants/themes';
import CartCard from '../components/CartCard';
import EmptyCartScreen from './EmptyCartScreen';
import Row from '../components/UI/Row';
import Button from '../components/UI/Button';

const CartScreen = (props) => {
  const { items, totalPrice, orderItems } = useCartContext();
  const totalQuantity = items.reduce((a, c) => a + c.quantity, 0);

  const isEmptyCart = totalQuantity === 0;
  function orderHandler() {
    Alert.alert(`Your total is IDR ${totalPrice}.K\nThank you for your order`);
    orderItems({ items: items });
  }

  return (
    <View style={styles.container}>
      {isEmptyCart ? (
        <EmptyCartScreen />
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.paddingSafeArea} />
          <Text style={styles.headerTitle}>Your Order</Text>
          <View style={styles.borderBottom} />
          {items.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}
          <View style={styles.paddingSafeAreaBottom} />
        </ScrollView>
      )}
      <Row style={styles.grandTotalContainer}>
        <View style={styles.summaryContainer}>
          <Text style={styles.title}>Qty</Text>
          <Text style={styles.summary}>{totalQuantity}</Text>
        </View>
        <View style={styles.borderVertical} />
        <View style={styles.summaryContainer}>
          <Text style={styles.title}>Total</Text>
          <Text style={styles.summary}>{totalPrice}.K</Text>
        </View>
        <View style={styles.orderContainer}>
          {isEmptyCart ? null : (
            <View style={styles.orderButton}>
              <Button
                style={styles.order}
                title="Order"
                onPress={orderHandler}
              />
            </View>
          )}
        </View>
      </Row>
    </View>
  );
};

// MARK: SCREEN OPTIONS
export function cartScreenOptions() {
  const { items } = useCartContext();
  const itemCount = items.reduce(
    (currentQuantity, item) => currentQuantity + item.quantity,
    0
  );

  const [badgeScale, setBadgeScale] = useState(false);
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBadgeScale(true);
    const timeout = setTimeout(() => {
      setBadgeScale(false);
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [items]);

  function TabBarIcon({ color }) {
    return <FontAwesome name="shopping-cart" size={23} color={color} />;
  }

  return {
    tabBarBadge: items.length > 0 ? itemCount : null,
    tabBarBadgeStyle: {
      backgroundColor: 'red',
      color: '#FFF',
      transform: [{ scale: badgeScale ? 1.2 : 1 }],
    },
    tabBarIcon: TabBarIcon,
  };
}

// MARK: STYLE
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  paddingSafeArea: {
    height: PLATFORM.isSmallDevice ? 25 : 50,
  },
  paddingSafeAreaBottom: {
    height: PLATFORM.isSmallDevice ? 150 : 180,
  },

  headerTitle: {
    fontFamily: 'POPPINS_400',
    fontSize: 20,
    marginTop: 20,
    marginVertical: 10,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#CCC',
    marginBottom: 15,
    width: SIZES.WIDTH - 40,
  },

  grandTotalContainer: {
    backgroundColor: '#333',
    width: SIZES.WIDTH,
    height: PLATFORM.isAndroid ? '18%' : '19%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: PLATFORM.isAndroid ? SIZES.HEIGHT / 15 : SIZES.HEIGHT / 12,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: 'absolute',
    bottom: 0,
  },

  summaryContainer: {
    // backgroundColor: 'red',
    width: '30%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  title: {
    fontFamily: 'POPPINS_400',
    fontSize: 15,
    color: '#FFF',
  },

  summary: {
    fontFamily: 'POPPINS_600',
    fontSize: 30,
    color: '#FFF',
  },

  borderVertical: {
    borderRightWidth: 1,
    borderColor: '#999',
    height: '60%',
    position: 'absolute',
    left: SIZES.WIDTH / 3.5,
    top: 20,
  },

  orderContainer: {
    width: '30%',
    height: 50,
  },
  orderButton: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  order: {
    // backgroundColor: 'red',
    fontFamily: 'POPPINS_400',
    fontSize: 20,
    width: 100,
    textAlign: 'center',
    color: '#333',
  },
});

export default CartScreen;
