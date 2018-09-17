'use strict';

const express = require('express');
const router = express.Router();

/* GET auth/login page. */
router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  // ...
  console.log(req.body);
});

/* GET auth/signup page. */
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  // ...
  console.log(req.body);
});

router.post('/logout', (req, res, next) => {
  // ...
});

module.exports = router;
