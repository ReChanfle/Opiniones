<?php

include 'conexion.php';
session_start();

        $hash = $_POST['validHash'];
        $name = $_POST['validName'];

        if($conexion)
        {
            $sql = "select codigo_activacion,nickname from users where `codigo_activacion`='$hash' and `nickname`='$name' limit 1";

            $consulta = mysqli_query($conexion,$sql);

            $vector = mysqli_fetch_assoc($consulta);

            if($vector['codigo_activacion']==$hash && $vector['nickname']==$name)
              {
                  $q = "UPDATE users SET activa='1' WHERE codigo_activacion='$hash'";
                  $_SESSION['check'] = $vector['codigo_activacion'];
                  $consulta2 = mysqli_query($conexion,$q);

                  if($consulta2)
                  {
                    $status  = 1;
                      echo json_encode($status);
                  }
                  else {
                    $status = 0;
                    echo json_encode($status);
                  }

              }



        }










 ?>
