import React from 'react';
import { View, Text } from 'react-native';
const styles = require('./Style.js');
const FormulaItem = require('./FormulaItem.js');
const globals = require('./Globals.js');

const TouchableElement = globals.TouchableElement;

// item Class:
// class Item {  //never holds value
//   constructor(displayName, units) {
//     this.displayName = displayName;
//     this.units = units; //array of possible inputs 
//     // this.conversion = conversion; //array of conversion factors
//   }
//   getDisplayName() {
//     // return displayName
//     return this.displayName;
//   }
//   getUnits() {
//     // console.log("getUnits this.units", this.units)
//     return this.units;
//   }
// }
const Item = globals.Item;


// props passed to FormulaView are items, e.g.:
// const flowrate = {
//   s: new Item("Speed", [["rpm", 1], ["rph", 60]]),
//   n: new Item("Number of Plungers", [["qty", 1]]),
//   d: new Item("Plunger Diameter", [["in", 1], ["cm", 2.54]]),
//   l: new Item("Stroke", [["in", 1], ["cm", 2.54]]),
//   q: new Item("Flowrate", [["gpm", 1], ["bbl/m", 0.024], ["bbl/h", 1.43]]),
// }
const flowrate = [
  {s: new Item("Speed", [["rpm", 1], ["rph", 60]])},
  {n: new Item("Number of Plungers", [["qty", 1]])},
  {d: new Item("Plunger Diameter", [["in", 1], ["cm", 2.54]])},
  {l: new Item("Stroke", [["in", 1], ["cm", 2.54]])},
  {q: new Item("Flowrate", [["gpm", 1], ["bbl/m", 0.024], ["bbl/h", 1.43]])},
]

// const inputs = [
//   ['rpm'],
//   ['qty'],
//   ['in','cm'],
//   ['in','cm'],
//   ['gpm','bbl/m','bbl/h'],
// ];

//always uses canonical units 
const formulas = [
  {
    constraints: [true, true, true, true, false],
    formula: function(s, n, d, l, q_null) {
      return 0.25 * Math.PI * Math.pow(d.getValue(), 2) * l.getValue() * n.getValue() * s.getValue() * 1 / 231;
    }
  }
]

export class FormulaView extends React.Component {
  constructor(props) {
    super(props);
    this.item = new Item("Speed", [["rpm", 1], ["rph", 60]]);
    // this.formulaItems = [];
  }
  // getFormulaItems = () => {
  //   // console.log("flowrate",flowrate);
  //   for (var key in flowrate) {
  //     // formulaItems.push( <FormulaItem item={flowrate[key]} /> );
  //     // this.formulaItems.push( <FormulaItem />  );
  //   }
  //   console.log("formulaItems",this.formulaItems);
  //   return this.formulaItems;
  // }
  render() {
    // this.getFormulaItems();
    // console.log("flowrate[0][Object.keys(flowrate[0])]",flowrate[0][Object.keys(flowrate[0])]);
    let formulaItems = flowrate.map((x, i) => {
      // console.log("flowrate[i][Object.keys(flowrate[i])]",flowrate[i][Object.keys(flowrate[i])]);
      return <FormulaItem item={ flowrate[i][Object.keys(flowrate[i])] } />
    })
    // console.log(getFormulaItems());
    // formulaItems = [
    //   <FormulaItem item={new Item("Stroke", [["in", 1], ["cm", 2.54]])} />,
    //   <FormulaItem item={new Item("Flowrate", [["gpm", 1], ["bbl/m", 0.024], ["bbl/h", 1.43]])} />
    // ]
    return(
      <View style={styles.container}>
        { formulaItems }
        {/* <FormulaItem item={this.item} /> */}
        {/* <FormulaItem item={flowrate.n} /> */}

        <TouchableElement
          style={[styles.btn]}
          underlayColor="#ccc"
          activeOpacity={0.7}
          onPress={ () => { if (!myBool) {this.doTheMathC()}} }
        >
          <Text style={styles.btnText}>CALCULATE</Text>
        </TouchableElement>

        <TouchableElement
          style={[styles.btn]}
          underlayColor="#ccc"
          activeOpacity={0.7}
          onPress={ this.clearAllC }
        >
          <Text style={styles.btnText}>CLEAR ALL</Text>
        </TouchableElement>
        <View style={styles.spacing}></View>
      </View>
    );
  }
}

module.exports = FormulaView;