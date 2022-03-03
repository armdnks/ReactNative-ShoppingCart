import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import ProductsScreen, {
  productsScreenOptions,
} from '../screens/ProductsScreen';
import CartScreen, { cartScreenOptions } from '../screens/CartScreen';

const MainNavigation = (props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            position: 'absolute',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          },
        }}
      >
        <Tab.Screen
          name="Menu"
          component={ProductsScreen}
          options={productsScreenOptions}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={cartScreenOptions}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
