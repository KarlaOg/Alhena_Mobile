import React, {Component} from 'react';
import axios from 'axios';
import { Text, Button,StyleSheet, View } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import Suitcase from '../components/Suitcase'
import {CallApi} from '../components/callApi';
import { Linking } from 'expo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';

import getEnvVars from "../config/env";

const {apiUrl} = getEnvVars();

export default class SuitcaseScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suitcaseLink: "",
            suitcaseId: 0
        }
      }

    /*onPress = () => {
        console.log(this.props.navigation)
        this.props.navigation.navigate("SuitcaseById", {id: 1})
      }*/
    render() {
        Linking.makeUrl()
        const prefix = Linking.makeUrl('/');
        return (
            <View>
               <TouchableOpacity
                onPress={() => {
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
                                    this.setState({suitcaseLink: "link: exp://192.168.1.46:19000/--/suitcase?id=" + response.data})
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                            });
                        
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }}
                style={styles.button}
                >
                     <Text>Add suitcase</Text>
                </TouchableOpacity>
                <Text>{this.state.suitcaseLink}</Text>     
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        marginTop: 150
    },
});