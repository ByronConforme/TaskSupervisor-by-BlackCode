const express = require('express');
const router = express.Router();

const pool = require('../database');

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res)=>{
    res.render('tasks/add');
});

router.post('/add', isLoggedIn, async (req, res)=>{
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
    await pool.query('INSERT INTO tareas set ?', [nuevaTarea]);
    req.flash('success', 'Tarea guardada exitosamente.');
    res.redirect('/tasks');
});

router.get('/', isLoggedIn, async (req, res) => {
    ced_usuario = req.user.cedula;
    const tareas = await pool.query('SELECT * FROM tareas WHERE ced_usuario = ? AND estado = "A"', ced_usuario);
    res.render('tasks/list', {tareas});
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } =req.params;
    await pool.query("UPDATE tareas SET estado = 'I' WHERE id = ?", [id]);
    req.flash('success', 'Tarea eliminada exitosamente.');
    res.redirect('/tasks');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } =req.params;
    const tareas = await pool.query("SELECT * FROM tareas WHERE id = ?", [id]);
    console.log(tareas);
    res.render('tasks/edit', {tarea: tareas[0]});
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
    res.redirect('/tasks');
});


router.get('/can_fin/:id', isLoggedIn, async (req, res) => {
    const { id } =req.params;
    const tareas = await pool.query("SELECT * FROM tareas WHERE id = ?", [id]);
    console.log(tareas);
    res.render('tasks/can_fin', {tarea: tareas[0]});
});

router.post('/can_fin/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    const id_tarea = id;
    const ced_usuario = req.user.cedula;
    const { estado_tarea, comentario } = req.body;
    const registroTarea = {
        id_tarea,
        ced_usuario,
        estado_tarea,
        comentario
    };
    console.log(registroTarea);
    await pool.query("UPDATE tareas SET estado_tarea = ? WHERE id = ?", [estado_tarea, id]);
    await pool.query('INSERT INTO registrotareas set ?', [registroTarea]);
    req.flash('success', 'Estado de tarea cambiado exitosamente.');
    res.redirect('/tasks');
});

module.exports = router;