const express = require('express');
const router = express.Router();
// const url = require('url');

/* GET postage */
router.get('/', (req, res, next) => {
  let type = req.query.type;
  let weight = req.query.weight;

  // validation
  weight = roundWeight(parseFloat(weight));
  weight = typeof weight === 'number' && weight == weight ? weight : 0;

  let rate = calculateRate(type, weight);
  if (rate == 0) {
    res.redirect('/?error=weight');
  }
  else {
  res.render('postage', { 
    title: 'Postage Rates',
    type: rateTable[type].full,
    weight: `${weight} oz`,
    rate: rate.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })});
  }
});

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

function getRate(type, weight) {
  let rate = 0;
  let base = type.base;
  let surcharge = type.surcharge;
  let max = type.max;
  if (weight >= max || weight <= 0) {
    rate = 0;
  }
  else {
    rate = (base + ((Math.ceil(weight+.1)-1) * surcharge));
    rate = roundRate(rate);
  }
  return rate;
}

function calculateRate(type, weight) {
  let rate = 0;
  if (type === 'package') {
    if (weight <= 0) rate = 0;
    else if (weight < 4) rate = 3.5;
    else if (weight < 8) rate = 3.75;
    else rate = getRate(rateTable[type], weight);
  }
  else if (type in rateTable) {
    rate = getRate(rateTable[type], weight);
  }
  return rate;
}

function roundRate (num) {
  return Math.round(num*100)/100;
}
function roundWeight (num) {
  return Math.round(num*10)/10;
}

module.exports = router;
