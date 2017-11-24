module.exports = { 
  items: {
    s: {
      paramName: "Speed",
      units: [
        {
          unit: "rpm",
          const: 1
        }
      ]
    },
    n: {
      paramName: "Number of Plungers",
      units: [
        {
          unit: "qty",
          const: 1
        }
      ],
    },
    d: {
      paramName: "Plunger Diameter",
      units: [
        {
          unit: "in",
          const: 1
        }
      ],
    },
    l: {
      paramName: "Stroke",
      units: [
        {
          unit: "in",
          const: 1
        },
        {
          unit: "cm",
          const: 1/2.54
        } //or whatever
      ],
    },
    q: {
      paramName: "Flowrate",
      units: [
        {
          unit: "gpm",
          const: 1
        },
        { 
          unit: "bbl/m",
          const: 0.024
        },
        {
          unit: "bbl/h",
          const: 1.43
        }
      ],
    },
  }, 
  inputs: {
    s: {
      value: 0,
      unit: 0,
    },
    n: {
      value: 0,
      unit: 0,
    },
    d: {
      value: 0,
      unit: 0
    },
    l: {
      value: 0,
      unit: 0
    },
    q: {
      value: 0,
      unit: 0
    },
  },
  doTheMath: (inputs, items, solveFor) => {
    console.log("doTheMath() hit");
    // get the current values 
    let s = inputs.s.value;
    let n = inputs.n.value;
    let d = inputs.d.value;
    let l = inputs.l.value;
    let q = inputs.q.value;
    // get the current constants 
    let Cs = items.s.units[inputs.s.unit].const
    let Cn = items.n.units[inputs.n.unit].const
    let Cd = items.d.units[inputs.d.unit].const
    let Cl = items.l.units[inputs.l.unit].const
    let Cq = items.q.units[inputs.q.unit].const
    // solve for the empty variable 
    if (solveFor == "s") {
      s = q * Cq / (0.25 * Math.PI * Math.pow(d, 2) * l * Cl * n * 1 / 231);
      lastSolution = "s";
      inputs.s.value = Math.round(s);  // ISSUE: remains blank solving for this with 333 in all other fields; has to do with Math.round
    } else if (solveFor == "n") {
      n = q * Cq / (0.25 * Math.PI * Math.pow(d, 2) * l * Cl * s * 1 / 231);
      lastSolution = "n";
      inputs.n.value = Math.ceil(n);
    } else if (solveFor == "d") {
      d = Math.sqrt(q * Cq / (0.25 * Math.PI * l * Cl * n * s * 1 / 231));
      lastSolution = "d";
      inputs.d.value = d.toPrecision(1);
    } else if (solveFor == "l") {
      l = q * Cq / (0.25 * Math.PI * Math.pow(d, 2) * s * n * 1 / 231) / Cl;
      lastSolution = "l";
      inputs.l.value = Math.ceil(l);
    } else if (solveFor == "q") {
      // FLOWRATE = 0.25 * PI * D^2 * l * n * s * C
      // C = constant = 1 gal/min / 231 in^3/min
      q = 0.25 * Math.PI * Math.pow(d, 2) * l * Cl * n * s * 1 / 231 * Cq;
      lastSolution = "q";
      inputs.q.value = Math.round(q);
    }
    return [inputs, lastSolution];
  },
} 