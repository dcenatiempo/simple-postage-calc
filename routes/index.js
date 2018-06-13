const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let error = null;
  if (req.query.error) {
    error = req.query.error;
    error = error == 'weight' ? 'Weight is out of bounds!' : 'Invalid Input';
  }
  res.render('index', { title: 'Postage Calculator', error: error });
});

module.exports = router;
