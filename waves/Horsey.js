//SCRAP THIS

import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, StyleSheet, Text, TextInput, View, Button } from 'react-native';
const styles = require('./Style.js');
const Item = require('./Item.js');

//NOTES
// CalcPage prop isCalcBtnDisabled is equal to this.state.calcBtnDisabled; used to keep calculate button styling and behavior current
//ISSUES

export class Horsey extends React.Component {
  constructor(props) {
    super(props);
    this.myFunc = this.myFunc.bind(this);
    this.myFocus = this.myFocus.bind(this);
    this.checkConstrained = this.checkConstrained.bind(this);
    this.doTheMath = this.doTheMath.bind(this);
    this.displayValue = this.displayValue.bind(this);

    // this.clearAll = this.clearAll.bind(this);
    // this.state = {
    //   inputs: {
    //     q: 0,
    //     p: 0,
    //     h: 0,
    //   },
    // };
  }
  checkConstrained = () => {
    this.props.checkConstrained();
  }
  displayValue = (input) => {
    return this.props.displayValue(input);
    // switch (input) {
    //   case "q":
    //     return this.state.inputs.q === 0 ? "" : this.state.inputs.q;
    //   case "p":
    //     return this.state.inputs.p === 0 ? "" : this.state.inputs.p;
    //   case "h":
    //     return this.state.inputs.h === 0 ? "" : this.state.inputs.h;
    // }
  }
  myFunc = (param, param2) => {
    // set the state, then check constraint state 
    // update state in Calc 

    this.props.handleInput(param, param2);

    // if (param2 === "q") {
    //   this.setState({ inputs: { ...this.state.inputs, q: Number(param), }, }, () => { this.checkConstrained(this.state.inputs) });
    // } else if (param2 === "p") {
    //   this.setState({ inputs: { ...this.state.inputs, p: Number(param), }, }, () => { this.checkConstrained(this.state.inputs) });
    // } else if (param2 === "h") {
    //   this.setState({ inputs: { ...this.state.inputs, h: Number(param), }, }, () => { this.checkConstrained(this.state.inputs) });
    // }
  }
  myFocus = () => {
    console.log("myFocus!");
    this.checkConstrained();
    // do stuff here 
  }
  myHandleKeyDown = () => {
    this.checkConstrained();
  }
  doTheMath = () => {
    // var q = this.state.inputs.q;
    // var p = this.state.inputs.p;
    // var h = this.state.inputs.h;
    // // var lastSolution;
    // if (this.state.solveFor == "q") {
    //   var q = h * 1550 / p;
    //   this.state.lastSolution = "q";
    //   this.setState({ inputs: { ...this.state.inputs, q: Math.round(q), } })
    // } else if (this.state.solveFor == "p") {
    //   var p = h * 1550 / q;
    //   this.state.lastSolution = "p";
    //   this.setState({ inputs: { ...this.state.inputs, p: Math.ceil(p), } })
    // } else if (this.state.solveFor == "h") {
    //   // HORSEPOWER = q * p * C
    //   // C = constant = 1 / 1550
    //   var h = q * p * 1 / 1550;
    //   this.state.lastSolution = "h";
    //   this.setState({ inputs: { ...this.state.inputs, h: Math.round(h), } })
    // }
    // // this.forceUpdate();
  }
  // clearAll = () => {
  //   this.setState({
  //     inputs: {
  //       q: 0,
  //       p: 0,
  //       h: 0,
  //     }
  //   });
  //   this.checkConstrained();
  // }
  paramItem = (props) => {
    return (
      <Item
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
      <View style={styles.container}>
        {this.paramItem({ varName: "q", parameter: "Flowrate", unit: "gpm" })}
        {this.paramItem({ varName: "p", parameter: "Pressure", unit: "psi" })}
        {this.paramItem({ varName: "h", parameter: "Horsepower", unit: "hhp" })}
      </View>
    );
  }
}

module.exports = Horsey;