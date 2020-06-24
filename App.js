import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, View,} from 'react-native';
import {Linking} from 'expo';

console.disableYellowBox = true;
import AppNavigator from './navigation/AppNavigator';
import {Colors} from './assets/styles';
import axios from 'axios';

const prefix = Linking.makeUrl("") + "/--/";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true};
    }

    render() {
        if (this.state.loading) {
            return (
                <AppLoading/>
            );
        } else {
            return (
                <View style={styles.container}>
                    <AppNavigator uriPrefix={prefix}/>
                </View>
            );
        }
    }

    async loadAxiosCall() {
        axios.interceptors.response.use(response => response, (error) => {
            if (error.response) {
                console.log('RESPONSE ================');
                console.log(error.response.data);
                if(error.response.data.message === 'Invalid JWT Token'){
                    console.log('jwt expiré')
                }
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                console.log('REQUEST ================')
                console.log(error.request)
            } else {
                console.log('MESSAGE ================')
                // console.log('Error', error.message);
            }
            // console.log(error.config);
        });
        // HANDLE REDIRECT TO LOGIN IF SESSION TOKEN EXPIRED
    }

    componentDidMount = async () => {
        await this.loadAxiosCall()
        await Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/background/background.png'),
                require('./assets/images/arrows/fleche.png'),
                require('./assets/images/robot/robot2x.png'),
            ]),
            Font.loadAsync({
                'title-font': require('./assets/fonts/ORATOR10.ttf'),
                'text-font': require('./assets/fonts/Montserrat-Medium.otf'),
            }),
        ]);
        this.setState({loading: false})
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.default.primary,
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1
    },
});
