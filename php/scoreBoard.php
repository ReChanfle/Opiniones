<?php

include 'conexion.php';
session_start();



              if(!empty($_SESSION['id_user']))
              {
                $id_user = $_SESSION['id_user'];
              }
              else {

                exit();
              }


              $scoreLikes = 0;
              $scoreLikes1 = 0;
              $scoreOp = 0;
              $vector = array();



      if($conexion && $id_user)
      {
            //puntaje por calificacion y publicacion
            $sql = "select positivos,negativos from opiniones where `id_user`='$id_user'";

            $consulta = mysqli_query($conexion,$sql);

              $sql1 = "select penalty_points from scoreboard where `id_user`='$id_user'";

                $consulta1 = mysqli_query($conexion,$sql1);

                  $vector1 = array();

                  if($consulta1 && $consulta)
                  {
                    $vector1 = mysqli_fetch_assoc($consulta1);


            while($row = $consulta->fetch_array(MYSQLI_ASSOC)){
               $vector[] = $row;
             }

             for($i= 0; $i<sizeof($vector);$i++)
             {
                        // por calificacion se obtienen 2 puntos

                          $scoreLikes +=  $vector[$i]['positivos'];
                          $scoreLikes1 += $vector[$i]['negativos'];

             }


             $size = sizeof($vector);

             //por publicacion se obtienen 10 puntos
             $scoreOp = $scoreOp + ($size*10);
             $penalty = $vector1['penalty_points'];
             $score = $scoreOp+$scoreLikes+$scoreLikes1+$penalty;

             $_SESSION['rep'] = $score;

             $totalPoints = array(
                 "puntos_likes" => $scoreLikes+$scoreLikes1,
                 "puntos_op"  => $scoreOp,
                 "puntos_infracciones" => $vector1['penalty_points'],
                 "total_puntos" => $score,
                 "error" => false,
             );

             echo json_encode($totalPoints);


                  }


              //$sql2 = "UPDATE `scoreboard` SET  `score`='$score' WHERE `id_user`='$id_user' limit 1";
              //$consulta2 = mysqli_query($conexion,$sql2);

      }












 ?>
