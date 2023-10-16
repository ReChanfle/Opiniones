<?php


include 'conexion.php';
include 'libs.php';
session_start();

  //  $cat = $_POST['cat'];

  if(!empty($_SESSION['check']))
  {
    $code = $_SESSION['check'];
    $s = CheckReal($conexion,$code);
      if(!$s)
        exit();
  }



          $cat = json_decode($_POST['cat']);
          $user = $_SESSION['user'];
          $idUser = $_SESSION['id_user'];
          $userinfo = array();
          $page = array();
          $pages = array();
          $aux = 0;



      if($conexion)
      {

        if(empty($_SESSION['id_user']))
        {

          exit();
        }

        $consulta = null;

        if($cat<7)
        {
            $q = "select  titulo, contenido, cat, id, positivos, negativos, video, nombre, img,img1,img2,img_desc,img_desc1,img_desc2,id_button,id_header from opiniones where `id_user`='$idUser' and `cat`= '$cat' ";
              $consulta = mysqli_query($conexion,$q);
        }

        else {
            $q = "select  titulo, contenido, cat, id, positivos,negativos, video, nombre, img,img1,img2,img_desc,img_desc1,img_desc2,id_button,id_header from opiniones where `id_user`='$idUser' ";
              $consulta = mysqli_query($conexion,$q);
        }



        //$userinfo = mysqli_fetch_assoc($consulta);

        while($row = $consulta->fetch_array(MYSQLI_ASSOC)){
           $userinfo[] = $row;
         }

         for($x = 0; $x<count($userinfo); $x++)
         {
            $countTotal = count($userinfo);
             if($aux <12)
             {
              $page[$aux] = $userinfo[$x];
               $aux++;
             }
              if($aux==12)
             {
               $pages[] = $page;
               $page = array();
               $aux = 0;
             }
              if($aux<12 && $x==$countTotal-1)
             {
               $pages[] = $page;
               $page = array();
               $aux = 0;

             }



         }


          if($consulta)
          echo json_encode($pages);




      }









 ?>
