'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user');

/* GET auth/login page. */
router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  const messages = req.flash('login-error');
  const data = {
    message: messages[0]
  };
  res.render('login', data);
});

router.post('/login', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  const { username, password } = req.body;

  if (!username || !password) {
    req.flash('login-error', 'Username and password are required');
    return res.redirect('/auth/login');
  }
  User.findOne({ username })
    .then(result => {
      if (!result) {
        req.flash('login-error', 'User doesnt exists');
        return res.redirect('/auth/login');
      }
      if (!bcrypt.compareSync(password, result.password)) {
        req.flash('login-error', 'User doesnt exists');
        return res.redirect('/auth/login');
      }
      req.session.currentUser = result;
      res.redirect('/');
    })
    .catch(next);
});

/* GET auth/signup page. */
router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  const messages = req.flash('signup-error');
  const data = {
    message: messages[0]
  };
  res.render('signup', data);
});

router.post('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  const { username, password } = req.body;

  if (!username || !password) {
    req.flash('signup-error', 'Username and password are required');
    return res.redirect('/auth/signup');
  }
  User.findOne({ username })
    .then(result => {
      if (result) {
        req.flash('signup-error', 'Username already exists');
        return res.redirect('/auth/signup');
      }

      // encrypt password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = new User({ username, password: hashedPassword });
      return user.save()
        .then(() => {
          req.session.currentUser = user;
          res.redirect('/');
        });
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;
