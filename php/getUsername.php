<?php

session_start();




if(!empty($_SESSION["user"]))
{
  $vector = array(
      "user" => $_SESSION['user'],
      "tipo_user" => $_SESSION['tipo_user'],
      "id_user" => $_SESSION['id_user'],
  );
  echo json_encode($vector);
}
  else
  {
      $vector = array(
        "user" => null,
        "tipo_user" => null,
          "id_user" => null,
      );

  echo json_encode($vector);


  }




  //cerrar Sesion

  $cerrar = $_GET['name'];

  if(!empty($cerrar))
  {
    session_destroy();

      exit();
  }



 ?>
