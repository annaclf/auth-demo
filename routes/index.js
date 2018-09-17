'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/private-page', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }
  res.render('private');
});

module.exports = router;
