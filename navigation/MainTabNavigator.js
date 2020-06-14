import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from "../screens/LoginScreen";
import WebPageScreen from '../screens/WebPageScreen';
import SuitcaseScreen from "../screens/SuitcaseScreen";
import SuitcaseByIdScreen from "../screens/SuitcaseByIdScreen";
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen'
import SuitcaseScreen from "../screens/SuitcaseScreen";
import PaymentScreen from '../screens/PaymentScreen';


const config = Platform.select({
    web: { headerMode: 'screen'},
    default: {},
});

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
    },
    config
);

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

HomeStack.path = '';

const LoginStack = createStackNavigator(
    {
        Login: LoginScreen,
    },
    config
);

LoginStack.navigationOptions = {
    tabBarLabel: 'Login',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
    ),
};

LoginStack.path = '/login';

const BookingStack = createStackNavigator(
    {
        Booking: BookingScreen,
    },
    config
);

BookingStack.navigationOptions = {
    tabBarLabel: 'Réservation',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
    ),
};

BookingStack.path = '';

const ProfileStack = createStackNavigator(
    {
        Settings: ProfileScreen,
    },
    config
);

ProfileStack.navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
    ),
};

ProfileStack.path = '';

const SuitcaseStack = createStackNavigator(
    {
        Settings: SuitcaseScreen,
    },
    config
);


SuitcaseStack.navigationOptions = {
    tabBarLabel: 'suitcase',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

SuitcaseStack.path = '';

const WebPageStack = createStackNavigator(
    {
        Settings: PaymentScreen,
    },
    config
);


WebPageStack.navigationOptions = {
    tabBarLabel: 'Paiement',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
    ),
};

WebPageStack.path = '';

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    LoginStack,
    SuitcaseScreen,
    BookingStack,
    ProfileStack,
    Suitcase: {
        screen: SuitcaseByIdScreen,
        path: 'suitcase/'
      },
    WebPageStack
});


export default tabNavigator;
