import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import React, {useState} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import { Linking } from 'expo';

console.disableYellowBox = true;
import AppNavigator from './navigation/AppNavigator';
import {Colors} from './assets/styles';
import axios from 'axios';

const prefix = Linking.makeUrl("") + "/--/";

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                startAsync={loadAxiosCall}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );    
    } 
    else {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                <AppNavigator uriPrefix={prefix}/>
            </View>
        );
    }
}

async function loadAxiosCall() {
    axios.interceptors.response.use(response => response, (error) => {
        if (error.response) {
            console.log('RESPONSE ================')
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            console.log('REQUEST ================')
            // console.log(error.request);
        } else {
            console.log('MESSAGE ================')
            // console.log('Error', error.message);
        }
        // console.log(error.config);
    });
     // HANDLE REDIRECT TO LOGIN IF SESSION TOKEN EXPIRED
}

async function loadResourcesAsync() {
    await Promise.all([
        Asset.loadAsync([
            require('./assets/images/robot-dev.png'),
            require('./assets/images/robot-prod.png'),
        ]),
        Font.loadAsync({
            'title-font': require('./assets/fonts/ORATOR10.ttf'),
            'text-font': require('./assets/fonts/Montserrat-Medium.otf'),
        }),
    ]);
}

function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.default.primary,
    },
});
