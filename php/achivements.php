<?php
include 'conexion.php';
include 'libs.php';


          $id = $_GET['id'];

          $vector = array(
              "cant_positivos" => null,
              "cant_negativos" => null,
              "cant_op" => null,
              "op_comp" => null,

          );


        if($conexion)
        {
                $sql = "SELECT COUNT('positivo') AS 'positive' FROM datosvotos WHERE `id_user`='$id' and `positivo`>0";



                $consulta = mysqli_query($conexion,$sql);

                if($consulta)
                {
                  $vector_temp = mysqli_fetch_assoc($consulta);

                  $vector['cant_positivos'] = $vector_temp['positive'];



                }

                $sql1 = "SELECT COUNT('negativo') AS 'negative' FROM datosvotos WHERE `id_user`='$id' and `negativo`>0";


                $consulta1 = mysqli_query($conexion,$sql1);

                if($consulta1)
                {

                  $vector_temp = mysqli_fetch_assoc($consulta1);

                  $vector['cant_negativos'] = $vector_temp['negative'];


                }

                $sql2 = "SELECT cant_op FROM achivements WHERE `id_user`='$id'";

                $consulta2 = mysqli_query($conexion,$sql2);

                if($consulta2)
                {
                    $vector_temp = mysqli_fetch_assoc($consulta2);

                    $vector['cant_op'] = $vector_temp['cant_op'];

                }

                $sql3 = "SELECT op_comp FROM achivements WHERE `id_user`='$id'";

                $consulta3 = mysqli_query($conexion,$sql3);

                if($consulta3)
                {
                    $vector_temp = mysqli_fetch_assoc($consulta3);

                    $vector['op_comp'] = $vector_temp['op_comp'];

                }


                  echo json_encode($vector);

        }






 ?>
