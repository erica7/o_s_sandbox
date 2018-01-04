import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#111',
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
  // 'list'/'row' item 
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textInput: {
    color: '#eee',
    backgroundColor: '#000',
    marginLeft: 12,
    marginRight: 12,
    padding: 7,
    paddingRight: 14,
    paddingBottom: 4,
    borderRadius: 7,
    textAlign: 'right',
  },

  // FONT SIZE
  font: { fontSize: 22, },
  font_bigger: { fontSize: 26, },
  // TEXT ALIGNMENT
  text_left: { textAlign: 'left', },
  text_center: { textAlign: 'center', },
  text_right: { textAlign: 'right', },
  // FLEX SIZE
  flex_1: { flex: 1, },
  flex_2: { flex: 2, },
  flex_3: { flex: 3, },
  flex_4: { flex: 4, },
  flex_5: { flex: 5, },
  flex_6: { flex: 6, },
  // COLORS
  // ....TODO 
  // SIZE
  width_full: {
    width: '90%',
  },

  //FIXME - ensure compatibility with different devices / redesign
  //FormulaView
  spacing: {
    height: 290,
    marginTop: 9,
    // backgroundColor: '#444',
  },

  //App menu page title
  // FIXME - eliminate this class; replace with modular classes for font stlying & spacing, colors, etc
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 50,
    marginLeft: 50,
    margin: 9,
    color: '#3eacab',
  },
  // FIXME - eliminate classe; refactor into separate classes 
  //FormulaItem and UnitConverterItem
  parameter: {
    flex: 4,
    color: '#eee',
    textAlign: 'right',
    // textTransform: 'upper-case',
  },
  // FIXME - eliminate classe; refactor into separate classes 
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
  // FIXME - eliminate classe; refactor into separate classes 
  parameterName: {
    fontSize: 22,
    // fontWeight: '800',
    textAlign: 'center',
    margin: 9,
    color: '#ccc',
  },

});

module.exports = styles;