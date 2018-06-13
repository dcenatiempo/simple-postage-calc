const express = require('express');
const router = express.Router();
const rateTable = require('../util/rateTable');
const {roundWeight, calculateRate} = require('../util/calculateRate');

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

module.exports = router;