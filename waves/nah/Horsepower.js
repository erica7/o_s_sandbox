import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, StyleSheet, Text, TextInput, View, Button } from 'react-native';
const styles = require('./../Style.js');
// const Item = require('./Item.js');
const ItemUnit = require('./ItemUnit.js');
const CalcButtons = require('./CalcButtons.js');

//NOTES
// CalcButtons prop isCalcBtnDisabled is equal to this.state.calcBtnDisabled; used to keep calculate button styling and behavior current
//ISSUES

export class Horsepower extends React.Component {
  constructor(props) {
    super(props);
    this.myFunc = this.myFunc.bind(this);
    this.myFocus = this.myFocus.bind(this);
    this.checkConstrained = this.checkConstrained.bind(this);
    this.doTheMath = this.doTheMath.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.state = {
      count: 0,
      constraintState: "",
      calcBtnDisabled: true,
      solveFor: "",
      lastSolution: "",
      inputs: {
        q: 0,
        p: 0,
        h: 0,
      },
    };
  }
  printStateLocal = () => {
    console.log(this.state);
  }
  displayValue = (input) => {
    switch (input) {
      case "q":
        return this.state.inputs.q === 0 ? "" : this.state.inputs.q;
      case "p":
        return this.state.inputs.p === 0 ? "" : this.state.inputs.p;
      case "h":
        return this.state.inputs.h === 0 ? "" : this.state.inputs.h;
    }
  }
  myFunc = (param, param2) => {
    // set the state, then check constraint state 
    if (param2 === "q") {
      this.setState({ inputs: { ...this.state.inputs, q: Number(param), }, }, () => { this.checkConstrained() });
    } else if (param2 === "p") {
      this.setState({ inputs: { ...this.state.inputs, p: Number(param), }, }, () => { this.checkConstrained() });
    } else if (param2 === "h") {
      this.setState({ inputs: { ...this.state.inputs, h: Number(param), }, }, () => { this.checkConstrained() });
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
    this.state.count = 0;
    for (let key in this.state.inputs) {
      console.log(this.state.inputs[key]);
      if (this.state.inputs[key] === 0 || this.state.inputs[key] === null) {
        this.state.count++;
        this.state.solveFor = key;
      }
    }
    if (this.state.count === 1) {
      // console.log("perf const");                              // this runs      -- porqueeeeee!!!! - nvmd, forceUpdate() seems to do the trick
      this.state.constraintState = "Perfectly constrained";   // this doesn't   -- porqueeeeee!!!! - nvmd, forceUpdate() seems to do the trick
      this.state.calcBtnDisabled = false;                     // this doesn't   -- porqueeeeee!!!! - nvmd, forceUpdate() seems to do the trick
    } else if (this.state.count < 1) {  // 
      // console.log("over const");
      this.state.constraintState = "Over constrained";
      this.state.calcBtnDisabled = true;
    } else {
      // console.log("under const");
      this.state.constraintState = "Under constrained";
      this.state.calcBtnDisabled = true;
    }
    this.forceUpdate();
  }
  doTheMath = () => {
    var q = this.state.inputs.q;
    var p = this.state.inputs.p;
    var h = this.state.inputs.h;
    // var lastSolution;
    if (this.state.solveFor == "q") {
      var q = h * 1550 / p;
      this.state.lastSolution = "q";
      this.setState({ inputs: { ...this.state.inputs, q: Math.round(q), } })
    } else if (this.state.solveFor == "p") {
      var p = h * 1550 / q;
      this.state.lastSolution = "p";
      this.setState({ inputs: { ...this.state.inputs, p: Math.ceil(p), } })
    } else if (this.state.solveFor == "h") {
      // HORSEPOWER = q * p * C
      // C = constant = 1 / 1550
      var h = q * p * 1 / 1550;
      this.state.lastSolution = "h";
      this.setState({ inputs: { ...this.state.inputs, h: Math.round(h), } })
    }
    // this.forceUpdate();
  }
  clearAll = () => {
    this.setState({
      inputs: {
        q: 0,
        p: 0,
        h: 0,
      }
    });
    this.checkConstrained();
  }
  paramItem = (props) => {
    return (
      <ItemUnit
        reference={props.varName}
        myFunc={(a) => this.myFunc(a, props.varName)}
        myFocus={() => this.myFocus()}
        variable={String(this.displayValue(props.varName))}
        parameter={props.parameter} 
        unit={props.unit} 
      />
    );
  }
  render() {
    let testValue = this.parameter;
    return (
      <View style={[styles.container, styles.color_background_primary]}>
        {this.paramItem({ varName: "q", parameter: "Flowrate", unit: "gpm" })}
        {this.paramItem({ varName: "p", parameter: "Pressure", unit: "psi" })}
        {this.paramItem({ varName: "h", parameter: "Horsepower", unit: "hhp" })}
        <CalcButtons
          doTheMath={this.doTheMath}
          styleBtn={this.styleBtn}
          clearAll={this.clearAll}
          isCalcBtnDisabled={this.state.calcBtnDisabled}
        />
      </View>
    );
  }
}

module.exports = Horsepower;