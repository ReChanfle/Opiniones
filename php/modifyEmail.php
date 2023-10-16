<?php

include ('conexion.php');
include ('libs.php');
session_start();



if(!empty($_SESSION['check']))
{
  $code = $_SESSION['check'];
  $s = CheckReal($conexion,$code);
    if(!$s)
      exit();
}
        $success = array(
            "exito" => false,
            "no_se_realizo_la_acción" => false,
            "email_en_uso" => false,
            "no_se_envio_email" => true,
            "logged" => true,
        );

      if(empty($_SESSION['id_user']))
      {
         $success['logged'] = false;
         echo json_encode($success);
         exit();
      }


    $email = $_POST['email'];

    $name = $_SESSION['user'];

    $id = $_SESSION['id_user'];

    $vector = array();

    if($conexion && !empty($email))
    {
      $email = mysqli_real_escape_string($conexion,$_POST['email']);

      $name = $_SESSION['user'];

      $q = "SELECT COUNT('usuarioemail') AS 'contar', `usuarioemail` FROM `users` WHERE `usuarioemail` = '$email'";
    //$sql = "INSERT INTO usuarios (contrasena, nickname, usuarioemail) VALUES ('$pass', '$name', '$email')";

      $consulta = mysqli_query($conexion, $q);

      $vector =	mysqli_fetch_array($consulta);

      if($vector['contar']==1)
      {
          $success['email_en_uso'] = true;
      }
      else
      {
        $sql = "UPDATE users SET usuarioemail='$email' WHERE nickname='$name'";

        $consulta =  mysqli_query($conexion,$sql);
        if($consulta)
        $success['exito'] = true;

        if($success['exito'])
        {
            $emailSuccess = SendSuccessChangeEmail($name,$email);

            if(empty($emailSuccess))
            $success['no_se_envio_email'] = false;

        }


      }



    }
    else
     {
      $success['no_se_realizo_la_acción'] = true;
    }

      echo json_encode($success);

 ?>
