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

    this.child = [];
    this.childChanged = this.childChanged.bind(this);
  }

  // TODO DRY childChanged and doTheMath 

  getChildBools = () => {
    var temp = [];
    var clearAllBool = false;
    var lenItems = this.items.length;
    for (let i=0; i<lenItems; i++) {
      let hasValue = this.child[i].getCanonicalValue() !== null;
      temp.push(hasValue);
      if (hasValue) clearAllBool = true;
    }
    return temp;
  }



  getChildValues = () => {
    var temp = [];
    var clearAllBool = false;
    var lenItems = this.items.length;
    for (let i=0; i<lenItems; i++) {
      let val = this.child[i].getCanonicalValue();
      temp.push(val);
      if (val !== null) clearAllBool = true;
    }
    this.setState({allowClearAll: clearAllBool});
    return temp;
  }


  // Notifier function
  // Check each child's state to determine if the inputs properly constrain the function and update this.state.allowCalc
  childChanged = () => {
    // fill an array with boolean values if child component has a valid value
    var temp = [];
    var clearAllBool = false;
    var lenItems = this.items.length;
    for (let i=0; i<lenItems; i++) {
      let hasValue = this.child[i].getCanonicalValue() !== null;
      temp.push(hasValue);
      if (hasValue) clearAllBool = true;
    }
    // var temp = this.getChildBools();

    // compare the boolean array to the constraint patterns
    var match = true;
    for (var j=0; (j<this.formulas.length); j++) {
      match = true; 
      for (var i=0; ((match === true) && (i<temp.length)); i++) {
        if (this.formulas[j].constraints[i] !== temp[i]) {
          match = false;
        }
      }
      if (match) break;  //FIXME won't work in the outer for loop condition e.g. ((match) && (j<this.formulas.length))
    }
    this.setState({allowCalc: match, allowClearAll: clearAllBool}); 
    
    console.log("******* match", match)
    console.log("this.state.allowCalc", this.state.allowCalc);
    console.log("this.state.allowClearAll", this.state.allowClearAll);
  }

  // Solve for the missing value using the formulas array: find the correct formula and call its function
  doTheMath = () => {
    // fill an array with boolean values if child component has a valid value
    // fill an array with canonicalValues if child component has a valid value
    let temp = [];
    let tempValues = [];
    for (let i=0; i<this.items.length; i++) {
      let hasValue = this.child[i].getCanonicalValue() !== null;
      temp.push(hasValue);
      tempValues.push(this.child[i].getCanonicalValue());
    }

    // compare the boolean array to the constraint patterns
    let emptyInd = -1;
    let matchInd = -1;
    for (let j=0; j<this.formulas.length; j++) {  // j iterates over the possible formulas 
      let match = true;
      for (let i=0; i<temp.length; i++) {  // i iterates over the constraint state (presence or absence of each variable)
        if (this.formulas[j].constraints[i] !== temp[i]) {
          match = false;
        }
        if (this.formulas[j].constraints[i] == false) {
          emptyInd = i;
        }
      }
      if (match == true) {
        matchInd = j;
        break;
      } 
    }

    console.log("tempValues array", tempValues.join(", "))
    console.log("emptyInd", emptyInd)
    console.log("matchInd", matchInd)
    
    // perform the calculation
    let result = this.formulas[matchInd].formula(tempValues);

    // set the result to the canonical value
    this.child[emptyInd].setCanonicalValue(result.toString()); //NOTE setCanonicalValue will (_should_) call notifier method childChanged to update state.allowCalc
  }

  // Set all Childs' state.canonicalValue = null;
  clearAll = () => {
    console.log("clearAll()")
    
    for (let i=0; i<this.child.length; i++) {
      this.child[i].setCanonicalValue(null);
    }
    // this.setState({allowClearAll: false});
  }
  //FIXME: use this.disabled or this.state.allowCalc consistently 
  render() {
    let formulaItems = this.items.map((x, i) => {
      return <FormulaItem item={ this.items[i][Object.keys(this.items[i])] } ref={ref => (this.child[`${i}`] = ref)} childChanged={this.childChanged} />
    });
    return(
      <View style={[styles.container, styles.color_background_primary]}>
        { formulaItems }
        <TouchableElement
          ref={ref => {this.calcBtn = ref}}
          disabled={!this.state.allowCalc}
          style={[styles.btn, styles.color_btn_primary, this.state.allowCalc ? null : styles.color_btn_disabled]} 
          // style={[styles.btn, styles.color_btn_primary, !this.disabled ? null : styles.color_btn_disabled]} //doesn't work! - FIXME: use this.disabled or this.state.allowCalc consistently 
          underlayColor={!this.disabled ? "#2cc" : "none"} //works - FIXME: use this.disabled or this.state.allowCalc consistently 
          activeOpacity={!this.disabled ? 1 : 0.7} //works - FIXME: use this.disabled or this.state.allowCalc consistently 
          // onPress={ () => {this.doTheMath()} }
          onPress={ this.doTheMath }
        >
          <Text style={[styles.btn_text, styles.color_font_secondary]}>CALCULATE</Text>
        </TouchableElement>
        <TouchableElement
          ref={ref => {this.clearAllBtn = ref}}
          disabled={!this.state.allowClearAll}
          style={[styles.btn, styles.color_btn_primary, this.state.allowClearAll ? null : styles.color_btn_disabled]} 
          underlayColor="#ccc"
          activeOpacity={0.7}
          onPress={ this.clearAll }
        >
          <Text style={[styles.btn_text, styles.color_font_secondary]}>CLEAR ALL</Text>
        </TouchableElement>
        <View style={styles.spacing}></View>
      </View>
    );
  }
}

module.exports = FormulaView;