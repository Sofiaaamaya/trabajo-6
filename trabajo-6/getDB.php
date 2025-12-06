<?php
// getDB.php
header("Content-Type: application/json");
require_once "db.php";

if (!isset($_GET['dni'])) {
    http_response_code(400);
    echo json_encode(["mensaje" => "Parámetro dni requerido."]);
    exit;
}

$dni = $_GET['dni'];

$db = BBDD::getInstance()->getConnection();
$stmt = $db->prepare("SELECT dni, nombre, apellidos, fechaNac, codPostal, email, telFijo, telMovil, tarjetaCredito, iban, contrasenha FROM usuarios WHERE dni = ?");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error preparando la consulta."]);
    exit;
}

$stmt->bind_param("s", $dni);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["mensaje" => "DNI no encontrado"]);
    exit;
}

$row = $result->fetch_assoc();
echo json_encode($row);

$stmt->close();
$db->close();
