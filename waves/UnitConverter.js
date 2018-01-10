import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
const styles = require('./Style.js');
const UnitConverterItem = require('./UnitConverterItem.js');
const globals = require('./Globals.js');

const TouchableElement = globals.TouchableElement;

class UnitConverter extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.units = params.p;
  }
  render() {
    let unitItems = this.units.map((x, i) => {
      return <UnitConverterItem key={i} item={ this.units[i] } />
    })
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={[styles.container, styles.color_background_primary]}>
        <ScrollView contentContainerStyle={styles.containerContent} style={[styles.containerWithoutAlign, styles.color_background_primary]}>
          { unitItems }
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

module.exports = UnitConverter