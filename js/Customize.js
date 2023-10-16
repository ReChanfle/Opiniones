

function GetHeaderAndButtons()
{
            var header = 1;
            var link_button;
            var link_header;
            var select_button = 0;
            var select_header = 0;
      $.ajax({
          type: 'GET',
          url: '/php/geThemes.php',
          data: {header},
          dataType: 'json',
          success: function(x)
          {
                          if(x)
                          {
                            //var r = JSON.parse(x);
                            for(var i in x)
                            {

                                      var select = document.createElement("option");
                                      select.value = x[i]['id_header'];
                                      select.textContent = x[i]['nombre'];
                                      var parent = document.getElementById("inputGroupSelect02");
                                      parent.appendChild(select);
                            }

                            $('#inputGroupSelect02').change(function(e){
                                e.preventDefault();
                                select_header = $(this).val();
                                  for (i = 0; i < x.length; i++) {
                                        if(x[i]['id_header']==$(this).val())
                                        {
                                          link_header =x[i]['link'];
                                          CreateCustomCard(link_header,link_button);
                                        }
                                    }

                                  });
                          }


          },




      });

      var button = 1;
      $.ajax({
          type: 'GET',
          url: '/php/geThemes.php',
          data: {button},
          dataType: 'json',
          success: function(x)
          {
                if(x)
                {

                              for(var i in x)
                              {
                                        var select = document.createElement("option");
                                          select.value = x[i]['id_button'];
                                        select.textContent = x[i]['nombre'];
                                        var parent = document.getElementById("inputGroupSelect03");
                                        parent.appendChild(select);
                              }


                              $('#inputGroupSelect03').change(function(e){
                                  e.preventDefault();
                                      select_button = $(this).val();

                                        // crea carta de muestra
                                for (i = 0; i <x.length; i++) {
                                          if(x[i]['id_button']==$(this).val())
                                          {
                                             link_button =x[i]['link'];
                                            CreateCustomCard(link_header,link_button);
                                          }
                                      }

                                    });
                }

          },




      });


          $('#submitRequest1').click(function(){

            console.log("header antes de enviar"+select_header);

            console.log("boton antes de enviar"+select_button);

                SaveChanges(select_header,select_button);

          });







}

function SaveChanges(select_header,select_button)
{

        if(select_button==0)
        select_button= 1;
        if(select_header==0)
        select_header=1;

        console.log(select_header);

        console.log(select_button);

        $.ajax({
          type: 'POST',
          url: '/php/saveCustom.php',
          data:{select_header,select_button},
          dataType: 'json',
          success: function(x)
          {


              if(x['exito'])
              {

                var body = document.getElementById('bodyAlert1');
              if(body.children.length==0)
              {
                  var alert = document.createElement('div');
                  alert.className = "alert alert-success alert-dismissible fade show text-center";
                  alert.setAttribute("role","alert");
                  alert.setAttribute("id","alertSearchResult");
                  alert.textContent = "Se guardaron las preferencias correctamente";
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
                  alert.textContent = "No se guardaron las preferencias";
                  body.appendChild(alert);
                  window.setTimeout(function() {
                      $("#alertSearchResult").fadeTo(500, 0).slideUp(500, function() {
                          $(this).remove();
                        });
                      }, 2000);
              }
              }


          },




        });

}

function CreateCustomCard(link_header,link_button)
{


      $('#comment_deck').empty();
      var cortarContenido = "...";
      var cortarTitulo = "...";
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
      //carta_opinion.setAttribute("id",r[i]['id']);
      //id_header.setAttribute("unique-id",r[i]['id']);
      //id_header.setAttribute("href","#"+r[i]['id']);
      id_header.setAttribute("target","_blank");
      id_header.setAttribute("data-toggle","tooltip");
      id_header.setAttribute("data-placement","top");
      id_header.setAttribute("title","Numero de opinion");
      id_header.setAttribute("type","button");
      header_share.className = "mr-2";
    //  header_share.setAttribute("href","opinion.html#"+r[i]['id']);
      //header_share.setAttribute("data-toggle","modal");
      //header_share.setAttribute("data-target","#modalShare");
    //  header_share.setAttribute("onclick","Share('"+r[i]['id']+"','"+r[i]['titulo']+"','"+r[i]['contenido']+"')");
      header_share.setAttribute("title","Comparte!");
      img_share.src = "img/share.png";
      img_boton_up.src = "img/upvote.png";
      img_boton_down.src = "img/downvote.png";
      img_share.setAttribute("alt","compartir");
    //  e_2.className ="card-img-top ";
    //  e_2.style = "max-width: 10rem; min-width:5rem;";
      //GetHeaderAndButtonTheme(r[i]['id_header'],r[i]['id_boton'],carta_header);
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
      id_header.textContent = "#"+999;
      boton_mostrar.textContent = "Ver Opinion";
      img_boton_up.className = "imagen";
      img_boton_down.className = "imagen";
      img_share.className = "imagen";
      boton_mostrar.setAttribute("id","clickOP");
      boton_mostrar.setAttribute ("type", "button");
      //boton_mostrar.setAttribute ("onclick", "test_1('"+r[i]['id']+"')");
      boton_negativos.setAttribute ("class","btn btn-primary btn-sm ml-2 mt-2");
      boton_positivos.setAttribute ("disabled", "true");
      boton_negativos.setAttribute ("disabled", "true");
      carta_negativos.setAttribute ("class","badge badge-light ml-1");
      boton_positivos.setAttribute ("class","btn btn-primary btn-sm ml-1 mt-2");
      carta_positivos.setAttribute ("class","badge badge-light ml-1");
      //boton_positivos.textContent = "+";
      carta_positivos.textContent = 999;
    //  boton_negativos.textContent = "-";
      carta_negativos.textContent = 999;

      //img_header_type.src = AsignarHeaderOp(r[i]['negativos'],r[i]['positivos']);
      img_header_type.className = "header_type";

          img_header_type.src = "img/new_op.png";
            carta_opinion.className = "card text-white bg-secondary  mb-3 mt-3 mr-2 ml-2 gradient-border-new";
            if(link_button==null)
            {
                boton_mostrar.style.backgroundColor = "#007bff";
            }
            else
                  boton_mostrar.style.backgroundColor = "transparent";

            carta_header.style.backgroundImage =  "url('"+link_header+"')";
            boton_mostrar.style.backgroundImage =  "url('"+link_button+"')";
            carta_header.style.backgroundPosition = "center top";
            carta_header.style.backgroundSize = "100%";
            carta_header.style.backgroundRepeat  = "no-repeat";
      //var cats = ["","Productos","Servicios","Politica","Sociedad","Medio ambiente","Interes general"];
        boton_id.appendChild(id_header);
       carta_header.appendChild(img_header_type);
    //  e_2.alt = "Card Image Cap";
  //    e_2.src = '/Opiniones/img/thr.jpg';
      carta_titulo.textContent = cortarTitulo;
      carta_contenido.textContent = cortarContenido;
      carta_categoria.textContent = "Categoria: ...";
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










      $('#inputGroupSelect03').change(function(){
          var valueButton = $(this).val();



          });



}



$(document).ready(function()
{

      GetHeaderAndButtons();





});
