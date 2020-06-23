import React, {Component} from 'react';
import axios from 'axios';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    Dimensions, AsyncStorage, ScrollView, TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from "react-navigation";

import getEnvVars from "../config/env";
import {Booking} from "../components/Booking";

const {apiUrl} = getEnvVars();

export default class BookingScreen extends Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem({item, index}) {
        return (
            <Booking vote={true} updateId={this.updateId} data={item}/>
        )
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={[styles.container]}>
                <Text accessible={true} style={styles.title}>Résultats des votes :</Text>
                <View style={styles.scrollViewContainer}>
                    <ScrollView>
                        <FlatList
                            renderItem={this.renderItem}
                            data={JSON.parse(navigation.getParam('data'))}
                            style={styles.listItem}/>
                    </ScrollView>
                    <TouchableOpacity accessible={true}
                                      accessibilityLabel="Finaliser le voyage"
                                      style={styles.button}
                                      onPress={() => {
                                          this.props.navigation.navigate('Payment', {
                                              booking_id: 6,
                                              suitcase_id: 1
                                          });
                                      }}>
                        <Text style={styles.buttonText}>Finaliser le voyage</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

let Window = Dimensions.get('window');
const
    styles = StyleSheet.create({
        scrollViewContainer: {
            height: Window.height * 0.80
        },

        container: {
            flex: 1,
            backgroundColor: 'rgb(54,63,70)',
        },
        right: {
            textAlign: "right"
        },
        horizontalBar: {
            marginBottom: 10,
            height: 1,
            backgroundColor: "#41FFE1",
        },
        title: {
            top: 40,
            fontFamily: 'text-font',
            fontWeight: 'bold',
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
        },
        button: {
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: 30,
            marginLeft: 15,
            marginRight: 15,
            textAlign: "right",
            backgroundColor: "#41FFE1",
            borderRadius: 4,
            color: "#363F46"
        },
        disabled: {
            backgroundColor: '#728694',
        },
        buttonText: {
            textAlign: "center",
            fontFamily: 'text-font',
            fontSize: 20,
            color: '#55636E',
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
BookingScreen
    .navigationOptions = {
    header: null,
};
