import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from "../screens/LoginScreen";
import SuitcaseScreen from "../screens/SuitcaseScreen";
import SuitcaseByIdScreen from "../screens/SuitcaseByIdScreen";
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen'
import PaymentScreen from '../screens/PaymentScreen';
import AddSuitcaseScreen from '../screens/AddSuitcaseScreen';


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

const AddSuitcaseStack = createStackNavigator(
    {
        Settings: AddSuitcaseScreen,
    },
    config
);


AddSuitcaseStack.navigationOptions = {
    tabBarLabel: 'addSuitcase',
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

AddSuitcaseStack.path = '';


const tabNavigator = createBottomTabNavigator({
    HomeStack,
    LoginStack,
    SuitcaseScreen,
    BookingStack,
    ProfileStack,
    AddSuitcaseScreen,
    Suitcase: {
        screen: SuitcaseByIdScreen,
        path: 'suitcase/'
    },
});


export default tabNavigator;
