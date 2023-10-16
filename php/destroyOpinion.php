<?php

  include 'conexion.php';
  include 'libs.php';
session_start();


        $id = $_POST['id'];

        $motivo = $_POST['motivo'];

          //chequeo conexion y tambien que el usuario sea admin
        if($conexion && $_SESSION['tipo_user']==1)
        {
                //busco el id de usuario para enviar un email de notificacion
                $x = "select id_user from `comentarios` where  `id`='$id' limit 1";

                  $consulta1 = mysqli_query($conexion,$x);

                    if($consulta1)
                    {
                        $vector = mysqli_fetch_assoc($consulta1);
                        $id_user = $vector['id_user'];
                            //selecciono el email
                          $z = "select usuarioemail, nickname from `users` where `id`='$id_user' limit 1";

                            $consulta2 = mysqli_query($conexion,$z);

                              if($consulta2)
                              {
                                  $vector = mysqli_fetch_assoc($consulta2);
                                  //envio email de notificacion
                                  $name = $vector['nickname'];
                                  $email = $vector['usuarioemail'];

                                $status = SendOpinionEliminada($name,$id,$motivo,$email);
                                  //elimino la opinion seleccion
                                $sql = "delete from `comentarios` where `id`='$id' limit 1";
                                $consulta = mysqli_query($conexion,$sql);

                                      echo json_encode($consulta);

                              }
                    }






              else {
                $status = 0;
                echo json_encode($status);
              }

        }








 ?>
