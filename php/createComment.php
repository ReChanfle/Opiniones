<?php

include 'conexion.php';
include 'libs.php';
session_start();



        $name = $_SESSION['user'];
        $contenido = $_POST['contenido'];
        $id_opinion = $_POST['hash'];




        if($conexion && !empty($name))
        {
                $sql = "INSERT into `comments`( `contenido`, `usuario`,`id_opinion`) VALUES ('$contenido','$name','$id_opinion')";

                $consulta = mysqli_query($conexion,$sql);


                if($consulta)
                  {
                      $success = 1;
                      echo json_encode($success);


                  }
                  else {
                    $success = 0;
                    echo json_encode($success);
                  }




        }
        else {
          $success = 0;
          echo json_encode($success);
        }












 ?>
