import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback } from 'react-native';

globals = {
  TouchableElement: (Platform.OS === 'android') ? TouchableNativeFeedback : TouchableHighlight ,
  aVariable: "a variable!",
  Item: class Item {  //never stores value
    constructor(displayName, units) {
      this.displayName = displayName;
      this.units = units; //array of possible inputs 
      // this.conversion = conversion; //array of conversion factors
    }
    getDisplayName() {
      // return displayName
      return this.displayName;
    }
    getUnits() {
      // console.log("getUnits this.units", this.units)
      return this.units;
    }
  },
}

module.exports = globals;