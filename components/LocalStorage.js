import React from "react";
import {AsyncStorage} from 'react-native';

class LocalStorage extends React.Component {
    constructor(props) {
        super(props);
    }

    static async getToken() {
     
            const jwt = await AsyncStorage.getItem('JWT', (err, jwt) => {
                return jwt
            });
    
    }

    static async storeToken(token) {
        await AsyncStorage.setItem('JWT', JSON.stringify(token), () => {
            return 200
        });
    }
}

export default LocalStorage