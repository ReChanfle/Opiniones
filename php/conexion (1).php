<?php

$host = "localhost:3306";
$usuario = "opinione_user";
$clave = "[I=m@$T[kGHX";
$bd = "opinione_db";

$conexion = mysqli_connect($host, $usuario, $clave, $bd);

if(!$conexion){
  echo "No se encuentra la conexion con la base de datos.";
}

?>
