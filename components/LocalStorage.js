import React from "react";
import {AsyncStorage} from 'react-native';

class LocalStorage extends React.Component {
    constructor(props) {
        super(props);
    }

    static async getToken() {
        try {
            const jwt = await AsyncStorage.getItem('JWT');
            return JSON.parse(jwt);
        } catch (error) {
            console.error(error);
        }
    }

    static async storeToken(token) {
        await AsyncStorage.setItem('JWT', JSON.stringify(token), () => {
            return 200
        });
    }
}

export default LocalStorage
