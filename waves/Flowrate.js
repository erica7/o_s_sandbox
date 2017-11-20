import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, StyleSheet, Text, TextInput, View, Button } from 'react-native';
const styles = require('./Style.js');
const Item = require('./Item.js');
const ItemUnit = require('./ItemUnit.js');
const CalcButtons = require('./CalcButtons.js');


// methods and properties specific to formula 
//  some of constructor: items object, state.inputs object 
//  doTheMath 

// methods and properties general to calculation pages
//  some of constructor: function binds, state (except .inputs)
//  displayValue
//  myFunc 
//  myHandleKeyDown 
//  checkConstrained
//  clearAll
//  updateUnit
//  itemUnit (for constructing Item component)
//  render


// unnecessary methods and properties 
//  printStateLocal 





export class Flowrate extends React.Component {
  constructor(props) {
    super(props);
    this.myFunc = this.myFunc.bind(this);
    this.myFocus = this.myFocus.bind(this);
    this.checkConstrained = this.checkConstrained.bind(this);
    this.updateUnit = this.updateUnit.bind(this);
    this.items = {  // item info that doesn't change
      s: {
        paramName: "Speed",
        units: [
          {
            unit: "rpm",
            const: 1
          }
        ]
      },
      n: {
        paramName: "Number of Plungers",
        units: [
          {
            unit: "qty",
            const: 1
          }
        ],
      },
      d: {
        paramName: "Plunger Diameter",
        units: [
          {
            unit: "in",
            const: 1
          }
        ],
      },
      l: {
        paramName: "Stroke",
        units: [
          {
            unit: "in",
            const: 1
          },
          {
            unit: "cm",
            const: 1/2.54
          } //or whatever
        ],
      },
      q: {
        paramName: "Flowrate",
        units: [
          {
            unit: "gpm",
            const: 1
          },
          { 
            unit: "bbl/m",
            const: 0.024
          },
          {
            unit: "bbl/h",
            const: 1.43
          }
        ],
      },
    }
    this.state = {
      count: 0,
      constraintState: "",
      calcBtnDisabled: true,
      solveFor: "",
      lastSolution: "",
      inputs: {
        s: {
          value: 0,
          unit: 0,
        },
        n: {
          value: 0,
          unit: 0,
        },
        d: {
          value: 0,
          unit: 0
        },
        l: {
          value: 0,
          unit: 0
        },
        q: {
          value: 0,
          unit: 0
        },
      },
    };
  }
  printStateLocal = () => {
    console.log(this.state);
  }
  displayValue = (input) => {
    return this.state.inputs[input].value === 0 ? "" : this.state.inputs[input].value;
  }
  myFunc = (param, param2) => {
    // set the state, then check constraint state 
    console.log("myFunc() hit: param:", param, "; param2:", param2);
    let tempInputs = this.state.inputs;
    tempInputs[param2].value = Number(param);
    this.setState({inputs: tempInputs}, () => { this.checkConstrained() })
  }
  myFocus = () => {
    // console.log("myFocus!");
    // this.checkConstrained();
    // do stuff here 
  }
  myHandleKeyDown = () => {
    this.checkConstrained();
  }
  checkConstrained = () => {
    // check how constraint state
    console.log('checkConstrained() hit');
    this.state.count = 0;
    for (let key in this.state.inputs) {
      console.log(this.state.inputs[key]);
      let temp = this.state.inputs[key];
      if (temp.value === 0 || temp.value === null) {
        this.state.count++;
        this.state.solveFor = key;
      }
    }
    console.log("this.state.count: " + this.state.count);
    console.log("solveFor: " + this.state.solveFor);
    if (this.state.count === 1) {
      console.log("perf const");                              // this runs      -- porqueeeeee!!!! - nvmd, forceUpdate() seems to do the trick
      this.state.constraintState = "Perfectly constrained";   // this doesn't   -- porqueeeeee!!!! - nvmd, forceUpdate() seems to do the trick
      this.state.calcBtnDisabled = false;                     // this doesn't   -- porqueeeeee!!!! - nvmd, forceUpdate() seems to do the trick
    } else if (this.state.count < 1) {  // 
      console.log("over const");
      this.state.constraintState = "Over constrained";
      this.state.calcBtnDisabled = true;
    } else {
      console.log("under const");
      this.state.constraintState = "Under constrained";
      this.state.calcBtnDisabled = true;
    }
    this.forceUpdate();
  }
  doTheMath = () => {
    console.log("doTheMath() hit");
    let tempInputs = this.state.inputs;
    let s = tempInputs.s.value;
    let n = tempInputs.n.value;
    let d = tempInputs.d.value;
    let l = tempInputs.l.value;
    let q = tempInputs.q.value;
    let Cs = this.items.s.units[tempInputs.s.unit].const
    let Cn = this.items.n.units[tempInputs.n.unit].const
    let Cd = this.items.d.units[tempInputs.d.unit].const
    let Cl = this.items.l.units[tempInputs.l.unit].const
    let Cq = this.items.q.units[tempInputs.q.unit].const
    if (this.state.solveFor == "s") {
      s = q * Cq / (0.25 * Math.PI * Math.pow(d, 2) * l * Cl * n * 1 / 231);
      this.state.lastSolution = "s";
      tempInputs.s.value = Math.round(s);  // ISSUE: remains blank solving for this with 333 in all other fields; has to do with Math.round
    } else if (this.state.solveFor == "n") {
      n = q * Cq / (0.25 * Math.PI * Math.pow(d, 2) * l * Cl * s * 1 / 231);
      this.state.lastSolution = "n";
      tempInputs.n.value = Math.ceil(n);
    } else if (this.state.solveFor == "d") {
      d = Math.sqrt(q * Cq / (0.25 * Math.PI * l * Cl * n * s * 1 / 231));
      this.state.lastSolution = "d";
      tempInputs.d.value = d.toPrecision(1);
    } else if (this.state.solveFor == "l") {
      l = q * Cq / (0.25 * Math.PI * Math.pow(d, 2) * s * n * 1 / 231) / Cl;
      this.state.lastSolution = "l";
      tempInputs.l.value = Math.ceil(l);
    } else if (this.state.solveFor == "q") {
      // FLOWRATE = 0.25 * PI * D^2 * l * n * s * C
      // C = constant = 1 gal/min / 231 in^3/min
      q = 0.25 * Math.PI * Math.pow(d, 2) * l * Cl * n * s * 1 / 231 * Cq;
      this.state.lastSolution = "q";
      tempInputs.q.value = Math.round(q);
    }
    this.setState({inputs: tempInputs})
    this.checkConstrained();
    console.log("doTheMath solved for " + this.state.solveFor + " to get " + this.state.lastSolution);
  }
  clearAll = () => {
    let tempInputs = this.state.inputs;
    for (let key in tempInputs) {
      tempInputs[key].value = 0;
    }
    this.setState({inputs: tempInputs});
  }
  updateUnit = (parameter, index) => {
    let tempInputs = this.state.inputs; 
    tempInputs[parameter].unit = index;
    this.setState({inputs: tempInputs});
    this.forceUpdate();
  }
  itemUnit = (props) => {
    let obj = this.items[props];
    let unitBool = false;
    if (obj.units.length > 1) {
      unitBool = true;
    } else {
      unitBool = false;
    }
    let unitIndex = this.state.inputs[props].unit;
    return (
      <ItemUnit reference={props} myFunc={(a) => this.myFunc(a, props)} myFocus={() => this.myFocus()} variable={String(this.displayValue(props))} parameter={obj.paramName} unit={obj.units[unitIndex].unit} unitBool={unitBool} units={obj.units} updateUnit={this.updateUnit} />
    );
  }
  render() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    let itemArr = ["s","n","d","l","q"];
    let itemArrGen = itemArr.map((x) => {
        return this.itemUnit(x);
    })
    return (
      <View style={styles.container}>
        { itemArrGen }
        <CalcButtons
          doTheMath={this.doTheMath}
          clearAll={this.clearAll}
          isCalcBtnDisabled={this.state.calcBtnDisabled}
        />
      </View>
    );
  }
}

module.exports = Flowrate;