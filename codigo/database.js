const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.err('SE PERDIO LA CONEXION CON LA BASE DE DATOS');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DEMASIADAS CONEXIONES A LA BASE DE DATOS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('LA CONEXION CON LA BASE DE DATOS HA SIDO RECHAZADA')
        }
    }
    if (connection) connection.release();
    console.log('CONEXION EXITOSA CON LA BASE DE DATOS');
    return;

});

//Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;