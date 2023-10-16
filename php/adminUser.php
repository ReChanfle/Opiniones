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

    $name = $_POST['name'];
    $email = $_POST['email'];
    $tipo = 0;


    if(!empty($_POST['suspendTime']))
      $tipo = 1;
    if(!empty($_POST['banMotivo']))
    $tipo = 2;
    if(!empty($_POST['activateMotivo']))
    $tipo = 3;

      if($tipo==0)
      {

          $vector = array(
            "sin_motivo" =>1,
          );
          echo json_encode($vector);
          exit();


      }



    if($_SESSION['tipo_user']==1 && $tipo==1 )
    {

      $suspendTime = $_POST['suspendTime'];
      $suspendMotivo = $_POST['suspendMotivo'];
      $id = $_POST['id'];
      $points = $_POST['points'];
        SuspendUser($suspendTime,$suspendMotivo,$name,$conexion,$email,$id,$points);

    }
    if($_SESSION['tipo_user']==1 && $tipo==2)
    {




        $banMotivo = $_POST['banMotivo'];
          BanUser($name,$conexion,$email,$banMotivo);
    }
    if($_SESSION['tipo_user']==1 && $tipo==3)
    {
        $actMotivo = $_POST['activateMotivo'];
          ActivateUser($name,$conexion,$email,$actMotivo);
    }




    //echo json_encode($email);





function SuspendUser($suspendTime,$suspendMotivo,$name,$conexion,$email,$id,$points)
{
          // set default timezone
        date_default_timezone_set('America/Buenos_Aires'); // CDT

        $info = getdate();
        $date = $info['mday'];
        $month = $info['mon'];
        $year = $info['year'];

        $current_date = "$date-$month-$year";

        //creo un objeto date
        $date = date_create($current_date);
        //agrego el intervalo en dias
        date_add($date, date_interval_create_from_date_string($suspendTime . " days"));
        //asigno el resultado a una nueva variable
        $sqlSuspend =  date_format($date, 'y-m-d');




                  if($conexion)
                    {
                          $sql = "UPDATE users SET tiempo_suspension='$sqlSuspend' WHERE nickname='$name' limit 1";
                          $consulta = mysqli_query($conexion,$sql);
                          $status;
                          if($consulta)
                          {
                            $sqlLogInfraccion = "INSERT INTO `infracciones_users`(`nickname`, `infraccion`, `tiempo_suspendido`,`penalty_points`) VALUES ('$name','$suspendMotivo','$suspendTime','$points')";
                            $consultaLog = mysqli_query($conexion,$sqlLogInfraccion);

                              $sqlPointsPenalty = "UPDATE scoreboard SET penalty_points= penalty_points+'$points' WHERE id_user='$id' limit 1";
                              $consultaPointsPenalty = mysqli_query($conexion,$sqlPointsPenalty);



                            $status = SendUsuarioSuspendido($name,$suspendTime,$suspendMotivo,$email);

                          }

                          $vector = array(
                            "estado_email" => $status, // null para success
                            "estado_consulta" => $consulta, //true para query exitoso
                            "suspendido" => 1,
                          );
                            echo json_encode($vector);


                    }

}


function BanUser($name,$conexion,$email,$banMotivo)
{



                    if($conexion)
                      {
                            $sql = "UPDATE users SET baneado=1  WHERE nickname='$name' limit 1";
                            $consulta = mysqli_query($conexion,$sql);
                            $baneado = 0;
                            $status;
                            if($consulta)
                            {
                              $baneado = 1;
                              $sqlLogInfraccion = "INSERT INTO `infracciones_users`(`nickname`, `infraccion`, `baneado`) VALUES ('$name','$banMotivo','$baneado')";
                              $consultaLog = mysqli_query($conexion,$sqlLogInfraccion);
                              $status = SendUsuarioEliminado($name,$banMotivo,$email);

                            }

                            $vector = array(
                              "estado_email" => $status, // null para success
                              "estado_consulta" => $consulta, //true para query exitoso
                              "baneado" => $baneado, //0 para no baneado, 1 para baneado
                            );
                              echo json_encode($vector);

                      }


}

function ActivateUser($name,$conexion,$email,$actMotivo)
{





    date_default_timezone_set('America/Buenos_Aires'); // CDT

    $info = getdate();
    $date = $info['mday'];
    $month = $info['mon'];
    $year = $info['year'];

    $current_date = "$year-$month-$date";


                    if($conexion)
                      {
                            $sql = "UPDATE users SET baneado=0, tiempo_suspension='$current_date' WHERE nickname='$name' limit 1";
                            $consulta = mysqli_query($conexion,$sql);
                            $baneado = 0;
                            $status;
                            if($consulta)
                            {
                              $status = SendUsuarioActivado($name,$actMotivo,$email);
                              $baneado = 0;
                            }

                            $vector = array(
                              "estado_email" => $status, // null para success
                              "estado_consulta" => $consulta, //true para query exitoso
                              "baneado" => $baneado, //0 para no baneado, 1 para baneado
                              "test" =>$current_date,
                            );
                              echo json_encode($vector);

                      }


}




 ?>
