import React, { Component } from "react";
import { Image, View, TouchableOpacity, TextInput, Text, StyleSheet, CheckBox } from "react-native";
import {Colors, Spacing} from "../../assets/styles";

class step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
      suitcaseLocation: "",
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
    saveState({ suitcaseLocation: this.state.suitcaseLocation });

    // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    const { currentStep, totalSteps, suitcaseName } = this.state;
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Image style={styles.logo} source={require('../../assets/images/robot-face.png')}/>
                <Text style={styles.mainText}>Où souhaitez-vous {"\n"}partir en voyage ?</Text>
            </View>
            <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ suitcaseLocation: text })}
            placeholder={"Recherchez"}
            />
             <View style={styles.checkbox}>
                <CheckBox
                value={this.state.checked}
                onValueChange={() => this.setState({ checked: !this.state.checked })}
                />
                <Text style={styles.textCheckbox}> Je ne connais pas la destination</Text>
            </View>
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