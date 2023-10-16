<?php

include 'conexion.php';


          $value;


          $userinfo = array();
          $page = array();
          $pages = array();
          $aux = 0;



          if($conexion)
          {
            if(!empty($_POST['value']))
            {
              $value = mysqli_real_escape_string($conexion,$_POST['value']);

              $value = str_replace('%20', ' ', $value);

              $sql = "select  titulo,contenido,cat,id,positivos,negativos,id_header,id_button from opiniones where titulo LIKE '%".$value."%' OR contenido LIKE '%".$value."%' OR id LIKE '%".$value."%' limit 25";

              $consulta = mysqli_query($conexion,$sql);

              if($consulta)
              {

                        $temp = mysqli_fetch_assoc($consulta);

                        $userinfo[0] = $temp;

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

                            echo json_encode($pages);
              }

            }








          }








 ?>
