import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

// ISSUES
//   DRY it up 
//   decimal probs 
//   triggering calculation wrt multi-digit input  - check out onEndEditing, onSelectionChange vs onChangeText
//   handle press behavior, clearing fields

function printState(obj) {
  console.log(obj.state);
}

// ITEM CLASS // builds the 'variable' display with the label, number input, and units
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleDoneEdit = this.handleDoneEdit.bind(this);
  }
  handleChange = (input) => {  // pass this up to App class's state via element's prop myFunc
    this.props.myFunc(input);
  }
  handleFocus = () => {
    this.props.myFocus();
  }
  handleDoneEdit = (input) => {
    // this.props.myFunc2(input);
  }
  render() {
    return (
      <View style={styles.item}>
        <Text style={[styles.font, styles.parameter]}>{this.props.parameter}</Text>
        <TextInput
          ref={this.props.reference}
          style={[styles.font, styles.textInput]}
          onChangeText={this.handleChange}
          onSelectionChange={this.handleDoneEdit}
          onFocus={this.handleFocus}
          autoCorrect={false}
          keyboardType="decimal-pad"
          keyboardAppearance="dark"
          value={this.props.variable}
        />
        <Text style={[styles.font, styles.unit]}>{this.props.unit} {this.props.variable}</Text>
        <Button onPress={ () => printState(this) } title="S"></Button>
      </View>
    )
  }
}

