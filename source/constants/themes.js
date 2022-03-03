import { Dimensions, Platform } from 'react-native';

export const COLORS = {
  orange: '#FF3B30',
  yellow: '#FFCC00',
  gray: '#888',
  darkGray: '#222',
};

export const SIZES = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
};

export const PLATFORM = {
  isAndroid: Platform.OS === 'android',
  isSmallDevice: SIZES.HEIGHT < 720,
};
