import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, Text, TextInput, View, Modal } from 'react-native';
const styles = require('./Style.js');

const TouchableElement = (Platform.OS === 'android') 
  ? TouchableNativeFeedback
  : TouchableHighlight ;

export class FormulaItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canonicalValue: null, //canonical value
      displayUnit: props.item.getUnits()[0], //display unit
      // canonicalUnit: this.props.canonicalUnit, //never changes... remove from state?
    }
  }
  
  getValue = () => {
    //return the canonicalValue
    // this.props.convertValue(this.state.value, this.state.unit, this.state.canonicalUnit);  // this.props.canonicalUnit? 
    this.state.value;
  }
  displayValue = () => {
    //convert the canonicalValue to displayValue based on the displayUnit
    canonicalValue * displayUnit[1];  //.getConversionFactor()
  }
  updateValue = (text) => {
    // this.setState with the new canonical value
    this.setState({canonicalValue: text / displayUnit[1]});
  }

  render() {
    return(
      <View style={styles.item}>
        <Text style={[styles.font, styles.parameter]}>{this.props.item.displayName.toUpperCase()}</Text>
        <TextInput
          ref={this.props.reference}
          style={[styles.font, styles.textInput]}
          // onChangeText={this.props.myFunc}
          onChangeText={this.updateValue}
          // onFocus={this.props.myFocus}
          autoCorrect={false}
          keyboardType="decimal-pad"
          keyboardAppearance="dark"
          // value={this.props.variable}
          value={this.displayValue()}
          selectionColor="#f00"
        />
        <TouchableElement 
          style={styles.unit}
          onPress={() => { if (this.props.item.getUnits().length > 1) { this.setModalVisible(!this.state.modalVisible) }}} 
          >
          <Text style={[styles.font, styles.unitText]}>{this.props.unit.toUpperCase()}</Text>
        </TouchableElement>
      </View>
    );
  }


}