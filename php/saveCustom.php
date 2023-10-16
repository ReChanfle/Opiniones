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

if(empty($_SESSION['id_user']))
{

  exit();
}


          $id_user = $_SESSION['id_user'];
          $id_button = $_POST['select_button'];
          $id_header = $_POST['select_header'];
          $success = 0;

          $success = array(
              "exito" => false,

          );

          if($conexion)
          {
                $sql = "UPDATE users SET `id_header`='$id_header',`id_button`='$id_button' WHERE `id`='$id_user' limit 1";

                $consulta = mysqli_query($conexion,$sql);


                if($consulta)
                {
                  $success['exito'] =true;
                }


                echo json_encode($success);




          }
          else {
          

            echo json_encode($success);
          }







  ?>
