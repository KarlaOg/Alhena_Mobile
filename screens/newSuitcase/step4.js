import React, { Component } from "react";
import { Image, View, TouchableOpacity, TextInput, Text, StyleSheet, CheckBox, Clipboard  } from "react-native";
import {Colors, Spacing} from "../../assets/styles";
import {FacebookButton} from "../../components/FacebookButton"

class step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: ""
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
    const { next, saveState } = this.props;
    // Save state for use in other steps
    saveState({ name: "samad" });

    // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    const { currentStep, totalSteps, saveState } = this.state;
    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Partagez ce code et {"\n"}invitez vos amis !</Text>
            <Text style={styles.text}>Avant de continuer, partagez ce code  et invitez vos amis à rejoindre votre valise !</Text>
            <View style={styles.row}>
              <Text style={styles.suitcaseLink}>{this.props.getState().suitcaseLink}</Text>
              <TouchableOpacity style={styles.copyImg} onPress={() => Clipboard.setString(this.props.getState().suitcaseLink)}>
                <Image source={require('../../assets/images/copy_clipboard.png')}/>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.nextStep} style={styles.button}><Text>Continuer</Text></TouchableOpacity>
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
    mainText: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 60
    },
    text: {
        color: "#ffffff",
        fontSize: 15,
        marginTop: 40
    },
    input: {
        height: 40, 
        borderColor: '#41FFE1', 
        borderBottomWidth: 1, 
        color: "#fff",
        marginTop: 40
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
    suitcaseLink: {
        color: '#41FFE1',
        marginTop: 20
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 50,
      marginBottom: 50 
    },
    copyImg: {
      width: 20,
      height: 20
    }
})