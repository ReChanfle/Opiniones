<?php

include 'conexion.php';
session_start();

if(empty($_SESSION['id_user']))
{

  exit();
}


      $name = $_POST['name'];
      $userinfo = array();

      if($conexion)
      {
                $sql = "select id,nickname,infraccion,tiempo_suspendido,baneado,fecha,penalty_points from `infracciones_users` where `nickname`='$name'";
                $consulta = mysqli_query($conexion,$sql);


                while($row = $consulta->fetch_array(MYSQLI_ASSOC))
                {
                   $userinfo[] = $row;
                }



      }
                   echo json_encode($userinfo);






 ?>
