<?php
include 'conexion.php';
session_start();


if(empty($_SESSION['id_user']))
{
          $vector1 = array(
            "no_user" => 1,

          );
          echo json_encode($vector1);
          exit();
}
            $notifications = array();
            $id_user = $_SESSION['id_user'];

            if($conexion)
            {
                  $sql = "select unread,recipient_id,sender_id,sender_name,recipient_name,type,creation_date,id_op from notifications where `recipient_id`='$id_user' and `unread`='false'";

                  $consulta = mysqli_query($conexion,$sql);

                  while($row = $consulta->fetch_array(MYSQLI_ASSOC)){
                     $notifications[] = $row;
                   }

                  echo json_encode($notifications);

            }



            if($conexion && !empty($_GET['ids']))
            {
                //$arrayRead = $_GET[''];
                $array = $_GET['ids'];


                  foreach($array as $key => $val) {
                      $array[$key] = mysqli_real_escape_string($conexion,$val);
                    }

                    $newarray = implode(", ", $array);

                    $sql = "UPDATE notifications set unread=1 WHERE recipient_id IN ($newarray)";
                    $consulta = mysqli_query($conexion,$sql);

                    echo json_encode($consulta);



            }


            if($conexion)
              {
                  $sql ="DELETE FROM `notifications` WHERE unread=1";

                  $consulta= mysqli_query($conexion,$sql);      




              }



 ?>
