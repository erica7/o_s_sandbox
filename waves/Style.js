import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  note: {
    color: '#eee',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#111',
    // backgroundColor: '#2a363b',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 9,
    paddingTop: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 50,
    marginLeft: 50,
    margin: 9,
    color: '#3eacab',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  font: {
    fontSize: 22,
  },
  parameter: {
    flex: 4,
    color: '#eee',
    textAlign: 'right',
    // textTransform: 'upper-case',
  },
  textInput: {
    flex: 3,
    color: '#eee',
    marginLeft: 12,
    marginRight: 12,
    paddingBottom: 4,
    textAlign: 'right',
    fontSize: 33,
    backgroundColor: '#000',
    padding: 7,
    paddingRight: 14,
    borderRadius: 7,
  },
  unit: {
    flex: 2,
    // color: '#eee',
    paddingTop: 8,
    marginTop: 0,
  },
  unitText: {
    alignItems: 'center',
    color: '#eee',
    marginBottom: 7,  // is this going to look good on all screens? 
  },
  unitTextClickable: {
    color: '#3ee',
  },
  unitCenter: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  test: {
    color: 'white',
  },
  btn: {
    marginTop: 12,
    padding: 12,
    paddingRight: 33,
    paddingLeft: 33,
    backgroundColor: '#eee',
  },
  btnDisabled: {
    backgroundColor: '#777',
  },
  btnText: {
    fontSize: 18,
    letterSpacing: 9,
  },
  btnTextSelected: {
    fontWeight: 'bold',
    color: '#090',
  },
  btnMenu: {
    width: '90%',
    marginTop: 12,
    padding: 12,
    paddingRight: 22,
    paddingLeft: 22,
    backgroundColor: '#eee',
  },
  spacing: {
    height: 290,
    // backgroundColor: '#444',
    marginTop: 9,
  },
  modalView: {
    padding: 44,
    justifyContent: 'center',
    backgroundColor: '#333c',
    borderRadius: 7,
    borderWidth: 3,
    borderColor: '#333',
    height: '100%',
  },

  // allText: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   fontSize: 22,
  // },

  // // // // Unit Converter
  parameterName: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    margin: 9,
    color: '#ccc',
  }
});

module.exports = styles;