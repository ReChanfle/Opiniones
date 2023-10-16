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
              "exito" => false,
              "no_se_realizo_la_acción" => false,
              "no_se_envio_email" => false,
              "logged" => true,
          );

          if(empty($_SESSION['id_user']))
          {

            $success['logged'] = false;
            echo json_encode($success);
            exit();
          }
          else {
            $id = $_SESSION['id_user'];
          }




          $vector = array();
          $vectorEmail = array();

          if($conexion && !empty($_POST['user']) && !empty($_POST['newPassword']))
          {

            $name = mysqli_real_escape_string ($conexion,$_POST['user']);
            $pass = mysqli_real_escape_string ($conexion,$_POST['newPassword']);

            $q = "SELECT * FROM `users` WHERE `nickname` = '$name' limit 1";
          //$sql = "INSERT INTO usuarios (contrasena, nickname, usuarioemail) VALUES ('$pass', '$name', '$email')";
              $sql1 = "SELECT usuarioemail FROM users WHERE id='$id' limit 1";

                $consultaEmail = mysqli_query($conexion,$sql1);

                  $consulta = mysqli_query($conexion, $q);

                    $vector =	mysqli_fetch_array($consulta);

                        if($consultaEmail)
                        $vectorEmail = mysqli_fetch_assoc($consultaEmail);

              if($vector['nickname']==$name)
              {
                //$pepper = get_cfg_var("pepper");
                $pwd = $pass;
                //$pwd_peppered = hash_hmac("sha256", $pwd, $pepper);
              //  $pwd_hashed = password_hash($pwd_peppered, PASSWORD_ARGON2ID);

                $sql = "UPDATE users SET contrasena='$pwd' WHERE nickname='$name' limit 1";

                $consulta = mysqli_query($conexion,$sql);

                if($consulta)
                {

                      if(!empty($vectorEmail))
                      {
                        $email = $vectorEmail['usuarioemail'];
                          $emailSuccess = SendSuccessChangePasswordEmail($name,$email);
                      }


                  if(empty($emailSuccess))
                      $success['exito'] = true;
                  else
                  {
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

          echo json_encode($success);



 ?>
