import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, AppRegistry, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
const styles = require('./Style.js');
const Item = require('./Item.js');
const Flowrate = require('./Flowrate.js');
const Horsepower = require('./Horsepower.js');
const Horse2 = require('./Horse2.js');
const CalcPage = require('./CalcPage.js');
const Calc = require('./Calc.js');

// ISSUES
//   clean up Item props
//   decimal probs 
//   handle press behavior, clearing fields
//   make button styling respond to active/inactive state
//   triggering calculation wrt multi-digit input  - check out onEndEditing, onSelectionChange vs onChangeText; currently resolved using active/inactive calculate button
//   DRY it up .... srsly


// DRY
//   Calculate and Clear All buttons are the same on each page 

// OTHER
//   state vs local variables   ...replace state entirely??
//   where to define: methods/variables in constructor vs outside constructor 
//   when is render executed?

function printState(obj) {
  console.log(obj.state);
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'WAVY'
  };
  render() {
    const { navigate } = this.props.navigation;
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>WAVY</Text>
        <TouchableElement style={[styles.btnMenu]} underlayColor="#ccc" activeOpacity={0.7} onPress={() => navigate('Another')}>
          <Text style={styles.btnText}>ANOTHER</Text>
        </TouchableElement>
        <TouchableElement style={[styles.btnMenu]} underlayColor="#ccc" activeOpacity={0.7} onPress={() => navigate('Flowrate')}>
          <Text style={styles.btnText}>FLOWRATE</Text>
        </TouchableElement>
        <TouchableElement style={[styles.btnMenu]} underlayColor="#ccc" activeOpacity={0.7} onPress={() => navigate('Horsepower')}>
          <Text style={styles.btnText}>HORSEPOWER</Text>
        </TouchableElement>
        {/* <TouchableElement style={[styles.btnMenu]} underlayColor="#ccc" activeOpacity={0.7} onPress={() => navigate('CalcPage')}>
          <Text style={styles.btnText}>CALC PAGE TEST</Text>
        </TouchableElement> */}
        <TouchableElement style={[styles.btnMenu]} underlayColor="#ccc" activeOpacity={0.7} onPress={() => navigate('Horse2')}>
          <Text style={styles.btnText}>HORSE 2</Text>
        </TouchableElement>
        <TouchableElement style={[styles.btnMenu]} underlayColor="#ccc" activeOpacity={0.7} onPress={() => navigate('Calc')}>
          <Text style={styles.btnText}>CALC HORSEY</Text>
        </TouchableElement>
      </View>
    );
  }
}

class Another extends React.Component {
  static navigationOptions = {
    title: 'Another',
  };
  render() {
    return (
      <View>
        <Text>Another</Text>
      </View>
    );
  }
}

export const CalcApp = StackNavigator({
  Home: { screen: HomeScreen },
  Another: { screen: Another },
  Flowrate: { screen: Flowrate },
  Horsepower: { screen: Horsepower },
  Horse2: { screen: Horse2 },
  // CalcPage: { screen: CalcPage },
  Calc: { screen: Calc },
});

export default class App extends React.Component {
  render() {
    return <CalcApp />;
  }
}