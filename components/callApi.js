import React from 'react';
import axios from 'axios';
import {Component} from 'react';
import {Text} from 'react-native';
import t from "tcomb-form-native";
import LocalStorage from '../components/LocalStorage'
import {AsyncStorage} from 'react-native';

import getEnvVars from "../config/env";

const {apiUrl} = getEnvVars();


export class CallApi extends Component {
    state = {
        data: {},
        suitcaseId: 0
    };

    async getData() {
        axios.get("http://192.168.1.46:8001", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(function (response) {
                console.log(response.data);
                return response.data;
            });
    }

    componentDidMount() {
        this.getData()
            .then((data) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(data),
                })
            });
    }

    render() {
        return (
            <Text>{this.data}</Text>
        )
    }

    static createUser(props) {
        axios.post(`${apiUrl}/register`, {
                "email": props.email,
                "password": props.password,
                "agreeTerms": props.terms
            }
        ).then(function (response) {
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    static checkForUser(email) {
        axios.post(`${apiUrl}/checkRegister`, {
                "email": email,
            }
        ).then(function (response) {
            return response;
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    static loginUser(props) {
        console.log(props, `${apiUrl}/api/login_check`)
        axios.post(`${apiUrl}/api/login_check`, {
            "email": props.email,
            "password": props.password
        })
            .then(function (response) {
                console.log(response.data.token);
                if (response.data.token) {
                    LocalStorage.storeToken(response.data.token).then(r => {
                        return 200
                    })
                    AsyncStorage.setItem('user', props.email)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
