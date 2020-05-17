import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';

const suitcase = {

  0: {
    id:0
  },
  1: {
    id:1
  },
  2: {
    id:2
  },
  3: {
    id:3
  }
}

class Suitcase extends React.Component {
  static navigationOptions = {
    title: 'People',
  };
  render() {
    console.log(this.props.uriPrefix)
    //id = this.props.navigation.state.params
    //const { id } = this.props.navigation.state.params; // B
    //if (!suitcase[id]) return <Text>Sorry, no data exists for this user</Text>
    return ( // C
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