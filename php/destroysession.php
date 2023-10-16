<?php
session_start();


if(!empty($_POST['name']))
{
  session_destroy();
  echo "1";
  exit();

}





 ?>
