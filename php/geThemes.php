<?php
include 'conexion.php';
session_start();


          if(!empty($_POST['id_header']) && $_POST['id_header']!=0)
        $id_header = $_POST['id_header'];
          if(!empty($_POST['id_boton']) && $_POST['id_boton']!=0)
        $id_boton = $_POST['id_boton'];


        $vector_integrado = array(
            "link_header" => 0,
            "link_boton" => 0,
              "nombre_header" => 0,
                "nombre_boton" => 0,
        );


        if($conexion && !empty($id_header) && !empty($id_boton))
        {
            $sql = "select link,nombre from header where `id_header`='$id_header' limit 1";
            $consulta = mysqli_query($conexion,$sql);

              if($consulta)
              {
                $vector_header = mysqli_fetch_assoc($consulta);

                $vector_integrado['link_header'] = $vector_header['link'];
                  $vector_integrado['nombre_header'] = $vector_header['nombre'];
              }


            $sql2 = "select link,nombre from button where `id_button`='$id_boton' limit 1";
            $consulta2 =  mysqli_query($conexion,$sql2);

            if($consulta2)
            {
              $vector_boton = mysqli_fetch_assoc($consulta2);

              $vector_integrado['link_boton'] = $vector_boton['link'];
                $vector_integrado['nombre_boton'] = $vector_boton['nombre'];


            }

            echo json_encode($vector_integrado);

        }
        else if($conexion && !empty($_GET['header']))
        {


          $q = "select nombre,link,id_header  from header";

          $consulta = mysqli_query($conexion,$q);

          $userinfo = array();


          while($row = $consulta->fetch_array(MYSQLI_ASSOC)){
             $userinfo[] = $row;
           }

            echo json_encode($userinfo);


        }
      else if($conexion && !empty($_GET['button']))
        {
          $q = "select nombre,link,id_button  from button";

          $consulta = mysqli_query($conexion,$q);

          $userinfo = array();


          while($row = $consulta->fetch_array(MYSQLI_ASSOC)){
             $userinfo[] = $row;
           }
                if($consulta)
           echo json_encode($userinfo);
        }













 ?>
