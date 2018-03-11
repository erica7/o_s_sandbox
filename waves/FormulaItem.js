import React from 'react';
import { Text, TextInput, View, Modal } from 'react-native';
const styles = require('./Style.js');
const globals = require('./Globals.js');

const TouchableElement = globals.TouchableElement;

export class FormulaItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canonicalValue: null, 
      displayUnit: props.item.getUnits()[0], // start with first unit in the array 
      modalVisible: false,
      decimal: false,
    }
  }

  // Return the conversion factor of a unit 
  getConversionFactor = () => {
    return this.state.displayUnit[1];
  }

  getDisplayUnitText = () => {
    return this.state.displayUnit[0];
  }
  
  // Return the displayValue based on the canonicalValue and the displayUnit
  displayValue = () => {
    // console.log("displayValue(): canonicalValue", this.state.canonicalValue, "displayUnit", this.state.displayUnit);
    if (this.state.canonicalValue !== null && !Number.isNaN(this.state.canonicalValue)) {  // && this.state.canonicalValue * this.getConversionFactor() != 0)  {
      let val = (this.state.canonicalValue * this.getConversionFactor()).toLocaleString('en-US');
      return this.state.decimal ? val += "." : val;
    } else {
      return null;
    }
  }

  getCanonicalValue = () => {
    return this.state.canonicalValue;
  }
  
  // Update this.state.canonicalValue on user input 
  setCanonicalValue = (text) => {
    if (!text) {  // !"" and !null both evaluate to true
      this.setState({canonicalValue: null}, () => { this.props.childChanged() });
      return;
    }

    // detect and tag input of decimal point
    text[text.length-1] == "." ? this.setState({decimal: true}) : this.setState({decimal: false});

    // calculate the new canonical value using the unit conversion factor 
    let newCanonicalValue = parseFloat(text.replace(/,/g, "")) / this.getConversionFactor();

    // set state with new value, notify the parent element that child changed 
    this.setState({canonicalValue: newCanonicalValue}, () => { this.props.childChanged() }); 
  }

  // Update this.state.canonicalValue upon calculation
  setCanonicalValueAfterCalc = (text) => {
    if (!text) {  // !"" and !null both evaluate to true
      this.setState({canonicalValue: null}, () => { this.props.childChanged() });
      return;
    }

    // assign the new canonical value (sent directly, no unit conversion needed)  
    let newCanonicalValue = parseFloat(text.replace(/,/g, ""));

    // set state with new value, notify the parent element that child changed 
    this.setState({canonicalValue: newCanonicalValue}, () => { this.props.childChanged() }); 
  }

  changeUnit = (x) => {
    this.setState({displayUnit: x, modalVisible: false});
  }

  render() {
    let item = this.props.item;
    return(
      <View style={styles.item}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={styles.modalView}>
            { 
              item.getUnits().map((x, i) => { 
                return(
                  // <TouchableElement style={[styles.btn, styles.color_btn_primary]} onPress={() => {this.setState({displayUnit: x, modalVisible: false})}}>
                  <TouchableElement key={i.toString()} style={[styles.btn, styles.color_btn_primary]} onPress={() => {this.changeUnit(x)}}>
                    <Text style={[styles.btn_text, styles.color_font_secondary, this.state.displayUnit == x && styles.color_font_selected]}>
                      { x[0] } {this.state.displayUnit == x && "\u2713"}
                    </Text>
                  </TouchableElement>
                )
              })
            }
          </View>
        </Modal>
        <Text style={[styles.font, styles.color_font_primary, styles.parameter]}>{item.displayName.toUpperCase()}</Text>
        <TextInput
          ref={this.props.reference}
          style={[styles.font, styles.textInput, styles.color_font_primary, styles.color_background_secondary, styles.flex_3, styles.font_bigger]}
          onChangeText={this.setCanonicalValue}
          autoCorrect={false}
          keyboardType="decimal-pad"  // TODO check docs for android compatibility 
          keyboardAppearance="dark"
          value={this.displayValue()}
          selectionColor="#f00"
        />
        <TouchableElement 
          style={[styles.btnSec, styles.flex_2]}
          underlayColor={item.getUnits().length > 1 ? "#333" : null}
          activeOpacity={item.getUnits().length > 1 ? 0.7 : 1}
          onPress={() => { if (item.getUnits().length > 1) { this.setState({modalVisible: true}) }}} 
          >
          <Text style={[styles.font, styles.btnSec_text, styles.color_font_primary, item.getUnits().length > 1 && styles.color_font_accent]}>
            {this.getDisplayUnitText()}
          </Text>
        </TouchableElement>
      </View>
    );
  }
}

module.exports = FormulaItem;
