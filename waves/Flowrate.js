import React from 'react';
import { View } from 'react-native';
const styles = require('./Style.js');
const ItemUnit = require('./ItemUnit.js');
const CalcButtons = require('./CalcButtons.js');
const LoadVariables = require('./FlowrateVariables.js');
// import * as LoadVariables from './FlowrateVariables';

// methods and properties specific to formula --> moved to FlowrateVariables.js
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
    this.items = LoadVariables.items;
    this.state = {
      count: 0,
      constraintState: "",
      calcBtnDisabled: true,
      solveFor: "", //null
      lastSolution: "",
      inputs: LoadVariables.inputs,
    };
  }
  doTheMath = () => {
    let tempInputs = this.state.inputs;
    res = LoadVariables.doTheMath(tempInputs, this.items, this.state.solveFor, this.state.lastSolution);
    this.state.lastSOlution = res[1];
    this.setState({inputs: res[0]});
    this.checkConstrained();
  }
  displayValue = (input) => {
    return this.state.inputs[input].value === 0 ? "" : this.state.inputs[input].value;
  }
  myFunc = (param, param2) => {
    // set the state, then check constraint state 
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
      let temp = this.state.inputs[key];
      if (temp.value === 0 || temp.value === null) {
        this.state.count++;
        this.state.solveFor = key;
      }
    }
    console.log("this.state.count: " + this.state.count);
    console.log("solveFor: " + this.state.solveFor);
    if (this.state.count === 1) {
      console.log("perf const");
      this.state.constraintState = "Perfectly constrained";
      this.state.calcBtnDisabled = false; 
    } else if (this.state.count < 1) {  
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
  itemUnit = (input) => {
    let obj = this.items[input];
    let unitBool = obj.units.length > 1;  
    let unitIndex = this.state.inputs[input].unit;
    return (
      <ItemUnit reference={input} myFunc={(a) => this.myFunc(a, input)} myFocus={() => this.myFocus()} variable={String(this.displayValue(input))} parameter={obj.paramName} unit={obj.units[unitIndex].unit} unitBool={unitBool} units={obj.units} updateUnit={this.updateUnit} />
    );
  }
  render() {
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