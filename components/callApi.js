import React from 'react';
import axios from 'axios';
import {Component} from 'react';
import {ServerUrl} from '../constants/ServUrl';
import {Text} from 'react-native';
import t from "tcomb-form-native";

export class CallApi extends Component {
    state = {
        data: {}
    }

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
                console.log(data.test);
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
        axios.post("https://pacaud-lilian.com/serverpfe", {
                email: props.email,
                username: props.username,
                password: props.password,
                terms: props.terms,
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
