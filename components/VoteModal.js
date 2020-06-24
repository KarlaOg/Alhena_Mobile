import React from 'react';
import {Component} from 'react';
import {
    Modal,
    Text,
    TouchableHighlight,
    View,
    Alert,
    Dimensions,
    StyleSheet,
    Image,
    ImageBackground
} from 'react-native';
import axios from "axios";
import getEnvVars from "../config/env";

const {apiUrl} = getEnvVars();

export class VoteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            bookingId: null,
            user: null,
            token: null
        };
    }

    voteBooking() {
        console.log(this.state.user, this.state.bookingId)
        axios({
            method: 'POST',
            url: `${apiUrl}/api/voteForBooking`,
            data: {
                "booking_id": this.state.bookingId,
                "email": this.state.user,
            },
            headers: {
                'Authorization': `Bearer ${this.state.token}`,
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            modalVisible: nextProps.modalVisible,
            user: nextProps.user,
            bookingId: nextProps.bookingId,
            token: nextProps.token
        });
    }


    render() {
        return (
            <Modal
                style={styles.modal}
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Image style={styles.image} source={require('../assets/images/robot/iconeContent.png')}/>
                        <Text style={styles.textLabel}>Êtes vous sûre de votre choix, attention vous ne pourrez pas
                            le
                            modifier !
                        </Text>
                    </View>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            this.voteBooking()
                        }}>
                        <Text style={styles.buttonText}>Oui</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[styles.button, styles.disabled]}
                        onPress={() => {
                            this.setState({modalVisible: !this.state.modalVisible});
                        }}>
                        <Text style={[styles.buttonText, styles.buttonTextDisabled]}>Non</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        )
    }
}

let
    Window = Dimensions.get('window');
const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'rgba(54, 63, 70, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
        },
        button: {
            width: Window.width - 50,
            margin: 15,
            padding: 30,
            backgroundColor: "#41FFE1",
            borderRadius: 10,
            color: "#363F46"
        },
        disabled: {
            color: 'white',
            backgroundColor: '#728694',
        },
        buttonText: {
            textAlign: "center",
            fontFamily: 'text-font',
            fontSize: 20,
        },
        buttonTextDisabled: {
            color: 'white',
        },
        content: {
            position: 'relative',
            backgroundColor: '#55636E',
            padding: 30,
            paddingTop: 70,
            borderRadius: 10,
            margin: 15,
        },
        image: {
            position: 'absolute',
            width: 100,
            height: 100,
            left: Window.width / 2 - 65,
            top: -50,
        },
        textLabel: {
            fontSize: 25,
            lineHeight: 30,
            color: 'white',
            fontFamily: 'text-font',
        }
    })
