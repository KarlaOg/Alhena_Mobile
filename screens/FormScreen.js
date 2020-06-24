import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, Spacing} from "../assets/styles";
import {Stepbar} from "../components/Stepbar";

export default class FormScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Stepbar/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Spacing.default.containerSpacing,
        justifyContent: 'center',
        backgroundColor: Colors.default.primary
    },
});
FormScreen.navigationOptions = {
    header: null,
};
