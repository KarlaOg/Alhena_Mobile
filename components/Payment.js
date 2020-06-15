import React from "react";
import {WebView} from 'react-native-webview';
import axios from 'axios';
import getEnvVars from "../config/env";

const {apiUrl} = getEnvVars();

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
        };
        this.createOrder = this.createOrder.bind(this)
        this.createOrder()
    }

    createOrder() {
        const data = {
            "suitcase_id":1,
            "amount":150000,
            "currency":"EUR",
            "returnUrl": "https://www.merchant-website.com/confirm-order?id=C1S1X-I98CX23SS3-1MXS",
            "clientToken": "tok_kj7gsHGjsdhg6SHGhgshd54",
            "reason":"A trip to New York",
            "language":"FR",
            "skipTutorial" : true,
            "leader" : {
                "name" : "Monica Geller",
                "amount" : 60000,
                "email" : "monica.geller@gmail.com"
            },
            "participants" : [
                {
                    "name" : "Chandler Bing",
                    "amount" : 30000
                },
                {
                    "name" : "Rachel Green",
                    "amount" : 30000
                },
                {
                    "name" : "Joey Tribbiani",
                    "amount" : 30000
                }
            ]
        }
        var self = this;
        console.log( `${apiUrl}/api/createOrder`)
        axios({
            method: 'POST',
            url: `${apiUrl}/api/createOrder`,
            data,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1OTIwNjM0NDIsImV4cCI6MTU5MjE0OTg0Miwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImVtYWlsIjoibmljb0BsaXZlLmZyIn0.Ds4-7eupxVal8avH3J2Zk8wvuX9nURFSZidCBe46K-SOMYF1uBx8ss8NYsWqyreTFJRz_gLAXTPnahIgzp55d8pmKUnZjGHmvnsOc-7aHuFrjMZ6l_wpYvJMsK3W0ikEes9JwhK2yjmusTJRp0XiDcyMWf63rdGSRh0-T7vu1L24fMqJmk7L4NmuXALnvz4ui5w8KiotkcxzKdWtnzl31cQQ4589Cey95G6glDAXgAWXMW8gPicW0Q_-CoVQu2s-U7VXMM_J1PMBUl3gEbz_lRXKOYmq-U5F8OxkvwfyjcL9WmDHlZS4aHtmQ-poTbq7EMYLzXTS-tEAsG4ZQDyj9LE2DWU3kIDQd0ttukr0Grk9B3iPopSc9VZTvCMJJE_7-4qFpy63XfzTtZI-q5er-endVP5m-DacPxOwsjOscQ_UGuoPcJhZQQScRX0H0mVLuMP-ZQsvH7iPT3PNFIrAnSEEWjVkPTNUDkHqltbVaGN_O2q8WA7bD_CULlTE9e5D23YhVgbFl8o0mHf8iPf6aKRzREltMn3IR3T9WSiOJpRG7eaEeI6faBfmOrNq-9JiI4Vvt5rJgxcNdIcbVHpXZ72EubOyk7uOlukajJZ0ECxz1hRfePe3T3AytnvAgBMdYAUUeQoywvr2KOI0J4j8eQHhwY5MeqGn24GUgJyrM0w',
            }
        }).then(function (response) {
            self.setState({url: response.data.paymentUrl});
        })
    }

    render() {
        return (
            <WebView
                source={{uri: this.state.url}}
            />
        );
    }
}

export default Payment
