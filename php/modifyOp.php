<?php

include 'conexion.php';
include 'libs.php';
session_start();

if(!empty($_SESSION['check']))
{
  $code = $_SESSION['check'];
  $s = CheckReal($conexion,$code);
    if(!$s)
      exit();
}



    $inicioSesion = 0;
    // 0 para cuenta no activa, 1 para activa, 2 usuario no registrado, 3 comentario creado,
    // 4 problema al enviar comentario, 5 no se pudo conectar a la base de datos;
    $video = $img= $img1 = $img2 = $img_desc = $img_desc1 = $img_desc2 = '';
    $status=0;
    $titulo = $_POST['titulo'];
    $comentario = $_POST['comentario'];
    $cat = $_POST['cat'];
    $id = $_POST['id'];

    $execTwo = 0;

    if(!empty($_POST['motivo']))
    {
      $motivo = $_POST['motivo'];
      $execTwo = 1;
    }

    else {
      $execTwo = 2;
    }

    if(!empty($_POST['video']))
    $video = $_POST['video'];

    if(!empty($_POST['img']))
    $img = $_POST['img'];

    if(!empty($_POST['img1']))
    $img1 = $_POST['img1'];

    if(!empty($_POST['img2']))
    $img2 = $_POST['img2'];

    if(!empty($_POST['img_desc']))
    $img_desc = $_POST['img_desc'];

    if(!empty($_POST['img_desc1']))
    $img_desc1 = $_POST['img_desc1'];

    if(!empty($_POST['img_desc2']))
    $img_desc2 = $_POST['img_desc2'];

    $vector = array();
    $tipoUser = $_SESSION['tipo_user'];
    if(!empty($_SESSION['user']))
    $name = $_SESSION['user'];

    $insta= $fb= $yt= $tw = null;
    $regex = '/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w_-]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/';

   if(empty($name))
    {
      $status = 2;
      echo $status;
      exit();
    }


    if($conexion)
    {
      // Escapa los caracteres especiales de una cadena para usarla en una sentencia SQL,
        //tomando en cuenta el conjunto de caracteres actual de la conexión
      $titulo = mysqli_real_escape_string ($conexion,$_POST['titulo']);
      $comentario = mysqli_real_escape_string ($conexion,$_POST['comentario']);
      $cat = mysqli_real_escape_string ($conexion,$_POST['cat']);
      if(!empty($_POST['video']))
      $video = mysqli_real_escape_string($conexion,$_POST['video']);
      if(!empty($_POST['img']))
      $img = mysqli_real_escape_string($conexion,$_POST['img']);
      if(!empty($_POST['img1']))
      $img1 = mysqli_real_escape_string($conexion,$_POST['img1']);

      if(!empty($_POST['img2']))
        $img2 = mysqli_real_escape_string($conexion,$_POST['img2']);


      if(preg_match($regex,$comentario))
      $comentario = preg_replace($regex, "", $comentario);

      if($execTwo==1)
      if(preg_match($regex,$motivo))
        $motivo = preg_replace($regex, "", $motivo);
      //chequear si hay usuario para obtener id


    if($tipoUser==1 && $execTwo==1)
    {
      $q = "UPDATE `comentarios` SET `titulo`='$titulo',  `contenido`='$comentario', `cat`='$cat', `video`='$video', `img`='$img', `img1`='$img1', `img2`='$img2',`img_desc`='$img_desc',`img_desc1`='$img_desc1',`img_desc2`='$img_desc2' WHERE `id`='$id' limit 1";
      $consulta = mysqli_query($conexion,$q);

          if($consulta)
            {
              $sql = "select `nombre` from comentarios where `id`='$id' limit 1";
                $consulta_nombre = mysqli_query($conexion,$sql);

                  $vector = mysqli_fetch_assoc($consulta_nombre);

                    $nickname = $vector['nombre'];
                    $sql2 = "select `usuarioemail` from users where `nickname`='$nickname' limit 1";

                        $consulta_email = mysqli_query($conexion,$sql2);

                          $vector2 = mysqli_fetch_assoc($consulta_email);


                            $status = SendMotivoMotificacionOpinion($vector['nombre'],$motivo,$vector2['usuarioemail']);


                                $vector_status = array(
                                    "opinion_modificada" => $consulta,
                                    "email_enviado" => $status,
                                      "no puedes realizar esta accion" => false,
                                );

                              echo json_encode($vector_status);


            }
            else
             {
              $vector_status = array(
                  "opinion_modificada" => false,
                  "email_enviado" => 1, //0 email enviado, 1 email no enviado
                    "no puedes realizar esta accion" => false,
              );

            echo json_encode($vector_status);
            }




    }
  //  else  {
    //  $vector_status = array(
      //    "opinion_modificada" => false,
        //  "email_enviado" => 1,
      //    "no_puedes_realizar_esta_accion" => true,
    //  );

  //  echo json_encode($vector_status);
  //  }


  if($execTwo==2)
  {
    $q = "UPDATE `comentarios` SET  `cat`='$cat', `video`='$video', `img`='$img', `img1`='$img1', `img2`='$img2',`img_desc`='$img_desc',`img_desc1`='$img_desc1',`img_desc2`='$img_desc2' WHERE `id`='$id' limit 1";
    $consulta = mysqli_query($conexion,$q);

        if($consulta)
          {
        //    $sql = "select `nombre` from comentarios where `id`='$id' limit 1";
          //    $consulta_nombre = mysqli_query($conexion,$sql);

            //    $vector = mysqli_fetch_assoc($consulta_nombre);

              //    $nickname = $vector['nombre'];
                //  $sql2 = "select `usuarioemail` from users where `nickname`='$nickname' limit 1";

                  //    $consulta_email = mysqli_query($conexion,$sql2);

                    //    $vector2 = mysqli_fetch_assoc($consulta_email);


                        //  $status = SendMotivoMotificacionOpinion($vector['nombre'],$motivo,$vector2['usuarioemail']);


                              $vector_status = array(
                                  "opinion_modificada" => $consulta,
                                  "email_enviado" => null,
                                    "no puedes realizar esta accion" => false,
                              );

                            echo json_encode($vector_status);


          }
          else {
            $vector_status = array(
                "opinion_modificada" => false,
                "email_enviado" => null, //0 email enviado, 1 email no enviado
                  "no puedes realizar esta accion" => false,
            );

          echo json_encode($vector_status);
          }




  }


}  //	if($conexion)
        //echo json_encode($vector);



    // Guardo en una variable la consulta SQL
  //	$consulta = "SELECT COUNT('nickname') AS 'contar', `nickname` FROM `users` WHERE `nickname` = '".$name."' AND `contrasena` = '".$pass."'";

    //$arrayUsers = $conn->query($consulta);

?>
