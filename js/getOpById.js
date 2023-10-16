function GetHeaderAndButtonTheme(id_header,id_boton,carta_header,boton_mostrar)
{
  $.ajax({
      type: 'POST',
      url: '/php/geThemes.php',
      data: {id_header,id_boton},
      datatype: 'json',
      success: function(x)
      {
            if(x)
              	{
                      //var array = {link_header: null,link_boton: null};
                      console.log(x);
                      var r = JSON.parse(x);

                    carta_header.style.backgroundImage =  "url('"+r.link_header+"')";
                    boton_mostrar.style.backgroundImage =  "url('"+r.link_boton+"')";

                    if(r.link_boton==null)
                    {
                        boton_mostrar.style.backgroundColor = "#007bff";
                    }
                    else
                          boton_mostrar.style.backgroundColor = "transparent";

                }


      },




  });
}

function test_1(id,titulo,contenido,video,img,img1,img2,img_desc,img_desc1,img_desc2,cat)
{

      //  window.open("/Opiniones/opinion.html#"+id,"_blank");
      $('#titulo').val(titulo);
      $('#contenido').val(contenido);
      $('#inputGroupSelect01').val(cat);
      $('#yt-url').val(video);
      $('#img-url').val(img);
      $('#img1-url').val(img1);
      $('#img2-url').val(img2);
      $('#img_desc0').val(img_desc);
      $('#img_desc1').val(img_desc1);
      $('#img_desc2').val(img_desc2);
      $('#idOp').text(id);


}


function ModifyComentario ()
{
  $('#submitcomment').click(function(e){

        $('#submitcomment').attr("disabled","true");

       e.preventDefault();
       var titulo = $('#titulo').val();
       var comentario = $('#contenido').val();
       var cat = $("#inputGroupSelect01_mod :selected").val();
       var video = $('#yt-url').val();
       var img = $('#img-url').val();
       var img1 = $('#img1-url').val();
       var img2 = $('#img2-url').val();
       var img_desc =$('#img_desc0').val();
        var img_desc1 = $('#img_desc1').val();
         var img_desc2 = $('#img_desc2').val();
        var id = $('#idOp').text();
        var motivo = $('#motivOp').val();



          if(cat==null)
            return;

        $.ajax({
        type: 'POST',
        url: '/php/modifyOp.php',
        data:{titulo , comentario, cat, video, img, img_desc,img1,img_desc1,img2,img_desc2,id,motivo},
        dataType : "json",
        success: function(r)
        {

              if(r.opinion_modificada && r.email_enviado==null)
              {
                    document.getElementById('alertOpSuccess').innerHTML = "	Opinion Modificada con exito";
                  $('#alertOpSuccess').css("visibility","visible");
              }
              if(!r.opinion_modificada)
              {
                document.getElementById('alertOpSuccess').innerHTML = "No se pudo modificar la opinion";
                $('#alertOpSuccess').css("visibility","visible");
                  $('#submitcomment').attr("disabled","false");
              }
              if(r.no_puedes_realizar_esta_accion)
              {
                document.getElementById('alertOpSuccess').innerHTML = "No tienes permisos para realizar esta accion";
                $('#alertOpSuccess').css("visibility","visible");
                  $('#submitcomment').attr("disabled","false");
              }



        },
        error: function(x)
        {

            console.log(x);
        }

      });
    });

}

function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}


