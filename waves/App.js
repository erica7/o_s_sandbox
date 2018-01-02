import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
const styles = require('./Style.js');
// const Horsepower = require('./nah/Horsepower.js');
// const Flowrate = require('./nah/Flowrate.js');
const UnitConverter = require('./UnitConverter.js');
const FormulaView = require('./FormulaView.js');
const globals = require('./Globals.js');
const formulas = require('./Formulas.js');
const units = require('./Units.js');

const TouchableElement = globals.TouchableElement;
const flowrate = formulas.flowrate;
const horsepower = formulas.horsepower;
const unitArray = units.units;

// NOTES - App structure:
//  Globals and Formulas
//  App 
//   |-- FormulaView (no values)
//   |    |-- FormulaItem (values)
//   |-- UnitConverter
//        |-- UnitConverterItem

// FIXME
//  formula calculation 
//  decimal probs 

// TODO
//  consider if / how to clear individual fields on a single click
//  pre-populated common values such as number of plungers 

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
    title: 'WAVY'
  };
  render() {
    //each screen receives a navigation prop from react-navigation; extract the navigate method
    const { navigate } = this.props.navigation;
    return (
      <View style={[styles.container, styles.color_background_primary]}>
        <Text style={[styles.font, styles.color_font_primary]}>WAVY</Text>
        { menuButton(navigate, 'FormulaView', 'Flowrate', flowrate) }
        { menuButton(navigate, 'FormulaView', 'Horsepower', horsepower) }
        { menuButton(navigate, 'UnitConverter', 'Unit Converter', unitArray) }
        {/* { menuButton(navigate, 'Flowrate') }
        { menuButton(navigate, 'Horsepower') } */}
      </View>
    );
  }
}

//TODO make sure first page is explicit
const CalcApp = StackNavigator({
  Home: { screen: HomeScreen },
  FormulaView: { screen: FormulaView },
  UnitConverter: { screen: UnitConverter },
  // Horsepower: { screen: Horsepower },
  // Flowrate: { screen: Flowrate },
});

export default App = CalcApp;

// export default class App extends React.Component {
//   render() {
//     return <CalcApp />;
//   }
// }