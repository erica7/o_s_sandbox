import React from 'react';
import { Text, TextInput, View, Modal } from 'react-native';
const styles = require('./Style.js');
const globals = require('./Globals.js');

const TouchableElement = globals.TouchableElement;

sendStateToParent = () => {
  // e.g. send state.canonicalValue to parent 
}

export class FormulaItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canonicalValue: null, 
      displayUnit: props.item.getUnits()[0], 
      modalVisible: false,
      decimal: false,
    }
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
  
  // Update this.state.canonicalValue on user input 
  // FIXME - see inside 
  updateValue = (text) => {
    // tag input of decimal point
    if (text[text.length-1] == ".") {
      this.setState({decimal: true});
    }

    // calculate the new canonical value and update state 
    let newCanonicalValue = parseInt(text.replace(/,/g, "")) / this.getConversionFactor();
    this.setState({canonicalValue: newCanonicalValue});

    // send canonical value to parent element 
    // FIXME
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
                <TouchableElement style={[styles.btn]} onPress={() => {this.setState({displayUnit: x, modalVisible: false})}}>
                  <Text style={[styles.btn_text, this.state.displayUnit == x && styles.btn_text__selected]}>
                    { x[0].toUpperCase() } {this.state.displayUnit == x && "\u2713"}
                  </Text>
                </TouchableElement>
              ))
            }
          </View>
        </Modal>
        <Text style={[styles.font, styles.parameter]}>{item.displayName.toUpperCase()}</Text>
        <TextInput
          ref={this.props.reference}
          style={[styles.font, styles.textInput, styles.flex_3, styles.font_bigger]}
          onChangeText={this.updateValue}
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
          <Text style={[styles.font, styles.btnSec_text, item.getUnits().length > 1 && styles.btnSec_text__active]}>
            {this.state.displayUnit[0].toUpperCase()}
          </Text>
        </TouchableElement>
      </View>
    );
  }
}

module.exports = FormulaItem;
