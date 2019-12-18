import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';

import {options} from '../registration/RegisterFormOptions';
import {CallApi} from '../components/callApi';
import t from "tcomb-form-native";
import LoginUser from "../constants/User"

const Form = t.form.Form;

export default class LoginScreen extends Component {
    handleSubmit = () => {
        const values = this._form.getValue();
        CallApi.loginUser(values)
    };

    render() {
        return (
            <View style={styles.container}>
                <CallApi/>
                <Form ref={c => this._form = c}
                      type={LoginUser}/>
                <Button
                    title="Sign Up!"
                    onPress={this.handleSubmit}
                />
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

