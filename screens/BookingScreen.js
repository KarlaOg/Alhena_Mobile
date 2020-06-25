import React, {Component} from 'react';
import axios from 'axios';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    Dimensions, AsyncStorage, ScrollView, TouchableOpacity, ImageBackground,
} from 'react-native';

import getEnvVars from "../config/env";
import {Booking} from "../components/Booking";
import {VoteModal} from "../components/VoteModal";

const {apiUrl} = getEnvVars();

export default class BookingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            currentSelected: null,
            modalVisible: false,
            user: null,
            token: null,
            suitcaseId: null,
        };
        this.getData = this.getData.bind(this);
        this.updateId = this.updateId.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem({item, index}) {
        return (
            <Booking vote={false} updateId={this.updateId} data={item}/>
        )
    }

    componentDidMount() {
        this.getData().then((response) => {
            let testVoted = false
            for (let i in response) {
                for (let j in response[i].users_related) {
                    if (response[i].users_related[j] === this.state.user) {
                        testVoted = true
                    }
                }
            }
            if (testVoted) {
                this.props.navigation.navigate('Vote', {
                    data: JSON.stringify(response),
                    suitcase_id: this.state.suitcaseId
                });
            } else {
                this.setState({
                    elements: response
                })
            }
        })
    }

    openModal() {
        this.setState({modalVisible: true})
    }

    async getData() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('suitcaseId').then(suitcaseId => {
                AsyncStorage.getItem('user')
                    .then((data) => {
                        AsyncStorage.getItem('JWT', (err, jwt) => {
                            this.setState({user: data, token: JSON.parse(jwt), suitcaseId: suitcaseId})
                            axios({
                                method: 'POST',
                                url: `${apiUrl}/api/algo`,
                                data: {
                                    email: data,
                                    suitcase_id: suitcaseId,
                                },
                                headers: {
                                    'Authorization': `Bearer ${JSON.parse(jwt)}`,
                                    'Content-Type': 'application/json',
                                }
                            }).then(function (response) {
                                return resolve(response.data)
                            })
                                .catch(function (error) {
                                    console.log("error")
                                    console.log(error)
                                });
                        })
                    })
            })
        })
    }

    render() {
        return (
            <View style={[styles.container]}>
                <VoteModal token={this.state.token} modalVisible={this.state.modalVisible}
                           user={this.state.user}
                           screen={this} data={this.state.elements} suitcaseId={this.state.suitcaseId}
                           bookingId={this.state.currentSelected}/>
                <ImageBackground source={require('../assets/images/background/background.png')}
                                 style={styles.imageBG}>

                    <Text accessible={true} style={styles.title}>Vos résultats</Text>
                    <View style={styles.scrollViewContainer}>
                        <ScrollView>
                            <FlatList
                                renderItem={this.renderItem}
                                data={this.state.elements}
                                style={styles.listItem}/>
                        </ScrollView>
                        <TouchableOpacity disabled={this.state.currentSelected === null} accessible={true}
                                          accessibilityLabel="Réserver"
                                          onPress={() => this.openModal()}
                                          style={this.state.currentSelected !== null ? styles.button : [styles.button, styles.disabled]}>
                            <Text style={styles.buttonText}>Valider</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    updateId(id) {
        this.setState({currentSelected: id})
    }

}

let Window = Dimensions.get('window');
const
    styles = StyleSheet.create({
        scrollViewContainer: {
            height: Window.height * 0.80
        },

        imageBG: {
            width: '100%',
            height: '100%',
            flex: 1
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
BookingScreen.navigationOptions = {
    header: null,
};
