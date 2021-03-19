-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-03-2021 a las 03:39:55
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_tasksupervisor`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registrotareas`
--

CREATE TABLE `registrotareas` (
  `id` int(11) NOT NULL,
  `id_tarea` int(11) NOT NULL,
  `ced_usuario` varchar(10) NOT NULL,
  `estado_tarea` varchar(20) NOT NULL DEFAULT 'Pendiente',
  `comentario` varchar(255) NOT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `registrotareas`
--

INSERT INTO `registrotareas` (`id`, `id_tarea`, `ced_usuario`, `estado_tarea`, `comentario`, `fecha_hora`) VALUES
(2, 4, '0951665405', 'Finalizada', 'Sin novedades', '2021-03-14 16:18:09'),
(3, 4, '0951665405', 'Finalizada', 'Sin novedades', '2021-03-14 21:42:33'),
(4, 4, '0951665405', 'Pendiente', 'Prueba', '2021-03-14 21:42:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(2) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `nivel` int(1) NOT NULL,
  `estado` char(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `nivel`, `estado`) VALUES
(1, 'System Admin', 0, 'A'),
(2, 'Empleado', 2, 'A'),
(3, 'Supervisor', 1, 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('A_s77jlzFNm0OdRKuXsoyv52Kxyw90fB', 1615868531, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":11}}'),
('kPCFT7M0OtY1U0pC5_grbANv8CTpxBf4', 1615948414, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":11}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `ced_usuario` varchar(10) NOT NULL,
  `titulo` varchar(60) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `tiempo_tarea` time NOT NULL,
  `tipo_tarea` varchar(10) NOT NULL,
  `estado_tarea` varchar(10) NOT NULL DEFAULT 'Pendiente',
  `observacion` varchar(250) DEFAULT NULL,
  `estado` char(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `ced_usuario`, `titulo`, `descripcion`, `tiempo_tarea`, `tipo_tarea`, `estado_tarea`, `observacion`, `estado`) VALUES
(4, '0951665405', 'Tarea de prueba', 'Tarea de ingreso de prueba', '01:00:00', 'Ocasional', 'Pendiente', 'Tarea editada', 'A'),
(5, '0951665405', 'Tarea de prueba 2', 'Tarea de ingreso de prueba con cedula no fija', '04:00:00', 'Diaria', 'Pendiente', 'ninguna', 'A'),
(6, '1717171717', 'Tarea de prueba 3', 'Tarea de ingreso de prueba con otro usuario', '03:00:00', 'Diaria', 'Pendiente', 'usuario Andres', 'A'),
(7, '1717171717', 'Cambio de input para horas', 'Cambio del campo de number a time', '02:00:00', 'Diaria', 'Pendiente', 'ingresado desde usuario Andres', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `cedula` varchar(10) NOT NULL,
  `password` varchar(60) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `correo_electronico` varchar(50) NOT NULL,
  `celular` varchar(15) NOT NULL,
  `rol_id` int(10) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `estado` char(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `cedula`, `password`, `nombre`, `apellido`, `correo_electronico`, `celular`, `rol_id`, `fecha_nacimiento`, `estado`) VALUES
(11, '0951665405', '$2a$10$rrBMHFENaT.b8PxxtlooT.MosrkD0w0N.XmwusZN7ReF1aTAYV98a', 'Byron', 'Conforme', 'byron@byron.com', '0987654321', 1, '1999-08-11', 'A'),
(12, '1717171717', '$2a$10$gypsrGb.oye48aA0qvsn7.gFmIveQH/LY9pmrtThu3zSt1N7n23B6', 'Andres', 'Demera', 'andres@hotmail.com', '1100110011', 2, '2001-12-11', 'A');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `registrotareas`
--
ALTER TABLE `registrotareas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario` (`ced_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula_2` (`cedula`),
  ADD KEY `cedula` (`cedula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `registrotareas`
--
ALTER TABLE `registrotareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`ced_usuario`) REFERENCES `usuarios` (`cedula`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
