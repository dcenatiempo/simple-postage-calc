const express = require('express');
const router = express.Router();

/* GET postage */
router.get('/', (req, res, next) => {

  res.render('postage', { title: 'Express' });
});

module.exports = router;
