import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, AppRegistry, StyleSheet, Text, TextInput, View, Button, Modal, Picker } from 'react-native';
import { StackNavigator } from 'react-navigation';
const styles = require('./Style.js');
const Horsepower = require('./nah/Horsepower.js');
const Flowrate = require('./nah/Flowrate.js');
const UnitConverter = require('./UnitConverter.js');
const FormulaView = require('./FormulaView.js');
const globals = require('./Globals.js');

const TouchableElement = globals.TouchableElement;

// ISSUES
//   clean up Item props
//   decimal probs 
//   handle press behavior, clearing fields
//   make button styling respond to active/inactive state
//   triggering calculation wrt multi-digit input  - check out onEndEditing, onSelectionChange vs onChangeText; currently resolved using active/inactive calculate button
//   DRY it up .... srsly

// TODO
//   done for flowrate|change units on calc pages - click on the unit, present modal, update unit & calculation accordingly 
//   done for flowrate|populate unit converter modal dynamically based on item options 
//   unit converter - probably single page, only the common stuff 
//   pre-populated common values such as number of plungers 

// DRY
//   Calculate and Clear All buttons are the same on each page 

// OTHER
//   state vs local variables   ...replace state entirely??
//   where to define: methods/variables in constructor vs outside constructor 
//   when is render executed?

function printState(obj) {
  console.log(obj.state);
}

/**
 * Create a button component for the home menu
 * @param {Method} navigate - StackNavigator navigate method 
 * @param {String} navName - name of the screen in the StackNavigator
 * @param {String} navTitle (optional) - button text
 * @return {Object} react component
 */
const menuButton = (navigate, navName, navTitle = navName) => { 
  return (
    <TouchableElement style={[styles.btnMenu]} underlayColor="#ccc" activeOpacity={0.7} onPress={() => navigate(navName)} >
      <Text style={styles.btnText}>{ navTitle.toUpperCase() }</Text>
    </TouchableElement>
  )
};

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'WAVY'
  };
  render() {
    //each screen receives a navigation prop from react-navigation; extract the navigate method
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>WAVY</Text>
        { menuButton(navigate, 'FormulaView', 'Formula View') }
        { menuButton(navigate, 'Flowrate') }
        { menuButton(navigate, 'Horsepower') }
        { menuButton(navigate, 'UnitConverter', 'Unit Converter') }
      </View>
    );
  }
}

//TODO make sure first page is explicit
const CalcApp = StackNavigator({
  Home: { screen: HomeScreen },
  Horsepower: { screen: Horsepower },
  Flowrate: { screen: Flowrate },
  UnitConverter: { screen: UnitConverter },
  FormulaView: { screen: FormulaView },
});

export default App = CalcApp;

// export default class App extends React.Component {
//   render() {
//     return <CalcApp />;
//   }
// }