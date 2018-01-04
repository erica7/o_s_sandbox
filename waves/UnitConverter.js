import React from 'react';
import { Text, TextInput, View, KeyboardAvoidingView, ScrollView } from 'react-native';
const styles = require('./Style.js');
const UnitConverterItem = require('./UnitConverterItem.js');
const globals = require('./Globals.js');

const TouchableElement = globals.TouchableElement;
const Item = globals.Item;

// TODO separate 
// Array of items which are passed as props to UnitConverter 
const units = [
  new Item("Pressure", [["psi", 1], ["bar", 0.0689476], ["MPa", 0.00689476]]),
  new Item("Flowrate", [["gpm", 1], ["bbl/m", 0.024], ["bbl/h", 1.43]]),
  new Item("Length", [["in", 1], ["cm", 2.54], ["mm", 25.4]]),
  new Item("Speed", [["rpm", 1], ["rph", 60]]),
  // 'garbage' items added to develop scrolling and keyboard response (see ScrollView and KeyboardAvoidingView):
  new Item("aaaa", [["psi", 1], ["bar", 0.0689476], ["MPa", 0.00689476]]),
  new Item("bbbb", [["gpm", 1], ["bbl/m", 0.024], ["bbl/h", 1.43]]),
  new Item("cccc", [["in", 1], ["cm", 2.54], ["mm", 25.4]]),
  new Item("dddd", [["rpm", 1], ["rph", 60]]),
  new Item("eeee", [["psi", 1], ["bar", 0.0689476], ["MPa", 0.00689476]]),
  new Item("ffff", [["gpm", 1], ["bbl/m", 0.024], ["bbl/h", 1.43]]),
  new Item("gggg", [["in", 1], ["cm", 2.54], ["mm", 25.4]]),
  new Item("hhhh", [["rpm", 1], ["rph", 60]]),
]

class UnitConverter extends React.Component {
  render() {
    let unitItems = units.map((x, i) => {
      return <UnitConverterItem item={ units[i] } />
    })
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={styles.container}>
        <ScrollView style={styles.container}>
          { unitItems }
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

module.exports = UnitConverter