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

function AjaxSendRatio(id_opinion,down,up)
{
      $.ajax({
        type: 'POST',
        url: '/php/setRatioOpiniones.php',
        data: {id_opinion,down,up},
        dataType : "json",
        success:function(r)
        {

        },
        error: function(x)
        {
        },

      });



}

function CreateCaro(img,img1,img2,img_desc,img_desc1,img_desc2)
{
        var caro,ol,li,li1,li2,div_inner,div_item_active,div_item1,div_item2,img_sr,img_sr1,img_sr2;

        var div_cap,div_cap1,div_cap2,p,p1,p2,a_control_prev,a_control_next,span_icon_prev,span_icon_next,span_previus,span_next;

          if(img!="" || img1!="" || img2!="" )
          {
            parentCaro = document.getElementById('parentCaro');
              //contenedor caroussel
             caro = document.createElement("div");

            caro.setAttribute("id","caro");
            caro.className = "carousel slide";
            caro.setAttribute("data-ride","carousel");
              //lista ordenada para las img
             ol = document.createElement("ol");
            ol.className = "carousel-indicators";
            //div contenedor imgs
            div_inner = document.createElement("div");
            div_inner.className = "carousel-inner";
            caro.appendChild(ol);
            caro.appendChild(div_inner);
            a_control_prev = document.createElement("a");
            a_control_prev.className = "carousel-control-prev";
            a_control_prev.setAttribute("href","#caro");
            a_control_prev.setAttribute("role","button");
            a_control_prev.setAttribute("data-slide","prev");

            span_icon_prev = document.createElement("span");
            span_icon_prev.className = "carousel-control-prev-icon";
            span_icon_prev.setAttribute("aria-hidden","true");

            span_icon_next = document.createElement("span");
            span_icon_next.className = "carousel-control-next-icon";
            span_icon_next.setAttribute("aria-hidden","true");

            span_previus = document.createElement("span");
            span_previus.className = "sr-only";
            span_previus.textContent = "Atras";
            span_next = document.createElement("span");
            span_next.className = "sr-only";
            span_next.textContent = "Adelante";
            span_icon_next.appendChild(span_next);
            span_icon_prev.appendChild(span_previus);

            a_control_next = document.createElement("a");
            a_control_next.className = "carousel-control-next";
            a_control_next.setAttribute("href","#caro");
            a_control_next.setAttribute("role","button");
            a_control_next.setAttribute("data-slide","next");

            a_control_next.appendChild(span_icon_next);
            a_control_prev.appendChild(span_icon_prev);

                  if(img!="")
                  {
                     li = document.createElement("li");
                    li.setAttribute("data-target","#caro");
                    li.setAttribute("data-slide","0");
                    li.setAttribute("class","active");
                    div_item_active = document.createElement("div");
                    img_sr = document.createElement("img");
                    div_cap = document.createElement("div");
                    div_item_active.className = "carousel-item active";
                    p = document.createElement("p");
                    p.className = "text-black-50 ";

                    p.textContent = img_desc;
                    img_sr.className = "d-block w-100";
                    img_sr.alt = "img";
                    div_cap.className = "carousel-caption d-none d-md-block";
                    img_sr.src = img;

                    div_cap.appendChild(p);
                    ol.appendChild(li);
                    div_item_active.appendChild(img_sr);
                    div_item_active.appendChild(div_cap);
                    div_inner.appendChild(div_item_active);



                  }
                    if(img1!="")
                    {
                      li1 = document.createElement("li");
                     li1.setAttribute("data-target","#caro");
                     li1.setAttribute("data-slide","1");
                     div_item1 = document.createElement("div");
                     img_sr1 = document.createElement("img");
                     div_cap1 = document.createElement("div");
                     div_item1.className = "carousel-item";
                     p = document.createElement("p");
                     p.className = "text-black-50";
                     p.textContent = img_desc1;
                     img_sr1.className = "d-block w-100";
                     img_sr1.alt = "img";
                     div_cap1.className = "carousel-caption d-none d-md-block";
                     img_sr1.src = img1;

                     div_cap1.appendChild(p);
                     ol.appendChild(li1);
                     div_item1.appendChild(img_sr1);
                     div_item1.appendChild(div_cap1);
                     div_inner.appendChild(div_item1);

                    }
                        if(img2!="")
                        {
                         li2 = document.createElement("li");
                         li2.setAttribute("data-target","#caro");
                         li2.setAttribute("data-slide","1");
                         div_item2 = document.createElement("div");
                         img_sr2 = document.createElement("img");
                         div_cap2 = document.createElement("div");
                         div_item2.className = "carousel-item";
                         p = document.createElement("p");
                         p.className = "text-black-50";
                         p.textContent = img_desc2;
                         img_sr2.className = "d-block w-100";
                         img_sr2.alt = "img";
                         div_cap2.className = "carousel-caption d-none d-md-block";
                         img_sr2.src = img2;

                         div_cap2.appendChild(p);
                         ol.appendChild(li2);
                         div_item2.appendChild(img_sr2);
                         div_item2.appendChild(div_cap2);
                         div_inner.appendChild(div_item2);

                        }

                        caro.appendChild(a_control_prev);
                        caro.appendChild(a_control_next);
                        parentCaro.appendChild(caro);

          }














}
function Comments(hash)
{

        var not_logued = $('#user').attr('not_logued');

        $('#send_comment').click(function()
        {
            var id = "alert_null_user";

            if(not_logued)
            {

              var string = "Para comenter debes estar registrado.";
              Alert(id,string);

            }

            var contenido = $('#contenido_comment').val();


              if(contenido.length!=0 && !not_logued)
          $.ajax({
            type: 'POST',
            url: '/php/createComment.php',
            data:{contenido,hash},
            dataType: 'json',
            success: function(x)
            {
                    if(x)
                    {

                          var id = "alert_null_user";
                          var string = "Comentario enviado!.";
                          Alert(id,string);

                          window.setTimeout(function() {
                                  location.reload();
                              }, 2000);

                    }



            },
            error: function (r)
            {

              var id = "alert_null_user";
              var string = "No se puedo enviar el comentario";
              Alert(id,string);
            },





          });



        });







}

