<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


if(isset($_POST["x"])){

        $obj = json_decode($_POST["x"], false);
        $myJSON = json_encode($obj);
        echo ($myJSON);

  } else {
        $myObj = new stdClass;
        $myObj->nombre = "Pepe";
        $myObj->apellidos = "Lopez Perez";
        $myObj->dni = "12345678X";
        $myObj->fechaNac = "22/09/2000";
        $myObj->codPostal = 35500;
        $myObj->email = "pepe@gmail.com";
        $myObj->telFijo = "928666666";
        $myObj->telMovil = "666999666";
        $myObj->iban = "4539955085883327";
        $myObj->tarjetaCredito = "ES7921000813610123456789";
        $myObj->contrasenha = "Pepe123456789*";
        $myJSON = json_encode($myObj);
        echo $myJSON;

  }
?>