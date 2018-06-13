let rateTable = {
  stamped: {
    full: 'Letters (Stamped)',
    base: .5,
    surcharge: .21,
    max: 3.5
  },
  metered: {
    full: 'Letters (Metered)',
    base: .47,
    surcharge: .21,
    max: 3.5
  },
  flats: {
    full: 'Large Envelopes (Flats)',
    base: 1,
    surcharge: .21,
    max: 13
  },
  package: {
    full: 'First-Class Package Service-Retail',
    base: 1.3,
    surcharge: .35,
    max: 13
  }
}

module.exports = rateTable;