function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}

function GetComments(hash)
{
      var aux=0;
  var first = true;




          $.ajax({
              type: 'GET',
              url: '/php/getComments.php',
              data:{hash},
              dataType: 'json',
              success: function(x)
              {





                 //total de comments encontradas
              var totalComments = 0;
              var totalPages = x.length;
               aux = clamp(aux,0,x.length);

               for(var e = 0;e<x.length;e++)
              for(var i in x[e] )
              {
                     totalComments++;


              }




                  $('#total_comments').text("Comentarios Totales: "+totalComments);

                        var parent = document.getElementById('comment_box');

                        if(first)
                        {
                           for(var r in x[0])
                           {
                             var img = document.createElement('img');
                             var div = document.createElement('div');
                             var a = document.createElement('a');
                             var div2 = document.createElement('div');
                             var a1 = document.createElement('a');
                             var button = document.createElement('button');
                             var span_cant_likes = document.createElement('span');
                             var small2 = document.createElement('small');
                             var p = document.createElement('p');

                             img.src = "/img/okay.png";
                             div.className = "list-group list-group-mine mb-1";
                             a.className = "list-group-item list-group-item-action";
                             div2.className = "d-flex w-100 justify-content-between";
                             a1.className = "mb-1 text-white";
                             button.className = "btn btn-outline-info btn-sm";
                             button.setAttribute("id",x[0][r].id);
                             button.appendChild(img);
                             span_cant_likes.className = "badge bg-info text-dark";
                             p.className = "p-1 text-white";


                             a1.textContent = x[0][r].usuario;
                             a1.setAttribute("href","http://opiniones.ar/user.html#"+x[0][r].usuario);
                             small2.textContent = x[0][r].fecha_de_creacion;
                             p.textContent = x[0][r].contenido;
                             span_cant_likes.textContent =   x[0][r].up;


                             div2.appendChild(a1);
                             div2.appendChild(small2);
                             button.appendChild(span_cant_likes);
                             div2.appendChild(button);
                             a.appendChild(div2);
                             a.appendChild(p);
                             div.appendChild(a);
                             parent.appendChild(div);




                           }
                           first = false;
                        }

                        var parentPag = document.getElementById("parentPag");
                                    if(x.length>0 && parentPag.children.length==0)
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
                                      if (parentPag.hasChildNodes()) {
                                          parentPag.removeChild(parentPag.firstChild);
                                        }
                                    }


                                    $('#next').click(function()
                                    {
                                      if(aux>=x.length-1)
                                      {
                                        aux = x.length-1;
                                          $('#actual_page_comments').text("Pagina Actual: "+aux);
                                      }

                                       else {
                                         aux++;
                                           $('#actual_page_comments').text("Pagina Actual: "+aux);
                                       }

                                       $('#comment_box').empty();
                                       for(var i in x[aux])
                                         {
                                          var img = document.createElement('img');
                                          var div = document.createElement('div');
                                          var a = document.createElement('a');
                                          var div2 = document.createElement('div');
                                          var a1 = document.createElement('a');
                                          var button = document.createElement('button');
                                          var span_cant_likes = document.createElement('span');
                                          var small2 = document.createElement('small');
                                          var p = document.createElement('p');

                                          img.src = "/img/okay.png";
                                          div.className = "list-group list-group-mine  mb-1 ";
                                          a.className = "list-group-item list-group-item-action";
                                          div2.className = "d-flex w-100 justify-content-between";
                                          a1.className = "mb-1 text-white";
                                          p.className = "p-1 text-white";
                                          span_cant_likes.className = "badge bg-info text-dark";
                                          button.className = "btn btn-outline-info btn-sm";
                                          button.setAttribute("id",x[aux][i].id);
                                          button.appendChild(img);


                                           a1.textContent = x[aux][i].usuario;
                                           a1.setAttribute("href","https://opiniones.ar/user.html#"+x[aux][i].usuario);
                                           small2.textContent = x[aux][i].fecha_de_creacion;
                                           p.textContent = x[aux][i].contenido;
                                           span_cant_likes.textContent =   x[aux][i].up;

                                            div2.appendChild(a1);
                                            div2.appendChild(small2);
                                            button.appendChild(span_cant_likes);
                                            div2.appendChild(button);
                                            a.appendChild(div2);
                                            a.appendChild(p);
                                            div.appendChild(a);
                                            parent.appendChild(div);

                                         }

                                    });

                                    $('#back').click(function()
                                    {
                                      if(aux>0)
                                      {
                                        aux = aux-1;
                                        aux = clamp(aux,0,x.length);
                                          $('#actual_page_comments').text("Pagina Actual: "+aux);
                                      }

                                        else  {
                                          aux--;
                                          aux = clamp(aux,0,x.length);
                                            $('#actual_page_comments').text("Pagina Actual: "+aux);
                                          }

                                       $('#comment_box').empty();

                                       for(var i in x[aux])
                                         {
                                           var img = document.createElement('img');
                                           var div = document.createElement('div');
                                           var a = document.createElement('a');
                                           var div2 = document.createElement('div');
                                           var button = document.createElement('button');
                                           var span_cant_likes = document.createElement('span');
                                           var a1 = document.createElement('a');
                                           var small2 = document.createElement('small');
                                           var p = document.createElement('p');

                                           img.src = "/img/okay.png";
                                           div.className = "list-group list-group-mine  mb-1 ";
                                           a.className = "list-group-item list-group-item-action";
                                           div2.className = "d-flex w-100 justify-content-between";
                                           a1.className = "mb-1 text-white";
                                           p.className = "p-1 text-white";
                                           span_cant_likes.className = "badge bg-info text-dark ";
                                           button.className = "btn btn-outline-info btn-sm";
                                           button.setAttribute("id",x[aux][i].id);
                                           button.appendChild(img);


                                           a1.textContent = x[aux][i].usuario;
                                           a1.setAttribute("href","https://opiniones.ar/user.html#"+x[aux][i].usuario);
                                           small2.textContent = x[aux][i].fecha_de_creacion;
                                           p.textContent = x[aux][i].contenido;
                                           span_cant_likes.textContent =  x[aux][i].up;

                                           div2.appendChild(a1);
                                           div2.appendChild(small2);
                                           button.appendChild(span_cant_likes);
                                           div2.appendChild(button);
                                           a.appendChild(div2);
                                           a.appendChild(p);
                                           div.appendChild(a);
                                           parent.appendChild(div);

                                         }

                                    });





              },
              error: function(e)
              {

              },






          });




}


