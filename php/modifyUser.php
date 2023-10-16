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

        $success = array(
            "nombre_en_uso" => false,
            "no_se_envio_email" => false,
            "no_se_realizo_la_acción" => false,
            "exito" => false,
        );
        $email = "";
        $id = $_SESSION['id_user'];





    $vector = array();

    if($conexion && !empty($_POST['newname']))
    {
      $name = mysqli_real_escape_string ($conexion,$_POST['newname']);
      $oldname = $_SESSION['user'];

      $q = "SELECT COUNT('nickname') AS 'contar', `nickname` FROM `users` WHERE `nickname` = '$name'";
      $sql = "SELECT usuarioemail FROM users WHERE id='$id' limit 1";

      $consultaEmail = mysqli_query($conexion,$sql);

      $vectorEmail = mysqli_fetch_assoc($consultaEmail);

      if($consultaEmail)
      $email = $vectorEmail['usuarioemail'];

      $consulta = mysqli_query($conexion, $q);

      $vector =	mysqli_fetch_array($consulta);

      if($vector['contar']==1)
      {
          $success['nombre_en_uso'] = true;

      //  $sql = "INSERT INTO users (contrasena, nickname, usuarioemail) VALUES ('$pass', '$name', '$email')";
      //  mysqli_query($conexion,$sql);
      //	json_encode ($inicioSesion);
      }
      else {

        //json_encode($inicioSesion);
          $sql = "UPDATE users SET nickname='$name' WHERE nickname='$oldname' limit 1";
          $consulta = mysqli_query($conexion, $sql);
          if($consulta)
          {

            $emailSuccess = SendSuccessChangeUserEmail($name,$email);

            if(empty($emailSuccess))
            $success['exito'] = true;
            else {
            $success['exito'] = true;
            $success['no_se_envio_email'] = true;
            }

            session_destroy();


          }
          else {
          $success['exito'] = false;

          }

      }

    }
    else {
      $success['no_se_realizo_la_acción'] = true;
    }

    echo json_encode($success);







 ?>
