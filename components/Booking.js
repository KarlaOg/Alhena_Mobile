import React from 'react';
import axios from 'axios';
import {Component} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View, Image, FlatList} from 'react-native';
import t from "tcomb-form-native";


import getEnvVars from "../config/env";

const {apiUrl} = getEnvVars();


export class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            vote: false,
            details: false
        };
        this.showDetails = this.showDetails.bind(this);
    }

    componentDidMount() {
        if (this.props.data) {
            this.setState({item: this.props.data, vote: this.props.vote});
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({item: nextProps.data, vote: nextProps.vote});
    }

    showDetails() {
        this.props.updateId(this.state.item.id)
        this.setState({details: !this.state.details})
    }

    renderActivity({item}) {
        return (
            <View style={styles.activity}>
                <Text style={styles.white}>{item[0]}</Text>
                <Text style={styles.white}>{item[1]}€/pers</Text>
            </View>
        )
    }


    render() {
        console.log(this.props)
        return (
            <View style={this.state.details ? [styles.item, styles.itemDetails] : styles.item}>
                <View accessible={true}
                      style={this.state.details ? [styles.content, styles.contentDetails] : styles.content}>
                    <Text style={[styles.white, styles.country]} accessible={true}>{this.state.item.country}</Text>
                    <Text style={[styles.white, styles.city]} accessible={true}>{this.state.item.city}</Text>
                    <View style={styles.horizontalBar}/>
                    <Text
                        style={[styles.white, styles.date]}
                        accessible={true}>{this.state.item.start_date} / {this.state.item.end_date}</Text>
                    {this.state.details ? <View style={styles.detailsBooking}>
                            <Text style={styles.hotelName}>
                                {this.state.item.hotel_name}
                            </Text>
                            <Text style={styles.white}
                                  accessible={true}><Text style={styles.hotelPrice}>
                                {this.state.item.hotel_price}€</Text>
                                /nuit/pers
                            </Text>
                        </View>
                        :
                        <Text style={styles.white} accessible={true}><Text
                            style={styles.hotelPrice}>{this.state.item.hotel_price}€
                        </Text>/nuit/pers</Text>
                    }
                    {this.state.details ? <FlatList
                            renderItem={this.renderActivity}
                            style={styles.hidden}
                            data={this.state.item.activities}/>
                        : null
                    }
                    {this.state.details ?
                        <View style={styles.totalPrice}>
                            <Text style={styles.priceLabel}>
                                TOTAL
                            </Text>
                            <Text style={styles.white}
                                  accessible={true}>
                                <Text style={styles.hotelPrice}>
                                    {this.state.item.total_price}€
                                </Text>
                                /nuit/pers
                            </Text>
                        </View> : null
                    }
                </View>
                <View
                    style={this.state.details ? [styles.imageContainer, styles.imageContainerDetails] : styles.imageContainer}>
                    <Image
                        style={this.state.details ? [styles.image, styles.imageDetails] : styles.image}
                        source={{
                            uri: this.state.item.booking_pic,
                        }}
                    />
                    {this.state.vote ?
                        <Text style={styles.percent}>{this.state.item.percent}%</Text> : null}
                </View>
                {this.state.vote ?
                    null : <TouchableOpacity accessible={true} accessibilityLabel="Réserver"
                                             accessibilityHint="pour ajouter une réservation à votre profil"
                                             onPress={() => this.showDetails()}
                                             style={styles.button}>
                        <Text style={styles.buttonText}>   {this.state.details ? 'Voir moins' : 'Voir plus'}</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

let Window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4B5359',
    },
    right: {
        textAlign: "right"
    },
    imageContainer: {
        position: 'relative',
        width: '50%',
        height: 200,
    },
    image: {
        opacity: 0.8,
        width: '100%',
        height: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    imageContainerDetails: {
        width: '100%',
        height: 250,
    },
    imageDetails: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 0,
    },

    content: {
        padding: 15,
        paddingBottom: 30,
        width: '50%',
    },
    percent: {
        color: 'white',
        fontSize: 22,
        position: 'absolute',
        right: 20,
        top: 10,
    },
    contentDetails: {
        width: '100%',
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
        width: 50,
        marginBottom: 10,
        height: 2,
        backgroundColor: "#41FFE1",
    },
    title: {
        top: 40,
        fontFamily: 'text-font',
        fontSize: 25,
        color: "#ffffff",
        left: 50,
        marginBottom: 40,
    },
    listItem: {
        flex: 1,
    },
    item: {
        position: 'relative',
        flexDirection: 'row',
        backgroundColor: "#4B5359",
        fontFamily: 'text-font',
        marginTop: 50,
        left: 15,
        width: Window.width - 30,
        borderRadius: 10,
    },
    itemDetails: {
        flexDirection: 'column-reverse',
    },
    button: {
        width: 180,
        left: Window.width / 2 - 100,
        bottom: -15,
        position: 'absolute',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#41FFE1",
        borderRadius: 4,
        color: "#363F46"
    },
    buttonText: {
        textAlign: "center",
        fontFamily: 'text-font',
        fontSize: 16
    },
    white: {
        color: "#ffffff",
        fontSize: 16,
        marginBottom: 10,
    },
    country: {
        fontFamily: 'title-font',
        textTransform: 'uppercase',
        fontSize: 20,
        marginBottom: 0,
        letterSpacing: 3,
    },
    date: {
        fontSize: 14,
    },
    city: {},
    hotelPrice: {
        fontSize: 25,
        marginBottom: 15,
    },
    activity: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 14,
    }, detailsBooking: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, hotelName: {
        fontSize: 20,
        color: 'white',
    }, priceLabel: {
        fontSize: 25,
        color: 'white',
    },
    totalPrice: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
