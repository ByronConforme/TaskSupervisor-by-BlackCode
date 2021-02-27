const express = require('express');
const router = express.Router();
const {isNotLoggedIn} = require('../lib/auth');

const pool = require('../database');

router.get('/', isNotLoggedIn, (req, res) =>{
    res.render('auth/index');
});

module.exports = router;