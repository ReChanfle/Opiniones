<?php

include 'conexion.php';
session_start();


          $success =0;

            $url = $_POST['url'];
            $id_user = $_SESSION['id_user'];

            if($conexion && !empty($id_user))
            {

                  $sql = "UPDATE users set `url_img_user`='$url' where id='$id_user'";

                  $consulta = mysqli_query($conexion,$sql);


                  if($consulta)
                  {
                      $success = 1;

                      echo json_encode($success);

                  }
                  else {
                    $success = 2;

                    echo json_encode($success);
                  }
            }
            else {
              $success = 2;
              echo json_encode($success);
            }

















 ?>
