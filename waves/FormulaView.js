import React from 'react';
import { View, Text } from 'react-native';
const styles = require('./Style.js');
const FormulaItem = require('./FormulaItem.js');
const globals = require('./Globals.js');

const TouchableElement = globals.TouchableElement;
const Item = globals.Item;

export class FormulaView extends React.Component {
  constructor(props) {
    super(props); // extends the context (`this`) of the parent constructor 
    // console.log("FormulaView this.props", this.props);
    this.state = {
      allowCalc: false,
    }
    // catch parameters sent through stackNavigator
    const { params } = this.props.navigation.state;
    this.items = params.p.items;
    this.formulas = params.p.formulas;

    this.child = [];
    this.childChanged = this.childChanged.bind(this);
  }

  // Notifier function
  // Check each child's state to determine if the inputs properly constrain the function and update this.state.allowCalc
  childChanged() {
    // console.log("this.formulas", this.formulas)

    // fill an array with boolean values if child component has a valid value
    let temp = [];
    for (let i=0; i<this.items.length; i++) {
      this.child[i].getCanonicalValue() == null ? temp.push(false) : temp.push(true);
    }

    // compare the boolean array to the constraint patterns
    for (let j=0; j<this.formulas.length; j++) {
      let match = true;
      for (let i=0; i<temp.length; i++) {
        if (this.formulas[j].constraints[i] !== temp[i]) {
          match = false;
          continue;
        }
      }
      if (match == true) {
        this.setState({allowCalc: true}); 
        return;
      } else { 
        this.setState({allowCalc: false});  // FIXME not behaving properly 
        // this.forceUpdate(); // just for testing
      }
    }

    console.log("temp", temp)
    console.log("this.state.allowCalc", this.state.allowCalc)
  }

  // Solve for the missing value using the formulas array: find the correct formula and call its function
  // FIXME
  doTheMath = () => {
    console.log("doTheMath()")
    // console.log("this.formulas", this.formulas)

    // fill an array with boolean values if child component has a valid value
    // fill an array with canonicalValues if child component has a valid value
    let temp = [];
    let tempValues = [];
    for (let i=0; i<this.items.length; i++) {
      this.child[i].getCanonicalValue() == null ? temp.push(false) : temp.push(true);
      this.child[i].getCanonicalValue() == null ? tempValues.push(null) : tempValues.push(this.child[i].getCanonicalValue());
    }

    // compare the boolean array to the constraint patterns
    let matchInd = 90;
    for (let j=0; j<this.formulas.length; j++) {
      let match = true;
      for (let i=0; i<temp.length; i++) {
        if (this.formulas[j].constraints[i] !== temp[i]) {
          match = false;
        }
        if (this.formulas[j].constraints[i] == false) {
          emptyInd = i;
        }
      }
      if (match == true) {
        matchInd = j;
      } 
    }

    console.log("tempValues array", tempValues.join(", "))
    console.log("matchInd", matchInd)
    
    // perform the calculation
    let result = this.formulas[matchInd].formula(tempValues);
    // let result = this.formulas[matchInd].formula(tempValues[0],tempValues[1],tempValues[2],tempValues[3],tempValues[4]);
    // console.log('result', result);

    // set the result to the canonical value
    this.child[emptyInd].setCanonicalValue(result.toString());
    // console.log("*****", this.child[1].setCanonicalValue("22"));
  }

  // Set all Childs' state.canonicalValue = null;
  clearAll = () => {
    for (let i=0; i<this.child.length; i++) {
      this.child[i].setCanonicalValue(null);
    }
  }

  render() {
    let formulaItems = this.items.map((x, i) => {
      // console.log("x",x)
      return <FormulaItem item={ this.items[i][Object.keys(this.items[i])] } ref={ref => (this.child[`${i}`] = ref)} childChanged={this.childChanged} notifierFunction={this.notifierFunction} />
    })
    return(
      <View style={[styles.container, styles.color_background_primary]}>
        { formulaItems }
        <TouchableElement
          style={[styles.btn, styles.color_btn_primary, this.state.allowCalc ? null : styles.color_btn_disabled]}
          underlayColor={this.state.allowCalc ? "#ccc" : "none"}
          activeOpacity={this.state.allowCalc ? 0.7 : 1}
          onPress={ () => { if (this.state.allowCalc) {this.doTheMath()}} }
        >
          <Text style={[styles.btn_text, styles.color_font_secondary]}>CALCULATE</Text>
        </TouchableElement>
        <TouchableElement
          style={[styles.btn, styles.color_btn_primary]}
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