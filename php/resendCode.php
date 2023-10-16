<?php

include ('conexion.php');
include ('libs.php');
session_start();





  $id = $_SESSION['id_user'];

  $activar = false;
  if(!empty($_POST['activar']))
  $activar = $_POST['activar'];


  if($conexion)
  {
    $sql = "select activa,codigo_activacion,nickname,usuarioemail from users where `id`='$id' limit 1";

    $consulta = mysqli_query($conexion,$sql);

    $vector = mysqli_fetch_assoc($consulta);

    if($vector['activa']==1)
    {
      //cuenta activa
        $status = 1;
        echo json_encode($status);
    }
    else if(!$activar) {
      $status = 0;
      echo json_encode($status);
    }


     if($activar)
     {

      $status = SendActivationEmail($vector['codigo_activacion'],$vector['nickname'],$vector['usuarioemail']);

      if($status==null)
      {
        $enviado= 2;
        echo json_encode($enviado);
      }
      else
       {
          //cuenta no activa
        $enviado = 3;
        echo json_encode($enviado);
      }


    }


  }
  else {
    //problema de conexion
    $status = 2;
    echo json_encode($status);
  }


 ?>
