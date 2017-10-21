import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

class Item extends React.Component {
  state = {
    value: '',
  }
  render() {
    return (
      <View style={styles.item}>
        <Text style={styles.font, styles.parameter}>{this.props.parameter}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleUpdate}
          autoCapitalize="characters"
          placeholder="test"
        />
        <Text style={styles.unit}>{this.props.unit} {this.state.value}</Text>
      </View>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      speed: '',
      n: '',
      d: '',
      l: '',
      q: '',
    };
  }
  // state = {
  // }
  handleUpdate = (text) => {
    this.setState((state) => {
      return {
        handleUpdateText: text,
      }
    })
  }

  render() {
    let testValue = this.parameter;
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Item parameter="Speed" unit="rpm"/>
        <Item parameter="Number of Plungers" unit="qty"/>
        <Item parameter="Plunger Diameter" unit="in"/>
        <Item parameter="Stroke" unit="in"/>
        <Item parameter="Flowrate" unit="gpm"/>
        <View style={styles.item}>
          <Text style={styles.font, styles.parameter}>Erica {this.state.s}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({ value: text })}
            placeholder="Koba"
          />
          <Text style={styles.unit}>America {this.state.value}</Text>
        </View>
      </View>
    );
  }
}

// class MyAppText extends React.Component {
//   render() {
//     return (
//       <Text style={styles.allText}>{this.props.children}</Text>
//     )
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'powderblue',
    justifyContent: 'center',
    padding: 22,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor:'red',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'orange',
  },
  font: {
    fontSize: 33,
  },
  // allText: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   fontSize: 22,
  // },
  parameter: {
    flex: 2,
    backgroundColor: '#bbb',
  },
  textInput: {
    flex: 2,
    color: '#111',
    backgroundColor: '#ccc',
  },
  unit: {
    flex: 1,
    backgroundColor: '#ddd',
  }

});
