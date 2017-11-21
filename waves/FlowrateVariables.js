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
} 