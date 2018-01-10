import React from 'react';
import { View, Text } from 'react-native';
const styles = require('./Style.js');
const FormulaItem = require('./FormulaItem.js');
const globals = require('./Globals.js');

const TouchableElement = globals.TouchableElement;
const Item = globals.Item;

//NOTE: Arrow functions preserve the `this` binding. The `this` value of the enclosing execution context is used.

export class FormulaView extends React.Component {
  constructor(props) {
    super(props); // extends the context (`this`) of the parent constructor 
    // console.log("FormulaView this.props", this.props);
    this.state = {
      allowCalc: false,
      allowClearAll: false,
    }
    // catch parameters sent through stackNavigator
    const { params } = this.props.navigation.state;
    this.items = params.p.items;
    this.formulas = params.p.formulas;
    // 
    this.child = [];
  }

  // Fill an array with values of the child copmonents
  getChildValues = () => {
    var values = [];
    var lenItems = this.items.length;
    for (let i=0; i<lenItems; i++) {
      let value = this.child[i].getCanonicalValue();
      values.push(value);
    }
    return values;
  }

  // Notifier function: Check each child's state to determine if the inputs properly constrain the function and update this.state.allowCalc
  childChanged = () => {
    // console.log("this.child[0]", this.child[0])
    var values = this.getChildValues();
    var clearAllBool = false;

    // compare the boolean array to the constraint patterns
    var matchFound = true;
    let len = this.formulas.length;
    // loop through each constraint pattern
    for (var j=0; j<len; j++) { 
      //set matchFound to true for each constraint pattern
      matchFound = true; 
      //loop through values array
      for (var i=0; i<len; i++) {  
        // store the constraint pattern in a variable
        let constraintPattern = this.formulas[j].constraints;
        // if the value is null and the constraint is true, or if the value is not null and the constraint is false, the constraint pattern is not a matchFound
        if ((values[i] === null && constraintPattern[i] !== false) || (values[i] !== null && constraintPattern[i] === false)) {
          matchFound = false;
        }
        // if a value is not equal to null, clear all button should be live
        if (values[i] !== null) {
          clearAllBool = true;
        }
      }
      // if a matching constraint pattern is found, break out of the loop
      //FIXME won't work in the outer for loop condition e.g. ((matchFound) && (j<this.formulas.length))
      if (matchFound) break; 
    }

    // update allowCalc and allowClearAll 
    this.setState({allowCalc: matchFound, allowClearAll: clearAllBool}); 
  }

  // Solve for the missing value using the formulas array: find the correct formula and call its function
  doTheMath = () => {
    var values = this.getChildValues();
    let solveForIndex = -1;
    let matchIndex = -1;
    let len = this.formulas.length;
    // loop through each constraint pattern
    for (let j=0; j<len; j++) {  
      //set matchFound to true for each constraint pattern
      let matchFound = true;
      //loop through values array
      for (let i=0; i<len; i++) { 
        // store the constraint pattern in a variable
        let constraintPattern = this.formulas[j].constraints;
        // if the value is null and the constraint is true, or if the value is not null and the constraint is false, the constraint pattern is not a matchFound
        if ((values[i] === null && constraintPattern[i] !== false) || (values[i] !== null && constraintPattern[i] === false)) {
          matchFound = false;
        }
        // mark the 'empty' variable in the constraint pattern to solve for
        if (constraintPattern[i] == false) {
          solveForIndex = i;
        }
      }
      //if a matching constraint pattern is found, mark the index of the matching constraint pattern/formula and break out of the loop
      if (matchFound) {
        matchIndex = j;
        break;
      } 
    }

    // perform the calculation
    let result = this.formulas[matchIndex].formula(values);

    // set the result to the canonical value
    this.child[solveForIndex].setCanonicalValueAfterCalc(result.toString()); //NOTE setCanonicalValue will (_should_) call notifier method childChanged to update state.allowCalc
  }

  // Set all Childs' state.canonicalValue = null;
  clearAll = () => {
    for (let i=0; i<this.child.length; i++) {
      this.child[i].setCanonicalValue(null);
    }
  }

  render() {
    let formulaItems = this.items.map((x, i) => {
      return <FormulaItem item={ this.items[i][Object.keys(this.items[i])] } ref={ref => (this.child[`${i}`] = ref)} key={i} childChanged={this.childChanged} />
    });
    return(
      <View style={[styles.container, styles.color_background_primary]}>
        <View style={styles.content}>
        { formulaItems }
        <TouchableElement
          ref={ref => {this.calcBtn = ref}}
          disabled={!this.state.allowCalc}
          style={[styles.btn, styles.color_btn_primary, this.state.allowCalc ? null : styles.color_btn_disabled]} 
          underlayColor={"#2cc"}
          activeOpacity={0.7}
          onPress={ this.doTheMath }
        >
          <Text style={[styles.btn_text, styles.color_font_secondary]}>CALCULATE</Text>
        </TouchableElement>
        <TouchableElement
          ref={ref => {this.clearAllBtn = ref}}
          disabled={!this.state.allowClearAll}
          style={[styles.btn, styles.color_btn_primary, this.state.allowClearAll ? null : styles.color_btn_disabled]} 
          underlayColor={"#2cc"}
          activeOpacity={0.7}
          onPress={ this.clearAll }
        >
          <Text style={[styles.btn_text, styles.color_font_secondary]}>CLEAR ALL</Text>
        </TouchableElement>
        </View>
        <View style={styles.spacing}></View>
      </View>
    );
  }
}

module.exports = FormulaView;