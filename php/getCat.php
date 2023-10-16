<?php

include 'conexion.php';
include 'libs.php';
session_start();

if(!empty($_SESSION['check']))
{
  $code = $_SESSION['check'];
  $s = CheckReal($conexion,$code);
    if(!$s)
      exit();
}

    $name = $_SESSION['user'];
    $userInfo = array();

    if($conexion && $name)
    {
        $q = "SELECT `mis_cat` FROM `users` WHERE `nickname` = '$name' limit 1";

        $consulta = mysqli_query($conexion,$q);

        $userInfo = mysqli_fetch_array($consulta);

        $temp = $userInfo[0];

        echo $temp;
    }








 ?>
