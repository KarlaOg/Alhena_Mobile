import React, {Component} from 'react';
import {View, StyleSheet, Button , Text, TouchableOpacity  , Image , ImageBackground , KeyboardAvoidingView , Platform , SafeAreaView , ScrollView} from 'react-native';
import {options} from '../registration/RegisterFormOptions';
import {CallApi} from '../components/callApi';
import t from "tcomb-form-native";
import {RegisterUser} from "../constants/User"
import AsyncStorage from 'react-native'
import {Colors, Spacing , Buttons , Texts } from "../assets/styles";
import {FacebookButton} from "../components/FacebookButton"



const Form = t.form.Form;

export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit = () => {
        const values = this._form.getValue();
        CallApi.createUser(values)
    };

    render() {
        return (
                <ScrollView tyle={styles.scrollView}>
                     <View style={styles.container}>
                <ImageBackground source={require('../assets/images/background/background.png')} style={styles.image}> 
                
                <Image source={require('../assets/images/arrows/fleche.png')} style={styles.arrow} ></Image>

                <CallApi/>
                <Text style={styles.titleText}>INSCRIPTION</Text>

                <Text style={styles.subTitleText}> 
                Entrez vos informations et créez-vous un compte 
                </Text>

                <FacebookButton/>

                <Text style={styles.infoTitleText}> Ou inscrivez-vous avec votre adresse e-mail </Text>

                <Form ref={c => this._form = c}
                      type={RegisterUser} options={options}/>

                    <TouchableOpacity accessible={true} accessibilityLabel="Déréserver"
                    
                                  accessibilityHint="Enlever la réservation"
                                  style={styles.button}
                                  onPress={this.handleSubmit}
                                  >
                        <Text style={styles.buttonText}>Suivant</Text>
                </TouchableOpacity>
                
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
        backgroundColor:Colors.default.primary
    },
    image:{
        width: '100%',
        height: '100%',
        flex: 1 
    }, 

    titleText: {
        ...Texts.headerTitle, 
        marginLeft:0, 
    },

    
    subTitleText: {
        ...Texts.subTitle, 
        fontSize:16,
        marginBottom:10,  
    },
    infoTitleText:{
        ...Texts.subTitle, 
        fontSize:13, 
        marginBottom:30,

    }, 

    button: {
        ...Buttons.aquaButton, 
    },

    buttonText: {
        ...Buttons.aquaButtonText, 
    },

    // scrollView: {
    //     marginHorizontal: 0,
    // },

    image: {
        flex:1,
        resizeMode: "cover",
        width:'100%', 
        height:'100%',
    },

    arrow:{
        marginTop:Spacing.arrowSpacing.spacingMarginTop,  
    }

});
HomeScreen.navigationOptions = {
    header: null,
};
