import React, {Component} from "react";
import {Image, View, TouchableOpacity, TextInput, Text, StyleSheet, CheckBox, ImageBackground} from "react-native";
import {Colors, Spacing} from "../../assets/styles";
import {Stepbar} from "../../components/Stepbar";

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
        const {getTotalSteps, getCurrentStep} = props;
        return {
            totalSteps: getTotalSteps(),
            currentStep: getCurrentStep()
        };
    };

    nextStep = () => {
        const {next, saveState, suitcaseName} = this.props;
        // Save state for use in other steps
        saveState({suitcaseLocation: this.state.suitcaseLocation});

        // Go to next step
        next();
    };

    goBack() {
        const {back} = this.props;
        // Go to previous step
        back();
    }

    render() {
        const {currentStep, totalSteps, suitcaseName} = this.state;
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/background/background.png')}
                                 style={styles.imageBG}>
                    <TouchableOpacity style={styles.arrow} onPress={() => this.props.back()}>
                        <Image source={require('../../assets/images/arrows/flecheb.png')}/>
                    </TouchableOpacity>
                    <Stepbar max={4} step={1}/>
                    <View style={styles.main}>
                        <Image style={styles.logo} source={require('../../assets/images/robot/logomotivé.png')}/>
                        <Text style={styles.mainText}>Où souhaitez-vous {"\n"}partir en voyage ?</Text>
                    </View>
                    <TextInput
                        placeholderTextColor="white"
                        style={styles.input}
                        onChangeText={text => this.setState({suitcaseLocation: text})}
                        placeholder={"Recherchez"}
                    />
                    <View style={styles.checkbox}>
                        <CheckBox
                            uncheckedColor={"#fff"}
                            style={styles.checkboxBox}
                            value={this.state.checked}
                            onValueChange={() => this.setState({checked: !this.state.checked})}
                        />
                        <Text style={styles.textCheckbox}> Je ne connais pas la destination</Text>
                    </View>
                    <TouchableOpacity onPress={this.nextStep}
                                      style={styles.button}><Text>Suivant</Text></TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

export default step2;

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
    }, arrow: {
        marginTop: 80, marginBottom: 20,

    },
    main: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 40,
        paddingHorizontal: 10
    },
    mainText: {
        color: "#ffffff",
        fontSize: 22,
        fontFamily: 'title-font2'
    },
    input: {
        height: 40,
        borderColor: '#41FFE1',
        borderBottomWidth: 1,
        color: "#fff",
        fontFamily: 'text-font',
        fontSize: 20,
        marginTop: 40
    },
    logo: {
        width: 80,
        height: 80,
        marginRight: 20
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#41FFE1',
        color: '#000',
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 50
    },
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },

    textCheckbox: {
        color: 'white',
        fontFamily: 'text-font',
        fontSize: 18,
    }
})
