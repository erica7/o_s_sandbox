import React from 'react';

export class FormulaItem extends React.Component {
  constructor(props) {
    // this.state = {
    //   value: null,
    //   unit: null,
    //   canonicalUnit: this.props.canonicalUnit, //never changes... remove from state?
    // }
  }
  
  getValue = () => {
    //return the canonicalValue
    this.props.convertValue(this.state.value, this.state.unit, this.state.canonicalUnit);  // this.props.canonicalUnit? 
  }
  convertValue = (currentValue, currentUnit, canonicalUnit) => {
    // //convert the currentValue to the canonicalValue 
    // //return the canonicalValue
    // if (currentUnit == canonicalUnit) return currentValue;
    // //return currentValue * currentToCanonical;
  }

}