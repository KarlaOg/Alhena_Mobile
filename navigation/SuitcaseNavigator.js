import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SuitcaseByIdScreen from '../screens/SuitcaseByIdScreen';
import {createStackNavigator } from 'react-navigation';

export default createStackNavigator(
    {
        suitcase: {
          screen: SuitcaseByIdScreen,
          path: "suitcase"
        }
    }

)