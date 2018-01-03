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
      displayUnit: props.item.getUnits()[0], 
      modalVisible: false,
      decimal: false,
    }
    this.setCanonicalValue = this.setCanonicalValue.bind(this);
  }

  // Return the conversion factor of a unit 
  getConversionFactor = () => {
    return this.state.displayUnit[1];
  }
  
  // Return the displayValue based on the canonicalValue and the displayUnit
  displayValue = () => {
    // console.log("displayValue(): canonicalValue", this.state.canonicalValue, "displayUnit", this.state.displayUnit);
    if (this.state.canonicalValue !== null && !Number.isNaN(this.state.canonicalValue) && this.state.canonicalValue * this.getConversionFactor() != 0)  {
      let val = (this.state.canonicalValue * this.getConversionFactor()).toLocaleString('en-US');
      if (this.state.decimal) {
        this.setState({decimal: false});
        val += ".";  // FIXME - trailing decimal does not appear correctly
      } 
      return val;
    } else {
      return null;
    }
  }

  getCanonicalValue = () => {
    return this.state.canonicalValue;
  }
  
  // Update this.state.canonicalValue on user input 
  setCanonicalValue(text) {
    //FIXME determine all possible conditions and refactor 
    if (text == null) {
      this.setState({canonicalValue: null}, () => { this.props.childChanged() });
      return;
    }

    if (text == "") {
      this.setState({canonicalValue: null}, () => { this.props.childChanged() });
      return;
    }

    // FIXME tag input of decimal point
    if (text[text.length-1] == ".") {
      this.setState({decimal: true});
    }

    // calculate the new canonical value and update state, notify the parent element that child changed 
    let newCanonicalValue = parseInt(text.replace(/,/g, "")) / this.getConversionFactor();
    // this.setState({canonicalValue: newCanonicalValue});  // // // // // // doesn't trigger render event immediately
    this.setState({canonicalValue: newCanonicalValue}, () => { this.props.childChanged() }); 
    
    // console.log("this.state", this.state)

    // notify parent element that child changed  // moved to callback
    // this.props.childChanged();
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
              item.getUnits().map((x,i) => (
                <TouchableElement style={[styles.btn, styles.color_btn_primary]} onPress={() => {this.setState({displayUnit: x, modalVisible: false})}}>
                  <Text style={[styles.btn_text, styles.color_font_secondary, this.state.displayUnit == x && styles.color_font_selected]}>
                    { x[0].toUpperCase() } {this.state.displayUnit == x && "\u2713"}
                  </Text>
                </TouchableElement>
              ))
            }
          </View>
        </Modal>
        <Text style={[styles.font, styles.color_font_primary, styles.parameter]}>{item.displayName.toUpperCase()}</Text>
        <TextInput
          ref={this.props.reference}
          style={[styles.font, styles.textInput, styles.color_font_primary, styles.color_background_secondary, styles.flex_3, styles.font_bigger]}
          onChangeText={this.setCanonicalValue}
          // onChangeText={this.props.notifierFunction.bind(this, "TEST")}
          autoCorrect={false}
          keyboardType="decimal-pad"  // TODO check docs for android compatibility 
          keyboardAppearance="dark"
          value={this.displayValue()}
          selectionColor="#f00"
        />
        <TouchableElement 
          style={[styles.btnSec, styles.flex_2]}
          underlayColor={item.getUnits().length > 1 ? "#333" : "none"}
          activeOpacity={item.getUnits().length > 1 ? 0.7 : 1}
          onPress={() => { if (item.getUnits().length > 1) { this.setState({modalVisible: true}) }}} 
          >
          <Text style={[styles.font, styles.btnSec_text, styles.color_font_primary, item.getUnits().length > 1 && styles.color_font_accent]}>
            {this.state.displayUnit[0].toUpperCase()}
          </Text>
        </TouchableElement>
      </View>
    );
  }
}

module.exports = FormulaItem;
