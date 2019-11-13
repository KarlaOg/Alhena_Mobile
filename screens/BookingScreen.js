import React, {Component} from 'react';
import axios from 'axios';
import {View,
    StyleSheet,
    FlatList,
    Text,
    Dimensions,
    Button} from 'react-native';

import getEnvVars from "../config/env";

const {apiUrl} = getEnvVars();

export default class BookingScreen extends Component {
    constructor(props) {
        super(props);
        this.state= {
          elements: [],
        }
        this.getData= this.getData.bind(this);
        this.test = this.test.bind(this);
      }

    sendBooking(){
        console.log(apiUrl)
        axios.post(`${apiUrl}/reserveBooking`, {
                "id": 1,
                "email": "a@a.com",
            }
        ).then(function (response) {
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount(){
        this.getData().then((response) => {
            console.log(response)
            this.setState({
                elements: response
            })
            console.log(this.state.elements)
          })
    }

    async getData() {
        return new Promise((resolve, reject) => {
            axios.get(`${apiUrl}/getBookings`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(function (response) {
                    console.log(response.data);
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
    }

    test(item){
        return console.log(item)
    }

    renderItem({ item, index }) { 
        return(
         <View style={styles.item}>
             <Text>{item.name}</Text>
             <Text>{item.country}</Text>
             <Text>{item.city}</Text>
             <Text>{item.price}€</Text>
             <Text>Il reste {item.bookings_left} places</Text>
             <Button title="Réserver" onPress={() => {
                 axios.post(`${apiUrl}/reserveBooking`, {
                    "id": item.id,
                    "email": "a@a.com",
                }
                ).then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
             }}></Button>
         </View>
        )
      }
    render() {
        return (
            <View style={[styles.container]}>
                 <FlatList
                renderItem={this.renderItem}
                data={this.state.elements}
                style={styles.listItem} />
            </View>
            

        );
    }
}
let Window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      listItem: {
        flex: 1,
      },
    item: {
        marginTop: 50,
        left: 15,
        width: Window.width - 30,
        height: 200,
        borderWidth: 1,
        borderColor: 'red'
    },
})