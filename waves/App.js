import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

function printState(obj) {
  console.log(obj.state);
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
    // this.onClick = this.onClick.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.addAChange = this.addAChange.bind(this);
    this.state = {
      value: '',  // just for dev
      changes: 0,  // just for dev 
      s: 0,
      n: 0,
      d: 0,
      l: 0,
      q: 0,
    };
  }
  addAChange = () => {
    this.setState({ changes: this.state.changes + 1 });
  }
  myFunc = (param, param2) => {
    console.log(param);
    console.log(param2);
    this.setState({ changes: Number(param) });  // just for dev 
    if (param2 === "s") {
      this.setState({ s: Number(param) });
    } else if (param2 === "n") {
      this.setState({ n: Number(param) });
    } else if (param2 === "d") {
      this.setState({ d: Number(param) });
    } else if (param2 === "l") {
      this.setState({ l: Number(param) });
    } else if (param2 === "q") {
      this.setState({ q: Number(param) });
    }
  }
  printAll = () => {
    console.log(this.state);
  }
  render() {
    let testValue = this.parameter;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>WAVY</Text>
        <Item reference="s" myFunc={ (a, b) => this.myFunc(a, "s") } parameter="Speed" unit="rpm"/>
        <Item reference="n" myFunc={ (a, b) => this.myFunc(a, "n") } parameter="Number of Plungers" unit="qty"/>
        <Item reference="d" myFunc={ (a, b) => this.myFunc(a, "d") } parameter="Plunger Diameter" unit="in"/>
        <Item reference="l" myFunc={ (a, b) => this.myFunc(a, "l") } parameter="Stroke" unit="in"/>
        <Item reference="q" myFunc={ (a, b) => this.myFunc(a, "q") } parameter="Flowrate" unit="gpm"/>
        <Button onPress={this.printAll} title="See State"></Button>
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
