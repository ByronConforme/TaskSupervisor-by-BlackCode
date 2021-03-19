/* Este archivo sera utilizado para almacenar todas las rutas pricipales de la aplicacion
*/
const express = require('express');  //Utilizamos para poder crear nuestras rutas
const router = express.Router();      //Este metodo al ejecutarse se vuelve objeto, y se almacenara en un objeto llamado router.
const {isNotLoggedIn} = require('../lib/auth');

const pool = require('../database');

router.get('/', isNotLoggedIn, (req, res) =>{
    res.render('auth/index');
});

module.exports = router;
