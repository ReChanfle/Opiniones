<?php

//$host = "54.39.143.244";
//$usuario = "opinione_user";
//$clave = 'I=m@$T[kGHX';
//$bd = "opinione_db";

$host = "localhost";
$usuario = "opinione_user";
$clave = "J1tRKgG)6mZ7";
$bd = "opinione_db";

$conexion = mysqli_connect($host, $usuario, $clave, $bd);

if(!$conexion){
  echo "No se encuentra la conexion con la base de datos.";
}

?>
