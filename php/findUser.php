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

if(empty($_SESSION['id_user']))
{

  exit();
}


            $status = array(
              "nickname" => null,
              "usuarioemail" => null,
              "baneado" =>0,
              "tiempo_suspension" => 0,
              "puntos_infracciones" => 0,
              "error_conexion" => false,
              "id" => null,
            );


$nick = $_POST['nick'];


            if($conexion && $_SESSION['tipo_user']==1)
            {

                $sql = "select id,nickname,usuarioemail,baneado,tiempo_suspension from `users` where `nickname`='$nick' limit 1";
                $consulta = mysqli_query($conexion,$sql);
                $vector = mysqli_fetch_assoc($consulta);
                $id_third_user = $vector['id'];
                $sql1 = "select penalty_points from `scoreboard` where `id_user`='$id_third_user' limit 1";
                $consulta1 = mysqli_query($conexion,$sql1);
                $vector_infraccion = mysqli_fetch_assoc($consulta1);
                if($consulta)
                {
                  if($vector==null)
                  {

                    //no hay usuario con ese nick
                    echo json_encode($status);
                  }
                  else
                   {

                     date_default_timezone_set('America/Buenos_Aires'); // CDT

                     $info = getdate();
                     $date = $info['mday'];
                     $month = $info['mon'];
                     $year = $info['year'];

                     $current_date = "$year-$month-$date";

                     //creo un objeto date
                     $current_date = date_create($current_date);

                    //chequeo fecha actual
                    $current_date = new DateTime('now');
                    //asigno fecha actual
                    $your_date = new DateTime($vector['tiempo_suspension']);
                    $interval = $current_date->diff($your_date);
                    $days =  $interval->format("%h");

                    $status['nickname'] = $vector['nickname'];
                    $status['usuarioemail'] = $vector['usuarioemail'];
                    $status['baneado'] = $vector['baneado'];
                    $status['error_conexion'] = false;
                    $status['id'] = $vector['id'];
                    $status['puntos_infracciones'] = $vector_infraccion['penalty_points'];
                    if($current_date>=$your_date)
                    $status['tiempo_suspension'] = 0;
                    else
                    $status['tiempo_suspension'] = $days;

                    //usuario encontrado
                    echo json_encode($status);
                  }

                }
                else {
                  //error al conectar a la base de datos;
                  $status['error_conexion'] = true;
                  echo json_encode($status);
                }


            }







 ?>
