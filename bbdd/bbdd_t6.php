  <?php
    class BBDD{  

      private static $instance = null;

      private mysqli $connection ;
      
      private string $host = "localhost";
      private string $username = "sofia_t6";
      private string $password = "1234";
      private static string  $dbname = "bbdd_trabajo_6";

      // Create connection
      private function __construct() {
        $this->connection = new mysqli(
        $this->host
        ,$this->username
        ,$this->password
        ,self::$bdname
        );

      if ($this->connection->connect_error){
          die ("Error de connection: " . $this->connection->connect_error);
      }

      $this->connection->set_charset("utf8mb4");

    }


      public static function getInstance(): BBDD{
          if (self::$instance == null){
            self::$instance = new BBDD;
          }

          return self::$instance;
      }


    public function getConnection(): mysqli {
        return $this->connection;
    }

    public function __clone(){}

      }





  /*
  $sql = "INSERT INTO messages (userid, message) VALUES('" . $_POST['user'] ."','" . $_POST['message'] . "')";

  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();*/
?> 