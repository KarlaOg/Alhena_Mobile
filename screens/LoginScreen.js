import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, ImageBackground, Button} from 'react-native';

import {loginOptions} from '../login/LoginFormOptions';
import {CallApi} from '../components/callApi';

import t from "tcomb-form-native";
import LoginUser from "../constants/User"

import {FacebookButton} from "../components/FacebookButton"
import {Colors, Spacing, Buttons, Texts} from "../assets/styles";


const Form = t.form.Form


export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit = () => {
        const values = this._form.getValue();
        CallApi.loginUser(values)
    };

    render() {
        return (

            <ScrollView>
                <View style={styles.container}>
                    <ImageBackground source={require('../assets/images/background/background.png')}
                                     style={styles.image}>

                        <Image source={require('../assets/images/robot/robot2x.png')}
                               style={styles.imageRobot}/>

                        <Text style={styles.titleText}>ALHÉNA</Text>

                        <Text style={styles.subTitleText}>L’application qui te permet de partir en voyage entre amis
                            sans prises de têtes !</Text>

                        <Form ref={c => this._form = c}
                              type={LoginUser} options={loginOptions}/>
                        <Text style={styles.forgotPassword}> Mot de passe oublié ?</Text>


                        <TouchableOpacity accessible={true} accessibilityLabel="Déréserver"
                                          accessibilityHint="Enlever la réservation"
                                          style={styles.button}
                                          onPress={this.handleSubmit}
                        >
                            <Text style={styles.buttonText}>Connexion</Text>
                        </TouchableOpacity>

                        <FacebookButton/>

                        <Text style={styles.noAccountText}>Je n'ai pas de compte</Text>
                    </ImageBackground>
                </View>
            </ScrollView>

        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        ...Spacing.default.containerSpacing,
        justifyContent: 'center',
        backgroundColor: Colors.default.primary,

    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1
    },

    button: {
        ...Buttons.aquaButton,

    },

    buttonText: {
        ...Buttons.aquaButtonText,
    },

    titleText: {
        ...Texts.headerCenterTitle,

    },

    subTitleText: {
        ...Texts.subCenterTitle,
        fontFamily: 'text-font',
        marginBottom: 30,
        marginLeft: 10,
    },

    noAccountText: {
        textAlign: "center",
        textDecorationLine: "underline",
        color: "#FFFFFF",
        fontSize: 15,
        fontFamily: 'text-font',
    },

    imageRobot: {
        marginLeft: 105,
        marginBottom: 30,
        marginTop: 60,
        resizeMode: 'contain',
        width: 190,
        height: 190,
    },

    forgotPassword: {
        fontFamily: 'text-font',
        textDecorationLine: "underline",
        color: "#B3B3B3",
        fontStyle: 'italic',
    }

});
LoginScreen.navigationOptions = {
    header: null,
};


