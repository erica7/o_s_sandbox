import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

// Issues
//   Detecting properly constrained 
//   State not updating after a solution is found (or is being updated again by the value in the text input)
//   Putting the recently solved value into the text input (likely depends on previous issue)


function printState(obj) {
  console.log(obj.state);
}

// ITEM CLASS // builds the 'variable' display with the label, number input, and units
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (input) => {  // pass this up to App class's state via element's prop myFunc
    this.props.myFunc(input);
  }
  render() {
    return (
      <View style={styles.item}>
        <Text style={[styles.font, styles.parameter]}>{this.props.parameter}</Text>
        <TextInput
          ref={this.props.reference}
          style={[styles.font, styles.textInput]}
          onChangeText={this.handleChange}
          autoCorrect={false}
          keyboardType="decimal-pad"
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
    this.state = {
      // value: '',  // just for dev
      // changes: 0,  // just for dev 
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
  myFunc = (param, param2, callback) => {
    console.log(param);
    console.log(param2);
    // this.setState({ changes: Number(param) });  // just for dev 
    if (param2 === "s") {
      this.setState({ 
        inputs: { 
          ...this.state.inputs, 
          s: Number(param),
        }, 
      }, this.checkConstrained(this.state));
    } else if (param2 === "n") {
      this.setState({ inputs: {...this.state.inputs, n: Number(param),}, }, this.checkConstrained(this.state));
    } else if (param2 === "d") {
      this.setState({ inputs: {...this.state.inputs, d: Number(param),}, }, this.checkConstrained(this.state));
    } else if (param2 === "l") {
      this.setState({ inputs: {...this.state.inputs, l: Number(param),}, }, this.checkConstrained(this.state));
    } else if (param2 === "q") {
      this.setState({ inputs: {...this.state.inputs, q: Number(param),}, }, this.checkConstrained(this.state));
    }
    // callback(this.state);
    // checkConstrained(this.state);
  }

  checkConstrained = () => {  // callback so that state is properly updated?..
    console.log('checkConstrained() hit');
    console.log("'this.state' here: " + this.state);
    var boolConstrained = false;
    var count = 0;
    var solveFor;
    for (let key in this.state.inputs) {
      console.log(this.state.inputs[key]);
      if (this.state.inputs[key] === 0 || this.state.inputs[key] === null) {
        count++;
        solveFor = key;
      }
    }
    console.log("count: " + count);
    console.log("solveFor: " + solveFor);
    if (count === 1) {
      boolConstrained = true;
      this.constraintState = "Perfectly constrained";
    } else if (count < 1) {
      this.constraintState = "Over constrained";
    } else {
      this.constraintState = "Under constrained";
    }
    if (boolConstrained) {
      this.doTheMath(solveFor)
    }
  }
  doTheMath = (solveFor) => { 
    console.log("doTheMath() hit");
    var s = this.state.inputs.s;
    var n = this.state.inputs.n;
    var d = this.state.inputs.d;
    var l = this.state.inputs.l;
    var q = this.state.inputs.q;
    var lastSolution;
    if (solveFor == "s") {                        // update the value in state! 
      console.log("solveFor internal");
      var s = q / (0.25 * Math.PI * Math.pow(d, 2) * l * n * 1/231);
      lastSolution = s;
      this.setState({ inputs: {...this.state.inputs, s: lastSolution,} })
    } else if (solveFor == "n") {
      console.log("solveFor internal");
      var n = q / (0.25 * Math.PI * Math.pow(d, 2) * l * s * 1/231);
      lastSolution = n;
      this.setState({ inputs: {...this.state.inputs, n: lastSolution,} })
    } else if (solveFor == "d") {
      console.log("solveFor internal");
      var d = Math.sqrt( q / (0.25 * Math.PI * l * n * s * 1/231) );
      lastSolution = d;
      this.setState({ inputs: {...this.state.inputs, d: lastSolution,} })
    } else if (solveFor == "l") {
      console.log("solveFor internal");
      var l = q / (0.25 * Math.PI * Math.pow(d, 2) * s * n * 1/231);
      lastSolution = l;
      this.setState({ inputs: {...this.state.inputs, l: lastSolution,} })
    } else if (solveFor == "q") {
      console.log("solveFor internal");
      // FLOWRATE = 0.25 * PI * D^2 * l * n * s * C
      // C = constant = 1 gal/min / 231 in^3/min
      var q = 0.25 * Math.PI * Math.pow(d, 2) * l * n * s * 1/231;
      lastSolution = q;
      this.setState({ inputs: {...this.state.inputs, q: lastSolution,} })
    }  
    console.log("doTheMath solved for " + solveFor + " to get " + lastSolution);
  }
  render() {
    let testValue = this.parameter;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>WAVY</Text>
        <Item reference="s" myFunc={ (a) => this.myFunc(a, "s", this.checkConstrained) } variable={ String(this.state.inputs.s) } parameter="Speed" unit="rpm"/>
        <Item reference="n" myFunc={ (a) => this.myFunc(a, "n", this.checkConstrained) } variable={ String(this.state.inputs.n) } parameter="Number of Plungers" unit="qty"/>
        <Item reference="d" myFunc={ (a) => this.myFunc(a, "d", this.checkConstrained) } variable={ String(this.state.inputs.d) } parameter="Plunger Diameter" unit="in"/>
        <Item reference="l" myFunc={ (a) => this.myFunc(a, "l", this.checkConstrained) } variable={ String(this.state.inputs.l) } parameter="Stroke" unit="in"/>
        <Item reference="q" myFunc={ (a) => this.myFunc(a, "q", this.checkConstrained) } variable={ String(this.state.inputs.q) } parameter="Flowrate" unit="gpm"/>
        <Button onPress={ () => printState(this) } title="See State"></Button>
        <Text ref="testRef">{this.constraintState}</Text>
        <View style={styles.spacing}></View>
      </View>
    );
  }
}


// STYLING // 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2a363b',
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
