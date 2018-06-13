const rateTable = require('./rateTable');

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

module.exports = { calculateRate, roundWeight };