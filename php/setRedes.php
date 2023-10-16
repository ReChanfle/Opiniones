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
        $status = 3;
        echo json_encode($status);
        exit();
      }
      else {
        $id_user = $_SESSION['id_user'];
        $link1 = $_POST['yt'];
        $link2 = $_POST['tw'];
        $link3 = $_POST['fb'];
        $link4 = $_POST['insta'];
      }





      if(!empty($id_user))
      if($conexion)
      {
          $sql = "UPDATE users SET youtube='$link1', facebook='$link2', twitter='$link3', instagram='$link4' WHERE id='$id_user' limit 1";
          $consulta = mysqli_query($conexion,$sql);

          if($consulta)
          {
            $status = 1;
            echo json_encode($status);
          }
          else {
            $status = 2;
              echo json_encode($status);
          }

      }
      else {
        $status = 4;
        echo json_encode($status);
      }






 ?>
