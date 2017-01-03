import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, Text, TextInput, View, Modal } from 'react-native';
const styles = require('./Style.js');
const globals = require('./Globals.js');

const TouchableElement = globals.TouchableElement;

sendCanonicalValueToParent = () => {

}

export class FormulaItem extends React.Component {
  constructor(props) {
    super(props);
    // console.log("FormulaItem this.props", this.props);
    this.state = {
      canonicalValue: null, 
      displayUnit: props.item.getUnits()[0], 
      modalVisible: false,
    }
  }
  getConversionFactor = () => {
    return this.state.displayUnit[1];
  }
  /**
   * Convert the canonicalValue to displayValue based on the displayUnit
   */
  displayValue = () => {
    // console.log("displayValue(): canonicalValue", this.state.canonicalValue, "displayUnit", this.state.displayUnit);
    if (this.state.canonicalValue !== null) {
      if (this.state.canonicalValue * this.getConversionFactor() != 0) {
        return (this.state.canonicalValue * this.getConversionFactor()).toString();  
      } 
    } else {
      return null;
    }
  }
  /**
   * Update this.state.canonicalValue on user input 
   * FIXME
   */
  updateValue = (text) => {
    // console.log("updateValue text", text, "displayUnit", this.state.displayUnit);
    let newCanonicalValue = text / this.getConversionFactor();
    this.setState({canonicalValue: newCanonicalValue});

    // send canonical value to parent element 

  }

  render() {
    //TODO refactor with const item = this.props.item, etc

    // console.log("this.props.ref",this.props.ref);
    // console.log("this.state",this.state);

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
              this.props.item.getUnits().map((x,i) => (
                <TouchableElement style={[styles.btn]} onPress={() => {this.setState({displayUnit: x, modalVisible: false})}}>
                  <Text style={[styles.btnText, this.state.displayUnit == x && styles.btnTextSelected]}>
                    { x[0].toUpperCase() } {this.state.displayUnit == x && "\u2713"}
                  </Text>
                </TouchableElement>
              ))
            }
          </View>
        </Modal>
        <Text style={[styles.font, styles.parameter]}>{this.props.item.displayName.toUpperCase()}</Text>
        <TextInput
          ref={this.props.reference}
          style={[styles.font, styles.textInput]}
          onChangeText={this.updateValue}
          autoCorrect={false}
          keyboardType="decimal-pad"  // TODO check docs for android compatibility 
          keyboardAppearance="dark"
          value={this.displayValue()}
          selectionColor="#f00"
        />
        <TouchableElement 
          style={[styles.unit]}
          underlayColor={this.props.item.getUnits().length > 1 ? "#333" : "none"}
          activeOpacity={this.props.item.getUnits().length > 1 ? 0.7 : 1}
          onPress={() => { if (this.props.item.getUnits().length > 1) { this.setState({modalVisible: true}) }}} 
          >
          <Text style={[styles.font, styles.unitText, this.props.item.getUnits().length > 1 && styles.unitTextClickable]}>
            {this.state.displayUnit[0].toUpperCase()}
          </Text>
        </TouchableElement>
      </View>
    );
  }
}

module.exports = FormulaItem;
