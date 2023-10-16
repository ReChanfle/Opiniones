<?php


include ('conexion.php');
session_start();


  $down = $_POST['down'];
  $up = $_POST['up'];
  $id = $_POST['id_opinion'];

  $userinfo = array();
//header("Content-Type: application/json", true);

    if($conexion && !empty($id) )
    {
      $q = "SELECT * FROM opiniones WHERE `id` = '$id' limit 1 ";

      $consulta = mysqli_query($conexion,$q);

      $vector =	mysqli_fetch_array($consulta);


            if($vector['id']==$id)
            {

                //$down = $vector['negativos']+$down;
                if($down>0)
                {
                  $d = "UPDATE `opiniones` SET  `negativos`=negativos+'$down'  WHERE `id`='$id' limit 1 ";
                  $consulta = mysqli_query($conexion,$d);
                }
                else if($up>0)
                {

                    $d = "UPDATE `opiniones` SET  `positivos`=positivos+'$up'  WHERE `id`='$id' limit 1 ";
                    $consulta = mysqli_query($conexion,$d);

                }

                $id_recipient = $vector['id_user'];
                $name_recipient = $vector['nombre'];
                $name_sender = $_SESSION['user'];
                $id_sender = $_SESSION['id_user'];

                $e = "INSERT INTO notifications (unread, recipient_id,sender_id,recipient_name,sender_name,type,id_op) VALUES ('false','$id_recipient', '$id_sender','$name_recipient','$name_sender','3','$id')";
              $consulta2 = mysqli_query($conexion,$e);

              echo json_encode($consulta);



            }

       }



 ?>
