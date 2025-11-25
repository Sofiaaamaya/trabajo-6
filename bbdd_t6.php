  <?php
  
header('Access-Control-Allow-Origin: *');
$servername = "localhost";
$username = "sofia_t6";
$password = "1234";
$dbname = "bbdd_trabajo_6";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

echo "Conexión exitosa"



/*
$sql = "INSERT INTO messages (userid, message) VALUES('" . $_POST['user'] ."','" . $_POST['message'] . "')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();*/
?> 