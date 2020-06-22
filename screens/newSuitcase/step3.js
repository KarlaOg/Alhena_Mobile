import React, { Component, useEffect } from "react";
import { Image, View, TouchableOpacity, TextInput, Text, StyleSheet, CheckBox } from "react-native";
import axios from 'axios';
import {Colors, Spacing} from "../../assets/styles";
import { AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker'

import getEnvVars from "../../config/env";

const {apiUrl} = getEnvVars();
const {deepLink} = getEnvVars();

import {LocaleConfig} from 'react-native-calendars';

class step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
      startDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      endDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      suitcaseLink: "" 
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

    AsyncStorage.getItem('user')
    .then((data) => {
            AsyncStorage.getItem('JWT', (err, jwt) => {
                axios({
                    method: 'POST',
                    url: `${apiUrl}/api/add_suitcase`,
                    data: {
                      email: data,
                      name: this.props.getState().suitcaseName,
                      location: this.props.getState().suitcaseLocation,
                      start_date: new Date(this.state.startDate),
                      end_date: new Date(this.state.endDate)
                    },
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(jwt)}`,
                        'Content-Type': 'application/json',
                    }
                  })
                .then((response) => {
                    next();
                    this.setState({suitcaseLink: `${deepLink}/suitcase?id=${response.data}`})
                    saveState({ suitcaseLink: this.state.suitcaseLink });
                })
                .catch((error) => {
                    console.log(error)
                })
            });
        
    })
    .catch((err) => {
        console.log(err)
    })

  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    const { currentStep, totalSteps } = this.state;
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Image style={styles.logo} source={require('../../assets/images/robot-face.png')}/>
                <Text style={styles.mainText}>Quand souhaitez-vous {"\n"}partir en voyage ?</Text>
            </View>
             <Text style={styles.textDate}>Date de début</Text>
             <DatePicker
              style={{width: 200}}
              date={this.state.startDate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate={this.state.startDate}
              maxDate="2100-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36,
                },
                dateText:{
                  color: 'white'
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({startDate: date})}}
            />

             <Text style={styles.textDate}>Date de fin</Text>
             <DatePicker
              style={{width: 200}}
              date={this.state.endDate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate={this.state.endDate}
              maxDate="2100-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36,
                },
                dateText:{
                  color: 'white'
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({endDate: date})}}
            />
             <View style={styles.checkbox}>
                <CheckBox
                value={this.state.checked}
                onValueChange={() => this.setState({ checked: !this.state.checked })}
                />
                <Text style={styles.textCheckbox}> Je ne connais pas les dates</Text>
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