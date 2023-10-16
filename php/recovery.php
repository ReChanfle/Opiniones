<?php

include 'conexion.php';
include 'libs.php';

$success = array(
    "contrasenas_no_coindiden" => false,
    "error_conexion" => false,
    "codigo_incorrecto" => false,
    "no_se_pudo_enviar_form" => false,
    "exito" => false,
    "email" => false,


);



          if($conexion)
          {
            if(!empty($_POST['pass']) && !empty($_POST['pass1']) && !empty($_POST['validHash']) && !empty($_POST['validName'])  )
              {

                $pass = $_POST['pass'];
                $pass1 = $_POST['pass1'];
                $hash = $_POST['validHash'];
                $name = $_POST['validName'];
                $email = $_POST['validEmail'];
                $sql = "select recuperar from users where `nickname`='$name' and `recuperar`='$hash' limit 1";
                $consulta = mysqli_query($conexion,$sql);
                $vector = array();
                $vector = mysqli_fetch_assoc($consulta);


                if($vector['recuperar']==$hash)
                {

                        if($pass==$pass1)
                        {
                        //  $pepper = get_cfg_var("pepper");
                          $pwd = $pass;
                          //$pwd_peppered = hash_hmac("sha256", $pwd, $pepper);
                          //$pwd_hashed = password_hash($pwd_peppered, PASSWORD_ARGON2ID);

                            $sql1 = "UPDATE users SET contrasena='$pwd' WHERE nickname='$name' AND recuperar='$hash' limit 1";
                              $sql2 = "UPDATE users SET recuperar=null WHERE nickname='$name' AND recuperar='$hash' limit 1";
                            $consulta1 = mysqli_query($conexion,$sql1);
                                $consulta2 = mysqli_query($conexion,$sql2);

                                  if($consulta1 && $consulta2)
                                    {
                                      $success['exito'] = true;
                                      $true = SendSuccessNewPasswordEmail($name,$email);

                                      if($true==null)
                                        $success['email'] = true;


                                        echo json_encode($success);

                                    }
                        }
                              else
                              {
                                $success['contrasenas_no_coindiden'] = true;
                                echo json_encode($success);
                                exit();

                              }



                }
                else
                {
                    $success['codigo_incorrecto'] = true;
                    echo json_encode($success);
                      exit();
                }


          }
          else {
            $success['no_se_pudo_enviar_form'] = true;
            echo json_encode($success);
              exit();
          }



      }
      else {
        $success['error_conexion'] = true;
        echo json_encode($success);
          exit();
      }










?>
