import React, { Component, useEffect } from "react";
import { Image, View, TouchableOpacity, TextInput, Text, StyleSheet, CheckBox } from "react-native";
import axios from 'axios';
import {Colors, Spacing} from "../../assets/styles";
import { AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import getEnvVars from "../../config/env";

const {apiUrl} = getEnvVars();
const {deepLink} = getEnvVars();

import {LocaleConfig} from 'react-native-calendars';

class step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
      weather: "",
      goal: "",
      language: true
    };
  }

  static getDerivedStateFromProps = props => {
    const { getTotalSteps, getCurrentStep } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep()
    };
  };

  nextStep = () => {
    const { next, saveState, suitcaseName } = this.props;
    // Save state for use in other steps
    //saveState({ suitcaseLocation: this.state.suitcaseLocation });

    // Go to next step
    next();

  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    var radio_props = [
      {label: 'oui', value: true },
      {label: 'non', value: false },
    ];
    const { currentStep, totalSteps } = this.state;
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Image style={styles.logo} source={require('../../assets/images/robot-face.png')}/>
                <Text style={styles.mainText}>La langue est-elle une {"\n"}barrière pour vous ?</Text>
            </View>
             <View style={styles.checkbox}>
             <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({language:value})}}
            />
              </View>
            <TouchableOpacity onPress={this.nextStep} style={styles.button}><Text>Suivant</Text></TouchableOpacity>
        </View>
    )
  }
}


export default step4;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Spacing.default.containerSpacing,
        backgroundColor:Colors.default.primary  
    },
    main: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 70,
        marginBottom: 30,
        paddingHorizontal: 20
    },
    mainText: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    input: {
        height: 40, 
        borderColor: '#41FFE1', 
        borderBottomWidth: 1, 
        color: "#fff",
        marginTop: 70
    },
    logo: {
        width: 60,
        height: 60    
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#41FFE1',
        color: '#000',
        marginHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 50
    },
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    textCheckbox: {
        color: 'white',
    },
    textDate: {
      color: 'white',
      marginTop: 10,
      marginBottom: 10
    }
})