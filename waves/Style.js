import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  note: {
    color: '#eee',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#111111',
    // backgroundColor: '#2a363b',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 9,
    paddingTop: 18,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  font: {
    fontSize: 26,
  },
  parameter: {
    flex: 4,
    color: '#e1f5c4',
    // backgroundColor: '#bbb',
    textAlign: 'right',
  },
  textInput: {
    flex: 3,
    color: '#e1f5c4',
    marginLeft: 12,
    marginRight: 12,
    paddingBottom: 4,
    // backgroundColor: '#ccc',
    // borderStyle: 'solid',
    // borderColor: '#f6903d',
    // borderBottomWidth: 2,
    textAlign: 'right',
    fontSize: 33,
    backgroundColor: '#333',
    padding: 7,
    paddingRight: 14,
    borderRadius: 7,
  },
  unit: {
    flex: 2,
    color: '#e1f5c4',
    // backgroundColor: '#ddd',
  },
  test: {
    color: 'white',
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
  calcBtn: {
    // color: 'red',
    // raised: true,
    padding: 7,
    backgroundColor: '#3eacab',

  },
  spacing: {
    height: 290,
    // backgroundColor: '#444',
    marginTop: 9,
  },

  // allText: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   fontSize: 22,
  // },
});

module.exports = styles;