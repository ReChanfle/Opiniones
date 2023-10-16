<?php


include 'conexion.php';



if($conexion)
{
  $q = "select titulo, contenido, cat, id, positivos, negativos, youtube,facebook,twitter,instagram,nombre,video,img,id_header,id_button from comentarios order by rep desc ";

  $consulta = mysqli_query($conexion,$q);
  $vectorPages = mysqli_fetch_array($consulta);
  //$userinfo = mysqli_fetch_assoc($consulta);

  while($row = $consulta->fetch_array(MYSQLI_ASSOC)){
     $userinfo[] = $row;
     $auxBool = true;
   }
}







 ?>
