const globals = require('./Globals.js');
const Item = globals.Item;

units = {
  units: [
    new Item("Pressure", [["psi", 1], ["bar", 0.0689476], ["MPa", 0.00689476]]),
    new Item("Flowrate", [["gpm", 1], ["bbl/m", 0.024], ["bbl/h", 1.43]]),
    new Item("Speed", [["rpm", 1], ["rph", 60], ["rps", 1/60]]),
    new Item("Volume", [["gal", 1], ["bbl", 0.0238095], ["L", 3.7854118], ["ft^3", 0.1336806]]),
    new Item("Weight", [["lb", 1], ["kg", 0.4535924], ["ton", 0.0005], ["oz", 16], ["slug", 0.031081]]),
    new Item("Length", [["in", 1], ["cm", 2.54], ["mm", 25.4], ["ft", 1/12]]),
    new Item("Energy", [["HP-hr", 1], ["BTU", 2,545.825], ["kJ", 2,685.9794054]]),
    new Item("Torque", [["ft-lb", ], ["N-m", 1.3558182], ["kg-m", 0.138255]]),
    new Item("Time", [["hr", 1], ["min", 60], ["sec", 3600], ["day", 0.0416667], ["yr", 0.0001142], ["decade", 0.0000114]]),
  ],
};

module.exports = units;