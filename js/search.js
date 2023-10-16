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

function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}

function Find()
{
  var aux=0;
  var first = true;

      var value = location.hash;

      value = value.replace('#search=','');


        $.ajax({
            type:'POST',
            url: '/php/search.php',
            data: {value},
            datatype: 'json',
            success: function(x)
            {


                   var r = JSON.parse(x);




                var totalOp = 0;
                 aux = clamp(aux,0,r.length);

                 for(var e = 0;e<r.length;e++)
                for(var x in r[e] )
                {
                       totalOp++;


                }

                if(r.length>0 && r[0][0]!=null)
                {
                    $('#comment_deck').empty();

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
                else {
                    //$('#comment_deck').empty();

                    var body = document.getElementById('bodyAlert');
                    if(body.children.length==0)
                    {
                        var alert = document.createElement('div');
                        alert.className = "alert alert-success alert-dismissible fade show text-center";
                        alert.setAttribute("role","alert");
                        alert.setAttribute("id","alertSearchResult");
                        alert.textContent = "Se encontraron: "+0+" Opiniones";
                        body.appendChild(alert);
                        window.setTimeout(function() {
                            $("#alertSearchResult").fadeTo(500, 0).slideUp(500, function() {
                                $(this).remove();
                              });
                            }, 2000);
                    }

                }


                if(first && r[0][0]!=null)
                {
                  for(var i in r[0])
                    {

                      var cortarContenido = r[0][i]['contenido'].slice(0,147)+"...";
                      var cortarTitulo = r[0][i]['titulo'].slice(0,17);
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

                      carta_opinion.style = "max-width: 18rem; min-width:18rem; ";
                      carta_opinion.setAttribute("id",r[0][i]['id']);
                      id_header.setAttribute("unique-id",r[0][i]['id']);
                      id_header.setAttribute("href","#"+r[0][i]['id']);
                      id_header.setAttribute("target","_blank");
                      id_header.setAttribute("data-toggle","tooltip");
                      id_header.setAttribute("data-placement","top");
                      id_header.setAttribute("title","Numero de opinion");
                      id_header.setAttribute("type","button");
                      header_share.className = "mr-2";
                    //  header_share.setAttribute("href","opinion.html#"+r[i]['id']);
                      header_share.setAttribute("data-toggle","modal");
                      header_share.setAttribute("data-target","#modalShare");
                      header_share.setAttribute("onclick","Share('"+r[0][i]['id']+"','"+r[0][i]['titulo']+"','"+r[0][i]['contenido']+"')");
                      header_share.setAttribute("title","Comparte!");
                      img_share.src = "img/share.png";
                      img_boton_up.src = "img/upvote.png";
                      img_boton_down.src = "img/downvote.png";
                      img_share.setAttribute("alt","compartir");
                    //  e_2.className ="card-img-top ";
                    //  e_2.style = "max-width: 10rem; min-width:5rem;";
                      GetHeaderAndButtonTheme(r[0][i]['id_header'],r[0][i]['id_button'],carta_header,boton_mostrar);
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
                      id_header.textContent = "#"+r[0][i]['id'];
                      boton_mostrar.textContent = "Ver Opinion";
                      img_boton_up.className = "imagen";
                      img_boton_down.className = "imagen";
                      img_share.className = "imagen";
                      boton_mostrar.setAttribute("id","clickOP");
                      boton_mostrar.setAttribute ("type", "button");
                      boton_mostrar.setAttribute ("onclick", "test_1('"+r[0][i]['id']+"')");
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

                      //img_header_type.src = AsignarHeaderOp(r[i]['negativos'],r[i]['positivos']);
                      img_header_type.className = "header_type";
                      if(r[0][i]['negativos']>0 ||  r[0][i]['positivos']<r[0][i]['negativos'])
                      {
                          img_header_type.src = "img/contro_op.png";
                            carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-contro";

                      }

                      else if(r[0][i]['positivos']>0 || r[0][i]['negativos']<r[0][i]['positivos'])
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
                        boton_id.appendChild(id_header);
                       carta_header.appendChild(img_header_type);
                    //  e_2.alt = "Card Image Cap";
                   //    e_2.src = '/Opiniones/img/thr.jpg';
                      carta_titulo.textContent = cortarTitulo;
                      carta_contenido.textContent = cortarContenido;
                      carta_categoria.textContent = "Categoria: "+ cats[r[0][i]['cat']];
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

                     first = false;
                }

                var parent = document.getElementById("parentPag");
                            if(r.length>0 && parent.children.length==0)
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
                              if (parent.hasChildNodes()) {
                                  parent.removeChild(parent.firstChild);
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
             carta_opinion.style = "max-width: 20rem; min-width:20rem; ";
             carta_opinion.setAttribute("id",r[aux][i]['id']);
             id_header.setAttribute("unique-id",r[aux][i]['id']);
             id_header.setAttribute("href","#"+r[aux][i]['id']);
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
       carta_opinion.style = "max-width: 20rem; min-width:20rem; ";
       carta_opinion.setAttribute("id",r[aux][i]['id']);
       id_header.setAttribute("unique-id",r[aux][i]['id']);
       id_header.setAttribute("href","#"+r[aux][i]['id']);
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




            },

            error: function(e)
            {
              console.log(e);

            }




        });
}



$(document).ready(function()
{
            $('#searchValue').val("");

            var hash = location.hash;
            var check = false;

            check = hash.includes("search");

              if(check)
              Find();


            $('#searchButton').click(function(e)
            {



                    e.preventDefault();
                    var value = $('#searchValue').val();

                    location.hash = "#search="+value;
                    location.reload();




            });

            var input = document.getElementById("searchValue");
          input.addEventListener("keyup", function(event) {
              // Number 13 is the "Enter" key on the keyboard
          if (event.keyCode === 13)
           {
              // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("searchButton").click();
            }
});








});
