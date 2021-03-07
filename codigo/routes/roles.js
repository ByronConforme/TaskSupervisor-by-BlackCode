const express = require('express');
const router = express.Router();

const pool = require('../database');

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res)=>{
    res.render('roles/add');
});

router.post('/add', isLoggedIn, async (req, res)=>{
    const { nombre, nivel } = req.body;
    const nuevoRol = {
        nombre,
        nivel
    };
    console.log(nuevoRol);
    await pool.query('INSERT INTO roles set ?', [nuevoRol]);
    req.flash('success', 'Rol guardado exitosamente.');
    res.redirect('/roles');
});

router.get('/', isLoggedIn, async (req, res) => {
    const roles = await pool.query('SELECT * FROM roles WHERE estado = "A"');
    res.render('roles/list', {roles});
});

router.get('/delete/:id', async (req, res) => {
    const { id } =req.params;
    await pool.query("UPDATE roles SET estado = 'I' WHERE id = ?", [id]);
    req.flash('success', 'Rol eliminado exitosamente.');
    res.redirect('/roles');
});

router.get('/edit/:id', async (req, res) => {
    const { id } =req.params;
    const roles = await pool.query("SELECT * FROM roles WHERE id = ?", [id]);
    console.log(roles);
    res.render('roles/edit', {rol: roles[0]});
});

router.post('/edit/:id', async (req, res)=>{
    const { id } =req.params;
    const { nombre, nivel } = req.body;
    const nuevoRol = {
        nombre,
        nivel
    };
    console.log(nuevoRol);
    await pool.query('UPDATE roles set ? WHERE id = ?', [nuevoRol, id]);
    req.flash('success', 'Rol modificado exitosamente.');
    res.redirect('/roles');
});

module.exports = router;