//SCRAP THIS

// App 

// Calc
// state for constrained, calcbtndisabled, dothemath (passed as props to individual equation components)
// methods for checkconstrained, myfocus, myhandlekeydown, 

// Horsey
// state with formula variables (passed as props to individual Item components)
// methods for displayvalues, myfunc (?), dothemath, clearall(move up)

// Item 



// ISSUES
// how to call doTheMath 'down' to Horsey
// how to edit/clear state of chile Horsey from parent Calc
// where should the "input" part of state live???... 
//    quantity and name of keys changes for each unique formula 

import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, StyleSheet, Text, TextInput, View, Button } from 'react-native';
const styles = require('./Style.js');
const Horsey = require('./Horsey.js');

class Calc extends React.Component {
  constructor(props) {
    super(props);

    this.doTheMathC = this.doTheMathC.bind(this);
    // this.clearAllC = this.clearAllC.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.displayValue = this.displayValue.bind(this);
    
    this.state = {
      count: 0,
      constraintState: "",
      calcBtnDisabled: true,
      solveFor: "",
      lastSolution: "",
      inputs: {
        q:0,
        p:0,
        h:0,
      },
      
    };
  }
  doTheMathC = () => {
    // this.props.doTheMath();
    // how to call doTheMath 'down' to Horsey
  }
  clearAllC = () => {
    this.setState({ inputs: { ...this.state.inputs } })
    // this.state.inputs = {};  // clear the inputs in state
    
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
  handleInput = (param, param2) => {
    if (param2 === "q") {
      this.setState({ inputs: { ...this.state.inputs, q: Number(param), }, }, () => { this.checkConstrained(this.state.inputs) });
    } else if (param2 === "p") {
      this.setState({ inputs: { ...this.state.inputs, p: Number(param), }, }, () => { this.checkConstrained(this.state.inputs) });
    } else if (param2 === "h") {
      this.setState({ inputs: { ...this.state.inputs, h: Number(param), }, }, () => { this.checkConstrained(this.state.inputs) });
    }
  }
  styleBtn = () => {
    let myBool = this.props.isCalcBtnDisabled;
    if (myBool) {
      return ( { backgroundColor: '#777', } );
    } else {
      return ( { backgroundColor: '#eee', } );
    }
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
  render() {
    let testValue = this.parameter;
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    let myBool = this.props.isCalcBtnDisabled;
    let myStyle = this.styleBtn();
    return (
      <View style={[styles.container, styles.color_background_primary]}>

        <Horsey 
          initialize={this.initialize} 
          checkConstrained={this.checkConstrained} 
          displayValue={this.displayValue} 
          clearAll={this.clearAll}
          handleInput={this.handleInput}
        />

        <TouchableElement
          style={[styles.btn, styles.color_btn_primary, myStyle]}
          underlayColor="#ccc"
          activeOpacity={0.7}
          onPress={ () => { if (!myBool) {this.doTheMathC()}} }
        >
          <Text style={[styles.btn_text, styles.color_font_secondary]}>CALCULATE</Text>
        </TouchableElement>

        <TouchableElement
          style={[styles.btn, styles.color_btn_primary]}
          underlayColor="#ccc"
          activeOpacity={0.7}
          onPress={ this.clearAllC }
        >
          <Text style={[styles.btn_text, styles.color_font_secondary]}>CLEAR ALL</Text>
        </TouchableElement>

        <View style={styles.spacing}></View>
      </View>
    );
  }
}

module.exports = Calc;