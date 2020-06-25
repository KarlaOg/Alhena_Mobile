import React, {Component} from "react";
import {
    Image,
    View,
    TouchableOpacity,
    TextInput,
    Text,
    StyleSheet,
    CheckBox,
    Clipboard,
    Dimensions, ImageBackground
} from "react-native";
import {Colors, Spacing} from "../../assets/styles";
import {FacebookButton} from "../../components/FacebookButton"
import {Stepbar} from "../../components/Stepbar";

class step4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSteps: "",
            currentStep: ""
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
        // Save state for use in other steps
        saveState({name: "samad"});

        // Go to next step
        next();
    };

    goBack() {
        const {back} = this.props;
        // Go to previous step
        back();
    }

    render() {
        const {currentStep, totalSteps, saveState} = this.state;
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/background/background.png')}
                                 style={styles.imageBG}>
                    <TouchableOpacity style={styles.arrow} onPress={() => this.props.back()}>
                        <Image source={require('../../assets/images/arrows/flecheb.png')}/>
                    </TouchableOpacity>
                    <Stepbar max={4} step={3}/>
                    <Text style={styles.mainText}>Partagez ce code et {"\n"}invitez vos amis !</Text>
                    <Text style={styles.text}>Avant de continuer, partagez ce code et invitez vos amis à rejoindre votre
                        valise !</Text>
                    <View style={styles.row}>
                        <Text style={styles.suitcaseLink}>{this.props.getState().code}</Text>
                        <TouchableOpacity style={styles.copyImg}
                                          onPress={() => Clipboard.setString(this.props.getState().suitcaseLink)}>
                            <Image source={require('../../assets/images/copy_clipboard.png')}/>
                        </TouchableOpacity>
                        <View style={styles.bar}/>
                    </View>
                    <TouchableOpacity onPress={this.nextStep}
                                      style={styles.button}><Text
                        style={styles.buttonText}>Continuer</Text></TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

export default step4;
let Window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Spacing.default.containerSpacing,
        backgroundColor: Colors.default.primary
    }, imageBG: {
        width: '100%',
        height: '100%',
        flex: 1
    }, arrow: {
        marginTop: 80, marginBottom: 20,

    },
    mainText: {
        color: "#ffffff",
        fontSize: 30,
        fontFamily: 'title-font2',
        marginTop: 60
    },
    text: {
        color: "#ffffff",
        fontSize: 18,
        fontFamily: 'text-font',
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
        fontFamily: 'text-font',
        marginHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 50
    }, buttonText: {
        fontFamily: 'text-font',
        fontSize: 18,
    }
    ,
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
        color: 'white',
        fontSize: 25,
        marginBottom: 10,
    },
    row: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    copyImg: {
        width: 20,
        height: 20
    },
    bar: {
        width: Window.width - 20,
        height: 2,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#41FFE1",
    },
})
