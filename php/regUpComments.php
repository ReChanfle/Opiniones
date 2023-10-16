<?php


include 'conexion.php';
session_start();


  $idCom = $_POST['id_comment'];
  $idUser = $_SESSION['id_user'];
  $id_opinion = $_POST['hash'];

  $userinfo = array();

      if($conexion && !empty($idCom)  && !empty($idUser))
        {

                  $s = "SELECT `id_user`, `id_comment`,`id_opinion` FROM reg_up_comments WHERE  `id_user`='$idUser' AND `id_comment`='$idCom' limit 1";

                  $consulta = mysqli_query($conexion,$s);

                    $userinfo =	mysqli_fetch_assoc($consulta);

                    if($consulta)
                    if($userinfo['id_user']==$idUser)
                    {
                      $response = 0;
                      echo json_encode($response);
                      exit();
                    }
                    else
                    {
                      $name = $_SESSION['user'];

                      $q = "INSERT INTO reg_up_comments (id_user, id_comment,id_opinion) VALUES ('$idUser','$idCom','$id_opinion')";
                      $s = "UPDATE comments SET `up`=up+1 WHERE `usuario`='$name' AND `id`='$idCom' AND `id_opinion`='$id_opinion'";

                      $consulta = mysqli_query($conexion, $q);
                      $consulta2 = mysqli_query($conexion,$s);
                      $response = 1;
                      echo json_encode($response);


                    }


        }





 ?>
