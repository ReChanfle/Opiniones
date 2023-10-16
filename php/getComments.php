<?php
include 'conexion.php';




            $id_opinion = $_GET['hash'];
            $userinfo = array();
            $page = array();
            $pages = array();
            $aux = 0;



            if($conexion && !empty($id_opinion))
            {

                  $sql = "SELECT usuario,id,contenido,fecha_de_creacion,up from comments WHERE `id_opinion`='$id_opinion' order by up desc";

              $consulta = mysqli_query($conexion,$sql);

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
