import React, {Component} from 'react';
import axios from 'axios';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import getEnvVars from "../config/env";
import {Booking} from "../components/Booking";

const {apiUrl} = getEnvVars();

export default class BookingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [{
                id: 1,
                name: "Le cantlon",
                country: "Quebec",
                city: "Canada",
                price: 2000,
                booking_left: 5
            }],
        };
        this.getData = this.getData.bind(this);
    }

    renderItem({item, index}) {
        return (
            <Booking data={item}/>
        )
    }

    componentDidMount() {
        this.getData().then((response) => {
            this.setState({
                elements: response
            })
        })
    }

    async getData() {
        return new Promise((resolve, reject) => {
            axios.get(`${apiUrl}/api/getBookings`, {
                method: 'GET',
                headers: {
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1ODg1MjM1NDEsImV4cCI6MTU4ODUyNzE0MSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImVtYWlsIjoiYWFAYWEuY29tIn0.FsUy1c8oZE2e8OefYlqanFVSvo-8aGTE423diYRqlz5z83myRa7vZtA6tTvDGgVDNsjV2dVXodmRcvHo2U5ZenfnojiYgQQmYiXHCqTn0P956nNPQ_Ak75jw0W3DEbVO_6LPiIc-taOUbXJHxDEJFbzrnvzPQN5VqMReXWU3Eh7DnphSeA7sc64ygSvS_cyaoM31lusFQnoI6-Lqd6dxhqNcylKtF92qK20-LoC2pi8MsHB2xDt3_pUU44lCfi-B0e5XjGNHEFchtoUdkIK_DirCAZP4oQHW8k4_pFz7QbK7dGPfbO_v6KwwIho7C5UfdAhB54JM8piMhk91ScWa6CAweTwprEYzDYBHBmP8Y7HDOMnipgi2PMAXypafDP34NHettoIDNzQrPcIj56u5LXaqSwI25GTTk_qtm-gbjA2E38eba9v3SVJxUdHWPp138vRGjWCYozkyCQeBzFp7b5f6mJizfeGO_i7m0tV_asab3RTPVgcTPhbU08uUoPTH6nLfDxsjb8lwWlT2FZrj13ZVDBUimAOJB__RWnYOmKQaPFcm3AEJGcp4bcc7QfMI79imwsL2krtFVL06cdkpOiA7j6ja7Jrpao41z8n1oAOeJ_NkGfegIpNFBLsDZ0oTsVuNFA4to8_Xu_TesiAb_Lw5mT5hoqClr4fGgI3vNTk',
                },
            })
                .then(function (response) {
                   console.log(response.data);
                })
                .catch(function (error) {
                    console.log("error")
                    console.log(error);
                });
        })
    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={styles.bar}/>
                <Text accessible={true} style={styles.title}>{'réservations'.toUpperCase()}</Text>
                <FlatList
                    renderItem={this.renderItem}
                    data={this.state.elements}
                    style={styles.listItem}/>
            </View>
        );
    }
}
let Window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(54,63,70)',
    },
    right: {
        textAlign: "right"
    },
    bar: {
        width: 2,
        height: 25,
        top: 45,
        left: 30,
        position: "absolute",
        backgroundColor: "#41FFE1",
    },
    horizontalBar: {
        marginBottom: 10,
        height: 1,
        backgroundColor: "#41FFE1",
    },
    title: {
        top: 40,
        fontFamily: 'title-font',
        fontSize: 25,
        color: "#ffffff",
        left: 50,
        marginBottom: 40,
    },
    listItem: {
        flex: 1,
    },
    item: {
        padding: 30,
        backgroundColor: "#728694",
        fontFamily: 'text-font',
        marginTop: 50,
        left: 30,
        width: Window.width - 60,
        borderRadius: 25,
        borderColor: 'red',
    }, button: {
        padding: 10,
        margin: 20,
        marginRight: 0,
        textAlign: "right",
        backgroundColor: "#41FFE1",
        borderRadius: 30,
        color: "#363F46"
    },
    buttonText: {
        textAlign: "center",
        fontFamily: 'text-font',
        fontSize: 20
    },
    white: {
        color: "#ffffff",
        fontFamily: 'text-font',
        fontSize: 18,
        marginBottom: 10,
    },
    booking_left: {
        color: "#9FDAD1",
        fontFamily: 'text-font',
        fontSize: 14,
        marginBottom: 10,
    }
})
BookingScreen.navigationOptions = {
    header: null,
};
