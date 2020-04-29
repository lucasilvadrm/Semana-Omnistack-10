import React from 'react';
import { StatusBar, YellowBox } from 'react-native'
// import { StyleSheet, Text, View } from 'react-native';

import Routes from './src/routes'

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() {
  return (
    <> 
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
      <Routes/>
    </>
    
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   title: {
//     fontWeight: "bold",
//     color: '#fff',
//     fontSize: 32,
//   }
// });
