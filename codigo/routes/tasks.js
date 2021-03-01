const express = require('express');
const router = express.Router();

const pool = require('../database');

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res)=>{
    res.render('tasks/add');
});

router.post('/add', isLoggedIn, async (req, res)=>{
    const ced_usuario = user.cedula;
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
    const tareas = await pool.query('SELECT * FROM tareas WHERE ced_usuario = ?', ced_usuario);
    res.render('tasks/list', {tareas});
});
//FALTA EDITAR Y ELIMINAR TAREAS
router.get('/delete/:id', async (req, res) => {
    const { id } =req.params;
    await pool.query("UPDATE usuarios SET estado = 'I' WHERE id = ?", [id]);
    req.flash('success', 'Usuario eliminado exitosamente.');
    res.redirect('/tasks');
});

router.get('/edit/:id', async (req, res) => {
    const { id } =req.params;
    const usuarios = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    console.log(usuarios);
    res.render('tasks/edit', {usuario: usuarios[0]});
});

router.post('/edit/:id', async (req, res)=>{
    const { id } =req.params;
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
    await pool.query('UPDATE usuarios set ? WHERE id = ?', [nuevoUsuario, id]);
    req.flash('success', 'Usuario modificado exitosamente.');
    res.redirect('/tasks');
});

module.exports = router;