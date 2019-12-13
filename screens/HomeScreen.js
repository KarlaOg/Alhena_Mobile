import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {options} from '../registration/RegisterFormOptions';
import {CallApi} from '../components/callApi';
import t from "tcomb-form-native";
import {RegisterUser} from "../constants/User"

const Form = t.form.Form;

export default class HomeScreen extends Component {
    handleSubmit = () => {
        const values = this._form.getValue();
        CallApi.createUser(values)
    }

    render() {
        return (
            <View style={styles.container}>
                <CallApi/>
                <Form ref={c => this._form = c}
                      type={RegisterUser} options={options}/>
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
HomeScreen.navigationOptions = {
    header: null,
};
