import { StyleSheet } from 'react-native';
// NOTE regex example styles\.btn[^a-z_]
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: 9,
    paddingTop: 18,
  },
  content: {
    flex: 5,
    alignItems: 'center',
    width: '100%',
  },
  containerContent: {
    alignItems: 'center',
    width: '100%',
  },
  containerWithoutAlign: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: 9,
    paddingTop: 18,
  },
  //primary button (e.g. main menu, modal)
  btn: {
    marginTop: 12,
    padding: 12,
    paddingRight: 33,
    paddingLeft: 33,
    // backgroundColor: '#eee',
  },
  //primary button text (e.g. main menu, modal)
  btn_text: {
    fontSize: 18,
    letterSpacing: 9,
  },
  //secondary button (e.g. units)
  btnSec: {
    paddingTop: 8,
    marginTop: 0,
  },
  //secondary button text (e.g. units)
  btnSec_text: {
    alignItems: 'center',
    marginBottom: 7,  // is this going to look good on all screens?
  },
  // 'list'/'row' item
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textInput: {
    textAlign: 'right',
    marginLeft: 12,
    marginRight: 12,
    padding: 7,
    paddingRight: 14,
    paddingBottom: 4,
    borderRadius: 7,
  },

  // FONT SIZE
  font: { fontSize: 22, },
  font_bigger: { fontSize: 26, },
  font_biggest: { fontSize: 36, },
  // FONT STYLE
  font_bold: {
    fontWeight: 'bold',
  },
  font_spaced: {
    letterSpacing: 50,
  },
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
  // SIZE
  width_full: {
    width: '90%',
  },
  // COLORS
  //  NIGHT MODE
  color_font_primary: { color: '#eee', },
  color_font_secondary: { color: '#111', },
  color_font_accent: { color: '#3ee', },
  color_font_selected: { color: '#199', fontWeight: 'bold', },
  color_btn_primary: { backgroundColor: '#eee', },
  color_btn_secondary: { backgroundColor: '#111', },
  color_btn_disabled: { backgroundColor: '#777', },
  color_background_primary: { backgroundColor: '#111', },
  color_background_secondary: { backgroundColor: '#000', },
  //  DAY MODE
  // color_font_primary: { color: '#111', },
  // color_font_secondary: { color: '#eee', },
  // color_font_accent: { color: '#3eacab', },
  // color_font_selected: { color: '#199', fontWeight: 'bold', },
  // color_btn_primary: { backgroundColor: '#111', },
  // color_btn_secondary: { backgroundColor: '#eee', },
  // color_btn_disabled: { backgroundColor: '#777', },
  // color_background_primary: { backgroundColor: '#eee', },
  // color_background_secondary: { backgroundColor: '#fff', },

  //TODO - ensure compatibility with different devices / redesign
  //FormulaView
  spacing: {
    flex: 3,
    // height: 290,
    // marginTop: 9,
    // backgroundColor: '#444',
  },




  // TODO - eliminate class; refactor into separate classes
  //FormulaItem and UnitConverterItem
  parameter: {
    flex: 4,
    // color: '#eee',
    textAlign: 'right',
    // textTransform: 'upper-case',
  },
  // TODO - eliminate class; refactor into separate classes
  modalView: {
    backgroundColor: '#333',
    justifyContent: 'center',
    height: '100%',
    padding: 44,
  },
  //UnitConverter
  // TODO - eliminate class; refactor into separate classes
  parameterName: {
    fontSize: 22,
    textAlign: 'center',
    margin: 9,
  },

});

module.exports = styles;
