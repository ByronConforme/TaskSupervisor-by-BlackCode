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
    fecha_inicio = req.body.fecha_inicio;
    fecha_fin = req.body.fecha_fin;
    const tareas = await pool.query("SELECT rt.id, rt.id_tarea, rt.ced_usuario, rt.estado_tarea, rt.comentario, rt.fecha_hora, t.titulo, t.descripcion, t.tiempo_tarea, t.tipo_tarea, t.observacion FROM registrotareas rt JOIN tareas t ON rt.id_tarea = t.id WHERE rt.fecha_hora BETWEEN ? AND ? AND rt.ced_usuario = ?", [fecha_inicio, fecha_fin, ced_usuario]);
    const usuarios = await pool.query('SELECT * FROM usuarios WHERE cedula = ?', ced_usuario);
    const { nombre, apellido } = usuarios[0];
    const header = {
        ced_usuario,
        fecha_inicio,
        fecha_fin,
        nombre,
        apellido
    };
    res.render('reports/reportsTemplate', {tareas, header});
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