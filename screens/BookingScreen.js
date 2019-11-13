import React, {Component} from 'react';
import {View,
    StyleSheet,
    FlatList,
    Text,
    Dimensions,
    Button} from 'react-native';

export default class BookingScreen extends Component {
    constructor(props) {
        super(props);
        this.state= {
          elements: [
                {id:0,name:'yo',price:100000,country:"france",city:"paris",booking_left:50},
                {id:0,name:'yo',price:100000,country:"france",city:"paris",booking_left:50},
                {id:0,name:'yo',price:100000,country:"france",city:"paris",booking_left:50},
            ],
      }
      }

    renderItem({ item, index }) { 
        return(
         <View style={styles.item} >
             <Text>{item.name}</Text>
             <Text>{item.country}</Text>
             <Text>{item.city}</Text>
             <Text>{item.price}€</Text>
             <Text>Il reste {item.booking_left} places</Text>
             <Button title="Réserver"></Button>
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