const globals = require('./Globals.js');
const Item = globals.Item;

units = {
  units: [
    new Item("Pressure", [["psi", 1], ["bar", 0.0689476], ["MPa", 0.00689476]]),
    new Item("Flowrate", [["gpm", 1], ["bbl/m", 0.024], ["bbl/h", 1.43]]),
    new Item("Length", [["in", 1], ["cm", 2.54], ["mm", 25.4]]),
    new Item("Speed", [["rpm", 1], ["rph", 60]]),
    // 'garbage' items added to develop scrolling and keyboard response (see ScrollView and KeyboardAvoidingView):
    new Item("aaaa", [["psi", 1], ["bar", 0.0689476], ["MPa", 0.00689476]]),
    new Item("bbbb", [["gpm", 1], ["bbl/m", 0.024], ["bbl/h", 1.43]]),
    new Item("cccc", [["in", 1], ["cm", 2.54], ["mm", 25.4]]),
    new Item("dddd", [["rpm", 1], ["rph", 60]]),
    new Item("eeee", [["psi", 1], ["bar", 0.0689476], ["MPa", 0.00689476]]),
    new Item("ffff", [["gpm", 1], ["bbl/m", 0.024], ["bbl/h", 1.43]]),
    new Item("gggg", [["in", 1], ["cm", 2.54], ["mm", 25.4]]),
    new Item("hhhh", [["rpm", 1], ["rph", 60]]),
  ],
};

module.exports = units;