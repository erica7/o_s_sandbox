import React from 'react';

// // props passed to FormulaView are items
// // item Class:
// class Item {
//   constructor(displayName, units, conversion){
//     this.displayName = displayName;
//     this.units = units; //array of possible inputs 
//     this.conversion = conversion; //array of conversion factors
//   }
//   getValue() {
//     return 
//   }
// }
// props = {
  
// }

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

  }

}
