import React from 'react';
import axios from 'axios';
import { Component } from 'react';
import { Text } from 'react-native';

export class CallApi extends Component {
  state = {
    data: {}
  }

  async getData() {
    const response = await fetch("https://pacaud-lilian.com/serverpfe", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }   
        }); 
        console.log(response)
    const json = await response.json();
    console.log(json);     // <-- (5) [Object, Object, Object, Object, Object]
    return json;
  }

  componentDidMount() {
    console.log(this.getData)
    this.getData()
    .then((data) => {
      console.log(data.test)
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(data),
      })  
    });
  }

  render() {
    return (
      <Text>{this.data}</Text>
    )
  }
}
