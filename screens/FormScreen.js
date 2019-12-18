import ChatBot from 'react-native-chatbot';
import React, {Component} from "react";
import {CallApi} from "../components/callApi";
import {View, StyleSheet} from 'react-native';

const steps = [
    {
        id: '0',
        message: 'Welcome to react chatbot!',
        trigger: '1',
    },
    {
        id: '1',
        message: 'Bye!',
        end: true,
    },
];

export default class FormScreen extends Component {
    handleSubmit = () => {
        const values = this._form.getValue();
        CallApi.createUser(values)
    }

    render() {
        return (
            <View style={styles.container}>
                <ChatBot steps={steps}/>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});
FormScreen.navigationOptions = {
    header: null,
};

