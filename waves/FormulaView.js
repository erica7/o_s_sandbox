import React from 'react';

// item Class:
class Item {  //never holds value
  constructor(displayName, units){
    this.displayName = displayName;
    this.units = units; //array of possible inputs 
    // this.conversion = conversion; //array of conversion factors
  }
  getDisplayName() {
    // return displayName
    return this.displayName;
  }
  getUnits() {
    return this.units;
  }
}
// props passed to FormulaView are items, e.g.:
props = {
  s: new Item("Speed", [["rpm", 1]]),
  n: new Item("Number of Plungers", [["qty", 1]]),
}

const inputs = [
  ['rpm'],
  ['qty'],
  ['in','cm'],
  ['in','cm'],
  ['gpm','bbl/m','bbl/h'],
];

//use canonical units 
const formulas = [
  {
    constraints: [true, true, true, true, false],
    formula: function(s, n, d, l, q_null) {
      return 0.25 * Math.PI * Math.pow(d.getValue(), 2) * l.getValue() * n.getValue() * s.getValue() * 1 / 231;
    }
  }
]

export class FormulaView extends React.Component {
  constructor(props) {
    <FormulaItem item={props.items[i]}>
  }

}
