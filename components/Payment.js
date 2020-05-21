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

        axios({
            method: 'POST',
            url: `${apiUrl}/api/createOrder`,
            data,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1ODkyODMyNTYsImV4cCI6MTU4OTI4Njg1Niwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImVtYWlsIjoibmljb2xhc190cmFuQGxpdmUuZnIifQ.fP_QoQVwyV3L3zy0yvYV_qNviKSxFAjEWfSmmg_8kRSYKyKyBfEcE0zpaPfLoFWl8PutAeiy0zBaOAJ8VR1-GB3vW-2laRrzhFQQFILv2KSNDwCNes6d11P2nRMohBU7M-rpCqNAAmIiJgu0y7MbAQ4ALh4gC3Zg4Dxhmqq9VGEisUzUpHzkGnG6u0fAAXeRGSpY1KhbyO1SYgyu_zN1Qv2HAA5c0tZmR4BazKDzBXAvSR1HJnY8NzJ0sLsIqRDUisum6jrZBZwzITxaACTP7lkaPYDhYQV4Az8RJ8igq0ikso1WLh2RZWOl6rCvuMwnXaoww-Xjz3R4Vjaugc5JouxY9JL38s9wjUWnny73y82Uyc06eytK5oI61ji0UmePdfuz16kLwiUCIcjWv_om7Ndzhd8um7D0QEODmJoUuluaZ9uChzXRUSkuxE5i4zTsLwcJomNy_kM24tRvqaCJn1rCC8zWAIdm1m2d66VXcufZ6P3-_LdwoJ0vhQA61nOwmHbOqXuZY8k6ALIiAP1cT22mWvkwBwT60wWvY86vOkaoB9CAV3FQjsFkmrcDjRh8ZplgNFUFxZ5GT9iaYToHtm_VfIRfclfJ_Tx1VwHoloV2JSVt4cBVi4fYMlsx0m7NhoU_3Vkw4LXsWXHQIF5dFTcuiy9dt4J5BiGxnzt-aoQ',
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
