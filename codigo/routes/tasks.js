const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res)=>{
    res.render('tasks/add');
});

router.post('/add', async (req, res)=>{
    const { cedula, nombre, apellido, correo_electronico, celular, rol_id, fecha_nacimiento } = req.body;
    const nuevoUsuario = {
        cedula,
        nombre,
        apellido,
        correo_electronico,
        celular,
        rol_id,
        fecha_nacimiento
    };
    console.log(nuevoUsuario);
    await pool.query('INSERT INTO usuarios set ?', [nuevoUsuario]);
    res.send('Usuario almacenado en la base de datos.');
});

module.exports = router;