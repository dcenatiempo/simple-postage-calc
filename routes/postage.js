var express = require('express');
var router = express.Router();

/* GET postage */
router.get('/', function(req, res, next) {
  res.render('postage', { title: 'Express' });
});

module.exports = router;
