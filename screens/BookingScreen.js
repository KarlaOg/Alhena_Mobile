import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import HomeScreen from "./HomeScreen";
import Image from "react-native-web/dist/exports/Image";

export default class BookingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [
                {id: 0, name: 'yo', price: 100000, country: "france", city: "paris", booking_left: 50},
                {id: 0, name: 'yo', price: 100000, country: "france", city: "paris", booking_left: 50},
                {id: 0, name: 'yo', price: 100000, country: "france", city: "paris", booking_left: 50},
            ],
        }
    }

    renderItem({item, index}) {
        return (
            <View style={styles.item}>
                <View>
                    <Text style={styles.white}>{item.name}</Text>
                    <Text style={styles.white}>{item.country}</Text>
                    <Text style={styles.white}>{item.city}</Text>
                    <Text style={styles.white}>{item.price}€</Text>
                    <Text style={styles.white}>Il reste {item.booking_left} places</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Réserver</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={styles.bar}/>
                <Text style={styles.title}>{'réservation'.toUpperCase()}</Text>
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
        backgroundColor: '#363F46',
    },
    bar: {
        width: 2,
        height: 25,
        top: 40,
        left: 30,
        position: "absolute",
        backgroundColor: "#41FFE1",
    },
    title: {
        top: 40,
        fontFamily: 'title-font',
        fontSize: 25,
        color: "#ffffff",
        left: 50
    },
    listItem: {
        flex: 1,
    },
    item: {
        backgroundColor: "#48545C",
        fontFamily: 'text-font',
        marginTop: 50,
        left: 30,
        width: Window.width - 60,
        height: 200,
        borderRadius: 10,
        borderColor: 'red'
    }, button: {
        width: 200,
        textAlign: "center",
        backgroundColor: "#41FFE1",
        borderRadius: 10,
        color: "#363F46"
    },
    buttonText: {
        textAlign: "center",
        fontFamily: 'text-font',
        fontSize: 20
    },
    white: {
        color: "#ffffff"
    }
})
BookingScreen.navigationOptions = {
    header: null,
};
