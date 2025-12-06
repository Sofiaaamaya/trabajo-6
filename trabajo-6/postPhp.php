<?php
// postPhp.php
header("Content-Type: application/json");

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["mensaje" => "JSON no válido."]);
    exit;
}

// Rebota los datos recibidos con mensaje
echo json_encode([
    "mensaje" => "PHP recibió los datos correctamente.",
    "datos" => $data
]);
