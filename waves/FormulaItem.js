import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, Text, TextInput, View, Modal } from 'react-native';
const styles = require('./Style.js');

// separate out into globals file and require as needed
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
  
  displayValue = () => {
    //convert the canonicalValue to displayValue based on the displayUnit
    return this.state.canonicalValue * this.state.displayUnit[1];  //.getConversionFactor()
  }
  updateValue = (text) => {
    // this.setState with the new canonical value
    this.setState({canonicalValue: text / this.state.displayUnit[1]});
  }

  render() {
    if (this.props.item.getUnits().length > 1) {  // don't bother building these components if only one unit is available because modal will never show
      var unitOptions = this.props.units.map((x,i)=>{
        return (
          <TouchableElement style={styles.btn} onPress={() => {this.updateUnit(this.props.reference, i)}}>
            <Text style={styles.btnText}>{ x.unit.toUpperCase() }</Text>
          </TouchableElement>
        )
      })
    }
    return(
      <View style={styles.item}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={styles.modalView}>
            { unitOptions }
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
          <Text style={[styles.font, styles.unitText]}>{this.state.displayUnit[0].toUpperCase()}</Text>
        </TouchableElement>
      </View>
    );
  }


}

module.exports = FormulaItem;
