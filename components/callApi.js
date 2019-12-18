import React from 'react';
import axios from 'axios';
import {Component} from 'react';
import {Text} from 'react-native';
import t from "tcomb-form-native";
import {AsyncStorage} from 'react-native';

import getEnvVars from "../config/env";

const {apiUrl} = getEnvVars();


export class CallApi extends Component {
    state = {
        data: {}
    };

    async getData() {
        axios.get("https://pacaud-lilian.com/serverpfe", {
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
        /*
              const response = await fetch("https://pacaud-lilian.com/serverpfe", {
                  method: 'GET',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
              });
              const json = response.json();
              return json;
      */
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

    static loginUser(props) {
        axios.post(`${apiUrl}/api/login_check`, {
                "email": props.email,
                "password": props.password
            })
            .then(function (response) {
                console.log('ok')
                console.log(response.data.token);
                if(response.data.token){
                    AsyncStorage.setItem('JWT', response.data.token, () => {
                          AsyncStorage.getItem('JWT', (err, result) => {
                              console.log('stored token')
                            console.log(result);
                          });
                      });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
