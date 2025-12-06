-- ddbb.sql
CREATE DATABASE IF NOT EXISTS bbdd_trabajo_6 CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE bbdd_trabajo_6;

CREATE TABLE IF NOT EXISTS usuarios (
  dni VARCHAR(12) PRIMARY KEY,
  nombre VARCHAR(50),
  apellidos VARCHAR(80),
  fechaNac VARCHAR(15),
  codPostal VARCHAR(10),
  email VARCHAR(100),
  telFijo VARCHAR(15),
  telMovil VARCHAR(15),
  tarjetaCredito VARCHAR(30),
  iban VARCHAR(34),
  contrasenha VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
