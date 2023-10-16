
function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}

function test_1(id)
{

        window.open("/opinion.html#"+id);

}

function Share(id,titulo)
{


            $('#clipboard').val("www.opiniones.ar/opinion.html#"+id);

            var titulo_encode = titulo.replace(/ /g,"+");
            //var contenido_encode = contenido.replace(/ /g,"+");

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
            linkedin.setAttribute("target",href_linkedin);

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


 function AjaxOpinion(url)
{
  //'/Opiniones/php/getCommentBackEnd.php'

  $.ajax({
    type: 'GET',
    url: url,
    data: {index},
    dataType : 'json',
    success: function(r)
    {


        for(var i in r)
        {

          var cortarContenido = r[i]['contenido'].slice(0,147)+"...";
          var cortarTitulo = r[i]['titulo'].slice(0,17);
          var carta_opinion = document.createElement("div");
          var img_share = document.createElement("img");
          var img_boton_up = document.createElement("img");
          var img_boton_down = document.createElement("img");
          var img_header_type = document.createElement("img");
          var carta_header = document.createElement("div");
          var carta_body = document.createElement("div");
          //var img_header = document.createElement("img");
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

          carta_opinion.style = "max-width: 20rem; min-width:20rem; ";
          carta_opinion.setAttribute("id",r[i]['id']);
          id_header.setAttribute("unique-id",r[i]['id']);
          id_header.setAttribute("href","#"+r[i]['id']);
          id_header.setAttribute("target","_blank");
          id_header.setAttribute("data-toggle","tooltip");
          id_header.setAttribute("data-placement","top");
          id_header.setAttribute("title","Numero de opinion");
          id_header.setAttribute("type","button");
          header_share.className = "mr-2";
        //  header_share.setAttribute("href","opinion.html#"+r[i]['id']);
          header_share.setAttribute("data-toggle","modal");
          header_share.setAttribute("data-target","#modalShare");
          header_share.setAttribute("onclick","Share('"+r[i]['id']+"','"+r[i]['titulo']+"','"+r[i]['contenido']+"')");
          header_share.setAttribute("title","Comparte!");
          img_share.src = "img/share.png";
          img_boton_up.src = "img/upvote.png";
          img_boton_down.src = "img/downvote.png";
          img_share.setAttribute("alt","compartir");
        //  e_2.className ="card-img-top ";
        //  e_2.style = "max-width: 10rem; min-width:5rem;";
          GetHeaderAndButtonTheme(r[i]['id_header'],r[i]['id_button'],carta_header,boton_mostrar);
         //carta_header.style.backgroundImage =  "url('"+datos_tema.link_header+"')";


          carta_header.style.backgroundPosition = "center top";
          carta_header.style.backgroundSize = "100%";
          carta_header.style.backgroundRepeat  = "no-repeat";
          carta_body.className = "card-body box";
          carta_titulo.className = "card-title";
          carta_contenido.className = "card-text";
          carta_categoria.className = "card-text";
          boton_mostrar.className = "btn btn-primary btn-sm mt-2";
          boton_id.className = "btn btn-info btn-sm mt-2 mr-2";
          id_header.className = "badge badge-info";
          carta_header.className = "card-header d-flex justify-content-between";
          carta_footer.className = "card-footer d-flex justify-content-end";
          id_header.textContent = "#"+r[i]['id'];
          boton_mostrar.textContent = "Ver Opinion";
          img_boton_up.className = "imagen";
          img_boton_down.className = "imagen";
          img_share.className = "imagen";
          boton_mostrar.setAttribute("id","clickOP");
          boton_mostrar.setAttribute ("type", "button");
          boton_mostrar.setAttribute ("onclick", "test_1('"+r[i]['id']+"')");
          boton_negativos.setAttribute ("class","btn btn-primary btn-sm ml-2 mt-2");
          boton_positivos.setAttribute ("disabled", "true");
          boton_negativos.setAttribute ("disabled", "true");
          carta_negativos.setAttribute ("class","badge badge-light ml-1");
          boton_positivos.setAttribute ("class","btn btn-primary btn-sm ml-1 mt-2");
          carta_positivos.setAttribute ("class","badge badge-light ml-1");
          //boton_positivos.textContent = "+";
          carta_positivos.textContent = r[i]['positivos'];
        //  boton_negativos.textContent = "-";
          carta_negativos.textContent = r[i]['negativos'];

          //img_header_type.src = AsignarHeaderOp(r[i]['negativos'],r[i]['positivos']);
          img_header_type.className = "header_type";
          if(r[i]['negativos']>0 ||  r[i]['positivos']<r[i]['negativos'])
          {
              img_header_type.src = "img/contro_op.png";
                carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-contro";

          }

          else if(r[i]['positivos']>0 || r[i]['negativos']<r[i]['positivos'])
          {
                img_header_type.src = "img/con_op.png";
                  carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-conso";

          }

          else if(r[i]['positivos']==0 && r[i]['negativos']==0)
          {
              img_header_type.src = "img/new_op.png";
                carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-new";

          }
          var cats = ["","Productos","Servicios","Politica","Sociedad","Medio ambiente","Interes general"];
            boton_id.appendChild(id_header);
           carta_header.appendChild(img_header_type);
        //  e_2.alt = "Card Image Cap";
      //    e_2.src = '/Opiniones/img/thr.jpg';
          carta_titulo.textContent = cortarTitulo;
          carta_contenido.textContent = cortarContenido;
          carta_categoria.textContent = "Categoria: "+ cats[r[i]['cat']];
          //carta_header.appendChild(id_header);
          header_share.appendChild(img_share);
          carta_header.appendChild(header_share);
          carta_body.appendChild(carta_titulo);
          carta_body.appendChild(carta_contenido);
          carta_body.appendChild(carta_categoria);
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








    },


  });


}

function SetPagesByFilter()
{

  var hash = location.hash;
  var search = false;

  hash = hash.replace('#','');

  if(hash=="")
  hash = 0;

  if(hash!=0)
  {
    var search = hash.includes("search");

  }




  var array = [];

  $('#filter_results').click(function()
  {

       for(var i=1;i<=6;i++)
       {

           if(document.getElementById('Checkbox'+i).checked)
                   {
                     array[i] = document.getElementById('Checkbox'+i).value;
                   }

       }

       array = array.filter(function(e){return e});

          if(!search)
       $.ajax({
             type: 'POST',
             url: '/php/getOpByCat.php',
             data: {hash,'array':array},
             dataType: 'json',
             success: function(r)
             {

                console.log(r)


                $('#comment_deck').empty();
                $('#parentPag').empty();


                for(var i=0;i<r.currentPage.length;i++)
                {

                  var cortarContenido = r.currentPage[i]['contenido'].slice(0,147)+"...";
                  var cortarTitulo = r.currentPage[i]['titulo'].slice(0,17);
                  var carta_opinion = document.createElement("div");
                  var img_share = document.createElement("img");
                  var img_boton_up = document.createElement("img");
                  var img_boton_down = document.createElement("img");
                  var img_header_type = document.createElement("img");
                  var carta_header = document.createElement("div");
                  var carta_body = document.createElement("div");
                  //var img_header = document.createElement("img");
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

                  carta_opinion.style = "max-width: 18rem; min-width:16rem; ";
                  carta_opinion.setAttribute("id",r.currentPage[i]['id']);
                  id_header.setAttribute("unique-id",r.currentPage[i]['id']);
                  id_header.setAttribute("href","https://opiniones.ar/opinion.html#"+r.currentPage[i]['id']);
                  id_header.setAttribute("target","_blank");
                  id_header.setAttribute("data-toggle","tooltip");
                  id_header.setAttribute("data-placement","top");
                  id_header.setAttribute("title","Numero de opinion");
                  id_header.setAttribute("type","button");
                  header_share.className = "mr-2";
                //  header_share.setAttribute("href","opinion.html#"+r[i]['id']);
                  header_share.setAttribute("data-toggle","modal");
                  header_share.setAttribute("data-target","#modalShare");
                  header_share.setAttribute("onclick","Share('"+r.currentPage[i]['id']+"','"+r.currentPage[i]['titulo']+"','"+r.currentPage[i]['contenido']+"')");
                  header_share.setAttribute("title","Comparte!");
                  img_share.src = "img/share.png";
                  img_boton_up.src = "img/upvote.png";
                  img_boton_down.src = "img/downvote.png";
                  img_share.setAttribute("alt","compartir");
                //  e_2.className ="card-img-top ";
                //  e_2.style = "max-width: 10rem; min-width:5rem;";
                  GetHeaderAndButtonTheme(r.currentPage[i]['id_header'],r.currentPage[i]['id_button'],carta_header,boton_mostrar);
                 //carta_header.style.backgroundImage =  "url('"+datos_tema.link_header+"')";


                  carta_header.style.backgroundPosition = "center top";
                  carta_header.style.backgroundSize = "100%";
                  carta_header.style.backgroundRepeat  = "no-repeat";
                  carta_body.className = "card-body box";
                  carta_titulo.className = "card-title";
                  carta_contenido.className = "card-text";
                  carta_categoria.className = "card-text";
                  boton_mostrar.className = "btn btn-outline-dark btn-sm mt-2";
                  boton_id.className = "btn btn-info btn-sm mt-2 mr-2";
                  id_header.className = "badge badge-info";
                  carta_header.className = "card-header d-flex justify-content-between";
                  carta_footer.className = "card-footer d-flex justify-content-end";
                  id_header.textContent = "#"+r.currentPage[i]['id'];
                  boton_mostrar.textContent = "Ver Op!";
                  img_boton_up.className = "imagen";
                  img_boton_down.className = "imagen";
                  img_share.className = "imagen";
                  boton_mostrar.setAttribute("id","clickOP");
                  boton_mostrar.setAttribute ("type", "button");
                  boton_mostrar.setAttribute ("onclick", "test_1('"+r.currentPage[i]['id']+"')");
                  boton_negativos.setAttribute ("class","btn btn-outline-dark btn-sm ml-2 mt-2");
                  boton_positivos.setAttribute ("disabled", "true");
                  boton_negativos.setAttribute ("disabled", "true");
                  carta_negativos.setAttribute ("class","badge badge-light ml-1");
                  boton_positivos.setAttribute ("class","btn btn-outline-dark btn-sm ml-1 mt-2");
                  carta_positivos.setAttribute ("class","badge badge-light ml-1");
                  //boton_positivos.textContent = "+";
                  carta_positivos.textContent = r.currentPage[i]['positivos'];
                //  boton_negativos.textContent = "-";
                  carta_negativos.textContent = r.currentPage[i]['negativos'];

                  //img_header_type.src = AsignarHeaderOp(r[i]['negativos'],r[i]['positivos']);
                  img_header_type.className = "header_type";
                  if(r.currentPage[i]['negativos']>0 ||  r.currentPage[i]['positivos']<r.currentPage[i]['negativos'])
                  {
                      img_header_type.src = "img/contro_op.png";
                        carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-contro";

                  }

                  else if(r.currentPage[i]['positivos']>0 || r.currentPage[i]['negativos']<r.currentPage[i]['positivos'])
                  {
                        img_header_type.src = "img/con_op.png";
                          carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-conso";

                  }

                  else if(r.currentPage[i]['positivos']==0 && r.currentPage[i]['negativos']==0)
                  {
                      img_header_type.src = "img/new_op.png";
                        carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-new";

                  }
                  var cats = ["","Productos","Servicios","Politica","Sociedad","Medio ambiente","Interes general"];
                    boton_id.appendChild(id_header);
                   carta_header.appendChild(img_header_type);
                //  e_2.alt = "Card Image Cap";
              //    e_2.src = '/Opiniones/img/thr.jpg';
                  carta_titulo.textContent = cortarTitulo;
                  carta_contenido.textContent = cortarContenido;
                  carta_categoria.textContent = "Categoria: "+ cats[r.currentPage[i]['cat']];
                  //carta_header.appendChild(id_header);
                  header_share.appendChild(img_share);
                  carta_header.appendChild(header_share);
                  carta_body.appendChild(carta_titulo);
                  carta_body.appendChild(carta_contenido);
                  carta_body.appendChild(carta_categoria);
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



              var parent = document.getElementById("parentPag");
              var li_0 = document.createElement("li");
              var a_0 = document.createElement("a");
              var span1_0 = document.createElement("span");
              var span2_0 = document.createElement("span");
              span1_0.setAttribute("aria-hidden","true");
              span2_0.className = "sr-only";
              a_0.textContent = "Primera";
              li_0.setAttribute("class","page-item");
              a_0.setAttribute("class","page-link");
              a_0.setAttribute("id","first");
              a_0.appendChild(span1_0);
              a_0.appendChild(span2_0);
              li_0.appendChild(a_0);
              parent.appendChild(li_0);

              var lif = document.createElement("li");
              var af = document.createElement("a");
              var span1f = document.createElement("span");
              var span2f = document.createElement("span");
              span1f.setAttribute("aria-hidden","true");
              span2f.className = "sr-only";
              af.textContent = "<";
              lif.setAttribute("class","page-item");
              af.setAttribute("class","page-link");
              if(hash>=1)
              {
                af.setAttribute("id",hash-1);
                hash = clamp(hash,0,r.length);
              }
              else {
                  af.setAttribute("id",0);
              }
              af.appendChild(span1f);
              af.appendChild(span2f);
              lif.appendChild(af);

              if(hash!="first");
              parent.appendChild(lif);




              for(var i=0;i<r.totalPages;i++)
                {
                        var parent = document.getElementById("parentPag");
                        var li = document.createElement("li");
                        var a = document.createElement("a");
                        li.setAttribute("class","page-item");
                        a.setAttribute("class","page-link");
                        a.setAttribute("id",parseInt(hash)+i);
                        var pageNumber = parseInt(hash)+i;
                        a.textContent = pageNumber;
                        li.appendChild(a);
                        parentPag.appendChild(li);



                }






                        var li = document.createElement("li");
                         var a = document.createElement("a");
                         var span1 = document.createElement("span");
                         var span2 = document.createElement("span");
                         span1.setAttribute("aria-hidden","true");
                         span2.className = "sr-only";
                         a.textContent = ">";
                         li.setAttribute("class","page-item");
                         a.setAttribute("class","page-link");
                         if(hash!="first")
                         {
                           var pageNumber = parseInt(hash)+1;
                             hash = clamp(hash,0,r.length);
                         a.setAttribute("id",pageNumber);
                         }
                         else {
                           a.setAttribute("id",1);
                         }

                         a.appendChild(span1);
                         a.appendChild(span2);
                         li.appendChild(a);


                        var lil = document.createElement("li");
                        var al = document.createElement("a");
                        var span1l = document.createElement("span");
                        var span2l = document.createElement("span");
                        span1l.setAttribute("aria-hidden","true");
                        span2l.className = "sr-only";
                        al.textContent = "Ultima";
                        lil.setAttribute("class","page-item");
                        al.setAttribute("class","page-link");
                        al.setAttribute("id","last");
                        al.appendChild(span1l);
                        al.appendChild(span2l);
                        lil.appendChild(al);

                            if(hash!="last")
                         parent.appendChild(li);

                           parent.appendChild(lil);

                           if(hash>=r.totalLenght)
                           {
                             location.hash = "#"+(r.totalLenght-2);
                           }



                           $('.page-link').click(function()
                            {
                                    //  $('#comment_deck').empty();
                                      var test = $(this).attr('id');

                                      if(location.hash=="#last" && test==0 )
                                      {
                                        var aux = r.totalLenght;
                                        location.hash = "#"+(aux-2);
                                          hash = clamp(hash,0,r.length);
                                      setTimeout(function(){ location.reload(); }, 10);
                                      }
                                      else  {
                                        location.hash = "#"+test;
                                      setTimeout(function(){ location.reload(); }, 10);
                                      }



                            });


                               document.getElementById(hash).parentElement.className = "page-item active";


             },
             error: function(s)
             {
                   console.log(s);



             },




       });


});




}
function SetPages()
{

        var hash = location.hash;
        var search = false;

        hash = hash.replace('#','');

        if(hash=="")
        hash = "first";

        if(hash!=0)
        {
          var search = hash.includes("search");

        }


          if(!search)
        $.ajax({
              type: 'GET',
              url: '/php/getOp.php',
              data: {hash},
              dataType: 'json',
              success: function(r)
              {






                for(var i=0;i<r.currentPage.length;i++)
                {

                  var cortarContenido = r.currentPage[i]['contenido'].slice(0,147)+"...";
                  var cortarTitulo = r.currentPage[i]['titulo'].slice(0,17);
                  var carta_opinion = document.createElement("div");
                  var img_share = document.createElement("img");
                  var img_boton_up = document.createElement("img");
                  var img_boton_down = document.createElement("img");
                  var img_header_type = document.createElement("img");
                  var carta_header = document.createElement("div");
                  var carta_body = document.createElement("div");
                  //var img_header = document.createElement("img");
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

                  carta_opinion.style = "max-width: 18rem; min-width:16rem; ";
                  carta_opinion.setAttribute("id",r.currentPage[i]['id']);
                  id_header.setAttribute("unique-id",r.currentPage[i]['id']);
                  id_header.setAttribute("href","https://opiniones.ar/opinion.html#"+r.currentPage[i]['id']);
                  id_header.setAttribute("target","_blank");
                  id_header.setAttribute("data-toggle","tooltip");
                  id_header.setAttribute("data-placement","top");
                  id_header.setAttribute("title","Numero de opinion");
                  id_header.setAttribute("type","button");
                  header_share.className = "mr-2";
                //  header_share.setAttribute("href","opinion.html#"+r[i]['id']);
                  header_share.setAttribute("data-toggle","modal");
                  header_share.setAttribute("data-target","#modalShare");
                  header_share.setAttribute("onclick","Share('"+r.currentPage[i]['id']+"','"+r.currentPage[i]['titulo']+"','"+r.currentPage[i]['contenido']+"')");
                  header_share.setAttribute("title","Comparte!");
                  img_share.src = "img/share.png";
                  img_boton_up.src = "img/upvote.png";
                  img_boton_down.src = "img/downvote.png";
                  img_share.setAttribute("alt","compartir");
                //  e_2.className ="card-img-top ";
                //  e_2.style = "max-width: 10rem; min-width:5rem;";
                  GetHeaderAndButtonTheme(r.currentPage[i]['id_header'],r.currentPage[i]['id_button'],carta_header,boton_mostrar);
                 //carta_header.style.backgroundImage =  "url('"+datos_tema.link_header+"')";


                  carta_header.style.backgroundPosition = "center top";
                  carta_header.style.backgroundSize = "100%";
                  carta_header.style.backgroundRepeat  = "no-repeat";
                  carta_body.className = "card-body box";
                  carta_titulo.className = "card-title";
                  carta_contenido.className = "card-text";
                  carta_categoria.className = "card-text";
                  boton_mostrar.className = "btn btn-outline-dark btn-sm mt-2";
                  boton_id.className = "btn btn-info btn-sm mt-2 mr-2";
                  id_header.className = "badge badge-info";
                  carta_header.className = "card-header d-flex justify-content-between";
                  carta_footer.className = "card-footer d-flex justify-content-end";
                  id_header.textContent = "#"+r.currentPage[i]['id'];
                  boton_mostrar.textContent = "Ver Op!";
                  img_boton_up.className = "imagen";
                  img_boton_down.className = "imagen";
                  img_share.className = "imagen";
                  boton_mostrar.setAttribute("id","clickOP");
                  boton_mostrar.setAttribute ("type", "button");
                  boton_mostrar.setAttribute ("onclick", "test_1('"+r.currentPage[i]['id']+"')");
                  boton_negativos.setAttribute ("class","btn btn-outline-dark btn-sm ml-2 mt-2");
                  boton_positivos.setAttribute ("disabled", "true");
                  boton_negativos.setAttribute ("disabled", "true");
                  carta_negativos.setAttribute ("class","badge badge-light ml-1");
                  boton_positivos.setAttribute ("class","btn btn-outline-dark btn-sm ml-1 mt-2");
                  carta_positivos.setAttribute ("class","badge badge-light ml-1");
                  //boton_positivos.textContent = "+";
                  carta_positivos.textContent = r.currentPage[i]['positivos'];
                //  boton_negativos.textContent = "-";
                  carta_negativos.textContent = r.currentPage[i]['negativos'];

                  //img_header_type.src = AsignarHeaderOp(r[i]['negativos'],r[i]['positivos']);
                  img_header_type.className = "header_type";
                  if(r.currentPage[i]['negativos']>0 ||  r.currentPage[i]['positivos']<r.currentPage[i]['negativos'])
                  {
                      img_header_type.src = "img/contro_op.png";
                        carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-contro";

                  }

                  else if(r.currentPage[i]['positivos']>0 || r.currentPage[i]['negativos']<r.currentPage[i]['positivos'])
                  {
                        img_header_type.src = "img/con_op.png";
                          carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-conso";

                  }

                  else if(r.currentPage[i]['positivos']==0 && r.currentPage[i]['negativos']==0)
                  {
                      img_header_type.src = "img/new_op.png";
                        carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-new";

                  }
                  var cats = ["","Productos","Servicios","Politica","Sociedad","Medio ambiente","Interes general"];
                    boton_id.appendChild(id_header);
                   carta_header.appendChild(img_header_type);
                //  e_2.alt = "Card Image Cap";
              //    e_2.src = '/Opiniones/img/thr.jpg';
                  carta_titulo.textContent = cortarTitulo;
                  carta_contenido.textContent = cortarContenido;
                  carta_categoria.textContent = "Categoria: "+ cats[r.currentPage[i]['cat']];
                  //carta_header.appendChild(id_header);
                  header_share.appendChild(img_share);
                  carta_header.appendChild(header_share);
                  carta_body.appendChild(carta_titulo);
                  carta_body.appendChild(carta_contenido);
                  carta_body.appendChild(carta_categoria);
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



              var parent = document.getElementById("parentPag");
              var li_0 = document.createElement("li");
              var a_0 = document.createElement("a");
              var span1_0 = document.createElement("span");
              var span2_0 = document.createElement("span");
              span1_0.setAttribute("aria-hidden","true");
              span2_0.className = "sr-only";
              a_0.textContent = "Primera";
              li_0.setAttribute("class","page-item");
              a_0.setAttribute("class","page-link");
              a_0.setAttribute("id","first");
              a_0.appendChild(span1_0);
              a_0.appendChild(span2_0);
              li_0.appendChild(a_0);
              parent.appendChild(li_0);

              var lif = document.createElement("li");
              var af = document.createElement("a");
              var span1f = document.createElement("span");
              var span2f = document.createElement("span");
              span1f.setAttribute("aria-hidden","true");
              span2f.className = "sr-only";
              af.textContent = "<";
              lif.setAttribute("class","page-item");
              af.setAttribute("class","page-link");
              if(hash>=1)
              {
                af.setAttribute("id",hash-1);
                hash = clamp(hash,0,r.length);
              }
              else {
                  af.setAttribute("id",0);
              }
              af.appendChild(span1f);
              af.appendChild(span2f);
              lif.appendChild(af);

              if(hash!="first");
              parent.appendChild(lif);




              for(var i=0;i<r.totalPages;i++)
                {
                        var parent = document.getElementById("parentPag");
                        var li = document.createElement("li");
                        var a = document.createElement("a");
                        li.setAttribute("class","page-item");
                        a.setAttribute("class","page-link");
                        a.setAttribute("id",parseInt(hash)+i);
                        var pageNumber = parseInt(hash)+i;
                        a.textContent = pageNumber;
                        li.appendChild(a);
                        parentPag.appendChild(li);



                }






                        var li = document.createElement("li");
                         var a = document.createElement("a");
                         var span1 = document.createElement("span");
                         var span2 = document.createElement("span");
                         span1.setAttribute("aria-hidden","true");
                         span2.className = "sr-only";
                         a.textContent = ">";
                         li.setAttribute("class","page-item");
                         a.setAttribute("class","page-link");
                         if(hash!="first")
                         {
                           var pageNumber = parseInt(hash)+1;
                             hash = clamp(hash,0,r.length);
                         a.setAttribute("id",pageNumber);
                         }
                         else {
                           a.setAttribute("id",1);
                         }

                         a.appendChild(span1);
                         a.appendChild(span2);
                         li.appendChild(a);


                        var lil = document.createElement("li");
                        var al = document.createElement("a");
                        var span1l = document.createElement("span");
                        var span2l = document.createElement("span");
                        span1l.setAttribute("aria-hidden","true");
                        span2l.className = "sr-only";
                        al.textContent = "Ultima";
                        lil.setAttribute("class","page-item");
                        al.setAttribute("class","page-link");
                        al.setAttribute("id","last");
                        al.appendChild(span1l);
                        al.appendChild(span2l);
                        lil.appendChild(al);

                            if(hash!="last")
                         parent.appendChild(li);

                           parent.appendChild(lil);

                           if(hash>=r.totalLenght)
                           {
                             location.hash = "#"+(r.totalLenght-2);
                             hash = clamp(hash,0,r.length);
                           }



                           $('.page-link').click(function()
                            {
                                    //  $('#comment_deck').empty();
                                      var test = $(this).attr('id');

                                      if(location.hash=="#last" && test==0 )
                                      {
                                        var aux = r.totalLenght;
                                        location.hash = "#"+(aux-2);
                                          hash = clamp(hash,0,r.length);
                                      setTimeout(function(){ location.reload(); }, 10);
                                      }
                                      else  {
                                        location.hash = "#"+test;
                                      setTimeout(function(){ location.reload(); }, 10);
                                      }



                            });

                               document.getElementById(hash).parentElement.className = "page-item active";

              },
              error: function(s)
              {
                    console.log(s);



              },




        });


}


function OpenSettings()
{



          var id = document.getElementById("open_settings");
          id.setAttribute("data-target","tooltip");
          id.setAttribute("title","Filtros de busqueda");
          id.setAttribute("data-toggle","modal");
          id.setAttribute("data-target","#filter_modal");

          $('#open_settings').click(function()
          {





          });





}








$(document).ready(function()
{

  //AjaxOpinion('/Opiniones/php/getCommentBackEnd.php');

      SetPages();

      SetPagesByFilter();

      OpenSettings();


      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl)
        {
        return new bootstrap.Tooltip(tooltipTriggerEl)
      });







  });
