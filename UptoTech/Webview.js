import React from 'react';
import { StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
//import {useLocation} from 'react-router-native';

export default function Webview({route}){
    //const {itemUrl}= route.params;
    //console.log(match.params.id)
    
    /*let location= useLocation();
    const link= location.state.webLink;*/
    
    //console.log(link);
    //console.log('URL is: ',itemUrl);
    // const {itemURL}= JSON.stringify(itemUrl); 
    // console.log('URL is: ',itemURL);

    const {itemUrl}= route.params;

    return(
        <WebView source={{uri: itemUrl}} style={{marginTop: 30}}/>
    );
}

const styles= StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
});