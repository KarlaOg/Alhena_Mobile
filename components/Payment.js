import React from "react";
import {WebView} from 'react-native-webview';
import axios from 'axios';
import getEnvVars from "../config/env";
import {AsyncStorage} from "react-native";

const {apiUrl} = getEnvVars();

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            count: 0,
        };
        this.createOrder = this.createOrder.bind(this)
        this.createOrder()
    }

    createOrder() {
        const data = {
            "suitcase_id": 1,
            "booking_id": 6,
        }
        var self = this;
        AsyncStorage.getItem('JWT', (err, jwt) => {
            axios({
                method: 'POST',
                url: `${apiUrl}/api/createOrder`,
                data,
                headers: {
                    'Authorization': `Bearer ${JSON.parse(jwt)}`,
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                self.setState({url: response.data.paymentUrl});
            })
        })
    }

    render() {
        const screen = this.props.screen;
        return (
            <WebView
                source={{uri: this.state.url}}
                onNavigationStateChange={(navEvent) => {
                    this.setState({count: this.state.count + 1})
                    if (this.state.count === 6) {
                        screen.props.navigation.navigate('SuitCaseHome', {
                            payment: true,
                        })
                    }
                }}
            />
        );
    }
}

export default Payment
