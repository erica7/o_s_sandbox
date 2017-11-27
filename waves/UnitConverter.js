import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, StyleSheet, Text, TextInput, View, Button, Modal } from 'react-native';
const styles = require('./Style.js');

class UnitConverter extends React.Component {
  doNothing = () => {

  }
  render() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View style={[styles.container]}>
        <Text style={styles.parameterName}>PARAMETER</Text>
        <View style={styles.item}>
          <TextInput
            // ref={this.props.reference}
            style={[styles.font, styles.textInput]}
            // onChangeText={this.props.myFunc}
            // onFocus={this.props.myFocus}
            autoCorrect={false}
            keyboardType="decimal-pad"
            keyboardAppearance="dark"
            // value={this.props.variable}
            selectionColor="#f00"
          />
          <TouchableElement 
            style={styles.unit}
            onPress={ this.doNothing } 
            >
            <Text style={[styles.font, styles.unit]}>UNT</Text>
          </TouchableElement>
          <Text style={styles.unit}>=</Text>
          <TextInput
            // ref={this.props.reference}
            style={[styles.font, styles.textInput]}
            // onChangeText={this.props.myFunc}
            // onFocus={this.props.myFocus}
            autoCorrect={false}
            keyboardType="decimal-pad"
            keyboardAppearance="dark"
            // value={this.props.variable}
            selectionColor="#f00"
          />
          <TouchableElement 
            style={styles.unit}
            onPress={ this.doNothing } 
            >
            <Text style={[styles.font, styles.unit]}>UNT</Text>
          </TouchableElement>
        </View>
        <Text style={styles.parameterName}>PARAMETER</Text>
        <View style={styles.item}>
          <TextInput
            // ref={this.props.reference}
            style={[styles.font, styles.textInput]}
            // onChangeText={this.props.myFunc}
            // onFocus={this.props.myFocus}
            autoCorrect={false}
            keyboardType="decimal-pad"
            keyboardAppearance="dark"
            // value={this.props.variable}
            selectionColor="#f00"
          />
          <TouchableElement 
            style={styles.unit}
            onPress={ this.doNothing } 
            >
            <Text style={[styles.font, styles.unit]}>UNT</Text>
          </TouchableElement>
          <Text style={styles.unit}>=</Text>
          <TextInput
            // ref={this.props.reference}
            style={[styles.font, styles.textInput]}
            // onChangeText={this.props.myFunc}
            // onFocus={this.props.myFocus}
            autoCorrect={false}
            keyboardType="decimal-pad"
            keyboardAppearance="dark"
            // value={this.props.variable}
            selectionColor="#f00"
          />
          <TouchableElement 
            style={styles.unit}
            onPress={ this.doNothing } 
            >
            <Text style={[styles.font, styles.unit]}>UNT</Text>
          </TouchableElement>
        </View>
        <Text style={styles.parameterName}>PARAMETER</Text>
        <View style={styles.item}>
          <TextInput
            // ref={this.props.reference}
            style={[styles.font, styles.textInput]}
            // onChangeText={this.props.myFunc}
            // onFocus={this.props.myFocus}
            autoCorrect={false}
            keyboardType="decimal-pad"
            keyboardAppearance="dark"
            // value={this.props.variable}
            selectionColor="#f00"
          />
          <TouchableElement 
            style={styles.unit}
            onPress={ this.doNothing } 
            >
            <Text style={[styles.font, styles.unit]}>UNT</Text>
          </TouchableElement>
          <Text style={styles.unit}>=</Text>
          <TextInput
            // ref={this.props.reference}
            style={[styles.font, styles.textInput]}
            // onChangeText={this.props.myFunc}
            // onFocus={this.props.myFocus}
            autoCorrect={false}
            keyboardType="decimal-pad"
            keyboardAppearance="dark"
            // value={this.props.variable}
            selectionColor="#f00"
          />
          <TouchableElement 
            style={styles.unit}
            onPress={ this.doNothing } 
            >
            <Text style={[styles.font, styles.unit]}>UNT</Text>
          </TouchableElement>
        </View>
      </View>
    )
  }
}

module.exports = UnitConverter