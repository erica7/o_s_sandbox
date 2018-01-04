import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  //********************* */
  //APP STANDARDS
  //********************* */
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#111',
    // backgroundColor: '#2a363b',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 9,
    paddingTop: 18,
    width: '100%',
  },
  //primary button (e.g. main menu, modal)
  btn: {
    marginTop: 12,
    padding: 12,
    paddingRight: 33,
    paddingLeft: 33,
    backgroundColor: '#eee',
  },
  btn__disabled: {
    backgroundColor: '#777',
  },
  //primary button text (e.g. main menu, modal)
  btn_text: {
    fontSize: 18,
    letterSpacing: 9,
  },
  btn_text__selected: {
    fontWeight: 'bold',
    color: '#199', //'#090',
  },
  //secondary button (e.g. units)
  btnSec: {
    // flex: 2,
    // color: '#eee',
    paddingTop: 8,
    marginTop: 0,
  },
  //secondary button text (e.g. units)
  btnSec_text: {
    alignItems: 'center',
    color: '#eee',
    marginBottom: 7,  // is this going to look good on all screens? 
  },
  btnSec_text__active: {
    color: '#3ee',
  },

  //FormulaItem and UnitConverterItem
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  //FormulaItem and UnitConverterItem
  textInput: {
    color: '#eee',
    backgroundColor: '#000',
    marginLeft: 12,
    marginRight: 12,
    padding: 7,
    paddingRight: 14,
    paddingBottom: 4,
    borderRadius: 7,

    // flex: 3,
    textAlign: 'right',
    // fontSize: 33,
  },

  //All over
  font: {
    fontSize: 22,
  },

  font_bigger: {
    fontSize: 26,
  },

  flex_1: { flex: 1, },
  flex_2: { flex: 2, },
  flex_3: { flex: 3, },
  flex_4: { flex: 4, },
  flex_5: { flex: 5, },
  flex_6: { flex: 6, },


  //FIXME - ensure compatibility with different devices / redesign
  //FormulaView
  spacing: {
    height: 290,
    // backgroundColor: '#444',
    marginTop: 9,
  },


  //********************* */
  //MENU 
  //********************* */
  //App menu page title
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 50,
    marginLeft: 50,
    margin: 9,
    color: '#3eacab',
  },
  //App.js
  btnMenu: {
    width: '90%',
    marginTop: 12,
    padding: 12,
    paddingRight: 22,
    paddingLeft: 22,
    backgroundColor: '#eee',
  },


  //********************* */
  //FORMULA 
  //********************* */



  //********************* */
  //UNIT CONVERTER
  //********************* */
  
  
  
  
  //FormulaItem and UnitConverterItem
  parameter: {
    flex: 4,
    color: '#eee',
    textAlign: 'right',
    // textTransform: 'upper-case',
  },
  
  modalView: {
    backgroundColor: '#333c',
    justifyContent: 'center',
    height: '100%',
    padding: 44,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: '#333',
  },
  //UnitConverter
  parameterName: {
    fontSize: 22,
    // fontWeight: '800',
    textAlign: 'center',
    margin: 9,
    color: '#ccc',
  },






  // //FormulaItem and UnitConverterItem  -- replaced with btnSec
  // unit: {
  //   flex: 2,
  //   // color: '#eee',
  //   paddingTop: 8,
  //   marginTop: 0,
  // },
  // //FormulaItem and UnitConverterItem  -- replaced with btnSec_text
  // unitText: {
  //   alignItems: 'center',
  //   color: '#eee',
  //   marginBottom: 7,  // is this going to look good on all screens? 
  // },
  // //FormulaItem and UnitConverterItem   -- replaced with btnSec_text__active
  // unitTextClickable: {
  //   color: '#3ee',
  // },
  // //FormulaView (calc button)  -- replaced with btn__disabled
  // btnDisabled: {
  //   backgroundColor: '#777',
  // },
  // //FormulaItem and UnitConverterItem  -- replaced with btn_text__selected
  // btnTextSelected: {
  //   fontWeight: 'bold',
  //   color: '#199', //'#090',
  // },
  //FormulaItem and UnitConverterItem

  // OLD
  note: {
    color: '#eee',
  },
});

module.exports = styles;