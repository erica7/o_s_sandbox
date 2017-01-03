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
    }
  }
  getConversionFactor = (n) => {
    return n == 2 ? this.state.displayUnit2[1] : this.state.displayUnit[1];
  }

  /**
   * Convert the canonicalValue to displayValue based on the displayUnit
   */
  displayValue = (n) => {
    // console.log("displayValue(): canonicalValue", this.state.canonicalValue, "displayUnit", this.state.displayUnit);
    if (this.state.canonicalValue !== null) {
      if (this.state.canonicalValue * this.getConversionFactor(n) != 0) {
        return (this.state.canonicalValue * this.getConversionFactor(n)).toString();  //.getConversionFactor()
      } 
    } else {
      return null;
    }
  }

  /**
   * Update this.state.canonicalValue on user input 
   * FIXME - refactor 
   */
  updateValue = (text) => {
    // console.log("updateValue text", text, "displayUnit", this.state.displayUnit);
    let newCanonicalValue = text / this.getConversionFactor(1);
    this.setState({canonicalValue: newCanonicalValue});
    return null;
  }
  /**
   * Update this.state.canonicalValue on user input 
   * FIXME - refactor 
   */
  updateValue2 = (text) => {
    // console.log("updateValue text", text, "displayUnit", this.state.displayUnit);
    let newCanonicalValue = text / this.getConversionFactor(2);
    this.setState({canonicalValue: newCanonicalValue});
    return null;
  }


  render() {
    return (
      <View style={[styles.container]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={styles.modalView}>
            { 
              this.props.item.getUnits().map((x,i) => (
                <TouchableElement style={[styles.btn]} onPress={() => { this.state.unit2Active ? this.setState({displayUnit2: x, modalVisible: false}) : this.setState({displayUnit: x, modalVisible: false}) }}>
                  <Text style={[styles.btnText, this.state.unit2Active ? this.state.displayUnit2 == x && styles.btnTextSelected : this.state.displayUnit == x && styles.btnTextSelected] }>
                    { x[0].toUpperCase() } {this.state.unit2Active ? this.state.displayUnit2 == x && "\u2713" : this.state.displayUnit == x && "\u2713" }
                  </Text>
                </TouchableElement>
              ))
            }
          </View>
        </Modal>
        <Text style={styles.parameterName}>{this.props.item.getDisplayName()}</Text>
        <View style={styles.item}>
          <TextInput
            style={[styles.font, styles.textInput]}
            onChangeText={this.updateValue}
            autoCorrect={false}
            keyboardType="decimal-pad"  // TODO check docs for android compatibility 
            keyboardAppearance="dark"
            value={this.displayValue(1)}
            selectionColor="#f00"
          />
          <TouchableElement 
            style={[styles.unit]}
            underlayColor={"#333"}
            activeOpacity={0.7}
            onPress={() => { this.setState({unit2Active: false, modalVisible: true}) }} 
            >
            <Text style={[styles.font, styles.unitText, styles.unitTextClickable]}>
              {this.state.displayUnit[0].toUpperCase()}
            </Text>
          </TouchableElement>

          <Text style={[styles.font, styles.unitText]}>=</Text>

          <TextInput
            style={[styles.font, styles.textInput]}
            onChangeText={this.updateValue2}
            autoCorrect={false}
            keyboardType="decimal-pad"  // TODO check docs for android compatibility 
            keyboardAppearance="dark"
            value={this.displayValue(2)}
            selectionColor="#f00"
          />
          <TouchableElement 
            style={[styles.unit]}
            underlayColor={"#333"}
            activeOpacity={0.7}
            onPress={() => { this.setState({unit2Active: true, modalVisible: true}) }} 
            >
            <Text style={[styles.font, styles.unitText, styles.unitTextClickable]}>
              {this.state.displayUnit2[0].toUpperCase()}
            </Text>
          </TouchableElement>
        </View>
      </View>
    )
  }
}

module.exports = UnitConverterItem