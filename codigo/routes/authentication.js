// Esta nos va a permitir poder definir otras url, de esta manera tendremos mas orden.
const { O_RDONLY } = require('constants');
const express = require('express');
const router = express.Router();

const helpers = require('../lib/helpers');
const passport = require('passport'); 
const { isLoggedIn, isNotLoggedIn, hasPermission } = require('../lib/auth');

const pool = require('../database');

router.get('/add', isLoggedIn, hasPermission, async (req, res)=>{    //Es un tipico manejador de funcion.
    const roles = await pool.query('SELECT * FROM roles WHERE estado = "A"');
    res.render('auth/add', {roles});   // Es para renderizas desde la carpeta views y de la carpeta auth el archivo add.
});

/*
router.post('/add', isLoggedIn, hasPermission, passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/add',
        failureFlash: true
}));
*/

router.post('/add', isLoggedIn, hasPermission, async (req, res)=>{
    const { cedula, nombre, apellido, password, correo_electronico, celular, rol_id, fecha_nacimiento } = req.body;
    const nuevoUsuario = {
        cedula,
        nombre,
        password,
        apellido,
        correo_electronico,
        celular,
        rol_id,
        fecha_nacimiento
    };
    nuevoUsuario.password = await helpers.encryptPassword(password);
    console.log(nuevoUsuario);
    await pool.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);
    req.flash('success', 'Usuario agregado exitosamente.');
    res.redirect('/auth');
});

router.get('/profile', isLoggedIn, (req, res)=>{
    res.render("profile");
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/index');
});

router.get('/index', isNotLoggedIn, (req, res)=>{
    res.render('auth/index');
});

router.post('/index', isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/index',
        failureFlash: true
    })(req, res, next);
});

router.get('/', isLoggedIn, hasPermission, async (req, res) => {
    const usuarios = await pool.query('SELECT * FROM usuarios WHERE estado = "A"');
    res.render('auth/list', {usuarios});
});

router.get('/delete/:id', isLoggedIn, hasPermission, async (req, res) => {
    const { id } =req.params;
    await pool.query("UPDATE usuarios SET estado = 'I' WHERE id = ?", [id]);
    req.flash('success', 'Usuario eliminado exitosamente.');
    res.redirect('/auth');
});

router.get('/edit/:id', isLoggedIn, hasPermission, async (req, res) => {
    const { id } =req.params;
    const usuarios = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    const roles = await pool.query('SELECT * FROM roles WHERE estado = "A"');
    console.log(usuarios);
    console.log(roles);
    res.render('auth/edit', {usuario: usuarios[0], roles});
});

router.post('/edit/:id', isLoggedIn, hasPermission, async (req, res)=>{
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
    res.redirect('/auth');
});

module.exports = router;
