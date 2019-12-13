import React from 'react';
import axios from 'axios';
import {Component} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import t from "tcomb-form-native";

import getEnvVars from "../config/env";

const {apiUrl} = getEnvVars();


export class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {}
        };
        this.sendBooking = this.sendBooking.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({item: nextProps.data});
        console.log(nextProps)
    }

    sendBooking() {
        axios.post(`${apiUrl}/reserveBooking`, {
                "id": this.state.item.id,
                "email": "a@a.com",
            }
        ).then(function (response) {
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={styles.item}>
                <View accessible={true}>
                    <Text accessible={true} style={styles.white}>{this.state.item.name}</Text>
                    <Text accessible={true} style={styles.white}>{this.state.item.country}</Text>
                    <Text accessible={true} style={styles.white}>{this.state.item.city}</Text>
                    <View style={styles.horizontalBar}/>
                    <Text accessible={true} style={[styles.white, styles.right]}>{this.state.item.price} €</Text>
                    <Text accessible={true} style={[styles.booking_left, styles.right]}>Il
                        reste {this.state.item.bookings_left} places</Text>
                </View>
                <TouchableOpacity accessible={true} accessibilityLabel="Réserver"
                                  accessibilityHint="pour ajouter une réservation à votre profil"
                                  onPress={() => this.sendBooking(this.state.item.id)}
                                  style={styles.button}>
                    <Text style={styles.buttonText}>Réserver</Text>
                </TouchableOpacity>
            </View>
        )
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
