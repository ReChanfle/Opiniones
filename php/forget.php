<?php


include 'conexion.php';
include 'libs.php';




  $success = array(
      "usuario_vacio" => false,
      "email_vacio" => false,
      "error_envio" => false,
      "ingresos_no_validos" => false,
     "email_no_valido" => false,
      "exito" => false,
      "error_envio_email" => false,

  );

  $on_name = false;
  $on_email = false;
  $name;
  $email;
  $vector = array();
  $test = false;

  if(!empty($_POST['user']))
  {
      $name = $_POST['user'];
      get_user($name,$conexion,$vector);
  }
   else if(empty($_POST['user']) && empty($_POST['email']))
  {
    $success['usuario_vacio'] = true;
    echo json_encode($success);
    exit();
  }

  if(!empty($_POST['email']))
  {

      $email = $_POST['email'];
      get_email($email,$conexion,$vector);
  }
  else if(empty($_POST['email']) && empty($_POST['user']))
  {

    $success['email_vacio'] = true;
    echo json_encode($success);
    exit();
  }








    if($test)
  if($conexion)
  {

        $sql = "select nickname,usuarioemail,codigo_activacion from users where `nickname`='$name' and `usuarioemail`='$email' limit 1";

        $consulta = mysqli_query($conexion,$sql);
        $hash = random_str(32);
          if($consulta)
          $vector = mysqli_fetch_assoc($consulta);
          else {
            $success['error_envio'] = true;
            exit();
          }

            if(empty($vector))
              {
                          $success['ingresos_no_validos'] = true;
                          echo json_encode($success);
                          exit();

              }



          $status = SendForgetEmail($vector['nickname'],$hash,$vector['usuarioemail']);

          if($status==null)
          {

              $sql1 = "UPDATE users SET recuperar='$hash' WHERE nickname='$name' limit 1";
              $consulta1 = mysqli_query($conexion,$sql1);

              if($consulta1)
              $success['exito'] = true;


          }
          else {
              $success['error_envio_email'] =true;
                echo json_encode($success);
                exit();
          }









  }
  else {

    echo json_encode($success);
    exit();
  }


function get_user($name,$conexion,$vector)
{


   if(!ctype_alnum($name))
  {
    $success['usuario_no_valido'] = true;
    echo json_encode($success);
    exit();
  }



  if($conexion)
  {

        $sql = "select nickname,usuarioemail,codigo_activacion from users where `nickname`='$name' limit 1";

        $consulta = mysqli_query($conexion,$sql);
        $hash = random_str(32);
          if($consulta)
          $vector = mysqli_fetch_assoc($consulta);
          else {
            $success['error_envio'] = true;
            exit();
          }

            if(empty($vector))
              {
                          $success['ingresos_no_validos'] = true;
                          echo json_encode($success);
                          exit();

              }



          $status = SendForgetEmail($vector['nickname'],$hash,$vector['usuarioemail']);

          if($status==null)
          {

              $sql1 = "UPDATE users SET recuperar='$hash' WHERE nickname='$name' limit 1";
              $consulta1 = mysqli_query($conexion,$sql1);

              if($consulta1)
              {
                $success['exito'] = true;
                  echo json_encode($success);
              }



          }
          else {
              $success['error_envio_email'] =true;
                echo json_encode($success);
                exit();
          }









  }
  else {

    echo json_encode($success);
    exit();
  }



}


function get_email($email,$conexion,$vector)
{

  if(!filter_var($email,FILTER_VALIDATE_EMAIL))
  {
    $success['email_no_valido'] = true;

    echo json_encode($success);

    exit();
  }


  if($conexion)
  {

        $sql = "select nickname,usuarioemail,codigo_activacion from users where `usuarioemail`='$email' limit 1";

        $consulta = mysqli_query($conexion,$sql);
        $hash = random_str(32);
          if($consulta)
          $vector = mysqli_fetch_assoc($consulta);
          else {
            $success['error_envio'] = true;
            exit();
          }

            if(empty($vector))
              {
                          $success['ingresos_no_validos'] = true;
                          echo json_encode($success);
                          exit();

              }



          $status = SendForgetEmail($vector['nickname'],$hash,$vector['usuarioemail']);

          if($status==null)
          {

              $sql1 = "UPDATE users SET recuperar='$hash' WHERE usuarioemail='$email' limit 1";
              $consulta1 = mysqli_query($conexion,$sql1);

              if($consulta1)
              {
                $success['exito'] = true;
                  echo json_encode($success);
              }

          }
          else {
              $success['error_envio_email'] =true;
                echo json_encode($success);
                exit();
          }









  }
  else {

    echo json_encode($success);
    exit();
  }





}


 ?>
