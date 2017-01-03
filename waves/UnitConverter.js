import React from 'react';
import { Text, TextInput, View } from 'react-native';
const styles = require('./Style.js');
const UnitConverterItem = require('./UnitConverterItem.js');
const globals = require('./Globals.js');

const TouchableElement = globals.TouchableElement;
const Item = globals.Item;


const units = [
  new Item("Pressure", [["psi", 1], ["bar", 0.0689476], ["MPa", 0.00689476]]),
  new Item("Flowrate", [["gpm", 1], ["bbl/m", 0.024], ["bbl/h", 1.43]]),
  new Item("Length", [["in", 1], ["cm", 2.54], ["mm", 25.4]]),
  new Item("Speed", [["rpm", 1], ["rph", 60]]),
]

class UnitConverter extends React.Component {
  doNothing = () => {

  }
  render() {
    let unitItems = units.map((x, i) => {
      // console.log("x",x)
      return <UnitConverterItem item={ units[i] } />
    })
    return (
      <View style={styles.container}>
        { unitItems }
        {/* <UnitConverterItem item={units[0]} /> */}
        
      </View>
    )
  }
}

module.exports = UnitConverter