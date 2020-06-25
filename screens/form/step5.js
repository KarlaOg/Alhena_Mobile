import React, {Component, useState} from "react";
import {
    Image,
    View,
    TouchableOpacity,
    TextInput,
    Text,
    StyleSheet,
    CheckBox,
    Clipboard,
    Slider,
    ImageBackground
} from "react-native";
import {Colors, Spacing} from "../../assets/styles";
import {FacebookButton} from "../../components/FacebookButton"
import axios from 'axios'
import {Stepbar} from "../../components/Stepbar";

class step5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSteps: "",
            currentStep: "",
            weather: "",
            goal: "",
            language: "",
            budget: 700
        };
    }

    static getDerivedStateFromProps = props => {
        const {getTotalSteps, getCurrentStep} = props;
        return {
            totalSteps: getTotalSteps(),
            currentStep: getCurrentStep()
        };
    };

    nextStep = () => {
        const {next, saveState} = this.props;
        AsyncStorage.getItem('user')
            .then((data) => {
                AsyncStorage.getItem('JWT', (err, jwt) => {
                    axios({
                        method: 'POST',
                        url: `${apiUrl}/api/updateprofile`,
                        data: {
                            "email": data,
                            "data": {
                                "activities": ["manger", "dormir"],
                                "weather": this.props.getState().weather,
                                "language": this.props.getState().language,
                                "budget": 700,
                                "goal": this.props.getState().goal
                            }
                        },
                        headers: {
                            'Authorization': `Bearer ${JSON.parse(jwt)}`,
                            'Content-Type': 'application/json',
                        }
                    })
                        .then((response) => {
                            next();
                            this.setState({suitcaseLink: `${deepLink}/suitcase?id=${response.data}`})
                            saveState({suitcaseLink: this.state.suitcaseLink});
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
        const {back} = this.props;
        // Go to previous step
        back();
    }

    render() {
        const {currentStep, totalSteps, saveState} = this.state;
        const [value, setValue] = useState(1)
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/background/background.png')}
                                 style={styles.imageBG}>
                    <TouchableOpacity style={styles.arrow} onPress={() => this.props.back()}>
                        <Image source={require('../../assets/images/arrows/flecheb.png')}/>
                    </TouchableOpacity>
                    <Stepbar max={5} step={0}/>
                    <Text style={styles.mainText}>Quel est votre budget {"\n"}moyen par nuit ?</Text>
                    <Slider
                        value={this.state.value}
                        onValueChange={value => this.setState({value})}
                    />
                    <Text>
                        Value: {this.state.value}
                    </Text>
                    <TouchableOpacity onPress={this.nextStep}
                                      style={styles.button}><Text>Continuer</Text></TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

export default step5;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Spacing.default.containerSpacing,
        backgroundColor: Colors.default.primary
    },
    imageBG: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    arrow: {
        marginTop: 80,
        marginBottom: 20,
    },
    main: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 40,
        paddingHorizontal: 10
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
