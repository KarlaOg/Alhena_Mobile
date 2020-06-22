import React, {Component} from 'react';
import axios from 'axios';
import { Text, Button,StyleSheet, View, Image } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import Suitcase from '../components/Suitcase'
import {CallApi} from '../components/callApi';
import { Linking } from 'expo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import {Colors, Spacing} from "../assets/styles";


import getEnvVars from "../config/env";

const {apiUrl} = getEnvVars();
const {deepLink} = getEnvVars();

export default class SuitcaseScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suitcaseLink: "",
            suitcaseId: 0,
            username: null
        }
        this.loadCredentials()
      }

    async loadCredentials() {
        try {
            const username = await AsyncStorage.getItem('user');
            this.setState({username: username});
        }
        catch (error) {
            // Manage error handling
        }
    }

    render() {

        Linking.makeUrl()
        const prefix = Linking.makeUrl('/');
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/images/robot-face.png')}/>
                <Text style={styles.mainText}>Bonjour {this.state.username},{"\n"}que souhaites-tu faire?</Text>
               <TouchableOpacity
                /*onPress={() => {
                    AsyncStorage.getItem('user')
                    .then((data) => {
                            AsyncStorage.getItem('JWT', (err, jwt) => {
                                axios({
                                    method: 'POST',
                                    url: `${apiUrl}/api/add_suitcase`,
                                    data: {
                                      email: data,
                                    },
                                    headers: {
                                        'Authorization': `Bearer ${JSON.parse(jwt)}`,
                                        'Content-Type': 'application/json',
                                    }
                                  })
                                .then((response) => {
                                    console.log(response.data)
                                    this.setState({suitcaseLink: `link: ${deepLink}/suitcase?id=${response.data}`})
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                            });
                        
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }}*/
                onPress={() => {this.props.navigation.navigate('addSuitcase');}}
                style={styles.buttonAdd}
                >
                     <Text style={styles.textButtonAdd}>Créer ma valise</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonJoin}><Text>Rejoindre une valise</Text></TouchableOpacity>
                <Text>{this.state.suitcaseLink}</Text>  
                <Text style={styles.mySuitcase}>Mes valises</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20
    },
    mainText: {
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
        borderRadius: 10,
        marginBottom: 10
    },
    buttonJoin: {
        alignItems: 'center',
        backgroundColor: '#41FFE1',
        color: '#000',
        marginTop: 10,
        marginHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10
    },
    textButtonAdd: {
        color: 'white'
    },
    mySuitcase: {
        marginHorizontal: 10,
        marginTop: 25,
        fontSize: 16,
        color: "#FFF"
    }
});