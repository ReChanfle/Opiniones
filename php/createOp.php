<?php

include 'conexion.php';
//include 'libs.php';
session_start();


//if(!empty($_SESSION['check']))
//{
//  $code = $_SESSION['check'];
//  $s = CheckReal($conexion,$code);
//    if(!$s)
//      exit();
//}

    if(empty($_SESSION['cooldown']))
    {
        $_SESSION['cooldown'] =  new DateTime('now');
        $date1 =  new DateTime('now');
        $cooldown = 5;


    }
    else {
      $date1 =  new DateTime('now');
      $cooldown = dateDifference($date1,$_SESSION['cooldown']);
    }

    $inicioSesion = 0;
    // 0 para cuenta no activa, 1 para activa, 2 usuario no registrado, 3 comentario creado,
    // 4 problema al enviar comentario, 5 no se pudo conectar a la base de datos;

    $result = array(
        "exito" => false,
        "cuenta_no_activa" => false,
        "usuario_no_registrado" => false,
        "no_se_pudo_enviar" => false,
        "no_se_pudo_conectar" => false,
        "cooldown" => null,
    );
    $video = $img= $img1 = $img2 = $img_desc = $img_desc1 = $rep = $img_desc2 = '';
    $status=0;
    $titulo = $_POST['titulo'];
    $comentario = $_POST['comentario'];
    $cat = $_POST['cat'];

  //  if(!empty($_POST['video']))
  //  $video = $_POST['video'];

//    if(!empty($_POST['img']))
//    $img = $_POST['img'];

//    if(!empty($_POST['img1']))
//    $img1 = $_POST['img1'];

//    if(!empty($_POST['img2']))
//    $img2 = $_POST['img2'];

//    if(!empty($_POST['img_desc']))
//    $img_desc = $_POST['img_desc'];

//    if(!empty($_POST['img_desc1']))
//    $img_desc1 = $_POST['img_desc1'];

//    if(!empty($_POST['img_desc2']))
//    $img_desc2 = $_POST['img_desc2'];

    $vector = array();

    $idUser = "";

    if(!empty($_SESSION['user']))
    $name = $_SESSION['user'];

    $insta= $fb= $yt= $tw = null;
    $regex = '/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w_-]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/';

   if(empty($name))
    {
      $result['usuario_no_registrado'] = true;
      echo json_encode($result);
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

      if(!empty($_POST['img_desc']))
      $img_desc = mysqli_real_escape_string($conexion,$_POST['img_desc']);

      if(!empty($_POST['img_desc1']))
      $img_desc1 = mysqli_real_escape_string($conexion,$_POST['img_desc1']);

      if(!empty($_POST['img_desc2']))
      $img_desc2 = mysqli_real_escape_string($conexion,$_POST['img_desc2']);




      if(preg_match($regex,$comentario))
      $comentario = preg_replace($regex, "", $comentario);


      //chequear si hay usuario para obtener id
      if(!empty($name))
      {
        $e = "SELECT id,activa,youtube,facebook,instagram,twitter,codigo_activacion,id_button,id_header FROM `users` WHERE `nickname` = '$name' limit 1";
        $c = mysqli_query($conexion, $e);
        $vector =	mysqli_fetch_assoc($c);
        //declaro variable session id_user
        $_SESSION['id_user'] = $vector['id'];
        $idUser = $_SESSION['id_user'];
        $yt = $vector['youtube'];
        $fb =  $vector['facebook'];
        $tw = $vector['twitter'];
        $insta = $vector['instagram'];
        $rep = $_SESSION['rep'];
        $id_button = $vector['id_button'];
        $id_header = $vector['id_header'];

          //chequeamos si la cuenta esta activa, en caso afirmativo se puede comentar
        if($vector['activa']==0)
          {
            $status = 0;
            $result['cuenta_no_activa'] = true;
            echo json_encode($result);
            exit();
          }
         if($vector['activa']==1)
            {
                  $status = 1;
            }


          }




    }



    if($conexion && $status==1 && $cooldown>=5)
    {
      $name = $_SESSION['user'];
      $q = "INSERT INTO opiniones (id_user, titulo, contenido, cat, youtube, facebook, twitter, instagram,nombre,video,img,img_desc,img1,img_desc1,img2,img_desc2,rep,id_button,id_header) VALUES ('$idUser','$titulo','$comentario','$cat','$yt','$fb','$tw','$insta','$name','$video','$img','$img_desc','$img1','$img_desc1','$img2','$img_desc2','$rep','$id_button','$id_header')";
      $notif = "INSERT INTO notifications (unread,recipient_id,sender_id,type,sender_name,recipient_name) VALUES ('false','$idUser','$idUser','1','$name','$name')";
      $consulta2 = mysqli_query($conexion,$notif);
      $consulta = mysqli_query($conexion, $q);
      $_SESSION['cooldown'] = new DateTime('now');

      if($consulta)
      {
        $result['exito'] = true;
        echo json_encode($result);
        exit();
      }
      else  {
        $result['no_se_pudo_enviar'] = true;
        echo json_encode($result);
        exit();
      }

      //$vector =	mysqli_fetch_array($consulta);
    }
    else if(!$conexion){
      $result['no_se_pudo_conectar'] = true;
      echo json_encode($result);
      exit();

    }
     if($conexion && $status==1 && $cooldown<5)
    {

      $result['cooldown'] = $cooldown;
      echo json_encode($result);
      exit();
    }


      //	if($conexion)
        //echo json_encode($vector);
        function dateDifference($date_1 , $date_2 , $differenceFormat = '%i' )
        {



            $datetime1 = date_format($date_1, 'Y-m-d H:i:s');
            $datetime2 =  date_format($date_2, 'Y-m-d H:i:s');

            $interval = date_diff($date_1, $date_2);

            return $interval->format($differenceFormat);

        }


    // Guardo en una variable la consulta SQL
  //	$consulta = "SELECT COUNT('nickname') AS 'contar', `nickname` FROM `users` WHERE `nickname` = '".$name."' AND `contrasena` = '".$pass."'";

    //$arrayUsers = $conn->query($consulta);

?>
