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
            weather: "",
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
        saveState({weather: this.state.weather});

        // Go to next step
        next();
    };

    goBack() {
        const {back} = this.props;
        // Go to previous step
        back();
    }

    pressButton() {

    }


    render() {
        const {weather} = this.state;
        var radio_props = [
            {label: 'Polaire', value: "polaire"},
            {label: 'Montagnard', value: "montagnard"},
            {label: 'Tempéré', value: "tempéré"},
            {label: 'Équatorial', value: "équatorial"},
            {label: 'Tropical', value: "tropical"},
            {label: 'Désertique', value: "désertique"}
        ];
        AsyncStorage.getItem('user')
            .then(data => console.log(data))
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/background/background.png')}
                                 style={styles.imageBG}>
                    <TouchableOpacity style={styles.arrow} onPress={() => this.props.back()}>
                        <Image source={require('../../assets/images/arrows/flecheb.png')}/>
                    </TouchableOpacity>
                    <Stepbar max={5} step={0}/>
                    <View style={styles.main}>
                        <Image style={styles.logo} source={require('../../assets/images/robot/iconeContent.png')}/>
                        <Text style={styles.mainText}>Dans quel climat {"\n"}préférez-vous partir ?</Text>
                    </View>

                    <View style={styles.radioRow}>
                        <View style={styles.radioItem}>
                            <TouchableOpacity onPress={() => {
                                this.setState({weather: 'polaire'})
                            }}>
                                <View
                                    style={weather === 'polaire' ? [styles.radioImageContainer, styles.checked] : styles.radioImageContainer}>
                                    <Image style={styles.radioImage}
                                           source={require('../../assets/images/form/bon.png')}/>
                                </View>
                                <Text style={styles.radioLabel}>Polaire</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.radioItem}>
                            <TouchableOpacity onPress={() => {
                                this.setState({weather: 'montagnard'})
                            }}>
                                <View
                                    style={weather === 'montagnard' ? [styles.radioImageContainer, styles.checked] : styles.radioImageContainer}>
                                    <Image style={styles.radioImage}
                                           source={require('../../assets/images/form/bon.png')}/>
                                </View>
                                <Text style={styles.radioLabel}>Montagnard</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.radioItem}>
                            <TouchableOpacity onPress={() => {
                                this.setState({weather: 'tempéré'})
                            }}>
                                <View
                                    style={weather === 'tempéré' ? [styles.radioImageContainer, styles.checked] : styles.radioImageContainer}>
                                    <Image style={styles.radioImage}
                                           source={require('../../assets/images/form/bon.png')}/>
                                </View>
                                <Text style={styles.radioLabel}>Tempéré</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.radioRow}>
                        <View style={styles.radioItem}>
                            <TouchableOpacity onPress={() => {
                                this.setState({weather: 'tropical'})
                            }}>
                                <View
                                    style={weather === 'tropical' ? [styles.radioImageContainer, styles.checked] : styles.radioImageContainer}>
                                    <Image style={styles.radioImage}
                                           source={require('../../assets/images/form/bon.png')}/>
                                </View>
                                <Text style={styles.radioLabel}>Tropical</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.radioItem}>
                            <TouchableOpacity onPress={() => {
                                this.setState({weather: 'désertique'})
                            }}>
                                <View
                                    style={weather === 'désertique' ? [styles.radioImageContainer, styles.checked] : styles.radioImageContainer}>
                                    <Image style={styles.radioImage}
                                           source={require('../../assets/images/form/bon.png')}/>
                                </View>
                                <Text style={styles.radioLabel}>Désertique</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.radioItem}>
                            <TouchableOpacity onPress={() => {
                                this.setState({weather: 'tempéré'})
                            }}>
                                <View
                                    style={weather === 'tempéré' ? [styles.radioImageContainer, styles.checked] : styles.radioImageContainer}>
                                    <Image style={styles.radioImage}
                                           source={require('../../assets/images/form/bon.png')}/>
                                </View>
                                <Text style={styles.radioLabel}>Tempéré</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

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
    input: {
        height: 40,
        borderColor: '#41FFE1',
        borderBottomWidth: 1,
        color: "#fff",
        marginTop: 70
    },
    logo: {
        width: 60,
        height: 60,
        marginRight: 20
    },
    mainText: {
        color: "#ffffff",
        fontSize: 22,
        fontFamily: 'title-font2'
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
    radioRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    radioImageContainer: {
        width: 110,
        height: 110,
        marginHorizontal: 5,
        backgroundColor: '#4A5258',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioImage: {},
    radioLabel: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontFamily: 'text-font',
    },
    radioButton: {
        opacity: 0,
    },
    checked: {
        backgroundColor: '#41FFE1',
    },
    radioItem: {}
})
