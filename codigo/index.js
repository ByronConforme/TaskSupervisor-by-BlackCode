const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const path = require('path');  //da las direcciones de donde estan las carpetas.
const flash = require('connect-flash');     //Se importa y luego se almacena en una constante llamado flash.
const session = require('express-session');    //Te permite almacenar las base de datos.
const MySQLStore = require('express-mysql-session');
const passport = require('passport');     //Sirve para importar y ejecutar su codigo principal

const { database } = require('./keys');

/*Inicializaciones
Vamos a inicializar la conexion a la  base de datos
*/
const app = express();
require('./lib/passport');

/*Configuraciones
Colocamos las configuraciones que necesita el servidor de express.
*/
app.set('port', process.env.PORT || 4000); //Definimos un puerto
app.set('views', path.join(__dirname, 'views'));    //Establece donde esta la carpeta views, la constante devuelve la direccion del archivo que se esta ejecutando
app.engine('.hbs', exphbs({
    defaultLayout: 'main',  //Nombre de la plantilla principal
    layoutsDir: path.join(app.get('views'), 'layouts'), //Esta configuracion significa que layout esta justo dentro de la carpeta views
    partialsDir: path.join(app.get('views'), 'partials'),  //Decimos donse se encuentra sus carpetas.
    extname: '.hbs',   //El nombre que tendran los archivos en handlebars
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

/*Middlewares
Son funciones que se ejecutan cada vez que un usuario envia una peticion o que cada vez una aplicacion cliente 
envia una peticion al servidor.
*/
app.use(session({   //Es para configurar la session.
    secret: 'mysqlnodesession',   //Utilizamos un obejto para configurar.
    resave: false,                //Es para que no se empiece a renovar la session . 
    saveUninitialized: false,     // Para que no se vuelva a establecer la session.
    store: new MySQLStore(database)   //Es en donde guardaremos la session, damos la conexion a la base de datos.
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
    app.locals.success = req.flash('success');  //En las variables globales vamos a tomar ese mensaje y hacer disponibles en todas sus vistas.
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
app.use('/roles', require('./routes/roles'));

/*Public
Colocamos una carpeta donde vamos a colocar todo el codigo que el navegador pueda acceder.
*/
app.use(express.static(path.join(__dirname, 'public'))); // Este metodo recibe direcciones.

/*Iniciar el servidor
Utilizamos esto para empezar a usar el servidor.
*/
app.listen(app.get('port'),() => {
    console.log('Servidor en el puerto', app.get('port'));
});
