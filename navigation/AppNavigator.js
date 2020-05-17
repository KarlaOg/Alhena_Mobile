import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SuitcaseByIdScreen from '../screens/SuitcaseByIdScreen';
import HomeScreen from '../screens/HomeScreen';
import SuitcaseNavigator from './SuitcaseNavigator';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Suitcase: {
      screen: SuitcaseByIdScreen,
      path: 'suitcase/'
    }
  }),

);
