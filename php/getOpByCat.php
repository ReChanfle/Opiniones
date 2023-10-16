<?php

include 'conexion.php';
include 'libs.php';
session_start();




    if(!empty($_POST['array']))
    {
      $cat = $_POST['array'];
        $hash = $_POST['hash'];

    

      $cats = join("','",$cat);
    }
    else {
      exit();
    }


    //$cats = implode(",", $cat);





  $userinfo = array();
  $page = array();
  $pages = array();
  $aux = 0;



      $success = array(
          "totalPages" => 0,
          "currentPage" => 0,
          "totalLenght" => 0,
      );

    if($conexion)
    {
      $q = "select titulo, contenido, cat, id, positivos, negativos, youtube,facebook,twitter,instagram,nombre,video,img,id_header,id_button from opiniones where cat IN ('$cats')  order by rep desc ";

      $consulta = mysqli_query($conexion,$q);
      if($consulta)
      {
        $vectorPages = mysqli_fetch_array($consulta);
        //$userinfo = mysqli_fetch_assoc($consulta);

        $temp = mysqli_fetch_assoc($consulta);

        $userinfo[0] = $temp;

        while($row = $consulta->fetch_array(MYSQLI_ASSOC)){
           $userinfo[] = $row;

         }

         for($x = 0; $x<count($userinfo); $x++)
         {
            $countTotal = count($userinfo);
             if($aux <12)
             {
              $page[$aux] = $userinfo[$x];
               $aux++;
             }
              if($aux==12)
             {
               $pages[] = $page;
               $page = array();
               $aux = 0;
             }
              if($aux<12 && $x==$countTotal-1)
             {
               $pages[] = $page;
               $page = array();
               $aux = 0;

             }



         }



      }
          // primeras 10 paginas;

      if($pages!=null)
      {
                    $countPages = count($pages);

                    if(is_numeric($hash))
                    {
                      if($countPages>$hash+5)
                      {

                              $success['totalPages'] = 5;
                              $success['currentPage'] = $pages[$hash];
                              $success['totalLenght'] = count($pages);
                              echo json_encode ($success);


                      }
                      else if($countPages>$hash+4)
                      {

                              $success['totalPages'] = 4;
                              $success['currentPage'] = $pages[$hash];
                              $success['totalLenght'] = count($pages);
                              echo json_encode ($success);


                      }

                      else   if($countPages>$hash+3)
                      {

                              $success['totalPages'] = 3;
                              $success['currentPage'] = $pages[$hash];
                              $success['totalLenght'] = count($pages);
                              echo json_encode ($success);


                      }
                    else   if($countPages>$hash+2)
                    {

                            $success['totalPages'] = 2;
                            $success['currentPage'] = $pages[$hash];
                            $success['totalLenght'] = count($pages);
                            echo json_encode ($success);


                    }
                    else  if($hash>=$countPages-2)
                      {
                        $success['totalPages'] = 0;
                        $limit = $countPages-1;
                        $success['totalLenght'] = count($pages);
                        $success['currentPage'] = $pages[$limit];
                        echo json_encode ($success);

                      }

                    }
                     if($hash=="last")
                    {
                      $last = $countPages-1;
                      $success['totalPages'] = 0;
                      $success['currentPage'] = $pages[$last];
                      $success['totalLenght'] = count($pages);
                        echo json_encode ($success);
                    }
                    if($hash=="first")
                   {

                     $success['totalPages'] = 0;
                     $success['currentPage'] = $pages[0];
                     $success['totalLenght'] = count($pages);
                       echo json_encode ($success);
                   }

      }






    }





 ?>
