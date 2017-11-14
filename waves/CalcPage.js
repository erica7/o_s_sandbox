import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, StyleSheet, Text, TextInput, View, Button } from 'react-native';
const styles = require('./Style.js');

class CalcPage extends React.Component {
  constructor(props) {
    super(props);

    this.doTheMathC = this.doTheMathC.bind(this);
    this.clearAllC = this.clearAllC.bind(this);
  }
  doTheMathC = () => {
    this.props.doTheMath();
  }
  clearAllC = () => {
    this.props.clearAll();
  }
  styleBtn = () => {
    let myBool = this.props.isCalcBtnDisabled;
    if (myBool) {
      return ( { backgroundColor: '#777', } );
    } else {
      return ( { backgroundColor: '#eee', } );
    }
  }
  render() {
    let testValue = this.parameter;
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    let myBool = this.props.isCalcBtnDisabled;
    let myStyle = this.styleBtn();
    return (
      <View>
        <TouchableElement
          style={[styles.btn, myStyle]}
          underlayColor="#ccc"
          activeOpacity={0.7}
          onPress={ () => { if (!myBool) {this.doTheMathC()}} }
        >
          <Text style={styles.btnText}>CALCULATE</Text>
        </TouchableElement>

        <TouchableElement
          style={[styles.btn]}
          underlayColor="#ccc"
          activeOpacity={0.7}
          onPress={ this.clearAllC }
        >
          <Text style={styles.btnText}>CLEAR ALL</Text>
        </TouchableElement>

        <View style={styles.spacing}></View>
      </View>
    );
  }
}

module.exports = CalcPage;