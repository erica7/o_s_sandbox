import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, AppRegistry, StyleSheet, Text, TextInput, View, Button, Modal, Picker } from 'react-native';
import { StackNavigator } from 'react-navigation';
const styles = require('./Style.js');
const Horsepower = require('./Horsepower.js');
const Flowrate = require('./Flowrate.js');
const UnitConverter = require('./UnitConverter.js');
const FormulaView = require('./FormulaView.js');

// ISSUES
//   clean up Item props
//   decimal probs 
//   handle press behavior, clearing fields
//   make button styling respond to active/inactive state
//   triggering calculation wrt multi-digit input  - check out onEndEditing, onSelectionChange vs onChangeText; currently resolved using active/inactive calculate button
//   DRY it up .... srsly

// TODO
//   done for flowrate|change units on calc pages - click on the unit, present modal, update unit & calculation accordingly 
//   done for flowrate|populate unit converter modal dynamically based on item options 
//   unit converter - probably single page, only the common stuff 
//   pre-populated common values such as number of plungers 

// DRY
//   Calculate and Clear All buttons are the same on each page 

// OTHER
//   state vs local variables   ...replace state entirely??
//   where to define: methods/variables in constructor vs outside constructor 
//   when is render executed?

function printState(obj) {
  console.log(obj.state);
}

const TouchableElement = (Platform.OS === 'android') 
  ? TouchableNativeFeedback
  : TouchableHighlight ;

//TODO refactor all menu buttons
const menuButton = (navigate, pageName) => { 
  return (
    <TouchableElement style={[styles.btnMenu]} underlayColor="#ccc" activeOpacity={0.7} onPress={() => navigate(pageName)} >
      <Text style={styles.btnText}>{ pageName.toUpperCase() }</Text>
    </TouchableElement>
  )
};

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'WAVY'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>WAVY</Text>
        { menuButton(navigate, 'FormulaView') }
        { menuButton(navigate, 'Flowrate') }
        <TouchableElement style={[styles.btnMenu]} underlayColor="#ccc" activeOpacity={0.7} onPress={() => navigate('Flowrate')}>
          <Text style={styles.btnText}>FLOWRATE</Text>
        </TouchableElement>
        <TouchableElement style={[styles.btnMenu]} underlayColor="#ccc" activeOpacity={0.7} onPress={() => navigate('Horsepower')}>
          <Text style={styles.btnText}>HORSEPOWER</Text>
        </TouchableElement>
        <TouchableElement style={[styles.btnMenu]} underlayColor="#ccc" activeOpacity={0.7} onPress={() => navigate('UnitConverter')}>
          <Text style={styles.btnText}>UNIT CONVERTER</Text>
        </TouchableElement>
      </View>
    );
  }
}

class Another extends React.Component {  // example for navigating screens
  static navigationOptions = {
    title: 'Another',
  };
  render() {
    return (
      <View>
        <Text>Another</Text>
      </View>
    );
  }
}

class ModalExample extends React.Component {  // example of modal and picker 
  state = {
    modalVisible: false,
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  modalStyles = StyleSheet.create({
    modal: {
      marginTop: '44%',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 44,
      justifyContent: 'center',
      backgroundColor: '#aaa',
      borderRadius: 7,
      borderWidth: 3,
      borderColor: '#f55',
      width: 333,
      // height: 333,
    },
    modalElements: {
      textAlign: 'center',
    }
  })
  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          style={{ marginTop: 22, flex: 1, flexDirection: 'column', justifyContent: 'center', }}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={this.modalStyles.modal}>
          <View>
            <Text style={this.modalStyles.modalElements}>Hello World!</Text>
            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <TouchableHighlight style={styles.btn} onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text style={this.modalStyles.modalElements}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
          </View>
        </Modal>
        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
        <Picker
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
  }
}

//TODO make sure first page is explicit
const CalcApp = StackNavigator({
  Home: { screen: HomeScreen },
  Another: { screen: Another },
  Horsepower: { screen: Horsepower },
  Flowrate: { screen: Flowrate },
  ModalEx: { screen: ModalExample },
  UnitConverter: { screen: UnitConverter },
  FormulaView: { screen: FormulaView },
});

export default App = CalcApp;

// export default class App extends React.Component {
//   render() {
//     return <CalcApp />;
//   }
// }