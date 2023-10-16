<?php


include ('conexion.php');
session_start();


    $id_user = $_SESSION['id_user'];


      if($conexion)
      {
        $sql = "SELECT youtube,facebook,twitter,instagram,nickname FROM users WHERE id='$id_user' limit 1";

        $consulta = mysqli_query($conexion,$sql);

        $vector = mysqli_fetch_assoc($consulta);

        echo json_encode($vector);
      }





 ?>
