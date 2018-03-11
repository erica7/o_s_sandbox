import React from 'react';
import { Text, TextInput, View, Modal } from 'react-native';
const styles = require('./Style.js');
const globals = require('./Globals.js');

const TouchableElement = globals.TouchableElement;

//TODO store one canonicalValue and two displayUnits per item 
class UnitConverterItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canonicalValue: null, 
      displayUnit: props.item.getUnits()[0], 
      displayUnit2: props.item.getUnits()[1], 
      unit2Active: false,
      modalVisible: false,
      decimal: false,
    }
  }

  // Return the conversion factor of a unit 
  getConversionFactor = (n) => {
    return n == 2 ? this.state.displayUnit2[1] : this.state.displayUnit[1];
  }

  // Convert the canonicalValue to displayValue based on the displayUnit
  displayValue = (n) => {
    // console.log("displayValue(): canonicalValue", this.state.canonicalValue, "displayUnit", this.state.displayUnit);
    if (this.state.canonicalValue !== null && !Number.isNaN(this.state.canonicalValue)) {  // && this.state.canonicalValue * this.getConversionFactor() != 0)  {
      let val = (this.state.canonicalValue * this.getConversionFactor(n)).toLocaleString('en-US', {maximumFractionDigits: 2});
      return (this.state.decimal ? val += "." : val);
    } else {
      return null;
    }
  }

  // Update this.state.canonicalValue on user input 
  // TODO - refactor 
  updateValue = (text) => {
    // console.log("updateValue text", text, "displayUnit", this.state.displayUnit);
    
    // detect and tag input of decimal point
    text[text.length-1] == "." ? this.setState({decimal: true}) : this.setState({decimal: false});

    let newCanonicalValue = parseFloat(text.replace(/,/g, "")) / this.getConversionFactor(1);
    this.setState({canonicalValue: newCanonicalValue});
    return null;
  }
  
  // Update this.state.canonicalValue on user input 
  // TODO - refactor 
  updateValue2 = (text) => {
    // console.log("updateValue text", text, "displayUnit", this.state.displayUnit);

    // detect and tag input of decimal point
    text[text.length-1] == "." ? this.setState({decimal: true}) : this.setState({decimal: false});

    let newCanonicalValue = parseFloat(text.replace(/,/g, "")) / this.getConversionFactor(2);
    this.setState({canonicalValue: newCanonicalValue});
    return null;
  }

  render() {
    return (
      <View style={[styles.container, styles.color_background_primary]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={styles.modalView}>
            { 
              this.props.item.getUnits().map((x,i) => (
                <TouchableElement key={i} style={[styles.btn, styles.color_btn_primary]} onPress={() => { this.state.unit2Active ? this.setState({displayUnit2: x, modalVisible: false}) : this.setState({displayUnit: x, modalVisible: false}) }}>
                  <Text style={[styles.btn_text, styles.color_font_secondary,
                      this.state.unit2Active 
                        ? this.state.displayUnit2 == x && styles.color_font_selected
                        : this.state.displayUnit == x && styles.color_font_selected 
                  ]}>
                    { x[0] } {this.state.unit2Active ? this.state.displayUnit2 == x && "\u2713" : this.state.displayUnit == x && "\u2713" }
                  </Text>
                </TouchableElement>
              ))
            }
          </View>
        </Modal>
        <Text style={[styles.parameterName, styles.color_font_primary]}>{this.props.item.getDisplayName().toUpperCase()}</Text>
        <View style={styles.item}>
          <TextInput
            style={[styles.font, styles.textInput, styles.color_font_primary, styles.color_background_secondary, styles.flex_5]}
            onChangeText={this.updateValue}
            autoCorrect={false}
            keyboardType="decimal-pad"  // TODO check docs for android compatibility 
            keyboardAppearance="dark"
            value={this.displayValue(1)}
            selectionColor="#f00"
          />
          <TouchableElement 
            style={[styles.btnSec, styles.flex_2]}
            underlayColor={"#333"}
            activeOpacity={0.7}
            onPress={() => { this.setState({unit2Active: false, modalVisible: true}) }} 
            >
            <Text style={[styles.font, styles.btnSec_text, styles.color_font_accent]}>
              {this.state.displayUnit[0]}
            </Text>
          </TouchableElement>

        </View>

        <View style={styles.item}>
          <TextInput
            style={[styles.font, styles.textInput, styles.color_font_primary, styles.color_background_secondary, styles.flex_5]}
            onChangeText={this.updateValue2}
            autoCorrect={false}
            keyboardType="decimal-pad"  // TODO check docs for android compatibility 
            keyboardAppearance="dark"
            value={this.displayValue(2)}
            selectionColor="#f00"
          />
          <TouchableElement 
            style={[styles.btnSec, styles.flex_2]}
            underlayColor={"#333"}
            activeOpacity={0.7}
            onPress={() => { this.setState({unit2Active: true, modalVisible: true}) }} 
            >
            <Text style={[styles.font, styles.btnSec_text, styles.color_font_accent]}>
              {this.state.displayUnit2[0]}
            </Text>
          </TouchableElement>
        </View>
      </View>
    )
  }
}

module.exports = UnitConverterItem