<?php


include ('conexion.php');
session_start();


  $idUser = $_SESSION['id_user'];
  $idOp = $_POST['id_opinion'];
  $up = $_POST['up'];
  $down = $_POST['down'];
  $name = $_SESSION['user'];

  $userinfo = array();

      if($conexion && !empty($idOp)  && !empty($idUser))
        {

                  $s = "SELECT `id_user`, `id_opinion` FROM `datosvotos` WHERE  `id_user`='$idUser' AND `id_opinion`='$idOp' limit 1 ";

                  $consulta = mysqli_query($conexion,$s);

                    $userinfo =	mysqli_fetch_assoc($consulta);


        }

            if($userinfo['id_user']==$idUser)
            {
              $response = 0;
              echo json_encode($response);
              //exit();
            }

            else if(!empty($up) || !empty($down))
            {
              $q = "INSERT INTO datosvotos (id_user, id_opinion, positivo, negativo) VALUES ('$idUser','$idOp', '$up', '$down')";
            //  $s = "INSERT INTO notifications (unread, recipient_id,sender_id,recipient_name,sender_name,type,id_op) VALUES ('false','$idUser', '$idUser','$name','$name','2','$idOp')";

              $consulta = mysqli_query($conexion, $q);
            //  $consulta2 = mysqli_query($conexion,$s);
              $response = 1;
              echo json_encode($response);


            }


 ?>
