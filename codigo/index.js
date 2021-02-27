const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');

/*Inicializaciones
Vamos a inicializar la conexion a la  base de datos
*/
const app = express();
require('./lib/passport');

/*Configuraciones
Colocamos las configuraciones que necesita el servidor.
*/
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

/*Middlewares
Son funciones que se ejecutan cada vez que un usuario envia una peticion o que cada vez una aplicacion cliente 
envia una peticion al servidor.
*/
app.use(session({
    secret: 'mysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

/*Variables globales
Se pueden colocar variables que toda la aplicacion necesite
*/
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.success = req.flash('message');
    app.locals.user = req.user;
    next();
});

/*Rutas
Es muy importante porque aqui definimos las URL de nuestro servidor,
osea lo que haran cuando el usuario visite la ruta.
*/
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/tasks', require('./routes/tasks'));
app.use('/auth', require('./routes/authentication'));

/*Public
Colocamos una carpeta donde vamos a colocar todo el codigo que el navegador pueda acceder.
*/
app.use(express.static(path.join(__dirname, 'public')));

/*Iniciar el servidor
Utilizamos esto para empezar a usar el servidor.
*/
app.listen(app.get('port'),() => {
    console.log('Servidor en el puerto', app.get('port'));
});
