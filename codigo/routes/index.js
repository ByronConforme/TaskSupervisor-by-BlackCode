const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', (req, res) =>{
    res.render('auth/index');
});

module.exports = router;