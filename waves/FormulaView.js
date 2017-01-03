import React from 'react';
import { View, Text } from 'react-native';
const styles = require('./Style.js');
const FormulaItem = require('./FormulaItem.js');
const globals = require('./Globals.js');

const TouchableElement = globals.TouchableElement;
const Item = globals.Item;

// TODO separate
// props passed to FormulaView are items, e.g.:
const flowrate = [
  {s: new Item("Speed", [["rpm", 1], ["rph", 60]])},
  {n: new Item("Number of Plungers", [["qty", 1]])},
  {d: new Item("Plunger Diameter", [["in", 1], ["cm", 2.54]])},
  {l: new Item("Stroke", [["in", 1], ["cm", 2.54]])},
  {q: new Item("Flowrate", [["gpm", 1], ["bbl/m", 0.024], ["bbl/h", 1.43]])},
]

// TODO separate
// always uses canonical units 
const formulas = [
  {
    constraints: [true, true, true, true, false],
    formula: function(s, n, d, l, q_null) {
      return 0.25 * Math.PI * Math.pow(d.getValue(), 2) * l.getValue() * n.getValue() * s.getValue() * 1 / 231;
    }
  },
]

export class FormulaView extends React.Component {
  constructor(props) {
    super(props); // extends the context (`this`) of the parent constructor 
    // console.log("FormulaView this.props", this.props);
    this.state = {
      allowCalc: false,
    }
  }

  /**
   * Determine if the inputs properly constrain the function and update this.state.allowCalc
   * FIXME
   */
  something = () => {
    for (let i=0; i<formulas.length; i++) {
      if (formulas[i].constraints == cState) {
        this.setState({allowCalc: true});
        return;
      } else {
        this.setState({allowCalc: false});
      }
    }
  }

  /**
   * Solve for the missing value using the formulas array: find the correct formula and call its function
   * FIXME
   */
  doTheMath = () => {
    for (let i=0; i<formulas.length; i++) {
      if (formulas[i].constraints == cState) {
        // execute the formula and update the child component's state.canonicalValue
        // child.state.canonicalValue = formula(s,n,d,l,q);
      }
    }
  }

  /**
   * Set all Childs' state.canonicalValue = null;
   * FIXME
   */
  clearAll = () => {
    console.log("clearAll")
  }
  
  render() {
    // FIXME get the FormulaItem canonical value
    console.log("this.state.allowCalc", this.state.allowCalc)
    console.log("this.child", this.child);

    let formulaItems = flowrate.map((x, i) => {
      // console.log("x",x)
      return <FormulaItem item={ flowrate[i][Object.keys(flowrate[i])] } />
    })
    return(
      <View style={styles.container}>
        { formulaItems }
        <TouchableElement
          style={[styles.btn, this.state.allowCalc ? null : styles.btnDisabled]}
          underlayColor={this.state.allowCalc ? "#ccc" : "none"}
          activeOpacity={this.state.allowCalc ? 0.7 : 1}
          onPress={ () => { if (this.state.allowCalc) {this.doTheMathC()}} }
        >
          <Text style={styles.btnText}>CALCULATE</Text>
        </TouchableElement>
        <TouchableElement
          style={[styles.btn]}
          underlayColor="#ccc"
          activeOpacity={0.7}
          onPress={ this.clearAll }
        >
          <Text style={styles.btnText}>CLEAR ALL</Text>
        </TouchableElement>
        <View style={styles.spacing}></View>
      </View>
    );
  }
}

module.exports = FormulaView;