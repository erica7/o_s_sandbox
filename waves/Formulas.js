const globals = require('./Globals.js');
const Item = globals.Item;

formulas = {
  flowrate: {
    items: [
      {s: new Item("Speed", [["rpm", 1], ["rph", 60]])},
      {n: new Item("Number of Plungers", [["qty", 1]])},
      {d: new Item("Plunger Diameter", [["in", 1], ["cm", 2.54]])},
      {l: new Item("Stroke", [["in", 1], ["cm", 2.54]])},
      {q: new Item("Flowrate", [["gpm", 1], ["bbl/m", 0.024], ["bbl/h", 1.43]])},
    ],
    formulas: [
      {
        constraints: [false, true, true, true, true],
        formula: function([s, n, d, l, q]) {
          return q / (0.25 * Math.PI * Math.pow(d, 2) * l * n * 1 / 231);
        }
      },
      {
        constraints: [true, false, true, true, true],
        formula: function([s, n, d, l, q]) {
          return q / (0.25 * Math.PI * Math.pow(d, 2) * l * s * 1 / 231);
        }
      },
      {
        constraints: [true, true, false, true, true],
        formula: function([s, n, d, l, q]) {
          return Math.sqrt(q / (0.25 * Math.PI * l * n * s * 1 / 231));
        }
      },
      {
        constraints: [true, true, true, false, true],
        formula: function([s, n, d, l, q]) {
          return q / (0.25 * Math.PI * Math.pow(d, 2) * s * n * 1 / 231);
        }
      },
      {
        constraints: [true, true, true, true, false],
        formula: function([s, n, d, l, q]) {
          // return 0.25 * Math.PI * Math.pow(d, 2) * l.getValue() * n.getValue() * s.getValue() * 1 / 231;
          return 0.25 * Math.PI * Math.pow(d, 2) * l * n * s * 1 / 231;
        }
      },
      //TODO double check formulas and constants
    ],
  },
  horsepower: {
    items: [
      {q: new Item("Flowrate", [["gpm", 1], ["bbl/m", 0.024], ["bbl/h", 1.43]])},
      {p: new Item("Pressure", [["psi", 1], ["bar", 0.0689476], ["MPa", 0.00689476]])},
      {h: new Item("Horsepower", [["hhp", 1]])},
    ],
    formulas: [
      {
        constraints: [false, true, true],
        formula: function([q_null, p, h]) {
          return h * 1550 / p;
        }
      },
      {
        constraints: [true, false, true],
        formula: function([q, p_null, h]) {
          return h * 1550 / q;
        }
      },
      {
        constraints: [true, true, false],
        formula: function([q, p, h_null]) {
          return q * p / 1550;
        }
      },
    ],
  },
}

module.exports = formulas;