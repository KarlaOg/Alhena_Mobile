import React, {Component} from 'react';
import axios from 'axios';
import {Text, Button, StyleSheet, View, Image, FlatList, ScrollView, Dimensions, ImageBackground} from 'react-native';
import {ExpoConfigView} from '@expo/samples';
import Suitcase from '../components/Suitcase'
import {CallApi} from '../components/callApi';
import {Linking} from 'expo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
import {Colors, Spacing} from "../assets/styles";


import getEnvVars from "../config/env";
import {Booking} from "../components/Booking";
import BookingScreen from "./BookingScreen";
import {VoteModal} from "../components/VoteModal";
import {PaymentModal} from "../components/PaymentModal";

const {apiUrl} = getEnvVars();
const {deepLink} = getEnvVars();

export default class SuitcaseScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suitcaseLink: "",
            suitcaseId: 0,
            username: null,
            userEmail: null,
            suitcases: []
        }
        this.loadCredentials()
    }

    getSuitcases() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('JWT', (err, jwt) => {
                axios({
                    method: 'POST',
                    url: `${apiUrl}/api/get_suitcases`,
                    data: {
                        email: this.state.userEmail,
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
    }

    async loadCredentials() {
        try {
            const username = await AsyncStorage.getItem('userName');
            await this.setState({username: username});
            const userEmail = await AsyncStorage.getItem('user');
            await this.setState({userEmail: userEmail});
            this.getSuitcases().then(res => {
                this.setState({suitcases: res});
            })
        } catch (error) {
            // Manage error handling
        }
    }

    renderItem({item, index}) {
        return (
            <View style={styles.suitcaseItem}>
                <View style={styles.image}></View>
                <View style={styles.content}>
                    <Text style={styles.suitcaseName}>{item.suitcaseName}</Text>
                    <Text style={styles.suitcaseNumb}>{item.usersNumb} personne(s)</Text>
                </View>
            </View>
        )
    }

    openModal() {
        this.setState({modalVisible: true})
    }

    render() {

        Linking.makeUrl()
        const prefix = Linking.makeUrl('/');
        return (
            <View style={styles.container}>
                <PaymentModal modalVisible={this.props.navigation.getParam('payment') === true}/>
                <ImageBackground source={require('../assets/images/background/background.png')}
                                 style={styles.imageBG}>
                    <Image style={styles.logo} source={require('../assets/images/robot-face.png')}/>
                    <Text style={styles.mainText}>Bonjour {this.state.username},{"\n"}que souhaites-tu faire?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('addSuitcase');
                        }}
                        style={styles.buttonAdd}
                    >
                        <Text style={styles.textButtonAdd}>Créer ma valise</Text>
                    </TouchableOpacity>
                    <TouchableOpacity    onPress={() => {
                        this.props.navigation.navigate('JoinSuitCase');
                    }} style={styles.buttonJoin}><Text style={styles.textButtonJoin}>Rejoindre une
                        valise</Text></TouchableOpacity>
                    <Text>{this.state.suitcaseLink}</Text>
                    <View style={styles.suitcaseContainer}>
                        <Text style={styles.mySuitcase}>Mes valises</Text>
                        <View style={styles.bar}/>
                    </View><FlatList
                    renderItem={this.renderItem}
                    data={this.state.suitcases}
                    style={styles.listItem}/>
                </ImageBackground>
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
    logo: {
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20
    },
    imageBG: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    mainText: {
        textAlign: 'center',
        color: "#ffffff",
        fontSize: 26,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginBottom: 20
    },
    buttonAdd: {
        alignItems: 'center',
        backgroundColor: '#48545C',
        color: '#fff',
        marginTop: 10,
        marginHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 4,
        marginBottom: 10
    },
    buttonJoin: {
        alignItems: 'center',
        backgroundColor: '#41FFE1',
        color: '#000',
        marginTop: 10,
        marginHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 4,
    },
    textButtonAdd: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'text-font',
    }, textButtonJoin: {
        fontSize: 18,
        fontFamily: 'text-font',
    },
    mySuitcase: {
        marginHorizontal: 10,
        marginTop: 25,
        fontSize: 18,
        fontFamily: 'text-font',
        color: "#FFF"
    },
    suitcaseItem: {
        flexDirection: 'row',
        margin: 15,
    },
    image: {
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 4,
        marginRight: 10,
    },
    content: {
        flexDirection: 'column',
    },
    suitcaseName: {
        color: 'white',
    },
    suitcaseNumb: {
        color: 'white',
    },

    bar: {
        width: Window.width - 40,
        height: 2,
        position: "absolute",
        bottom: -10,
        left: 10,
        backgroundColor: "#41FFE1",
    },
    suitcaseContainer: {
        position: 'relative',
        marginBottom: 10,
    },
})
SuitcaseScreen.navigationOptions = {
    header: null,
};

