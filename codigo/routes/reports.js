const express = require('express');
const router = express.Router();

const pool = require('../database');

const { isLoggedIn, hasPermission } = require('../lib/auth');

router.get('/byUser', isLoggedIn, async (req, res)=>{
    const usuarios = await pool.query('SELECT * FROM usuarios WHERE estado = "A"');
    res.render('reports/generateByUser', {usuarios});
});

router.post('/byUser', isLoggedIn, async (req, res) => {
    ced_usuario = req.body.usuarios;
    const tareas = await pool.query('SELECT * FROM tareas WHERE ced_usuario = ? AND estado = "A"', ced_usuario);
    res.render('reports/reportsTemplate', {tareas});
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } =req.params;
    await pool.query("UPDATE tareas SET estado = 'I' WHERE id = ?", [id]);
    req.flash('success', 'Tarea eliminada exitosamente.');
    res.redirect('/reports');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } =req.params;
    const tareas = await pool.query("SELECT * FROM tareas WHERE id = ?", [id]);
    console.log(tareas);
    res.render('reports/edit', {tarea: tareas[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res)=>{
    const { id } =req.params;
    const ced_usuario = req.user.cedula;
    const { titulo, descripcion, tiempo_tarea, tipo_tarea, observacion } = req.body;
    const nuevaTarea = {
        ced_usuario,
        titulo,
        descripcion,
        tiempo_tarea,
        tipo_tarea,
        observacion
    };
    console.log(nuevaTarea);
    await pool.query('UPDATE tareas set ? WHERE id = ?', [nuevaTarea, id]);
    req.flash('success', 'Tarea modificada exitosamente.');
    res.redirect('/reports');
});

module.exports = router;