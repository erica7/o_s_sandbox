import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
const styles = require('./Style.js');

// ITEM CLASS // builds the 'variable' display with the label, number input, and units
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleDoneEdit = this.handleDoneEdit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleChange = (input) => {  // pass this up to App class's state via element's prop myFunc
    this.props.myFunc(input);
  }
  handleFocus = () => {
    this.props.myFocus();
  }
  handleDoneEdit = (input) => {
    // 
  }
  handleKeyDown = () => {
    this.props.myHandleKeyDown();
  }
  render() {
    return (
      <View style={styles.item}>
        <Text style={[styles.font, styles.parameter]}>{this.props.parameter.toUpperCase()}</Text>
        <TextInput
          ref={this.props.reference}
          style={[styles.font, styles.textInput]}
          onChangeText={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onSelectionChange={this.handleDoneEdit}
          onFocus={this.handleFocus}
          autoCorrect={false}
          keyboardType="decimal-pad"
          keyboardAppearance="dark"
          value={this.props.variable}
          selectionColor="#f00"
        />
        <Text style={[styles.font, styles.unit]}>{this.props.unit.toUpperCase()}</Text>
      </View>
    )
  }
}

module.exports = Item;