import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import React, {useState} from 'react';
import {Platform, StatusBar, StyleSheet, View } from 'react-native';

console.disableYellowBox = true;
import AppNavigator from './navigation/AppNavigator';
import {createStackNavigator} from "react-navigation";
import ProfileScreen from "./screens/ProfileScreen";
import TabBarIcon from "./components/TabBarIcon";
import { Colors } from './assets/styles';




export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    } else {
        return (
            <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                    <AppNavigator/>
            </View>
        );
    }
}

async function loadResourcesAsync() {
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
    image: {
        width: '100%',
        height: '100%',
        flex: 1 
      },
});
