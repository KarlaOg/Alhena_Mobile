import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {options} from '../registration/RegisterFormOptions';
import {CallApi} from '../components/callApi';
import t from "tcomb-form-native";
import {RegisterUser} from "../constants/User"
import AsyncStorage from 'react-native'

const Form = t.form.Form;

export default class HomeScreen extends Component {

    constructor(props){
        super(props)
        this.getToken = this.getToken.bind(this);
    }

    handleSubmit = () => {
        const values = this._form.getValue();
        CallApi.createUser(values)
    }
    async getToken() {
        try {  
            const jwt = await AsyncStorage.getItem('JWT');
            if (jwt !== undefined && jwt !== null) {
                return JSON.parse(jwt);
                console.log(jwt)
            }
            return [];
        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.getToken().then(r => {console.log(r)})
    }

    render() {
        this.getToken().then(r => {console.log(r)})
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

