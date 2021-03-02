const passport = require('passport');     //Definimos el metodo el tipo de autoticacion con la base de datos.
const LocalStrategy = require('passport-local').Strategy;   //Vamos a guardar con nuestra base de datos

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({     //Vamos a poder definir nuestra autoticacion
    usernameField: 'cedula',  // Lo estamos recibiendo este campo atravez de usernamefiel.
    passwordField: 'password',     //Es para decir atravez de que campo voy a recibir mi contraseña.
    passReqToCallback: true      //Es para poder recibir el objeto req dentro de la funcion que ejecuta este local strategy
}, async (req, cedula, password, done) => {   //metodo asincronos
    const rows = await pool.query('SELECT * FROM usuarios WHERE cedula = ?', cedula);
    if (rows.length > 0){
        const usuario = rows[0];
        const validPassword = await helpers.matchPassword(password, usuario.password);
        if (validPassword){
            done(null, usuario, req.flash('success', 'Contraseña correcta, bienvenido ' + usuario.nombre));
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta, intente nuevamente.'));
        }
    } else {
        return done(null, false, req.flash('message', 'El usuario no existe.'))
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'cedula',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, cedula, password, done) => {
    const { nombre, apellido, correo_electronico, celular, rol_id, fecha_nacimiento } = req.body;
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
    const result = await pool.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);
    nuevoUsuario.id = result.insertId;
    return done(null, nuevoUsuario);
}))

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    done(null, rows[0]);
});
