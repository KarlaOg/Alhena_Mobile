import React from 'react';
import {Component} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import * as Google from 'expo-google-app-auth';
import {SocialIcon} from 'react-native-elements'
import {CallApi} from '../components/callApi'


export class GoogleButton extends Component {


    constructor(props){
        super(props);
        this.state = {
            user: {}
        };
        this.signInWithGoogleAsync = this.signInWithGoogleAsync.bind(this);
    }

    async signInWithGoogleAsync() {
      try {
        const  { 
          type, 
          accessToken, 
          user } = await Google.logInAsync({
            expoClientId: "732141847841-rhhjna5f1rptuv0gce0nphc8chf43e1g.apps.googleusercontent.com",
            iosClientId: "732141847841-ku12du65d719tpuiomag1ma33fmqod87.apps.googleusercontent.com",
            clientId:"AIzaSyD8sazDz2W1saN5Y_iaeEFZYT5JvMWgviY", 
          });

    
        if ( type === 'success') {

          console.log(user);
          
          let userInfoResponse = await fetch(`https://www.googleapis.com/userinfo/v2/fields=id,name,email,&access_token=${accessToken}`)

          console.log(userInfoResponse); 

          await this.setState({user: await userInfoResponse.json()})
          let check = await CallApi.checkForUser(this.state.user.email);
                if (check === false) {
                    CallApi.createUser({
                        "email": this.state.user.email,
                        "password": "ddddddd",
                        "terms": true
                    })
                } else {
                    await CallApi.loginUser({
                        "email": this.state.user.email,
                        "password": "ddddddd"
                    });
                }
          return result.accessToken;
        } else {
          return { cancelled: true };
        }
      } catch (e) {
        return { error: true };
      }
    }

    render() {
      return (
        <SocialIcon
            style={styles.googleButton}
            title='Google'
            button
            type='google'
            onPress={this.signInWithGoogleAsync}
        />
    )
    }

}

const styles = StyleSheet.create({
  googleButton: {
      borderRadius: 5,
      width:180,
      fontFamily:'text-font',
      marginBottom:10, 
      marginLeft:0, 
  },
});
 

