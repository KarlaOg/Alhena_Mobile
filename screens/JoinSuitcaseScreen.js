import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    Keyboard,
    View
} from "react-native";
import {Colors, Spacing} from "../assets/styles";
import SuitcaseScreen from "./SuitcaseScreen";

export default class JoinSuitcaseScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first: null,
            second: null,
            third: null,
            fourth: null,
            disabled: true,
        }
    }

    joinSuitcase() {
        const code = this.state.first + this.state.second + this.state.third + this.state.fourth
        console.log(code)
    }

    goTo(input) {
        input.focus()
        if (this.state.first !== null && this.state.second !== null && this.state.third !== null && this.state.fourth !== null) {
            this.setState({disabled: false})
            Keyboard.dismiss()
        } else {
            this.setState({disabled: true})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.arrow} onPress={() => this.props.navigation.navigate('SuitCaseHome')}>
                    <Image source={require('../assets/images/arrows/flecheb.png')}/>
                </TouchableOpacity>
                <ImageBackground source={require('../assets/images/background/background.png')}
                                 style={styles.imageBG}>
                    <Text style={styles.mainText}>Insérez le code pour rejoindre la valise :</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            textAlign={'center'}
                            style={styles.input}
                            ref={(input) => {
                                this.firstInput = input;
                            }}
                            maxLength={1}
                            onChangeText={(text => {
                                this.setState({first: text})
                                text.length > 0 ? this.goTo(this.secondInput) : this.goTo(this.firstInput)
                            })}
                        />
                        <TextInput
                            maxLength={1}
                            textAlign={'center'}
                            style={styles.input}
                            ref={(input) => {
                                this.secondInput = input;
                            }}
                            onChangeText={(text => {
                                this.setState({second: text})
                                text.length > 0 ? this.goTo(this.thirdInput) : this.goTo(this.secondInput)
                            })}
                        /><TextInput
                        textAlign={'center'}
                        maxLength={1}
                        style={styles.input}
                        ref={(input) => {
                            this.thirdInput = input;
                        }}
                        onChangeText={(text => {
                            this.setState({third: text})
                            text.length > 0 ? this.goTo(this.fourthInput) : this.goTo(this.thirdInput)
                        })}
                    /><TextInput
                        textAlign={'center'}
                        maxLength={1}
                        style={styles.input}
                        ref={(input) => {
                            this.fourthInput = input;
                        }}
                        onChangeText={(text => {
                            this.setState({fourth: text}, () => {
                                this.goTo(this.fourthInput)
                            });
                        })}
                    />
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image style={styles.logo} source={require('../assets/images/robot/logofull.png')}/>
                    </View>
                    <TouchableHighlight
                        disabled={this.state.disabled === true}
                        style={this.state.disabled === true ? [styles.button, styles.disabled] : styles.button}
                        onPress={() => {
                            this.joinSuitcase()
                        }}>
                        <Text style={styles.buttonText}>Rejoindre</Text>
                    </TouchableHighlight>
                </ImageBackground>
            </View>
        );
    }
}
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

    }, mainText: {
        color: "#ffffff",
        fontSize: 30,
        fontFamily: 'title-font2',
        marginTop: 50
    },
    inputContainer: {
        marginVertical: 20,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    input: {
        margin: 10,
        width: 80,
        height: 80,
        backgroundColor: '#4A5258',
        fontSize: 70,
        color: 'white',
        fontFamily: 'text-font',
    },
    button: {
        width: Window.width - 50,
        margin: 15,
        padding: 20,
        backgroundColor: "#41FFE1",
        borderRadius: 4,
        color: "#363F46"
    },
    disabled: {
        backgroundColor: '#728694',
    }, buttonText: {
        textAlign: "center",
        fontFamily: 'text-font',
        fontSize: 20,
    },
})
JoinSuitcaseScreen.navigationOptions = {
    header: null,
    footer: null,
};

