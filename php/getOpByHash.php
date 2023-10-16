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

          $v = array(
            "titulo" => null,
            "contenido" => null,
            "cat" => null,
            "id" => null,
            "positivos" => null,
            "negativos" => null,
            "youtube" => null,
            "facebook" => null,
            "twitter" => null,
            "instagram" => null,
            "video" => null,
            "nombre" => null,
            "img" => null,
            "img1" => null,
            "img2" => null,
            "img_desc" => null,
            "img_desc1" => null,
            "img_desc2" => null,
            "id_user" => null,
          );


          if($conexion)
          {
              $hash =json_decode($_POST['hash']);

              $sql ="select titulo, contenido, cat, id, positivos, negativos, video, nombre, img,img1,img2,img_desc,img_desc1,img_desc2,id_user from opiniones where `id`='$hash' limit 1";

              $consulta = mysqli_query($conexion,$sql);

              $vector = mysqli_fetch_assoc($consulta);

              if($consulta)
              {
                $v = $vector;
                $nick = $v['id_user'];
                $sql2 = "select nickname,youtube,facebook,twitter,instagram from users where `id`='$nick' limit 1";

                $consulta2 = mysqli_query($conexion,$sql2);

                    if($consulta2)
                    {
                        $vector2 = mysqli_fetch_assoc($consulta2);
                        $v['nombre'] = $vector2['nickname'];
                        $v['youtube'] = $vector2['youtube'];
                        $v['facebook'] = $vector2['facebook'];
                        $v['instagram'] = $vector2['instagram'];
                        $v['twitter'] = $vector2['twitter'];

                          echo json_encode($v);
                            exit();
                    }
                        else
                        {
                            echo json_encode($v);
                        }



              }
                else
                {
                        echo json_encode($v);
                }






          }
          else {
              echo json_encode($v);
          }
?>
