// Esta nos va a permitir poder definir otras url, de esta manera tendremos mas orden.
const { O_RDONLY } = require('constants');
const express = require('express');
const router = express.Router();

const passport = require('passport'); 
const { isLoggedIn, isNotLoggedIn, hasPermission } = require('../lib/auth');

const pool = require('../database');

router.get('/add', isLoggedIn, (req, res)=>{
    res.render('auth/add');
});

router.post('/add', isLoggedIn, passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/add',
        failureFlash: true
}));

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

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } =req.params;
    await pool.query("UPDATE usuarios SET estado = 'I' WHERE id = ?", [id]);
    req.flash('success', 'Usuario eliminado exitosamente.');
    res.redirect('/auth');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } =req.params;
    const usuarios = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    console.log(usuarios);
    res.render('auth/edit', {usuario: usuarios[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res)=>{
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
