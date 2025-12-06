<?php
// postDB.php
header("Content-Type: application/json");
require_once "db.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data || !isset($data['dni'])) {
    http_response_code(400);
    echo json_encode(["mensaje" => "JSON inválido o falta DNI."]);
    exit;
}

$db = BBDD::getInstance()->getConnection();

$stmt = $db->prepare("REPLACE INTO usuarios (dni, nombre, apellidos, fechaNac, codPostal, email, telFijo, telMovil, tarjetaCredito, iban, contrasenha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error preparando la consulta."]);
    exit;
}

$tarjeta = $data['tarjetaCredito'] ?? ($data['tarjeta'] ?? "");
$iban = $data['iban'] ?? "";
$contrasenha = $data['contrasenha'] ?? ($data['contraseña'] ?? "");

$stmt->bind_param(
    "usuario",
    $data['dni'],
    $data['nombre'],
    $data['apellidos'],
    $data['fechaNac'],
    $data['codPostal'],
    $data['email'],
    $data['telFijo'],
    $data['telMovil'],
    $tarjeta,
    $iban,
    $contrasenha
);

if ($stmt->execute()) {
    echo json_encode(["mensaje" => "Datos guardados en la BBDD correctamente."]);
} else {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error al guardar en BBDD."]);
}

$stmt->close();
$db->close();
