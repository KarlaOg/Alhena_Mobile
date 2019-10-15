import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';

import t from 'tcomb-form-native';

import {options} from '../registration/RegisterFormOptions';
import {CallApi} from '../components/callApi';


const User = t.struct({
    email: t.String,
    username: t.String,
    password: t.String,
    terms: t.Boolean
});
const Form = t.form.Form;

export default class App extends Component {
    handleSubmit = () => {
        const value = this._form.getValue();
        console.log('value: ', value);
    }

    render() {
        return (
            <View style={styles.container}>
                <CallApi/>
                <Form ref={c => this._form = c}
                      type={User} options={options}/>
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

