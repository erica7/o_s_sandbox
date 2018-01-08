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
      {n_p: new Item("Number of Pumps", [["qty", 1]])},
    ],
    formulas: [
      {
        constraints: [false, true, true, true, true, true],
        formula: function([s, n, d, l, q, n_p]) {
          return q / (0.25 * Math.PI * Math.pow(d, 2) * l * n * n_p * 1 / 231);
        }
      },
      {
        constraints: [true, false, true, true, true, true],
        formula: function([s, n, d, l, q, n_p]) {
          return Math.ceil(q / (0.25 * Math.PI * Math.pow(d, 2) * l * s * n_p * 1 / 231));
        }
      },
      {
        constraints: [true, true, false, true, true, true],
        formula: function([s, n, d, l, q, n_p]) {
          return Math.ceil(Math.sqrt(q / (0.25 * Math.PI * l * n * s * n_p * 1 / 231)));
        }
      },
      {
        constraints: [true, true, true, false, true, true],
        formula: function([s, n, d, l, q, n_p]) {
          return Math.ceil(q / (0.25 * Math.PI * Math.pow(d, 2) * s * n * n_p * 1 / 231));
        }
      },
      {
        constraints: [true, true, true, true, false, true],
        formula: function([s, n, d, l, q, n_p]) {
          // return 0.25 * Math.PI * Math.pow(d, 2) * l.getValue() * n.getValue() * s.getValue() * 1 / 231;
          return 0.25 * Math.PI * Math.pow(d, 2) * l * n * s * n_p * 1 / 231;
        }
      },
      {
        constraints: [true, true, true, true, true, false],
        formula: function([s, n, d, l, q, n_p]) {
          return Math.ceil(q / (0.25 * Math.PI * Math.pow(d, 2) * s * l * n * 1 / 231));
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
  rodload: {
    items: [
      {f: new Item("Rodload", [["lb", 1]])},
      {d: new Item("Plunger Diameter", [["in", 1], ["cm", 2.54]])},
      {p: new Item("Pressure", [["psi", 1], ["bar", 0.0689476], ["MPa", 0.00689476]])},
    ], 
    formulas: [
      {
        constraints: [false, true, true],
        formula: function([f_null, d, p]) {
          return 0.25 * Math.PI * Math.pow(d, 2) * p;
        }
      }, 
      {
        constraints: [true, false, false],
        formula: function([f, d_null, p]) {
          return Math.sqrt(f / (0.25 * Math.PI * p));
        }
      },
      {
        constraints: [true, true, false],
        formula: function([f, d, p_null]) {
          return f / (0.25 * Math.PI * Math.pow(d, 2));
        }
      }
    ]
  }
}

module.exports = formulas;