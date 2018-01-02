import React from 'react';
import { View, Text } from 'react-native';
const styles = require('./Style.js');
const FormulaItem = require('./FormulaItem.js');
const globals = require('./Globals.js');

const TouchableElement = globals.TouchableElement;
const Item = globals.Item;

// FIXME TJPS 
// How is the FormulaView supposed to get the text input values to check constrained state and do the calculation? 
// How is the FormulaView supposed to send the value back to the ForumlaItem that has been solved for? 

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
  }
  

  // Determine if the inputs properly constrain the function and update this.state.allowCalc
  // FIXME
  something = () => {
    for (let i=0; i<this.formulas.length; i++) {
      if (this.formulas[i].constraints == cState) {
        this.setState({allowCalc: true});
        return;
      } else {
        this.setState({allowCalc: false});
      }
    }
  }

  // Solve for the missing value using the formulas array: find the correct formula and call its function
  // FIXME
  doTheMath = () => {
    for (let i=0; i<this.formulas.length; i++) {
      if (this.formulas[i].constraints == cState) {
        // execute the formula and update the child component's state.canonicalValue
        // child.state.canonicalValue = formula(s,n,d,l,q);
      }
    }
  }

  // Set all Childs' state.canonicalValue = null;
  // FIXME
  clearAll = () => {
    console.log("clearAll")
  }

  render() {
    // FIXME get the FormulaItem canonical value

    let formulaItems = this.items.map((x, i) => {
      // console.log("x",x)
      return <FormulaItem item={ this.items[i][Object.keys(this.items[i])] } />
    })
    return(
      <View style={styles.container}>
        { formulaItems }
        <TouchableElement
          style={[styles.btn, this.state.allowCalc ? null : styles.btn__disabled]}
          underlayColor={this.state.allowCalc ? "#ccc" : "none"}
          activeOpacity={this.state.allowCalc ? 0.7 : 1}
          onPress={ () => { if (this.state.allowCalc) {this.doTheMathC()}} }
        >
          <Text style={styles.btn_text}>CALCULATE</Text>
        </TouchableElement>
        <TouchableElement
          style={[styles.btn]}
          underlayColor="#ccc"
          activeOpacity={0.7}
          onPress={ this.clearAll }
        >
          <Text style={styles.btn_text}>CLEAR ALL</Text>
        </TouchableElement>
        <View style={styles.spacing}></View>
      </View>
    );
  }
}

module.exports = FormulaView;