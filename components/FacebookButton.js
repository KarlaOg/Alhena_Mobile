import React from 'react';
import {Component} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Facebook from 'expo-facebook';
import {SocialIcon} from 'react-native-elements'

import {facebookEnv} from "../config/env";
import {CallApi} from '../components/callApi'

export class FacebookButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        this.logIn = this.logIn.bind(this);

    }

    async logIn() {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync(
                facebookEnv,
            );
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${token}`)
                await this.setState({user: await response.json()})
                CallApi.createUser({
                    "email": this.state.user.email,
                    "password": "ddddddd",
                    "terms": true
                })
            } else {
                // type === 'cancel'
            }
        } catch ({message}) {
            alert(`Facebook Login Error: ${message}`);
        }
    }


    render() {
        return (
            <SocialIcon
                style={styles.facebookButton}
                title='Se connecter avec Facebook'
                button
                type='facebook'
                onPress={this.logIn}
            />
        )
    }
}

const styles = StyleSheet.create({
    facebookButton: {
        borderRadius: 0,
    },
});

