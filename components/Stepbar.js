import React from 'react';
import {Component} from 'react';
import {FlatList, View, StyleSheet, Dimensions} from 'react-native';
import {Colors, Navbar} from "../assets/styles/";

export class Stepbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [...Array(this.props.max).keys()],
            step: this.props.step,
        };
        console.log(this.state.elements)
    }

    renderItem = ({item, index}) => {
        if (this.state.elements.length !== index + 1) {
            return (
                <View
                    style={this.state.step >= index ? [styles.circle, styles.step, {marginRight: Window.width / (this.state.elements.length)}] : [styles.circle, {marginRight: Window.width / (this.state.elements.length)}]}>
                    <View
                        style={this.state.step > index ? [styles.bar, styles.step, {width: Window.width / (this.state.elements.length)}] : [styles.bar, {width: Window.width / (this.state.elements.length)}]}/>
                </View>
            )
        }
        return (
            <View
                style={this.state.step >= index ? [styles.circle, styles.step, {marginRight: Window.width / (this.state.elements.length)}] : [styles.circle, {marginRight: Window.width / (this.state.elements.length)}]}/>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.navBar}
                    renderItem={this.renderItem}
                    data={this.state.elements}
                    numColumns={this.state.elements.length}
                />
            </View>
        );
    }
}

let Window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: Colors.default.primary,
    },
    step: {
        backgroundColor: Colors.default.secondary,
    },
    circle: {
        ...Navbar.default.circle
    },
    bar: {
        ...Navbar.default.bar,
    },
    navBar: {
        ...Navbar.default.navBar
    }
});

