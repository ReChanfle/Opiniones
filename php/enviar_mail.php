<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'PHPMailer/src/Exception.php';
  require 'PHPMailer/src/PHPMailer.php';
  require 'PHPMailer/src/SMTP.php';

function enviarMail($asunto, $mensaje, $mailPara, $nombre){

  $mail = new PHPMailer(true);
  try{
    // Configuracion de SMTP
    $mail->IsSMTP();
    $mail->CharSet = 'UTF-8';

    $mail->Host       = "mail.arlogic.com.ar";
    $mail->SMTPDebug  = 0;                       // enables SMTP debug information (for testing)
    $mail->SMTPAuth   = true;                    // enable SMTP authentication
    $mail->Port       = 25;
    $mail->Username   = "notificaciones@arlogic.com.ar";
    $mail->Password   = "M1P&h#VVR@X6";

    //Recipients
      $mail->setFrom('notificaciones@arlogic.com.ar', 'Notificaciones');
      $mail->addAddress($mailPara, $nombre);     // Add a recipient
      $mail->addAddress($mailPara);                         // Name is optional
      $mail->addReplyTo('no-responder@arlogic.com.ar', 'No Responder!');
    //  $mail->addCC('cdg@arlogic.com.ar');
    //  $mail->addBCC('bcc@example.com');

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $asunto;
    $mail->Body    = $mensaje;
    //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();

    return true;
  }catch(Exception $e) {

      return false;
  }
}

$aResult = enviarMail($_POST['asunto'], $_POST['mensaje'], $_POST['mail'], $_POST['nombre']);

echo json_encode($aResult);
?>
