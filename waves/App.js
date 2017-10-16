import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

class Item extends React.Component {
  render() {
    return (
      <View style={styles.item}>
        <Text style={styles.font, styles.parameter}>{this.props.parameter}</Text>
        <TextInput style={styles.textInput} placeholder="test" />
        <Text style={styles.unit}>{this.props.unit}</Text>
      </View>
    )
  }
}

class MyAppText extends React.Component {
  render() {
    return (
      <Text style={styles.allText}>{this.props.children}</Text>
    )
  }
}

export default class App extends React.Component {
  render() {
    let testValue = this.parameter;
    return (
      <View style={styles.container}>
        <MyAppText>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Item parameter="Speed" unit="rpm"/>
          <Item parameter="Number of Plungers" unit="qty"/>
          <Item parameter="Plunger Diameter" unit="in"/>
          <Item parameter="Stroke" unit="in"/>
          <Item parameter="Flowrate" unit="gpm"/>
        </MyAppText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'powderblue',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    backgroundColor:'red',
    // fontSize: 22,
    width: '100%',
    height: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'orange',
  },
  font: {
    // fontSize: 22,
  },
  allText: {
    fontSize: 22,
  },
  parameter: {
    flex: 2,
    // width: '40%',
    backgroundColor: 'steelblue'
  },
  textInput: {
    flex: 2,
    // width: '40%',
    backgroundColor: 'skyblue'
  },
  unit: {
    flex: 1,
    // width: '20%',
    backgroundColor: 'cornflowerblue'
  }

});
