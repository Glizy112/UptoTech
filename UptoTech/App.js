//import { StatusBar } from 'expo-status-bar';
//import React from 'react';
//import { StyleSheet, View} from 'react-native';
//import { NativeRouter, Route, Link } from "react-router-native";
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Webview from './Webview';
import Profile from './Profile';
import Card from './Card';

const stack= createStackNavigator();

export default function App() {

  return (
    // <NativeRouter>
    //   <Route exact path="/" component={Home}/>
    //   <Route path="/webview" component={Webview}/>
    // </NativeRouter>
    <NavigationContainer>
      <stack.Navigator initialRouteName={Home} headerMode="none">
        <stack.Screen name="homePage" component={Home}/>
        <stack.Screen name="webView" component={Webview}/>
        <stack.Screen name="profile" component={Profile}/>
        <stack.Screen name="card" component={Card}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  header: {
    //flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    marginTop: 48,
    marginLeft: 4,
    marginRight: 12,
    justifyContent: 'space-between',
  },

  search: {
    position: 'absolute',
    backgroundColor: 'rgba(220,221,225,0.3)',
    width: 240,
    height: 45,
    paddingHorizontal: 16,
    marginLeft: 32,
    //alignSelf: 'center',
    //justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    textDecorationLine: 'none',
  }
});
