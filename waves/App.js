import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

constraintState = ""

function printState(obj) {
  console.log(obj.state);
}

function checkConstrained(state) {  // callback so that state is properly updated?..
  console.log('checkConstrained() hit');
  console.log("'state' passed: " + state);

  var boolConstrained = false;
  var count = 0;
  var solveFor;

  for (let key in state.inputs) {
    console.log(state.inputs[key]);
    if (state.inputs[key] === 0 || state.inputs[key] === null) {
      count++;
      solveFor = key;
    }
  }

  console.log("count: " + count);
  console.log("solveFor: " + solveFor);
  if (count === 1) {
    boolConstrained = true;
    // $("#state").text("Perfectly constrained");
    constraintState = "Perfectly constrained";
  } else if (count < 1) {
    // $("#state").text("Over constrained");
    constraintState = "Over constrained";
  } else {
    // $("#state").text("Under constrained");
    constraintState = "Under constrained";
  }
  if (boolConstrained) {
    doTheMath(solveFor)
  }
}

function doTheMath(solveFor) {  // change from jQuery to React! 
  console.log("doTheMath() hit");
  // if (solveFor === s) {
  //   var s = q / (0.25 * Math.PI * Math.pow(d, 2) * l * n * 1/231);
  //   $("#s").val(s.toFixed(2));
  //   $("#s").css('background-color', '#ee2');
  //   $("#s").animate({ backgroundColor: '#fff' }, 100);
  //   lastSolution = "#s";
  // } else if (solveFor === n) {
  //   var n = q / (0.25 * Math.PI * Math.pow(d, 2) * l * s * 1/231);
  //   $("#n").val(n.toFixed(2));
  //   showUpdate(n);
  //   lastSolution = "#n";
  // } else if (solveFor === d) {
  //   var d = Math.sqrt( q / (0.25 * Math.PI * l * n * s * 1/231) );
  //   $("#d").val(d.toFixed(2));
  //   showUpdate(d);
  //   lastSolution = "#d";
  // } else if (solveFor === l) {
  //   var l = q / (0.25 * Math.PI * Math.pow(d, 2) * s * n * 1/231);
  //   $("#l").val(l.toFixed(2));
  //   showUpdate(l);
  //   lastSolution = "#l";
  // } else if (solveFor === q) {
  //   // FLOWRATE = 0.25 * PI * D^2 * l * n * s * C
  //   // C = constant = 1 gal/min / 231 in^3/min
  //   var q = 0.25 * Math.PI * Math.pow(d, 2) * l * n * s * 1/231;
  //   $("#q").val(q.toFixed(2));
  //   showUpdate(q);
  //   lastSolution = "#q";
  // }  
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    // value: '',
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
          placeholder="#"
        />
        <Text style={[styles.font, styles.unit]}>{this.props.unit} {this.state[this.props.reference]}</Text>
      </View>
    )
  }
}

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
      }, checkConstrained(this.state));
    } else if (param2 === "n") {
      this.setState({ inputs: {...this.state.inputs, n: Number(param),}, }, checkConstrained(this.state));
    } else if (param2 === "d") {
      this.setState({ inputs: {...this.state.inputs, d: Number(param),}, }, checkConstrained(this.state));
    } else if (param2 === "l") {
      this.setState({ inputs: {...this.state.inputs, l: Number(param),}, }, checkConstrained(this.state));
    } else if (param2 === "q") {
      this.setState({ inputs: {...this.state.inputs, q: Number(param),}, }, checkConstrained(this.state));
    }
    // callback(this.state);
    // checkConstrained(this.state);
  }
  printAll = () => {
    console.log(this.state);
  }
  render() {
    let testValue = this.parameter;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>WAVY</Text>
        <Item reference="s" myFunc={ (a) => this.myFunc(a, "s", checkConstrained) } parameter="Speed" unit="rpm"/>
        <Item reference="n" myFunc={ (a) => this.myFunc(a, "n", checkConstrained) } parameter="Number of Plungers" unit="qty"/>
        <Item reference="d" myFunc={ (a) => this.myFunc(a, "d", checkConstrained) } parameter="Plunger Diameter" unit="in"/>
        <Item reference="l" myFunc={ (a) => this.myFunc(a, "l", checkConstrained) } parameter="Stroke" unit="in"/>
        <Item reference="q" myFunc={ (a) => this.myFunc(a, "q", checkConstrained) } parameter="Flowrate" unit="gpm"/>
        <Button onPress={this.printAll} title="See State"></Button>
        <Text ref="testRef">{constraintState}</Text>
        <View style={styles.spacing}></View>
      </View>
    );
  }
}

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
