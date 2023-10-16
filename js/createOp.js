


function checkDataTitulo()
{
      var check = false;
      var tituloOpinion = document.getElementById('titulo');
      check = tituloOpinion.checkValidity();

      if(check)
      tituloOpinion.setAttribute("class","form-control mb-1 is-valid");
      if(!check)
        tituloOpinion.setAttribute("class","form-control mb-1 is-invalid");
}

function checkDataContenido()
{
      var check = false;
      var tituloOpinion = document.getElementById('contenido');
      check = tituloOpinion.checkValidity();



  if($('#contenido').val().match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/) )
        check = false;



      if(check)
      tituloOpinion.setAttribute("class","form-control mb-1 is-valid");
      if(!check)
        tituloOpinion.setAttribute("class","form-control mb-1 is-invalid");
}


function AddLinks()
{

      $('#delVid').click(function()
      {


              var child = document.getElementById('video-url');
              if(child)
              child.parentNode.removeChild(child);
              var video = document.getElementById('video_yt_link');
              if(video)
              video.parentNode.removeChild(video);


                document.getElementById('addVid').disabled = false;
                if(child)
                  document.getElementById('delVid').disabled = true;


      });


      $('#addVid').click(function()
      {
              //var yt_placeholder = document.createElement('span');
              var yt_url = document.createElement("input");
              //yt_placeholder.className = "input-group-text";
            //  yt_placeholder.textContent = "https://youtube.com/";
            //  yt_placeholder.setAttribute("id","video_yt_link");
              yt_url.className = "form-control";
              yt_url.setAttribute("type","text");
              yt_url.setAttribute("id","video-url");

              yt_url.setAttribute("placeholder","Pon aqui la direccion especifica de tu video");
              var parent = document.getElementById('parentVid');
              var parent1 = document.getElementById('parentVid1');
            //  parent1.appendChild(yt_placeholder);
              parent.appendChild(yt_url);


              document.getElementById('addVid').disabled = true;
              document.getElementById('delVid').disabled = false;


      });



          // esta funcion se usa para elementos agregados dinamicamente
          var count = 0;
        $('#addImg').click(function()
        {
            var x = document.getElementById("parentImg").childElementCount;
          var divcontainer = document.createElement("div");
          var img_placeholder = document.createElement('span');
          var img_url = document.createElement("input");

        //  var img_label = document.createElement("label");
        //  var img_input = document.createElement("input");

        //  img_label.className = "form-label text-white";
        //  img_label.setAttribute("for","img_"+count);
        //  img_label.textContent = "Seleccionar Imagen";
        //  img_input.className =  "form-control-file text-white";
        //  img_input.setAttribute("type","file");
        //  img_input.setAttribute("id","img_"+count);

          var img_desc = document.createElement("input");
          divcontainer.className ="input-group-prepend mt-2";
          img_desc.setAttribute("maxlength","50");
          img_desc.className ="input-group-text mt-1";
          img_desc.setAttribute("id","img_desc"+count);
          divcontainer.setAttribute("id",count);
          img_desc.setAttribute("placeholder","Breve descripcion de tu imagen");
          img_placeholder.className = "input-group-text mt-1";
          img_placeholder.textContent = "URL: ";
          img_placeholder.setAttribute("id","img_link"+count);
          img_url.className = "form-control mt-1";
          img_url.setAttribute("type","url");
          img_url.setAttribute("id","basic-url"+count);
          img_url.style.width = "25%";




          img_url.setAttribute("placeholder","Pon aqui la direccion de tu imagen");
          var parent = document.getElementById('parentImg');

          var parent1 = document.getElementById('parentImg1');
          divcontainer.appendChild(img_placeholder);
          divcontainer.appendChild(img_url);
          divcontainer.appendChild(img_desc);
        //  divcontainer.appendChild(img_label);
        //  divcontainer.appendChild(img_input);

          parent.appendChild(divcontainer);
          //parent.appendChild(img_desc);
          count++;

          if(x>=2)
              document.getElementById('addImg').disabled = true;

            //console.log('#img_desc'+count+'');


        });



        $('#delImg').click(function(e)
        {
          var c = document.getElementById("parentImg").childNodes.length;
            var parent = document.getElementById("parentImg");

          if(c>1)
          {
            parent.removeChild(parent.lastElementChild);
            count = count-1;

          }
            var x = document.getElementById("parentImg").childElementCount;
          if(x<=2)
              document.getElementById('addImg').disabled = false;

        });








}
function MakeVideoLink(video)
{
  var checkValidLink;
  var checkValidLink2;
  checkValidLink = video.includes("https://www.youtube.com/");
  checkValidLink2 = video.includes("https://youtu.be/");

  if(checkValidLink)
  {
     var embed = video.includes("embed");

        if(!embed)
        {
            var temp = video.replace("https://www.youtube.com/","");
            var temp2 = "https://www.youtube.com/embed/"+temp;
            return temp2;
        }


  }
  else if(checkValidLink2)
  {
     var embed = video.includes("embed");

        if(!embed)
        {
            var temp = video.replace("https://youtu.be/","");
            var temp2 = "https://www.youtube.com/embed/"+temp;
            return temp2;
        }


  }
  else {

        video = 0;
        return video;

  }


}