function AjaxDatosVotos(id_opinion,down,up)
{

      $.ajax(
        {
          type: 'POST',
          url: '/php/votesByUser.php',
          data:{id_opinion,down,up},
          datatype:'json',
          success: function(r)
          {
            if(r==1)
            {
                AjaxSendRatio(id_opinion,down,up);
                document.getElementById('buttonLikeUp').setAttribute("disabled","true");
                  document.getElementById('buttonLikeDown').setAttribute("disabled","true");
            }

            if(r==0)
            {
              document.getElementById('buttonLikeUp').setAttribute("disabled","true");
                document.getElementById('buttonLikeDown').setAttribute("disabled","true");
            }



          },




      });



}

function SetRatio(hash)
{


      var trigger = $("body").find('[id="buttonLikeUp"]');
      var trigger2 = $("body").find('[id="buttonLikeDown"]');


      trigger.click(function(e)
      {
            e.preventDefault();
            var up = 1;
            var down = 0;
            AjaxDatosVotos(hash,down,up);


      });
      trigger2.click(function(q)
      {
            q.preventDefault();
            var up = 0;
            var down = 1;
            AjaxDatosVotos(hash,down,up);



      });


}

function Share(id,titulo)
{



            $('#clipboard').val("www.opiniones.ar/opinion.html#"+id);

            var titulo_encode = titulo.replace(/ /g,"+");
          //  var contenido_encode = contenido.replace(/ /g,"+");
            var href_tw = "https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.opiniones.ar/opinion.html%23"+id+"/&text="+titulo_encode+"&hashtags=Op";
            var href_fb = "https://www.facebook.com/sharer.php?u=https%3A%2F%2Fwww.opiniones.ar/opinion.html%23"+id;
            var href_linkedin = "https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fwww.css-tricks.com%2F&title=CSS-Tricks&summary=Tips%2C+Tricks%2C+and+Techniques+on+using+Cascading+Style+Sheets.&source=CSS-Tricks";
            var href_reddit = "https://www.reddit.com/r/test/submit?title="+titulo+"&text=opiniones.ar/opinion.html%23"+id;
            var href_tumblr = "http://tumblr.com/widgets/share/tool?canonicalUrl=http%3A%2F%2Fopiniones.ar%2Fopinion.html%23"+id;
            var tw = document.getElementById("tw_share");
            var fb = document.getElementById("fb_share");
            var linkedin = document.getElementById("linkedin_share");
            var reddit = document.getElementById('reddit_share');
            var tumblr = document.getElementById('tumblr_share');
            linkedin.setAttribute("href",href_linkedin);
            linkedin.setAttribute("target","_blank");

            tw.setAttribute("href",href_tw);
            tw.setAttribute("target","_blank");

            fb.setAttribute("href",href_fb);
            fb.setAttribute("target","_blank");

            reddit.setAttribute("href",href_reddit);
            reddit.setAttribute("target","_blank");

            tumblr.setAttribute("href",href_tumblr);
            tumblr.setAttribute("target","_blank");


            $('#share_user').click(function()
            {
              /* Get the text field */
                var copyText = document.getElementById("clipboard");

             /* Select the text field */
                copyText.select();
                copyText.setSelectionRange(0, 99999); /*For mobile devices*/

             /* Copy the text inside the text field */
                  document.execCommand("copy");

              /* Alert the copied text */
              var body = document.getElementById('linkAlert');
              if(body.children.length==0)
              {
                  var alert = document.createElement('div');
                  alert.className = "alert alert-success alert-dismissible fade show text-center mt-2";
                  alert.setAttribute("role","alert");
                  alert.setAttribute("id","alertLinkResult");
                  alert.textContent = "Enlace Copiado";
                  body.appendChild(alert);
                  window.setTimeout(function() {
                      $("#alertLinkResult").fadeTo(500, 0).slideUp(500, function() {
                          $(this).remove();
                        });
                      }, 2000);
              }

            });





}

