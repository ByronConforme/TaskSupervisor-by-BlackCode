CREATE DATABASE db_tasksupervisor;

USE db_tasksupervisor;

-- Tabla de usuarios
CREATE TABLE usuarios(
    id INT(11) NOT NULL,
    cedula VARCHAR(10) NOT NULL,
    password VARCHAR(60) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo_electronico VARCHAR(50) NOT NULL,
    celular VARCHAR(15) NOT NULL,
    rol_id int(10) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A'
);

-- Asignación de la llave primaria y el auto incremento de 1 al campo id
ALTER TABLE usuarios
    ADD PRIMARY KEY (id);

ALTER TABLE usuarios
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

-- Tabla de tareas
CREATE TABLE tareas(
    id INT(11) NOT NULL,
    ced_usuario VARCHAR(10) NOT NULL,
    titulo VARCHAR(60) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    tiempo_tarea TIME NOT NULL,
    tipo_tarea CHAR(1) NOT NULL,
    fecha_hora_gen DATETIME NOT NULL,
    fecha_hora_eje DATETIME NOT NULL,
    observacion VARCHAR(250) NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A'
);

-- Asignación de la llave primaria y el auto incremento de 1 al campo id
ALTER TABLE tareas
    ADD PRIMARY KEY (id);

ALTER TABLE tareas
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

-- Tabla de roles
CREATE TABLE roles(
    id INT(11) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A'
)

-- Asignación de la llave primaria y el auto incremento de 1 al campo id
ALTER TABLE roles
    ADD PRIMARY KEY (id);

ALTER TABLE roles
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;