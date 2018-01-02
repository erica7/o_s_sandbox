import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, Text, TextInput, View, Modal } from 'react-native';
const styles = require('./../Style.js');

class ItemUnit extends React.Component {
  constructor(props) {
    super(props);
    this.updateUnit = this.updateUnit.bind(this);
    this.state = {
      modalVisible: false,
    }
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  updateUnit = (parameter, index) => {
    this.props.updateUnit(parameter, index);
    this.setModalVisible(!this.state.modalVisible);
  }
  render() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    if (this.props.unitBool) {  // don't bother building these components if only one unit is available because modal will never show
      var unitOptions = this.props.units.map((x,i)=>{
        return (
          <TouchableElement style={[styles.btn, styles.color_btn_primary]} onPress={() => {this.updateUnit(this.props.reference, i)}}>
            <Text style={[styles.btn_text, styles.color_font_secondary]}>{ x.unit.toUpperCase() }</Text>
          </TouchableElement>
        )
      })
    }
    return (
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
        <Text style={[styles.font, styles.parameter]}>{this.props.parameter.toUpperCase()}</Text>
        <TextInput
          ref={this.props.reference}
          style={[styles.font, styles.textInput, styles.color_font_primary, styles.color_background_secondary, styles.flex_3]}
          onChangeText={this.props.myFunc}
          onFocus={this.props.myFocus}
          autoCorrect={false}
          keyboardType="decimal-pad"
          keyboardAppearance="dark"
          value={this.props.variable}
          selectionColor="#f00"
        />
        <TouchableElement 
          style={[styles.btnSec, styles.flex_2]}
          onPress={() => { if (this.props.unitBool) { this.setModalVisible(!this.state.modalVisible) }}} 
          >
          <Text style={[styles.font, styles.btnSec_text, styles.color_font_primary]}>{this.props.unit.toUpperCase()}</Text>
        </TouchableElement>
      </View>
    )
  }
}

module.exports = ItemUnit;