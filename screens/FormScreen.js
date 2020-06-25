import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Step1 from "./form/step1";
import Step2 from "./form/step2";
import Step3 from "./form/step3";
import Step4 from "./form/step4";
import Step5 from "./form/step5";
import AnimatedMultistep from "react-native-animated-multistep";

const allSteps = [
    { name: "step 1", component: Step1 },
    { name: "step 2", component: Step2 },
    { name: "step 3", component: Step3 },
    { name: "step 4", component: Step4 },
    { name: "step 5", component: Step5 },
  ];


  export default class FormScreen extends Component {
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
}