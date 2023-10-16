<?php

  include 'conexion.php';
  include 'libs.php';
	session_start();


      // 1 para registro exitoso, 2 para usuario existente, 3 email existente, 4 error de conexion,5 nickname caracteres no habilitados,
      //6 usuario vacio, 7 contraseña vacia, 8 email vacio, 9 logueado
			$inicioSesion;

      if(!empty($_SESSION['id_user']))
      {
                $inicioSesion = 9;
                echo $inicioSesion;
                exit();
      }





      if($conexion)
      {
        if(!empty($_POST['user']))
        $name = mysqli_real_escape_string ($conexion,$_POST['user']);
        if(!empty($_POST['pass']))
        $pass = mysqli_real_escape_string ($conexion,$_POST['pass']);
        if(!empty($_POST['email']))
        $email = mysqli_real_escape_string ($conexion,$_POST['email']);


        if(!ctype_alnum($name))
        {

          $inicioSesion = 5;
          echo  $inicioSesion;
            exit();

        }




      }


			$vector = array();
      $vector2 = array();

			if($conexion && !empty($name) && !empty($pass) && !empty($email))
			{
        $q = "SELECT COUNT('nickname') AS 'contar', `nickname` FROM `users` WHERE `nickname` = '$name'  ";
			//$sql = "INSERT INTO usuarios (contrasena, nickname, usuarioemail) VALUES ('$pass', '$name', '$email')";
        $x = "SELECT COUNT('email') AS 'contar', `usuarioemail` FROM `users` WHERE `usuarioemail` = '$email' ";
				$consulta = mysqli_query($conexion, $q);
        $consulta2 =  mysqli_query($conexion, $x);

			 	$vector =	mysqli_fetch_array($consulta);
        $vector2 = mysqli_fetch_array($consulta2);
        //console.log($vector);

				if($vector['contar']==0 && $vector2['contar']==0)
				{

          try
          {
            $hash = random_str(32);

            $sql = "INSERT INTO users (contrasena, nickname, usuarioemail,codigo_activacion) VALUES ('$pass', '$name', '$email','$hash')";

             $consulta = mysqli_query($conexion,$sql);

             if($consulta)
             {

             $_SESSION["user"] = $name;
            $q = "select id,tipo_user from users where `usuarioemail`='$email' limit 1";
            $consultaID = mysqli_query($conexion,$q);

                  if($consultaID)
                  {
                    $vector3 = mysqli_fetch_assoc($consultaID);
                    $_SESSION['id_user']= $vector3['id'];
                    $_SESSION['tipo_user'] = $vector3['tipo_user'];
                    $id_user = $vector3['id'];
                    $sql2 = "INSERT INTO scoreboard (id_user) VALUES ('$id_user')";
                       $consulta2 = mysqli_query($conexion,$sql2);

                      $status = SendActivationEmail($hash,$name,$email);


                                  if($status==null)
                                  {
                                      $status = 1;
                                      echo $status;
                                  }
                  }


                }



          }
          catch(Exception $e)
          {
            $inicioSesion = 4;
            echo $inicioSesion;
          }

				//	json_encode ($inicioSesion);
				}
				 if($vector['contar']>0){
					$inicioSesion =  2;
					//json_encode($inicioSesion);
					echo $inicioSesion;
          exit();
				}
         if($vector2['contar']>0)
        {
          $inicioSesion =  3;
          //json_encode($inicioSesion);
          echo $inicioSesion;
          exit();

        }

			}
      else {
            if(empty($name))
            {
              echo  $inicioSesion = 6;
                exit();
            }
            if(empty($pass))
            {
              echo  $inicioSesion = 7;
                  exit();
            }
            if(empty($email))
            {
              echo  $inicioSesion = 8;
                  exit();
            }


      }




				//	if($conexion)
					//echo json_encode($vector);



			// Guardo en una variable la consulta SQL
		//	$consulta = "SELECT COUNT('nickname') AS 'contar', `nickname` FROM `users` WHERE `nickname` = '".$name."' AND `contrasena` = '".$pass."'";

			//$arrayUsers = $conn->query($consulta);

?>