function AjaxIni(hash)
{
  $.ajax(
    {

      type:'POST',
      url: '/php/getOpByHash.php',
      data: {hash},
      dataType: 'json',
      success: function(x)
      {
            var img_boton_down = document.createElement("img");
              var img_boton_up = document.createElement("img");
                var carta_positivos = document.createElement("span");
                  var carta_negativos = document.createElement("span");
                    var share = document.getElementById('share');

              img_boton_up.src = "img/upvote.png";
                img_boton_down.src = "img/downvote.png";
                  img_boton_up.className = "imagen";
                    img_boton_down.className = "imagen";

                    var content_meta = "#"+x['id']+","+x['titulo']+","+x['contenido'].slice(0,147);

                    $('#meta_opinion').attr('content',content_meta);


              share.setAttribute("onclick","Share('"+x['id']+"','"+x['titulo']+")");
                carta_negativos.setAttribute ("class","badge badge-light ml-1");
                  carta_positivos.setAttribute ("class","badge badge-light ml-1");
              carta_positivos.textContent = x['positivos'];
            //  boton_negativos.textContent = "-";
              carta_negativos.textContent = x['negativos'];

                Comments(hash);

              Share(x['id'],x['titulo'],x['contenido']);

          document.getElementById('OpTitle').innerHTML = x['titulo'];
            document.getElementById('contenido').innerHTML = x['contenido'];

              document.getElementById('buttonLikeUp').appendChild(img_boton_up);
                document.getElementById('buttonLikeUp').appendChild(carta_positivos);

              document.getElementById('buttonLikeDown').appendChild(img_boton_down);
                document.getElementById('buttonLikeDown').appendChild(carta_negativos);
            //  document.getElementById('primary_id').innerHTML = x['id'];

                  if(x['video']!="")
                document.getElementById('OpVideo').src = x['video'];
                    else  {
                    document.getElementById("divVideo").style.display = "none";
                    }

                   if(x['img']!=null)
                          document.getElementById('OpImg').src = ""+x['img'];
                          else {
                              document.getElementById("OpImg").style.display = "none";
                          }

                    CreateCaro(x['img'],x['img1'],x['img2'],x['img_desc'],x['img_desc1'],x['img_desc2']);

                      user = document.getElementById("user").innerHTML;
                        if(user=="Ingresar")
                        {
                          document.getElementById('buttonLikeUp').setAttribute("disabled","true");
                            document.getElementById('buttonLikeDown').setAttribute("disabled","true");
                        }





                                        document.getElementById('button_user_opinion').innerHTML = "Creado por: "+x['nombre'];

                                                  UserHash(x['nombre']);



      },

    });

}
function UserHash(name)
{

  $('#button_user_opinion').click(function()
  {

            var userHash = "https://opiniones.ar/user.html#"+name;

            window.location = userHash;



  });




}
function RegUpComments(id_comment,hash)
{

        $.ajax({
            type: 'POST',
            url: '/php/regUpComments.php',
            data:{id_comment,hash},
            dataType: 'json',
            success: function(x)
            {

            },
            error: function (e)
            {

            },




        });



}

$(document).ready(function()
{

    //  alert(location.hash);



      var hash = location.hash;
        document.title = "Opinion"+hash;

      hash = hash.replace('#','');

        GetComments(hash);

          AjaxIni(hash);


        SetRatio(hash);

        var win = $(this);
        if (win.width() <=600) {

          $('#1').addClass('d-flex flex-column');

          $('#buttonLikeUp').addClass('btn-sm');

          $('#buttonLikeDown').addClass('btn-sm');

          $('#buttonMainPage').addClass('btn-sm');

          $('#2').addClass('d-flex flex-column');

        } else {
          $('#1').removeClass('d-flex flex-column');
          $('#2').removeClass('d-flex flex-column');
            $('#buttonLikeUp').removeClass('btn-sm');
              $('#buttonLikeDown').removeClass('btn-sm');
                $('#buttonMainPage').removeClass('btn-sm');
        }

        $('#comment_box').on('click','button', function() {

            var id_comment = $(this).attr('id');
            RegUpComments(id_comment,hash);

      });


});