function AjaxOpinion(url,cat)
{
            var aux=0;
            var first = true;
 //'/Opiniones/php/getCommentBackEnd.php'
 $.ajax({
   type: 'POST',
   url: url,
   data: {cat},
   dataType : "json",
   success: function(r)
   {
            var totalOp = 0;
             aux = clamp(aux,0,r.length);

             if(first)
             {
               for(var i in r[0])
                 {

var cortarContenido = r[0][i]['contenido'].slice(0,100);
var cortarTitulo = r[0][i]['titulo'].slice(0,17);
var carta_opinion = document.createElement("div");
var img_share = document.createElement("img");
var img_boton_up = document.createElement("img");
var img_boton_down = document.createElement("img");
var img_header_type = document.createElement("img");
var carta_header = document.createElement("div");
var carta_body = document.createElement("div");
//  var e_13 = document.createElement("div");
var carta_footer = document.createElement("div");
var carta_titulo = document.createElement("h5");
var carta_contenido = document.createElement("p");
var carta_categoria = document.createElement("p");
var boton_mostrar = document.createElement("a");
var boton_positivos = document.createElement("button");
var boton_id = document.createElement("button");
var carta_positivos = document.createElement("span");
var boton_negativos = document.createElement("button");
var carta_negativos = document.createElement("span");
var id_header = document.createElement("a");
var header_share = document.createElement("a");
//carta_opinion.className = "card text-white bg-secondary border-primary  mb-3 mt-3 mr-2 ml-2";
carta_opinion.style = "max-width: 18rem; min-width:16rem; ";
carta_opinion.setAttribute("id",r[0][i]['id']);
id_header.setAttribute("unique-id",r[0][i]['id']);
id_header.setAttribute("href","/Opiniones/opinion.html#"+r[0][i]['id']);
id_header.setAttribute("target","_blank");
id_header.setAttribute("data-toggle","tooltip");
id_header.setAttribute("data-placement","top");
id_header.setAttribute("title","Numero de opinion");
header_share.className = "mr-2";
header_share.setAttribute("href","opinion.html#"+r[aux][0]['id']);
header_share.setAttribute("data-toggle","tooltip");
header_share.setAttribute("data-placement","top");
header_share.setAttribute("title","Comparte!");
img_share.src = "img/share.png";
img_boton_up.src = "img/upvote.png";
img_boton_down.src = "img/downvote.png";
img_share.setAttribute("alt","compartir");
//  e_2.className ="card-img-top ";
//  e_2.style = "max-width: 10rem; min-width:5rem;";
carta_body.className = "card-body";
carta_titulo.className = "card-title";
carta_contenido.className = "card-text";
carta_categoria.className = "card-text";
boton_mostrar.className = "btn btn-primary btn-sm mt-2";
boton_id.className = "btn btn-info btn-sm mt-2 mr-2";
id_header.className = "badge badge-info ";
carta_header.className = "card-header d-flex justify-content-between";
carta_footer.className = "card-footer d-flex justify-content-end";
img_boton_up.className = "imagen";
img_boton_down.className = "imagen";
id_header.textContent = "#"+r[0][i]['id'];
boton_mostrar.textContent = "Modificar ";
boton_mostrar.setAttribute("id","clickOP");
boton_mostrar.setAttribute ("type", "button");
boton_mostrar.setAttribute ("data-toggle", "modal");
boton_mostrar.setAttribute ("data-target", "#ModifyCommentModal");
boton_mostrar.setAttribute ("onclick", "test_1('"+r[0][i]['id']+"','"+r[0][i]['titulo']+"','"+r[0][i]['contenido']+"','"+r[0][i]['video']+"','"+r[0][i]['img']+"','"+r[0][i]['img1']+"','"+r[0][i]['img2']+"','"+r[0][i]['img_desc']+"','"+r[0][i]['img_desc1']+"','"+r[0][i]['img_desc2']+"','"+r[0][i]['cat']+"')");
boton_negativos.setAttribute ("class","btn btn-primary btn-sm ml-2 mt-2");
boton_positivos.setAttribute ("disabled", "true");
boton_negativos.setAttribute ("disabled", "true");
carta_negativos.setAttribute ("class","badge badge-light ml-1");
boton_positivos.setAttribute ("class","btn btn-primary btn-sm ml-1 mt-2");
carta_positivos.setAttribute ("class","badge badge-light ml-1");
//boton_positivos.textContent = "+";
carta_positivos.textContent = r[0][i]['positivos'];
//  boton_negativos.textContent = "-";
carta_negativos.textContent = r[0][i]['negativos'];
GetHeaderAndButtonTheme(r[aux][i]['id_header'],r[0][i]['id_button'],carta_header,boton_mostrar);

img_header_type.className = "header_type";
if(r[0][i]['negativos']>0 &&  r[0][i]['positivos']<r[0][i]['negativos'])
{
img_header_type.src = "img/contro_op.png";
carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-contro";

}

else if(r[0][i]['positivos']>0 && r[0][i]['negativos']<r[0][i]['positivos'])
{
img_header_type.src = "img/con_op.png";
  carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-conso";

}

else if(r[0][i]['positivos']==0 && r[0][i]['negativos']==0)
{
img_header_type.src = "img/new_op.png";
carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-new";

}
var cats = ["","Productos","Servicios","Politica","Sociedad","Medio ambiente","Interes general"];

//  e_2.alt = "Card Image Cap";
//    e_2.src = '/Opiniones/img/thr.jpg';
carta_header.appendChild(img_header_type);
carta_titulo.textContent = cortarTitulo;
carta_contenido.textContent = cortarContenido;
carta_categoria.textContent = "Categoria: "+ cats[ r[0][i]['cat']];
//carta_header.appendChild(id_header);
header_share.appendChild(img_share);
carta_header.appendChild(header_share);
carta_body.appendChild(carta_titulo);
carta_body.appendChild(carta_contenido);
carta_body.appendChild(carta_categoria);
boton_id.appendChild(id_header);
boton_positivos.appendChild(img_boton_up);
boton_negativos.appendChild(img_boton_down);
boton_positivos.appendChild(carta_positivos);
boton_negativos.appendChild(carta_negativos);
carta_footer.appendChild(boton_id);
carta_footer.appendChild(boton_mostrar);
carta_footer.appendChild(boton_positivos);
carta_footer.appendChild(boton_negativos);
//carta_body.appendChild(CarousselOp());
var parent = document.getElementById("comment_deck");
parent.appendChild(carta_opinion);
carta_opinion.appendChild(carta_header);
carta_opinion.appendChild(carta_body);
carta_opinion.appendChild(carta_footer);

}

                  first = false;
             }

              for(var e = 0;e<r.length;e++)
             for(var x in r[e] )
             {
                    totalOp++;


             }


        if(r.length==0)
        {
          var body = document.getElementById('bodyAlert');
        if(body.children.length==0)
        {
            var alert = document.createElement('div');
            alert.className = "alert alert-success alert-dismissible fade show text-center";
            alert.setAttribute("role","alert");
            alert.setAttribute("id","alertSearchResult");
            alert.textContent = "No se encontraron Opiniones";
            body.appendChild(alert);
            window.setTimeout(function() {
                $("#alertSearchResult").fadeTo(500, 0).slideUp(500, function() {
                    $(this).remove();
                  });
                }, 2000);
        }
        }
        else {
            var body = document.getElementById('bodyAlert');
          if(body.children.length==0)
          {
              var alert = document.createElement('div');
              alert.className = "alert alert-success alert-dismissible fade show text-center";
              alert.setAttribute("role","alert");
              alert.setAttribute("id","alertSearchResult");
              alert.textContent = "Se encontraron: "+totalOp+" Opiniones";
              body.appendChild(alert);
              window.setTimeout(function() {
                  $("#alertSearchResult").fadeTo(500, 0).slideUp(500, function() {
                      $(this).remove();
                    });
                  }, 2000);
          }

        }

              var parent = document.getElementById("parentPag");
                          if(r.length>0 && parent.children.length<2)
                          {

                            var lif = document.createElement("li");
                            var af = document.createElement("a");
                            var span1f = document.createElement("span");
                            var span2f = document.createElement("span");
                            span1f.setAttribute("aria-hidden","true");
                            span2f.className = "sr-only";
                            af.textContent = "<<";
                            lif.setAttribute("class","page-item");
                            af.setAttribute("class","page-link");
                            af.setAttribute("id","back");
                            af.appendChild(span1f);
                            af.appendChild(span2f);
                            lif.appendChild(af);

                            var lil = document.createElement("li");
                            var al = document.createElement("a");
                            var span1l = document.createElement("span");
                            var span2l = document.createElement("span");
                            span1l.setAttribute("aria-hidden","true");
                            span2l.className = "sr-only";
                            al.textContent = ">>";
                            lil.setAttribute("class","page-item");
                            al.setAttribute("class","page-link");
                            al.setAttribute("id","next");
                            al.appendChild(span1l);
                            al.appendChild(span2l);
                            lil.appendChild(al);

                            parentPag.appendChild(lif);
                            parentPag.appendChild(lil);


                          }
                          else {
                            while (parent.firstChild) {
                                parent.removeChild(parent.lastChild);
                              }
                          }

                        $('#next').click(function()
                        {
                          if(aux>=r.length-1)
                           aux= r.length-1;
                           else {
                             aux++;
                           }

                                $('#comment_deck').empty();
                                for(var i in r[aux])
                                  {

           var cortarContenido = r[aux][i]['contenido'].slice(0,100);
           var cortarTitulo = r[aux][i]['titulo'].slice(0,17);
           var carta_opinion = document.createElement("div");
           var img_share = document.createElement("img");
           var img_boton_up = document.createElement("img");
           var img_boton_down = document.createElement("img");
             var img_header_type = document.createElement("img");
           var carta_header = document.createElement("div");
           var carta_body = document.createElement("div");
         //  var e_13 = document.createElement("div");
           var carta_footer = document.createElement("div");
           var carta_titulo = document.createElement("h5");
           var carta_contenido = document.createElement("p");
           var carta_categoria = document.createElement("p");
           var boton_mostrar = document.createElement("a");
           var boton_positivos = document.createElement("button");
           var boton_id = document.createElement("button");
           var carta_positivos = document.createElement("span");
           var boton_negativos = document.createElement("button");
           var carta_negativos = document.createElement("span");
           var id_header = document.createElement("a");
           var header_share = document.createElement("a");
           //carta_opinion.className = "card text-white bg-secondary border-primary  mb-3 mt-3 mr-2 ml-2";
           carta_opinion.style = "max-width: 18rem; min-width:16rem; ";
           carta_opinion.setAttribute("id",r[aux][i]['id']);
           id_header.setAttribute("unique-id",r[aux][i]['id']);
           id_header.setAttribute("href","/Opiniones/opinion.html#"+r[aux][i]['id']);
           id_header.setAttribute("target","_blank");
           id_header.setAttribute("data-toggle","tooltip");
           id_header.setAttribute("data-placement","top");
           id_header.setAttribute("title","Numero de opinion");
           header_share.className = "mr-2";
           header_share.setAttribute("href","opinion.html#"+r[aux][i]['id']);
           header_share.setAttribute("data-toggle","tooltip");
           header_share.setAttribute("data-placement","top");
           header_share.setAttribute("title","Comparte!");
           img_share.src = "img/share.png";
           img_boton_up.src = "img/upvote.png";
           img_boton_down.src = "img/downvote.png";
           img_share.setAttribute("alt","compartir");
         //  e_2.className ="card-img-top ";
         //  e_2.style = "max-width: 10rem; min-width:5rem;";
           carta_body.className = "card-body";
           carta_titulo.className = "card-title";
           carta_contenido.className = "card-text";
           carta_categoria.className = "card-text";
           boton_mostrar.className = "btn btn-primary btn-sm mt-2";
           boton_id.className = "btn btn-info btn-sm mt-2 mr-2";
           id_header.className = "badge badge-info ";
           carta_header.className = "card-header d-flex justify-content-between";
           carta_footer.className = "card-footer d-flex justify-content-end";
           img_boton_up.className = "imagen";
           img_boton_down.className = "imagen";
           id_header.textContent = "#"+r[aux][i]['id'];
           boton_mostrar.textContent = "Modificar ";
           boton_mostrar.setAttribute("id","clickOP");
           boton_mostrar.setAttribute ("type", "button");
           boton_mostrar.setAttribute ("data-toggle", "modal");
           boton_mostrar.setAttribute ("data-target", "#ModifyCommentModal");
           boton_mostrar.setAttribute ("onclick", "test_1('"+r[aux][i]['id']+"','"+r[aux][i]['titulo']+"','"+r[aux][i]['contenido']+"','"+r[aux][i]['video']+"','"+r[aux][i]['img']+"','"+r[aux][i]['img1']+"','"+r[aux][i]['img2']+"','"+r[aux][i]['img_desc']+"','"+r[aux][i]['img_desc1']+"','"+r[aux][i]['img_desc2']+"','"+r[aux][i]['cat']+"')");
           boton_negativos.setAttribute ("class","btn btn-primary btn-sm ml-2 mt-2");
           boton_positivos.setAttribute ("disabled", "true");
           boton_negativos.setAttribute ("disabled", "true");
           carta_negativos.setAttribute ("class","badge badge-light ml-1");
           boton_positivos.setAttribute ("class","btn btn-primary btn-sm ml-1 mt-2");
           carta_positivos.setAttribute ("class","badge badge-light ml-1");
           //boton_positivos.textContent = "+";
           carta_positivos.textContent = r[aux][i]['positivos'];
         //  boton_negativos.textContent = "-";
           carta_negativos.textContent = r[aux][i]['negativos'];
           GetHeaderAndButtonTheme(r[aux][i]['id_header'],r[aux][i]['id_button'],carta_header,boton_mostrar);

           img_header_type.className = "header_type";
           if(r[aux][i]['negativos']>0 &&  r[aux][i]['positivos']<r[aux][i]['negativos'])
           {
               img_header_type.src = "img/contro_op.png";
                 carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-contro";

           }

           else if(r[aux][i]['positivos']>0 && r[aux][i]['negativos']<r[aux][i]['positivos'])
           {
                 img_header_type.src = "img/con_op.png";
                   carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-conso";

           }

           else if(r[aux][i]['positivos']==0 && r[aux][i]['negativos']==0)
           {
               img_header_type.src = "img/new_op.png";
                 carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-new";

           }
           var cats = ["","Productos","Servicios","Politica","Sociedad","Medio ambiente","Interes general"];

         //  e_2.alt = "Card Image Cap";
       //    e_2.src = '/Opiniones/img/thr.jpg';
        carta_header.appendChild(img_header_type);
           carta_titulo.textContent = cortarTitulo;
           carta_contenido.textContent = cortarContenido;
           carta_categoria.textContent = "Categoria: "+ cats[ r[aux][i]['cat']];
           //carta_header.appendChild(id_header);
           header_share.appendChild(img_share);
           carta_header.appendChild(header_share);
           carta_body.appendChild(carta_titulo);
           carta_body.appendChild(carta_contenido);
           carta_body.appendChild(carta_categoria);
           boton_id.appendChild(id_header);
           boton_positivos.appendChild(img_boton_up);
           boton_negativos.appendChild(img_boton_down);
           boton_positivos.appendChild(carta_positivos);
           boton_negativos.appendChild(carta_negativos);
           carta_footer.appendChild(boton_id);
           carta_footer.appendChild(boton_mostrar);
           carta_footer.appendChild(boton_positivos);
           carta_footer.appendChild(boton_negativos);
      //carta_body.appendChild(CarousselOp());
           var parent = document.getElementById("comment_deck");
               parent.appendChild(carta_opinion);
             carta_opinion.appendChild(carta_header);
             carta_opinion.appendChild(carta_body);
             carta_opinion.appendChild(carta_footer);

         }






                        });
                        $('#back').click(function()
                        {
                          if(aux>=0)
                              aux=0;
                                else {
                                  aux--;
                                  }

                                $('#comment_deck').empty();
                          for(var i in r[aux])
                            {

     var cortarContenido = r[aux][i]['contenido'].slice(0,100);
     var cortarTitulo = r[aux][i]['titulo'].slice(0,17);
     var carta_opinion = document.createElement("div");
     var img_share = document.createElement("img");
     var img_boton_up = document.createElement("img");
     var img_boton_down = document.createElement("img");
       var img_header_type = document.createElement("img");
     var carta_header = document.createElement("div");
     var carta_body = document.createElement("div");
   //  var e_13 = document.createElement("div");
     var carta_footer = document.createElement("div");
     var carta_titulo = document.createElement("h5");
     var carta_contenido = document.createElement("p");
     var carta_categoria = document.createElement("p");
     var boton_mostrar = document.createElement("a");
     var boton_positivos = document.createElement("button");
     var boton_id = document.createElement("button");
     var carta_positivos = document.createElement("span");
     var boton_negativos = document.createElement("button");
     var carta_negativos = document.createElement("span");
     var id_header = document.createElement("a");
     var header_share = document.createElement("a");
     //carta_opinion.className = "card text-white bg-secondary border-primary  mb-3 mt-3 mr-2 ml-2";
     carta_opinion.style = "max-width: 18rem; min-width:16rem; ";
     carta_opinion.setAttribute("id",r[aux][i]['id']);
     id_header.setAttribute("unique-id",r[aux][i]['id']);
     id_header.setAttribute("href","#"+r[aux][i]['id']);
     id_header.setAttribute("target","_blank");
     id_header.setAttribute("data-toggle","tooltip");
     id_header.setAttribute("data-placement","top");
     id_header.setAttribute("title","Numero de opinion");
     header_share.className = "mr-2";
     header_share.setAttribute("href","/Opiniones/opinion.html#"+r[aux][i]['id']);
     header_share.setAttribute("data-toggle","tooltip");
     header_share.setAttribute("data-placement","top");
     header_share.setAttribute("title","Comparte!");
     img_share.src = "img/share.png";
     img_boton_up.src = "img/upvote.png";
     img_boton_down.src = "img/downvote.png";
     img_share.setAttribute("alt","compartir");
   //  e_2.className ="card-img-top ";
   //  e_2.style = "max-width: 10rem; min-width:5rem;";
     carta_body.className = "card-body";
     carta_titulo.className = "card-title";
     carta_contenido.className = "card-text";
     carta_categoria.className = "card-text";
     boton_mostrar.className = "btn btn-primary btn-sm mt-2";
     boton_id.className = "btn btn-info btn-sm mt-2 mr-2";
     id_header.className = "badge badge-info ";
     carta_header.className = "card-header d-flex justify-content-between";
     carta_footer.className = "card-footer d-flex justify-content-end";
     img_boton_up.className = "imagen";
     img_boton_down.className = "imagen";
     id_header.textContent = "#"+r[aux][i]['id'];
     boton_mostrar.textContent = "Modificar ";
     boton_mostrar.setAttribute("id","clickOP");
     boton_mostrar.setAttribute ("type", "button");
     boton_mostrar.setAttribute ("data-toggle", "modal");
     boton_mostrar.setAttribute ("data-target", "#ModifyCommentModal");
     boton_mostrar.setAttribute ("onclick", "test_1('"+r[aux][i]['id']+"','"+r[aux][i]['titulo']+"','"+r[aux][i]['contenido']+"','"+r[aux][i]['video']+"','"+r[aux][i]['img']+"','"+r[aux][i]['img1']+"','"+r[aux][i]['img2']+"','"+r[aux][i]['img_desc']+"','"+r[aux][i]['img_desc1']+"','"+r[aux][i]['img_desc2']+"','"+r[aux][i]['cat']+"')");
     boton_negativos.setAttribute ("class","btn btn-primary btn-sm ml-2 mt-2");
     boton_positivos.setAttribute ("disabled", "true");
     boton_negativos.setAttribute ("disabled", "true");
     carta_negativos.setAttribute ("class","badge badge-light ml-1");
     boton_positivos.setAttribute ("class","btn btn-primary btn-sm ml-1 mt-2");
     carta_positivos.setAttribute ("class","badge badge-light ml-1");
     //boton_positivos.textContent = "+";
     carta_positivos.textContent = r[aux][i]['positivos'];
   //  boton_negativos.textContent = "-";
     carta_negativos.textContent = r[aux][i]['negativos'];
     GetHeaderAndButtonTheme(r[aux][i]['id_header'],r[aux][i]['id_button'],carta_header,boton_mostrar);

     img_header_type.className = "header_type";
     if(r[aux][i]['negativos']>0 &&  r[aux][i]['positivos']<r[aux][i]['negativos'])
     {
         img_header_type.src = "img/contro_op.png";
           carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-contro";

     }

     else if(r[aux][i]['positivos']>0 && r[aux][i]['negativos']<r[aux][i]['positivos'])
     {
           img_header_type.src = "img/con_op.png";
             carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-conso";

     }

     else if(r[aux][i]['positivos']==0 && r[aux][i]['negativos']==0)
     {
         img_header_type.src = "img/new_op.png";
           carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-new";

     }
     var cats = ["","Productos","Servicios","Politica","Sociedad","Medio ambiente","Interes general"];

   //  e_2.alt = "Card Image Cap";
 //    e_2.src = '/Opiniones/img/thr.jpg';
  carta_header.appendChild(img_header_type);
     carta_titulo.textContent = cortarTitulo;
     carta_contenido.textContent = cortarContenido;
     carta_categoria.textContent = "Categoria: "+ cats[ r[aux][i]['cat']];
     //carta_header.appendChild(id_header);
     header_share.appendChild(img_share);
     carta_header.appendChild(header_share);
     carta_body.appendChild(carta_titulo);
     carta_body.appendChild(carta_contenido);
     carta_body.appendChild(carta_categoria);
     boton_id.appendChild(id_header);
     boton_positivos.appendChild(img_boton_up);
     boton_negativos.appendChild(img_boton_down);
     boton_positivos.appendChild(carta_positivos);
     boton_negativos.appendChild(carta_negativos);
     carta_footer.appendChild(boton_id);
     carta_footer.appendChild(boton_mostrar);
     carta_footer.appendChild(boton_positivos);
     carta_footer.appendChild(boton_negativos);
//carta_body.appendChild(CarousselOp());
     var parent = document.getElementById("comment_deck");
         parent.appendChild(carta_opinion);
       carta_opinion.appendChild(carta_header);
       carta_opinion.appendChild(carta_body);
       carta_opinion.appendChild(carta_footer);

   }





                        });




   },


 });


}


  $(document).ready(function()
  {
        ModifyComentario();

      $("#alertOpSuccess").css("visibility","hidden");


      $('#submitRequest').click(function()
      {
        $("#comment_deck").empty();
        var cat = $('#inputGroupSelect01').val();

        AjaxOpinion('/php/getOpById.php',cat);

      });

      $('#cerrarComentario').click(function()
      {

            $('#submitcomment').removeAttr("disabled","true");


      });




  });
