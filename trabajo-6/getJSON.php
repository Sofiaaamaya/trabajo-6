<?php
// getJSON.php
header("Content-Type: application/json");

$path = __DIR__ . "/datos.json";
if (!file_exists($path)) {
    http_response_code(404);
    echo json_encode(["mensaje" => "datos.json no encontrado."]);
    exit;
}

echo file_get_contents($path);
