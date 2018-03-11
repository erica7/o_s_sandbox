import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
const styles = require('./Style.js');
const UnitConverter = require('./UnitConverter.js');
const FormulaView = require('./FormulaView.js');
const globals = require('./Globals.js');
const formulas = require('./Formulas.js');
const units = require('./Units.js');

const TouchableElement = globals.TouchableElement;

// App Structure:
//  Globals, Formulas, Units, Style
//  App 
//   |-- FormulaView (no values)
//   |    |-- FormulaItem (values)
//   |-- UnitConverter
//        |-- UnitConverterItem

// TODO
//  clear individual fields on a single click
//  quick select common values (e.g. number of plungers)
//  verify formulas and conversion factors
//  day & night modes

function printState(obj) {
  console.log(obj.state);
}

/**
 * Create a button component for the home menu
 * @param {Method} navigate - StackNavigator navigate method 
 * @param {String} navName - name of the screen in the StackNavigator
 * @param {String} navTitle (optional) - button text
 * @param {Object} p (optional) - object containing information to be passed to component
 * @return {Object} react component
 */
const menuButton = (navigate, navName, navTitle = navName, p = null) => { 
  return (
    <TouchableElement style={[styles.btn, styles.color_btn_primary, styles.width_full]} underlayColor="#ccc" activeOpacity={0.7} onPress={() => navigate(navName, {p: p})} >
      <Text style={[styles.btn_text, styles.color_font_secondary]}>{ navTitle.toUpperCase() }</Text>
    </TouchableElement>
  )
};

class HomeScreen extends React.Component {
  static navigationOptions = {
    // title: ' ',
    headerStyle: {
      backgroundColor: '#111',
    },
    headerTintColor: '#fff',
  };
  render() {
    //each screen receives a navigation prop from react-navigation; extract the navigate method to pass as a parameter later
    const { navigate } = this.props.navigation;
    return (
      <View style={[styles.container, styles.color_background_primary]}>
        <Text style={[styles.font, styles.color_font_primary, styles.font_biggest, styles.font_bold]}>THE OIL SPOT</Text>
        { menuButton(navigate, 'FormulaView', 'Flowrate', formulas.flowrate) }
        { menuButton(navigate, 'FormulaView', 'Horsepower', formulas.horsepower) }
        { menuButton(navigate, 'FormulaView', 'Rod Load', formulas.rodload) }
        { menuButton(navigate, 'UnitConverter', 'Unit Converter', units.units) }
      </View>
    );
  }
}

//TODO make sure first page is explicit
const CalcApp = StackNavigator({
  Home: { screen: HomeScreen },
  FormulaView: { screen: FormulaView },
  UnitConverter: { screen: UnitConverter },
});

export default App = CalcApp;

// export default class App extends React.Component {
//   render() {
//     return <CalcApp />;
//   }
// }