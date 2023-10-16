function AjaxSendRatio(id_opinion,down,up)
{
      $.ajax({
        type: 'POST',
        url: '/php/setRatioOpinionesBackEnd.php',
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

function AjaxDatosVotos(id_opinion,down,up)
{

      $.ajax(
        {
          type: 'POST',
          url: '/php/votesByUserBackEnd.php',
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
      url: '/php/getCommentByHashBackEnd.php',
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


              share.setAttribute("onclick","Share('"+x['id']+"','"+x['titulo']+")");
                carta_negativos.setAttribute ("class","badge badge-light ml-1");
                  carta_positivos.setAttribute ("class","badge badge-light ml-1");
              carta_positivos.textContent = x['positivos'];
            //  boton_negativos.textContent = "-";
              carta_negativos.textContent = x['negativos'];



              Share(x['id'],x['titulo'],x['contenido']);

          document.getElementById('OpTitle').innerHTML = x['titulo'];
            document.getElementById('contenido').innerHTML = x['contenido'];

              document.getElementById('buttonLikeUp').appendChild(img_boton_up);
                document.getElementById('buttonLikeUp').appendChild(carta_positivos);

              document.getElementById('buttonLikeDown').appendChild(img_boton_down);
                document.getElementById('buttonLikeDown').appendChild(carta_negativos);
            //  document.getElementById('primary_id').innerHTML = x['id'];

                  if(x['video']!="")
                document.getElementById('OpVideo').src = "https://www.youtube.com/embed/"+x['video'];
                    else  {
                    document.getElementById("divVideo").style.display = "none";
                    }

            //        if(x['img']!=null)
              //            document.getElementById('OpImg').src = ""+x['img'];
                //          else {
                  //            document.getElementById("OpImg").style.display = "none";
                    //      }

                    CreateCaro(x['img'],x['img1'],x['img2'],x['img_desc'],x['img_desc1'],x['img_desc2']);

                      user = document.getElementById("user").innerHTML;
                        if(user=="Ingresar")
                        {
                          document.getElementById('buttonLikeUp').setAttribute("disabled","true");
                            document.getElementById('buttonLikeDown').setAttribute("disabled","true");
                        }



                            var url_yt = "https://www.youtube.com/c/"+x['youtube'];

                            var url_fb = "https://www.facebook.com/"+x['facebook'];

                            var url_tw = "https://twitter.com/"+x['twitter'];

                            var url_insta = "https://www.instagram.com/"+x['instagram'];

                            document.getElementById('yt_user').setAttribute("href",url_yt);
                              document.getElementById('fb_user').setAttribute("href",url_fb);
                                document.getElementById('tw_user').setAttribute("href",url_tw);
                                  document.getElementById('insta_user').setAttribute("href",url_insta);
                                  document.getElementById('yt_user').setAttribute("target","_blank");
                                    document.getElementById('fb_user').setAttribute("target","_blank");
                                      document.getElementById('tw_user').setAttribute("target","_blank");
                                        document.getElementById('insta_user').setAttribute("target","_blank");
                                  document.getElementById('button_user_opinion').innerHTML = "Creado por: "+x['nombre'];
                                  console.log(x['nombre']);




      },

    });

}


$(document).ready(function()
{

    //  alert(location.hash);



      var hash = location.hash;
        document.title = "Opinion"+hash;

      hash = hash.replace('#','');

          AjaxIni(hash);


        SetRatio(hash);



});
