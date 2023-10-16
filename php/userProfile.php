<?php
include 'conexion.php';
include 'libs.php';



      $name = $_GET['name'];



      $v = array(
          "nickname" => null,
          "facebook" => null,
          "instagram" => null,
          "youtube" => null,
          "twitter" => null,
          "web" => null,
          "url_img_user" => null,
          "rep" => null,
          "cant_op" => null,
          'id_user' => null,

      );

          if($conexion && !empty($name))
          {
                  $sql = "SELECT nickname,facebook,instagram,youtube,twitter,web,url_img_user,id from users where `nickname`='$name'";

                  $consulta = mysqli_query($conexion,$sql);



                  if($consulta)
                  {
                    $vector = mysqli_fetch_assoc($consulta);

                    $id = $vector['id'];

                    $v['nickname'] = $vector['nickname'];
                    $v['facebook'] = $vector['facebook'];
                    $v['instagram'] = $vector['instagram'];
                    $v['youtube'] = $vector['youtube'];
                    $v['twitter'] = $vector['twitter'];
                    $v['web'] = $vector['web'];
                    $v['url_img_user'] = $vector['url_img_user'];
                    $v['id_user'] = $vector['id'];


                      $sql2 = "SELECT rep FROM opiniones where `id_user`='$id' ORDER BY rep DESC LIMIT 1";

                      $sql3 = " SELECT COUNT(*) as `total` FROM opiniones WHERE id_user= '$id'";



                        $consulta2 = mysqli_query($conexion,$sql2);

                          $consulta3 = mysqli_query($conexion,$sql3);



                        if($consulta2)
                        {
                            $vector2 = mysqli_fetch_assoc($consulta2);

                            $v['rep'] = $vector2['rep'];

                            //  echo json_encode($v);

                        }
                        if($consulta3)
                        {
                          $vector3 = mysqli_fetch_assoc($consulta3);

                          $v['cant_op'] = $vector3['total'];
                        }





                    echo json_encode($v);
                  }








          }
          else {
                echo json_encode($v);
          }










 ?>
