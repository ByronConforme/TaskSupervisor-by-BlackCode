const express = require('express');
const router = express.Router();

const pool = require('../database');

const { isLoggedIn, hasPermission } = require('../lib/auth');

router.get('/byUser', isLoggedIn, hasPermission, async (req, res)=>{
    const usuarios = await pool.query('SELECT * FROM usuarios WHERE estado = "A"');
    res.render('reports/generateByUser', {usuarios});
});

router.post('/byUser', isLoggedIn, hasPermission,  async (req, res) => {
    ced_usuario = req.body.usuarios;
    const tareas = await pool.query('SELECT * FROM tareas WHERE ced_usuario = ? AND estado = "A"', ced_usuario);
    res.render('reports/reportsTemplate', {tareas});
});

router.get('/byState', isLoggedIn, hasPermission,  async (req, res)=>{
    const usuarios = await pool.query('SELECT * FROM usuarios WHERE estado = "A"');
    res.render('reports/generateByUser', {usuarios});
});

router.post('/byState', isLoggedIn, hasPermission,  async (req, res) => {
    ced_usuario = req.body.usuarios;
    const tareas = await pool.query('SELECT * FROM tareas WHERE ced_usuario = ? AND estado = "A"', ced_usuario);
    res.render('reports/reportsTemplate', {tareas});
});

module.exports = router;