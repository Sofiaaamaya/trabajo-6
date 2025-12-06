<?php
// db.php
class BBDD {
    private static ?BBDD $instance = null;
    private mysqli $connection;

    private string $host = "localhost";
    private string $username = "sofia_t6"; // <- ajusta aquí si es necesario
    private string $password = "1234";     // <- ajusta aquí si es necesario
    private static string $dbname = "bbdd_trabajo_6";

    private function __construct() {
        $this->connection = new mysqli(
            $this->host,
            $this->username,
            $this->password,
            self::$dbname
        );

        if ($this->connection->connect_error) {
            http_response_code(500);
            echo json_encode(["error" => "Error de conexión: " . $this->connection->connect_error]);
            exit;
        }
        $this->connection->set_charset("utf8mb4");
    }

    public static function getInstance(): BBDD {
        if (!self::$instance) {
            self::$instance = new BBDD();
        }
        return self::$instance;
    }

    public function getConnection(): mysqli {
        return $this->connection;
    }

    private function __clone() {}
}
