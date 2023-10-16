<?php

  include 'conexion.php';
	session_start();


  if(!empty($_SESSION['id_user']))
  {
            $vector1 = array(
              "logueado" => 1,

            );
            echo json_encode($vector1);
            exit();
  }


  date_default_timezone_set('America/Buenos_Aires'); // CDT

  $info = getdate();
  $date = $info['mday'];
  $month = $info['mon'];
  $year = $info['year'];

  $current_date = "$date-$month-$year";

      //1 inicio exitoso, 2 no se encuentra el usuario, 3 usuario suspendido,
			$inicioSesion = 0;

      if($conexion)
      {
          if(!empty($_POST['usuario_campo']))
        $name = mysqli_real_escape_string ($conexion,$_POST['usuario_campo']);
        if(!empty($_POST['contrasena_campo']))
        $pass = mysqli_real_escape_string ($conexion,$_POST['contrasena_campo']);
      }

			$vector = array();

			if($conexion && !empty($name) && !empty($pass))
			{

      //  $pepper = get_cfg_var("pepper");
      //  $pwd = $pass;
      //  $pwd_peppered = hash_hmac("sha256", $pwd, $pepper);

        $sql = "select contrasena from `users` where `nickname`='$name' limit 1";

        $getHashedpwd = mysqli_query($conexion,$sql);

        $vectorHash = mysqli_fetch_assoc($getHashedpwd);

        $hashCheck = $vectorHash['contrasena'];

        //if(password_verify($pwd_peppered, $hashCheck))
        if($hashCheck==$pass)
				$q = "SELECT COUNT('nickname') AS 'contar', `nickname` FROM `users` WHERE `nickname` = '$name' ";
        else {
          $vector1 = array(
           "tiempo_suspension" => 0,
           "estado_inicio_sesion" => 0,
            "usuario_no_encontrado" => 0,
           "baneado" => 0,
            "contrasena_incorrecta" => 1,
          );
          echo json_encode($vector1);
          exit();
        exit();
        }

				$consulta = mysqli_query($conexion, $q);

			 	$vector =	mysqli_fetch_array($consulta);

				if($vector['contar']>0)
				{

          $e = "SELECT id,tipo_user,tiempo_suspension,nickname,baneado,codigo_activacion FROM `users` WHERE `nickname` = '$name'";
          $c = mysqli_query($conexion, $e);
          $vector =	mysqli_fetch_assoc($c);
          //declaro variable session id_user
          if($c)
          {

              if($vector['baneado']==1)
              {
                $vector1 = array(
                  "tiempo_suspension" => $vector['tiempo_suspension'],
                  "estado_inicio_sesion" => 1,
                  "usuario_no_encontrado" => 0,
                  "baneado" => 1,
                    "contrasena incorrecta" => 0,
                );
                echo json_encode($vector1);
                exit();
              }
              $origin = new DateTime($current_date);
              $target = new DateTime($vector['tiempo_suspension']);

              if($origin<$target)
              {

                  $vector1 = array(
                    "tiempo_suspension" => $vector['tiempo_suspension'],
                    "estado_inicio_sesion" => 1,
                    "usuario_no_encontrado" => 0,
                    "baneado" => 0,
                      "contrasena incorrecta" => 0,
                  );
                  echo json_encode($vector1);
              }
              else if($origin>=$target)
              {
                $_SESSION["user"] = $vector['nickname'];
                $_SESSION['id_user'] = $vector['id'];
                $_SESSION['tipo_user'] = $vector['tipo_user'];
                $_SESSION['check'] = $vector['codigo_activacion'];

                $vector2 = array(
                      "tiempo_suspension" => 0,
                  "estado_inicio_sesion" => 1,
                  "usuario_no_encontrado" => 0,
                    "contrasena incorrecta" => 0,
                );

                  echo json_encode($vector2);

              }



          }




				}
				else  {

          $vector2 = array(
                "tiempo_suspension" => 0,
            "estado_inicio_sesion" => 0,
            "usuario_no_encontrado" => 1,
          );
				}

			}




				//	if($conexion)
					//echo json_encode($vector);



			// Guardo en una variable la consulta SQL
		//	$consulta = "SELECT COUNT('nickname') AS 'contar', `nickname` FROM `users` WHERE `nickname` = '".$name."' AND `contrasena` = '".$pass."'";

			//$arrayUsers = $conn->query($consulta);

?>
