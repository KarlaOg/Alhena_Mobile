import React, { Component } from "react";
import { Image, View, TouchableOpacity, TextInput, Text, StyleSheet } from "react-native";
import {Colors, Spacing} from "../../assets/styles";
import { AsyncStorage } from 'react-native';

class step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
      suitcaseName: "",
    };
  }

  static getDerivedStateFromProps = props => {
    const { getTotalSteps, getCurrentStep } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep(),
    };
  };

  nextStep = () => {
    const { next, saveState } = this.props;
    // Save state for use in other steps
    saveState({ suitcaseName: this.state.suitcaseName});

    // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  onChangeText(text){
    this.setState({suitcaseName: text})
  }

  render() {
    AsyncStorage.getItem('user')
    .then(data => console.log(data))
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Image style={styles.logo} source={require('../../assets/images/robot-face.png')}/>
                <Text style={styles.mainText}>Quel nom souhaite-tu{"\n"}donner à ta valise?</Text>
            </View>
            <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ suitcaseName: text })}
            placeholder={"Nom de la valise"}
            />
            <TouchableOpacity onPress={this.nextStep} style={styles.button}><Text>Suivant</Text></TouchableOpacity>
        </View>
    )
}
}

export default step1;

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
})