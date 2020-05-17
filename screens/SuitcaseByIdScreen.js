import React, {Component} from 'react';
import { Text, Button,StyleSheet, View } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import Suitcase from '../components/Suitcase'
import { Linking } from 'expo';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class SuitcaseByIdScreen extends Component {
    render() {
        console.log(this.props.navigation.state.params);
        console.log(Linking.getInitialURL());
        console.log(Linking.parse(Linking.getInitialURL()))
        return (
            <View>
                <Text style={styles.textSuitcase}>suitcase {this.props.navigation.state.params.id}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        marginTop: 150
    },
    textSuitcase: {
        marginTop: 50
    }
});
SuitcaseByIdScreen.navigationOptions = {
    header: null,
};