import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';

class Suitcase extends React.Component {
  static navigationOptions = {
    title: 'People',
  };
  render() {
    return (
      <View>
        <Text style={styles.text}></Text>
      </View>
    )
  }
}const styles = StyleSheet.create({
  text: {
    margin: 19,
    fontSize: 22,
  },
  image: {
    width: 400,
    height: 400,
  },
});export default Suitcase;
