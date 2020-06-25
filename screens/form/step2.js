import React, { Component } from "react";
import { Image, View, TouchableOpacity, TextInput, Text, StyleSheet, CheckBox } from "react-native";
import {Colors, Spacing} from "../../assets/styles";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
      weather: "",
      goal: "se_ressourcer"
    };
  }

  static getDerivedStateFromProps = props => {
    const { getTotalSteps, getCurrentStep, weather } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep()
    };
  };

  nextStep = () => {
    const { next, saveState } = this.props;
    // Save state for use in other steps
    saveState({ goal: this.state.goal });
    console.log(this.props.getState().weather)

    // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    console.log(this.props)
    var radio_props = [
      {label: 'Se ressourcer', value: "se_ressourcer" },
      {label: 'L’aventure', value: "l’aventure" },
      {label: 'Une culture', value: "une_culture" },
      {label: 'Faire la fête', value: "faire_la_fête" },
    ];
    const { currentStep, totalSteps } = this.state;
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Image style={styles.logo} source={require('../../assets/images/robot-face.png')}/>
                <Text style={styles.mainText}>Quel est le but de votre {"\n"}voyage ?</Text>
            </View>
            <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({goal:value})}}
            />
            <TouchableOpacity onPress={this.nextStep} style={styles.button}><Text>Suivant</Text></TouchableOpacity>
        </View>
    )
  }
}

export default step2;

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
    }
})