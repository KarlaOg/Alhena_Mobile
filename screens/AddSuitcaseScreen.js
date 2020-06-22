import React, {Component} from 'react';
import { Text, Button,StyleSheet, View, Image } from 'react-native';
import axios from 'axios';
import {Colors, Spacing} from "../assets/styles";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Step1 from "./newSuitcase/step1";
import Step2 from "./newSuitcase/step2";
import Step3 from "./newSuitcase/step3";
import Step4 from "./newSuitcase/step4";
import AnimatedMultistep from "react-native-animated-multistep";

const allSteps = [
    { name: "step 1", component: Step1 },
    { name: "step 2", component: Step2 },
    { name: "step 3", component: Step3 },
    { name: "step 4", component: Step4 },
  ];

export default class AddSuitcaseScreen extends Component {
    /* define the method to be called when you go on next step */

  onNext = () => {
    console.log("Next");
  };

  /* define the method to be called when you go on back step */

  onBack = () => {
    console.log("Back");
  };

  /* define the method to be called when the wizard is finished */

  finish = finalState => {
    console.log(finalState);
  };

  /* render MultiStep */
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AnimatedMultistep
          steps={allSteps}
          onFinish={this.finish}
          onBack={this.onBack}
          onNext={this.onNext}
          comeInOnNext="bounceInUp"
          OutOnNext="bounceOutDown"
          comeInOnBack="bounceInDown"
          OutOnBack="bounceOutUp"
        />
      </View>
    );
  }
    /*render() {
        return (
            <View style={styles.container}>
                <View style={styles.main}>
                    <Image style={styles.logo} source={require('../assets/images/robot-face.png')}/>
                    <Text style={styles.mainText}>Quel nom souhaite-tu{"\n"}donner à ta valise?</Text>
                </View>
                <TextInput
                style={styles.input}
                onChangeText={text => onChangeText(text)}
                placeholder={"Nom de la valise"}
                />
                <TouchableOpacity style={styles.button}><Text>Suivant</Text></TouchableOpacity>
            </View>
        )
    }*/
}

const styles = StyleSheet.create({

})