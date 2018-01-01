import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, Text, TextInput, View, Modal } from 'react-native';
const styles = require('./Style.js');
const globals = require('./Globals.js');

const TouchableElement = globals.TouchableElement;

export class FormulaItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canonicalValue: null, //canonical value
      displayUnit: props.item.getUnits()[0], //display unit
      modalVisible: false,
    }
  }
  
  displayValue = () => {
    //convert the canonicalValue to displayValue based on the displayUnit
    console.log("displayValue(): canonicalValue", this.state.canonicalValue, "displayUnit", this.state.displayUnit);
    if (this.state.canonicalValue !== null) {
      return (this.state.canonicalValue * this.state.displayUnit[1]).toString();  //.getConversionFactor()
    } else {
      return null;
    }
  }
  updateValue = (text) => {
    // this.setState with the new canonical value
    console.log("updateValue text", text, "displayUnit", this.state.displayUnit);
    this.setState({canonicalValue: text / this.state.displayUnit[1]});
    // console.log("text",text);
    // console.log("divide       ", text / this.state.displayUnit[1]);
    // console.log("divide better", parseInt(text) / this.state.displayUnit[1]);
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    //refactor with const item = this.props.item, etc
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
              (this.props.item.getUnits().length > 1) &&  // don't bother building these components if only one unit is available because modal will never show
                this.props.item.getUnits().map( (x,i) => (
                  <TouchableElement style={styles.btn} onPress={() => {this.setState({displayUnit: x, modalVisible: false})}}>
                    <Text style={styles.btnText}>{ x[0].toUpperCase() }</Text>
                  </TouchableElement>
                )
              )
            }
          </View>
        </Modal>
        <Text style={[styles.font, styles.parameter]}>{this.props.item.displayName.toUpperCase()}</Text>
        <TextInput
          ref={this.props.reference}
          style={[styles.font, styles.textInput]}
          // onChangeText={this.props.myFunc}
          onChangeText={this.updateValue}
          // onFocus={this.props.myFocus}
          autoCorrect={false}
          keyboardType="decimal-pad"  // TODO check docs for android compatibility 
          keyboardAppearance="dark"
          // value={this.props.variable}
          value={this.displayValue()}
          selectionColor="#f00"
        />
        <TouchableElement 
          style={styles.unit}
          onPress={() => { if (this.props.item.getUnits().length > 1) { this.setModalVisible(!this.state.modalVisible) }}} 
          >
          <Text style={[styles.font, styles.unitText]}>{this.state.displayUnit[0].toUpperCase()}</Text>
        </TouchableElement>
      </View>
    );
  }


}

module.exports = FormulaItem;
