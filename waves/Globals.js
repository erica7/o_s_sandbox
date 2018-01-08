import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback } from 'react-native';

globals = {
  TouchableElement: (Platform.OS === 'android') ? TouchableNativeFeedback : TouchableHighlight ,
  aVariable: "a variable!",
  Item: class Item {  //never stores value
    constructor(displayName, units) {
      this.displayName = displayName;
      this.units = units; //array of possible units 
    }
    getDisplayName() {
      return this.displayName;
    }
    getUnits() {
      return this.units;
    }
  },
}

module.exports = globals;