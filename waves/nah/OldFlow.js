import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, StyleSheet, Text, TextInput, View, Button } from 'react-native';
const styles = require('./Style.js');
const Item = require('./Item.js');

// APP CLASS // builds the display of all the items, holds the state of variable values, and contains the logic
export class OldFlow extends React.Component {
  constructor(props) {
    super(props);
    this.myFunc = this.myFunc.bind(this);
    this.myFocus = this.myFocus.bind(this);
    this.checkConstrained = this.checkConstrained.bind(this);
    this.state = {
      count: 0,
      constraintState: "",
      calcBtnDisabled: true,
      solveFor: "",
      lastSolution: "",
      inputs: {
        s: 0,
        n: 0,
        d: 0,
        l: 0,
        q: 0,
      },
    };
  }
  printStateLocal = () => {
    console.log(this.state);
  }
  displayValue = (input) => {
    switch (input) {
      case "s":
        return this.state.inputs.s === 0 ? "" : this.state.inputs.s;
      case "n":
        return this.state.inputs.n === 0 ? "" : this.state.inputs.n;
      case "d":
        return this.state.inputs.d === 0 ? "" : this.state.inputs.d;
      case "l":
        return this.state.inputs.l === 0 ? "" : this.state.inputs.l;
      case "q":
        return this.state.inputs.q === 0 ? "" : this.state.inputs.q;
    }
  }
  myFunc = (param, param2) => {
    // set the state, then check constraint state 
    console.log("myFunc() hit: param:", param, "; param2:", param2);
    if (param2 === "s") {
      // if (param[param.length-1] == ".") {

      // } else {
      this.setState({
        inputs: {
          ...this.state.inputs,
          s: Number(param),
        },
      },
        () => { this.checkConstrained() }
      );
      // }

    } else if (param2 === "n") {
      this.setState({ inputs: { ...this.state.inputs, n: Number(param), }, }, () => { this.checkConstrained() });
    } else if (param2 === "d") {
      this.setState({ inputs: { ...this.state.inputs, d: Number(param), }, }, () => { this.checkConstrained() });
    } else if (param2 === "l") {
      this.setState({ inputs: { ...this.state.inputs, l: Number(param), }, }, () => { this.checkConstrained() });
    } else if (param2 === "q") {
      this.setState({ inputs: { ...this.state.inputs, q: Number(param), }, }, () => { this.checkConstrained() });
    }
  }
  myFocus = () => {
    console.log("myFocus!");
    this.checkConstrained();
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
      if (this.state.inputs[key] === 0 || this.state.inputs[key] === null) {
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
    var s = this.state.inputs.s;
    var n = this.state.inputs.n;
    var d = this.state.inputs.d;
    var l = this.state.inputs.l;
    var q = this.state.inputs.q;
    // var lastSolution;
    if (this.state.solveFor == "s") {
      var s = q / (0.25 * Math.PI * Math.pow(d, 2) * l * n * 1 / 231);
      this.state.lastSolution = "s";
      this.setState({ inputs: { ...this.state.inputs, s: Math.round(s), } })  // ISSUE: remains blank solving for this with 333 in all other fields; has to do with Math.round
    } else if (this.state.solveFor == "n") {
      var n = q / (0.25 * Math.PI * Math.pow(d, 2) * l * s * 1 / 231);
      this.state.lastSolution = "n";
      this.setState({ inputs: { ...this.state.inputs, n: Math.ceil(n), } })
    } else if (this.state.solveFor == "d") {
      var d = Math.sqrt(q / (0.25 * Math.PI * l * n * s * 1 / 231));
      this.state.lastSolution = "d";
      this.setState({ inputs: { ...this.state.inputs, d: d.toPrecision(1), } })
    } else if (this.state.solveFor == "l") {
      var l = q / (0.25 * Math.PI * Math.pow(d, 2) * s * n * 1 / 231);
      this.state.lastSolution = "l";
      this.setState({ inputs: { ...this.state.inputs, l: Math.ceil(l), } })
    } else if (this.state.solveFor == "q") {
      // FLOWRATE = 0.25 * PI * D^2 * l * n * s * C
      // C = constant = 1 gal/min / 231 in^3/min
      var q = 0.25 * Math.PI * Math.pow(d, 2) * l * n * s * 1 / 231;
      this.state.lastSolution = "q";
      this.setState({ inputs: { ...this.state.inputs, q: Math.round(q), } })
    }
    console.log("doTheMath solved for " + this.state.solveFor + " to get " + this.state.lastSolution);
  }
  paramItem = (props) => {
    return (
      <Item reference={props.varName} myFunc={(a) => this.myFunc(a, props.varName)} myFocus={() => this.myFocus()} variable={String(this.displayValue(props.varName))} parameter={props.parameter} unit={props.unit} />
    );
  }
  clearAll = () => {
    this.setState({
      inputs: {
        s: 0,
        n: 0,
        d: 0,
        l: 0,
        q: 0,
      }
    })
  }
  styleBtn = () => {
    if (this.state.calcBtnDisabled) {
      return (
        {
          backgroundColor: '#777',
        }
      );
    } else {
      return (
        {
          backgroundColor: '#eee',
        }
      );
    }
  }
  render() {
    let testValue = this.parameter;
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View style={[styles.container, styles.color_background_primary]}>
        {this.paramItem({ varName: "s", parameter: "Speed", unit: "rpm" })}
        {this.paramItem({ varName: "n", parameter: "Number of Plungers", unit: "qty" })}
        {this.paramItem({ varName: "d", parameter: "Plunger Diameter", unit: "in" })}
        {this.paramItem({ varName: "l", parameter: "Stroke", unit: "in" })}
        {this.paramItem({ varName: "q", parameter: "Flowrate", unit: "gpm" })}
        <TouchableElement style={[styles.btn, styles.color_btn_primary, this.styleBtn()]} underlayColor="#ccc" activeOpacity={0.7} onPress={() => { if (!this.state.calcBtnDisabled) { this.doTheMath(this) } }}>
          <Text style={[styles.btn_text, styles.color_font_secondary]}>CALCULATE</Text>
        </TouchableElement>
        <TouchableElement style={[styles.btn, styles.color_btn_primary]} underlayColor="#ccc" activeOpacity={0.7} onPress={() => { this.clearAll() }}>
          <Text style={[styles.btn_text, styles.color_font_secondary]}>CLEAR ALL</Text>
        </TouchableElement>
        <View style={styles.spacing}></View>
      </View>
    );
  }
}

module.exports = OldFlow;