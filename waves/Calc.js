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

import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, StyleSheet, Text, TextInput, View, Button } from 'react-native';
const styles = require('./Style.js');
const Horsey = require('./Horsey.js');

class Calc extends React.Component {
  constructor(props) {
    super(props);

    this.doTheMathC = this.doTheMathC.bind(this);
    this.clearAllC = this.clearAllC.bind(this);

    this.state = {
      count: 0,
      constraintState: "",
      calcBtnDisabled: true,
      solveFor: "",
      lastSolution: "",
      
    };
  }
  doTheMathC = () => {
    // this.props.doTheMath();
    // how to call doTheMath 'down' to Horsey
  }
  clearAllC = () => {
    this.props.clearAll();
  }
  styleBtn = () => {
    let myBool = this.props.isCalcBtnDisabled;
    if (myBool) {
      return ( { backgroundColor: '#777', } );
    } else {
      return ( { backgroundColor: '#eee', } );
    }
  }
  checkConstrained = (inputs) => {
    // check how constraint state
    this.state.count = 0;
    for (let key in inputs) {
      console.log(inputs[key]);
      if (inputs[key] === 0 || inputs[key] === null) {
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
      <View style={styles.container}>

        <Horsey checkConstrained={this.checkConstrained}/>

        <TouchableElement
          style={[styles.btn, myStyle]}
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

module.exports = Calc;