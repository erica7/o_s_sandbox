import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, StyleSheet, Text, TextInput, View, Button } from 'react-native';
const styles = require('./Style.js');
// const Item = require('./Item.js');

// APP CLASS // builds the display of all the items, holds the state of variable values, and contains the logic
class CalcPage extends React.Component {
    constructor(props) {
      super(props);

      this.styleBtnC = this.styleBtnC.bind(this);
      this.doTheMathC = this.doTheMathC.bind(this);
      this.clearAllC = this.clearAllC.bind(this);
      this.calcBtnDisabledC = this.calcBtnDisabledC.bind(this);
    }
    
    doTheMathC = () => { 
        console.log("CalcPage doTheMathC");
        this.props.doTheMath();
    }
    styleBtnC = () => {
        console.log("CalcPage styleBtnC");
        // this.props.styleBtn();
    }
    clearAllC = () => {
        console.log("CalcPage clearAllC");
        this.props.clearAll();
    }
    calcBtnDisabledC = () => {
        console.log("CalcPage calcBtnDisabledC");
        this.props.calcBtnDisabled();
    }

    render() {
      let testValue = this.parameter;
      var TouchableElement = TouchableHighlight;
      if (Platform.OS === 'android') {
       TouchableElement = TouchableNativeFeedback;
      }
      return (
        <View style={styles.container}>
          <TouchableElement style={[styles.btn, this.styleBtn]} underlayColor="#ccc" activeOpacity={0.7} onPress={ () =>  {if (!this.calcBtnDisabledC) {this.doTheMathC} }  }>
            <Text style={styles.btnText}>CALCULATE</Text>
          </TouchableElement>
          <TouchableElement style={[styles.btn]} underlayColor="#ccc" activeOpacity={0.7} onPress={ () => { this.clearAllC } }>
            <Text style={styles.btnText}>CLEAR ALL</Text>
          </TouchableElement>
          <View style={styles.spacing}></View>
        </View>
      );
    }
  }

module.exports = CalcPage;