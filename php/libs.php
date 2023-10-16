<?php

include 'conexion.php';

function random_str(int $length = 64,string $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'): string
{
if ($length < 1) {
    throw new \RangeException("Length must be a positive integer");
}
$pieces = [];
$max = mb_strlen($keyspace, '8bit') - 1;
for ($i = 0; $i < $length; ++$i) {
    $pieces []= $keyspace[random_int(0, $max)];
}
return implode('', $pieces);

}

function SendActivationEmail($hash,$name,$email)
{
  $link = "https://opiniones.ar/activate.html#$hash?$name";
  //$to      = "sebascabeza1991@gmail.com";
  $subject = "Activacion cuenta Opiniones";
  $message = "Activa tu cuenta $name con este enlace: $link  ";
  $headers = 'From: activaciones@Opiniones.com' . "\r\n" .
    'No-Reply: activaciones@Opiniones.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

//  mail($to, $subject, $message, $headers);



    $success =   mail($email, $subject, $message, $headers);
if (!$success) {
    $errorMessage = error_get_last()['message'];

    echo $errorMessage;
  }

}

function SendForgetEmail($name,$hash,$email)
{

  $link = "https://opiniones.ar/recoverypassword.html#$hash?$name?$email";
  $subject = "Recuperacion cuenta Opiniones";
  $message = "Con este link, puedes recuperar tu Cuenta!:   $link  ";
  $headers = 'From: activaciones@Opiniones.com' . "\r\n" .
    'No-Reply: activaciones@Opiniones.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

//  mail($to, $subject, $message, $headers);



    $success =   mail($email, $subject, $message, $headers);
if (!$success) {
    $errorMessage = error_get_last()['message'];

    echo $errorMessage;
  }

}

function SendSuccessNewPasswordEmail($name,$email)
{


  $subject = "Recuperacion cuenta Opiniones";
  $message = "Se reestablecio la contraseña correctamente, puedes ingresar desde aqui:  https://opiniones.ar/login.html  ";
  $headers = 'From: activaciones@Opiniones.com' . "\r\n" .
    'No-Reply: activaciones@Opiniones.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

//  mail($to, $subject, $message, $headers);



    $success =   mail($email, $subject, $message, $headers);
if (!$success) {
    $errorMessage = error_get_last()['message'];

    echo $errorMessage;
  }

}

function SendSuccessChangePasswordEmail($name,$email)
{


  $subject = "Cambio contraseña Opiniones";
  $message = "Se reestablecio la contraseña correctamente, puedes ingresar desde aqui:  https://opiniones.ar/login.html  ";
  $headers = 'From: admin@Opiniones.com' . "\r\n" .
    'No-Reply: admin@Opiniones.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

//  mail($to, $subject, $message, $headers);



    $success =   mail($email, $subject, $message, $headers);
if (!$success) {
    $errorMessage = error_get_last()['message'];

    echo $errorMessage;
  }

}

function SendSuccessChangeUserEmail($name,$email)
{


  $subject = "Modificación Nombre usuario Opiniones";
  $message = "Se modifico el nombre de usuario correctamente, puedes ingresar desde aqui:  https://opiniones.ar/login.html  ";
  $headers = 'From: admin@Opiniones.com' . "\r\n" .
    'No-Reply: admin@Opiniones.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

//  mail($to, $subject, $message, $headers);



    $success =   mail($email, $subject, $message, $headers);
if (!$success) {
    $errorMessage = error_get_last()['message'];

    echo $errorMessage;
  }

}
function SendSuccessChangeEmail($name,$email)
{


  $subject = "Modificación Nombre usuario Opiniones";
  $message = "Se modifico el nombre de usuario correctamente, puedes ingresar desde aqui:  https://opiniones.ar/login.html  ";
  $headers = 'From: admin@Opiniones.com' . "\r\n" .
    'No-Reply: admin@Opiniones.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

//  mail($to, $subject, $message, $headers);



    $success =   mail($email, $subject, $message, $headers);
if (!$success) {
    $errorMessage = error_get_last()['message'];

    echo $errorMessage;
  }

}

function SendOpinionEliminada($name,$idOpinion,$motivo,$email)
{

  //$to      = "sebascabeza1991@gmail.com";
  $subject = "Tu Opinion N° $idOpinion fue Eliminada";
  $message = "Hola $name tu opinion fue eliminada por: $motivo";
  $headers = 'From: admin@Opiniones.com' . "\r\n" .
    'No-Reply: admin@Opiniones.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

//  mail($to, $subject, $message, $headers);



    $success =   mail($email, $subject, $message, $headers);
if (!$success) {
    $errorMessage = error_get_last()['message'];

    echo $errorMessage;
  }

}

function SendUsuarioSuspendido($name,$tiempo,$motivo,$email)
{

  //$to      = "sebascabeza1991@gmail.com";
  $subject = "Fuiste suspendido para opinar";
  $message = "Hola $name fuiste suspendido por $tiempo dias, motivo: $motivo";
  $headers = 'From: admin@Opiniones.com' . "\r\n" .
    'No-Reply: admin@Opiniones.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

//  mail($to, $subject, $message, $headers);



    $success =   mail($email, $subject, $message, $headers);
if (!$success) {
    $errorMessage = error_get_last()['message'];

    echo $errorMessage;
  }

}

function SendUsuarioEliminado($name,$motivo,$email)
{

  //$to      = "sebascabeza1991@gmail.com";
  $subject = "Tu usuario fue eliminado";
  $message = "Hola $name fuiste eliminado permanentemente del sitio, motivo: $motivo";
  $headers = 'From: admin@Opiniones.com' . "\r\n" .
    'No-Reply: admin@Opiniones.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

//  mail($to, $subject, $message, $headers);



    $success =   mail($email, $subject, $message, $headers);
if (!$success) {
    $errorMessage = error_get_last()['message'];

    echo $errorMessage;
  }

}

function SendUsuarioActivado($name,$motivo,$email)
{

  //$to      = "sebascabeza1991@gmail.com";
  $subject = "Tu usuario fue activado";
  $message = "Hola $name fuiste habilitado, motivo: $motivo";
  $headers = 'From: admin@Opiniones.com' . "\r\n" .
    'No-Reply: admin@Opiniones.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

//  mail($to, $subject, $message, $headers);



    $success =   mail($email, $subject, $message, $headers);
if (!$success) {
    $errorMessage = error_get_last()['message'];

    echo $errorMessage;
  }

}

function SendMotivoMotificacionOpinion($name,$motivo,$email)
{

  //$to      = "sebascabeza1991@gmail.com";
  $subject = "Tu Opinion ha sido modificada ";
  $message = "Hola $name tu opinion ha sido modificada, motivo: $motivo";
  $headers = 'From: admin@Opiniones.com' . "\r\n" .
    'No-Reply: admin@Opiniones.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

//  mail($to, $subject, $message, $headers);



    $success =   mail($email, $subject, $message, $headers);
if (!$success) {
    $errorMessage = error_get_last()['message'];

    echo $errorMessage;
  }

}

function CheckReal($conexion,$code)
{
      if($conexion)
      {
            $c = $code;
            $sql = "select codigo_activacion from `users` where `codigo_activacion`='$c' limit 1";
            $consulta = mysqli_query($conexion,$sql);

            $vector = mysqli_fetch_assoc($consulta);

            if($vector['codigo_activacion']==$code)
            return true;
            else {
              return false;
            }

      }



}

function GetRecentOp($conexion,$name)
{
          $userinfo = array();

          if($conexion)
          {
                $sql = "SELECT titulo,id,positivos,negativos FROM opiniones where `nombre`='$name' ORDER BY fecha_creacion DESC LIMIT 5";

                $consulta = mysqli_query($conexion,$sql);

                if($consulta)
                {
                  while($row = $consulta->fetch_array(MYSQLI_ASSOC)){
                     $userinfo[] = $row;

                   }

                    echo json_encode($userinfo);
                }





          }




}

function dateDifference($date_1 , $date_2 , $differenceFormat = '%i' )
  {



      $datetime1 = date_format($date_1, 'Y-m-d H:i:s');
      $datetime2 =  date_format($date_2, 'Y-m-d H:i:s');

      $interval = date_diff($date_1, $date_2);

      return $interval->format($differenceFormat);

  }







 ?>
