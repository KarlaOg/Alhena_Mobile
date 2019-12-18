import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from "../screens/LoginScreen";
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen'
import FormScreen from '../screens/FormScreen'
import SuitcaseScreen from "../screens/SuitcaseScreen";

const config = Platform.select({
    web: {headerMode: 'screen'},
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
        Settings: LoginScreen,
    },
    config
);

LoginStack.navigationOptions = {
    tabBarLabel: 'Login',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
    ),
};

LoginStack.path = '';

const BookingStack = createStackNavigator(
    {
        Settings: BookingScreen,
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
const FormStack = createStackNavigator(
    {
        Settings: FormScreen,
    },
    config
);

FormStack.navigationOptions = {
    tabBarLabel: 'Form',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
    ),
};

FormStack.path = '';

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

const tabNavigator = createBottomTabNavigator({
        HomeStack,
        LoginStack,
        BookingStack,
        ProfileStack,
        FormStack,
        SuitcaseStack
    })
;

tabNavigator.path = '';

export default tabNavigator;
