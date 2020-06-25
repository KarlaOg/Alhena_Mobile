import React, {Component} from "react";
import {Image, View, TouchableOpacity, TextInput, Text, StyleSheet, ImageBackground} from "react-native";
import {Colors, Spacing} from "../../assets/styles";
import {AsyncStorage} from 'react-native';
import {Stepbar} from "../../components/Stepbar";

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
        const {getTotalSteps, getCurrentStep} = props;
        return {
            totalSteps: getTotalSteps(),
            currentStep: getCurrentStep(),
        };
    };

    nextStep = () => {
        const {next, saveState} = this.props;
        // Save state for use in other steps
        saveState({suitcaseName: this.state.suitcaseName});

        // Go to next step
        next();
    };

    goBack() {
        const {back} = this.props;
        // Go to previous step
        back();
    }

    onChangeText(text) {
        this.setState({suitcaseName: text})
    }

    render() {
        AsyncStorage.getItem('user')
            .then(data => console.log(data))
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/background/background.png')}
                                 style={styles.imageBG}>
                    <TouchableOpacity style={styles.arrow} onPress={() => this.props.back()}>
                        <Image source={require('../../assets/images/arrows/flecheb.png')}/>
                    </TouchableOpacity>
                    <Stepbar max={4} step={0}/>
                    <View style={styles.main}>
                        <Image style={styles.logo} source={require('../../assets/images/robot/logobien.png')}/>
                        <Text style={styles.mainText}>Quel nom souhaite-tu{"\n"}donner à ta valise?</Text>
                    </View>
                    <TextInput
                        placeholderTextColor="white"
                        style={styles.input}
                        onChangeText={text => this.setState({suitcaseName: text})}
                        placeholder={"Nom de la valise"}
                    />
                    <TouchableOpacity onPress={this.nextStep}
                                      style={styles.button}><Text>Suivant</Text></TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

export default step1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.default.primary,
        ...Spacing.default.containerSpacing,
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
})