// APP CLASS // builds the display of all the items, holds the state of variable values, and contains the logic
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.myFunc = this.myFunc.bind(this);
    this.myFocus = this.myFocus.bind(this);
    // this.myFunc2 = this.myFunc2.bind(this);
    this.checkConstrained = this.checkConstrained.bind(this);
    this.solveFor = "";
    this.state = {
      // value: '',  // just for dev
      // changes: 0,  // just for dev 
      calcBtnDisabled: true,
      inputs: {
        s: 0,
        n: 0,
        d: 0,
        l: 0,
        q: 0,
      },
    };
    this.constraintState = "";
  }
  displayValue = (input) => {
    switch (input) {
      case "s":
        return this.state.inputs.s === 0 ? "" : this.state.inputs.s;
      case "n":
        return this.state.inputs.n === 0 ? "" : this.state.inputs.n;
      case "d":
        return this.state.inputs.d === 0 ? "" : this.state.inputs.d;
      case "l": 
        return this.state.inputs.l === 0 ? "" : this.state.inputs.l;
      case "q": 
        return this.state.inputs.q === 0 ? "" : this.state.inputs.q;
    }
  }
  myFunc = (param, param2, callback) => {
    // set the state, then check constraint state 
    console.log(param);
    console.log(param2);
    // this.setState({ changes: Number(param) });  // just for dev 
    if (param2 === "s") {
      variableDisplay=this.state.inputs.s
      this.setState({ 
        inputs: { 
          ...this.state.inputs, 
          s: Number(param),
        }, 
      }, () => {
        callback();
      });
    } else if (param2 === "n") {
      this.setState({ inputs: {...this.state.inputs, n: Number(param),}, }, () => { callback(); });
    } else if (param2 === "d") {
      this.setState({ inputs: {...this.state.inputs, d: Number(param),}, }, () => { callback(); });
    } else if (param2 === "l") {
      this.setState({ inputs: {...this.state.inputs, l: Number(param),}, }, () => { callback(); });
    } else if (param2 === "q") {
      this.setState({ inputs: {...this.state.inputs, q: Number(param),}, }, () => { callback(); });
    }
  }
  myFocus = () => {
    console.log("myFocus!");
    // do stuff here 
  }
  checkConstrained = () => {  
    // check how constraint state
    console.log('checkConstrained() hit');
    console.log("'this.state' here: " + this.state);
    var boolConstrained = false;
    var count = 0;
    // var solveFor;
    for (let key in this.state.inputs) {
      console.log(this.state.inputs[key]);
      if (this.state.inputs[key] === 0 || this.state.inputs[key] === null) {
        count++;
        this.solveFor = key;
      }
    }
    console.log("count: " + count);
    console.log("solveFor: " + this.solveFor);
    if (count === 1) {
      boolConstrained = true;
      // this.constraintState = "Perfectly constrained";
      // this.state.calcBtnDisabled = false;
      this.readyToDoTheMath();
      return 1;
    } else if (count < 1) {
      this.constraintState = "Over constrained";
    } else {
      this.constraintState = "Under constrained";
    }
    if (boolConstrained) {
      // this.doTheMath(solveFor)
    }
    return 0;
  }
  readyToDoTheMath = () => {
    this.constraintState = "Perfectly constrained";
    this.state.calcBtnDisabled = false;
  }
  doTheMath = () => { 
    console.log("doTheMath() hit");
    var s = this.state.inputs.s;
    var n = this.state.inputs.n;
    var d = this.state.inputs.d;
    var l = this.state.inputs.l;
    var q = this.state.inputs.q;
    var lastSolution;
    if (this.solveFor == "s") { 
      console.log("this.solveFor internal");
      var s = q / (0.25 * Math.PI * Math.pow(d, 2) * l * n * 1/231);
      lastSolution = "s";
      this.setState({ inputs: { ...this.state.inputs, s: Math.round(s), } })
    } else if (this.solveFor == "n") {
      console.log("this.solveFor internal");
      var n = q / (0.25 * Math.PI * Math.pow(d, 2) * l * s * 1/231);
      lastSolution = "n";
      this.setState({ inputs: { ...this.state.inputs, n: Math.ceil(n), } })
    } else if (this.solveFor == "d") {
      console.log("this.solveFor internal");
      var d = Math.sqrt( q / (0.25 * Math.PI * l * n * s * 1/231) );
      lastSolution = "d";
      this.setState({ inputs: { ...this.state.inputs, d: d.toPrecision(1), } })
    } else if (this.solveFor == "l") {
      console.log("this.solveFor internal");
      var l = q / (0.25 * Math.PI * Math.pow(d, 2) * s * n * 1/231);
      lastSolution = "l";
      this.setState({ inputs: { ...this.state.inputs, l: Math.ceil(l), } })
    } else if (this.solveFor == "q") {
      console.log("this.solveFor internal");
      // FLOWRATE = 0.25 * PI * D^2 * l * n * s * C
      // C = constant = 1 gal/min / 231 in^3/min
      var q = 0.25 * Math.PI * Math.pow(d, 2) * l * n * s * 1/231;
      lastSolution = "q";
      this.setState({ inputs: { ...this.state.inputs, q: Math.round(q), } })
    }  
    console.log("doTheMath solved for " + this.solveFor + " to get " + lastSolution);
  
  }
  render() {
    let testValue = this.parameter;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>WAVY</Text>
        <Item reference="s" myFunc={ (a) => this.myFunc(a, "s", this.checkConstrained) } myFocus={ () => this.myFocus() } variable={ String(this.displayValue("s")) } parameter="Speed" unit="rpm"/>
        <Item reference="n" myFunc={ (a) => this.myFunc(a, "n", this.checkConstrained) } myFocus={ () => this.myFocus() } variable={ String(this.displayValue("n")) } parameter="Number of Plungers" unit="qty"/>
        <Item reference="d" myFunc={ (a) => this.myFunc(a, "d", this.checkConstrained) } myFocus={ () => this.myFocus() } variable={ String(this.displayValue("d")) } parameter="Plunger Diameter" unit="in"/>
        <Item reference="l" myFunc={ (a) => this.myFunc(a, "l", this.checkConstrained) } myFocus={ () => this.myFocus() } variable={ String(this.displayValue("l")) } parameter="Stroke" unit="in"/>
        <Item reference="q" myFunc={ (a) => this.myFunc(a, "q", this.checkConstrained) } myFocus={ () => this.myFocus() } variable={ String(this.displayValue("q")) } parameter="Flowrate" unit="gpm"/>
        <Button disabled={this.state.calcBtnDisabled} ref="calculateBtn" onPress={ () => this.doTheMath(this) } title="Calculate"></Button>
        <Button raised large onPress={ () => printState(this) } title="See State"></Button>
        <Text style={styles.note} ref="testRef">{this.constraintState}</Text>
        <View style={styles.spacing}></View>
      </View>
    );
  }
}





// STYLING // 
const styles = StyleSheet.create({
  note: {
    color: '#eee',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#111111',
    // backgroundColor: '#2a363b',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 9,
    paddingTop: 18,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  font: {
    fontSize: 26,
  },
  parameter: {
    flex: 4,
    color: '#e1f5c4',
    // backgroundColor: '#bbb',
    textAlign: 'right',
  },
  textInput: {
    flex: 3,
    color: '#e1f5c4',
    marginLeft: 12,
    marginRight: 12,
    paddingBottom: 4,
    // backgroundColor: '#ccc',
    borderStyle: 'solid',
    borderColor: '#f6903d',
    borderBottomWidth: 2,
    textAlign: 'center',
    fontSize: 33,
  },
  unit: {
    flex: 3,
    color: '#e1f5c4',
    // backgroundColor: '#ddd',
  },
  test: {
    color: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 50,
    marginLeft: 50,
    margin: 9,
    color: '#3eacab',
  },
  spacing: {
    height: 200,
    // backgroundColor: '#444',
    marginTop: 9,
  },

  // allText: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   fontSize: 22,
  // },
});
