<?php

include ('conexion.php');
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
    $arraycat = array();
    $userInfo = array();

    $arraycat[0] = $_POST['cat1'];
    $arraycat[1] = $_POST['cat2'];
    $arraycat[2] = $_POST['cat3'];
    $arraycat[3] = $_POST['cat4'];
    $arraycat[4] = $_POST['cat5'];
    $arraycat[5] = $_POST['cat6'];



    $value= null;

        for($i=0,$size = count($arraycat);$i<$size;++$i)
        {
                $temp = $arraycat[$i];
                    if($temp>0)
                      $value = $value . $temp;

        }




          if($conexion && $name)
          {
              $q = "SELECT * FROM `users` WHERE `nickname` = '$name' limit 1";

              $consulta = mysqli_query($conexion,$q);

              $userInfo = mysqli_fetch_assoc($consulta);
          }

          if($userInfo['nickname']==$name)
            {
              $sql = "UPDATE users SET mis_cat='$value' WHERE nickname='$name' limit 1";
             $consulta = mysqli_query($conexion,$sql);

             if($consulta)
             {
               $success = 1;
               echo json_encode($success);
             }


            }





 ?>
