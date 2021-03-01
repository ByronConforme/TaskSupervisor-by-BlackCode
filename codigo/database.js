const mysql = require('mysql');
const { promisify } = require('util');    // Este comando nos permite convertir los codigos a codigo de promesas o para poder soportarlas.
const { database } = require('./keys');   //Esto nos ayuda para requerir solo la propiedad database.

const pool = mysql.createPool(database);    //Son una especie de hilos que se van ejecutando y cada uno va haciendo una tarea a la vez de forma secuencial.

pool.getConnection((err, connection) =>{    //Esto nos ayuda para no estar llamando al codigo cada vez que se ejecute.
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.err('SE PERDIO LA CONEXION CON LA BASE DE DATOS');    //Cuando se pierde la conexion a la base de datos
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DEMASIADAS CONEXIONES A LA BASE DE DATOS');     //Esto es para comprobar cuantas conexiones tiene la base de datos hasta el momento.
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('LA CONEXION CON LA BASE DE DATOS HA SIDO RECHAZADA')       //Esto es cuando intentamos hacer conexion a la base de datos y nuestra conexion ha sido rechazada.
        }
    }
    if (connection) connection.release();       //Con esto iniciara la conexión.
    console.log('CONEXION EXITOSA CON LA BASE DE DATOS');    //De esta manera sabremos que la base de datos ya esta funcionando.
    return;

});

//Promisify Pool Querys
pool.query = promisify(pool.query);    //con esta linea de codigos cada vez que queramos hacer consultas podemos utilizar promesas.

module.exports = pool;   //Para poder exportar nuestro modulo pool ingresamos este comando para asi poder realizar las consultas.

//Ya se puede realizar consultas a la base de datos.