function Alert(id,string)
{
  var body = document.getElementById(id);
  if(body.children.length==0)
  {
      var alert = document.createElement('div');
      alert.className = "alert alert-success alert-dismissible fade show text-center";
      alert.setAttribute("role","alert");
      alert.setAttribute("id","alertSearchResult");
      alert.textContent = string;
      body.appendChild(alert);
      window.setTimeout(function() {
          $("#alertSearchResult").fadeTo(500, 0).slideUp(500, function() {
              $(this).remove();
            });
          }, 2000);
  }
}


  function CrearComentario ()
  {
    $('#submitcomment').click(function(e){



         e.preventDefault();
         var titulo = $('#titulo').val();
         var comentario = $('#contenido').val();
         var cat = $('#inputGroupSelect01').val();
         var video = $('#video-url').val();

          if(video!=null)
        video = MakeVideoLink(video);
        console.log(video);

        if(video==0)
        {

          var msj = "Link de video no valido, usa solo links de Youtube";
          var id = "alertParent";
          Alert(id,msj);
           return;
        }




         var img = $('#basic-url0').val();
         var img1 = $('#basic-url1').val();
         var img2 = $('#basic-url2').val();

         var img_desc =$('#img_desc0').val();
          var img_desc1 = $('#img_desc1').val();
           var img_desc2 = $('#img_desc2').val();






         if(comentario.length<50)
         {
            var msj = "Opinion demasiado breve, explayate un poco mas!.";
            var id = "alertParent";
            Alert(id,msj);
             return;
         }


         if(comentario.length>2080)
         {
           var msj = "Opinion demasiado demasiado extensa, resume un poco mas!.";
           var id = "alertParent";
           Alert(id,msj);
            return;
         }


            if(cat==null)
            {
              var msj = "Por favor selecciona una categoria.";
              var id = "alertParent";
              Alert(id,msj);
               return;
            }


          $.ajax({
          type: 'POST',
          url: '/php/createOp.php',
          data:{titulo,comentario,cat,video, img, img_desc,img1,img_desc1,img2,img_desc2},
          dataType : 'json',
          success: function(r)
          {

                          //var r = JSON.parse(x);

                              if(r.cuenta_no_activa)
                              {
                                    var msj = "Primero debes activar tu cuenta";
                                    var id = "alertParent";

                                    Alert(id,msj);
                              }
                              if(r.exito)
                              {
                                  var msj = "	Opinion enviada con exito, la puedes ver en tu Menú, en la seccion 'Mis opiniones'";
                                  var id = "alertParent";

                                    Alert(id,msj);

                                document.getElementById("submitcomment").disabled = true;
                                window.setTimeout(function() {
                                            location.reload();
                                    }, 2000);

                              }
                              if(r.no_se_pudo_enviar)
                              {
                                var msj = "No se pudo enviar la opinion";
                                var id = "alertParent";
                                  Alert(id,msj);

                              }
                              if(r.no_se_pudo_conectar)
                              {
                                var msj = "No se pudo enviar la opinion";
                                var id = "alertParent";
                                Alert(id,msj);
                              }
                              if(r.cooldown)
                              {
                                var cooldown =5;
                                cooldown = cooldown - r.cooldown;
                                  var msj = "Debes esperar: "+cooldown+" minutos";
                                  var id = "alertParent";
                                  Alert(id,msj);

                              }





          },
          error: function(x)
          {

              console.log(x.responseText);
          }

        });
      });

  }

  function VaciarCaja()
  {
    $('#titulo').val('');
    $('#contenido').val('');
    $('#inputGroupSelect01').val('Choose...');

  }


  function ChequearLargo()
  {


      var maxchar = 2080;
      var minchar =50;
    $('#contenido').keydown(function(){
        var  cont =  this.value.length;
           $( "#charsLeft" ).html( "Espacio restante: " +( maxchar - cont ) );
        // if(cont<=minchar)
        //  document.getElementById("submitcomment").disabled = true;
        //  else {
        //    document.getElementById("submitcomment").disabled = false;
        //  }
    });
  }

  function CerrarVaciar()
  {
      $('#cerrarComentario').click(function(){
        $('#titulo').val('');
        $('#contenido').val('');

      //  document.getElementById("submitcomment").disabled = false;
          $('#alertOpSuccess').css("visibility","hidden");
      });

      $('#closeModalOp').click(function(){
        $('#titulo').val('');
        $('#contenido').val('');

        document.getElementById("submitcomment").disabled = false;
          $('#alertOpSuccess').css("visibility","hidden");
      });

  }


  $(document).ready(function()
  {



  $('#alertOpSuccess').css("visibility","hidden");


        AddLinks();




    $('#crearCommentModal').keydown(function()
    {
        checkDataTitulo();
        checkDataContenido();
    });
    $('#crearCommentModal').keyup(function()
    {
        checkDataTitulo();
        checkDataContenido();
    });

      ChequearLargo();
      CrearComentario();
      CerrarVaciar();


    });
