import React from 'react';
import {Component} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {Colors, Navbar} from "../assets/styles/";

export class Stepbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [1, 2, 3, 4, 5],
            step: 2,
        };
    }

    renderItem = ({item, index}) => {
        if (this.state.elements.length !== index + 1) {
            return (
                <View style={this.state.step >= index ? [styles.circle, styles.step] : styles.circle}>
                    <View style={this.state.step > index ? [styles.bar, styles.step] : styles.bar}/>
                </View>
            )
        }
        return (
            <View style={this.state.step >= index ? [styles.circle, styles.step] : styles.circle}/>
        )
    }

    render() {
        return (
            <View>
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

const styles = StyleSheet.create({
    step: {
        backgroundColor: Colors.default.secondary,
    },
    circle: {
        ...Navbar.default.circle
    },
    bar: {
        ...Navbar.default.bar
    },
    navBar: {
        ...Navbar.default.navBar
    }
});

