<?php
// getPhp.php
header("Content-Type: application/json");

$data = [
  "nombre" => "Ana",
  "apellidos" => "Gómez Ruiz",
  "dni" => "11111111H",
  "fechaNac" => "01/01/1999",
  "codPostal" => "28001",
  "email" => "ana@example.com",
  "telFijo" => "912345678",
  "telMovil" => "612345678",
  "tarjetaCredito" => "4444444444444444",
  "iban" => "ES1122334455667788990011",
  "contrasenha" => "AAAaaa123???",
  "repetirContrasenha" => "AAAaaa123???"
];

echo json_encode($data);
