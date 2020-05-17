import React, {Component} from 'react';
import {View, StyleSheet, Button, AsyncStorage} from 'react-native';

import {options} from '../registration/RegisterFormOptions';
import {CallApi} from '../components/callApi';
import t from "tcomb-form-native";
import LoginUser from "../constants/User"
import {FacebookButton} from "../components/FacebookButton"
import {Colors, Spacing} from "../assets/styles";

const Form = t.form.Form

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
      }
    handleSubmit = () => {
        const values = this._form.getValue();
        AsyncStorage.setItem('user', values.email)
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
           console.log(err)
        })

        CallApi.loginUser(values)
    };
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
        flex: 1,
        ...Spacing.default.containerSpacing,
        justifyContent: 'center',
        backgroundColor:Colors.default.primary
    },
});

