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
        this.sendBooking = this.sendBooking.bind(this);
    }

    renderItem({item, index}) {
        if(item.id == 1){
        return (
            <View style={styles.item}>
                <View accessible={true}>
                    <Text accessible={true} style={styles.white}>{item.name}</Text>
                    <Text accessible={true} style={styles.white}>{item.country}</Text>
                    <Text accessible={true} style={styles.white}>{item.city}</Text>
                    <View style={styles.horizontalBar}/>
                    <Text accessible={true} style={[styles.white, styles.right]}>{item.price} €</Text>
                </View>
                <TouchableOpacity accessible={true} accessibilityLabel="Déréserver"
                                  accessibilityHint="Enlever la réservation"
                                  style={styles.button}>
                    <Text style={styles.buttonText}>Annuler</Text>
                </TouchableOpacity>
            </View>
        )
        }
    }

    sendBooking() {
        axios.post(`${apiUrl}/reserveBooking`, {
                "id": 1,
                "email": "a@a.com",
            }
        ).then(function (response) {
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });
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
            axios.get(`${apiUrl}/getBookings`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(function (response) {
                    console.log(response.data);
                    resolve(response.data);
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
                <Text accessible={true} style={styles.title}>{'mes réservations'.toUpperCase()}</Text>
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
