import React, {Component} from 'react';
import { WebView } from 'react-native-webview';


 export default class WebPageScreen extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://www.lepotcommun.fr/'}}
        style={{marginTop: 20}}
      />
    );
  }
}

