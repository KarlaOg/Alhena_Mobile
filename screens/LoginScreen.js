import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';

import {CallApi} from '../components/callApi';
import t from "tcomb-form-native";
import LoginUser from "../constants/User"
import {FacebookButton} from "../components/FacebookButton"

const Form = t.form.Form

export default class LoginScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Form ref={c => this._form = c}
                      type={LoginUser}/>
                <Button
                    title="Sign Up!"
                    onPress={this.handleSubmit}
                />
                <FacebookButton/>
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

