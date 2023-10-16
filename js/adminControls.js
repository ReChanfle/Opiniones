function AsignarHeaderOp(negativos,positivos)
{
          var op1 = "Opinion Destacada";
          var op2 = "Opinion Controvertida";
          var op3 = "Nueva Opinion";


          if(negativos>0 && positivos<negativos)
          return op2;
          if(positivos>0 && negativos<positivos)
          return op1;
          if(positivos==0 && negativos==0)
          return op3;





}

function LoadContent(id,infraccion,baneado,fecha,tiempo_suspendido,penalty_points)
{
      var ban = "";
          if(baneado==1)
               ban = "SI";
              else
                ban = "NO";



          document.getElementById("infraccionId").innerHTML = "Infraccion ID: "+id;
          document.getElementById("motivoInfraccion").innerHTML = infraccion;
          document.getElementById("banBox").innerHTML = "Baneado: "+ban;
          document.getElementById("timeBox").innerHTML = "Tiempo de suspension: "+tiempo_suspendido +" dias";
          document.getElementById("dateSuspension").innerHTML = "Fecha de infraccion: "+fecha;
          document.getElementById("penaltyPoints").innerHTML = "Puntos descontados: "+penalty_points;

}

function GetFlags(name)
{
          $.ajax({
              type: 'POST',
              url: '/php/getFlags.php',
              data: {name},
              datatype:'json',
              success: function (x)
              {
                      var t = JSON.parse(x);

                    for(var i in t)
                    {

                          var tr = document.createElement("tr");
                          var th = document.createElement("th");
                          var tdInf = document.createElement("td");
                          var tdTime = document.createElement("td");
                          var tdBan = document.createElement("td");
                          var tdDate = document.createElement("td");
                          th.setAttribute("scope","row");
                          th.textContent =   t[i]['id'];
                          th.setAttribute("data-toggle","modal");
                          th.setAttribute("data-target","#modalInfraccion");
                          th.setAttribute("type","button");

                          th.setAttribute("onclick","LoadContent('"+t[i]['id']+"','"+t[i]['infraccion']+"','"+t[i]['baneado']+"','"+t[i]['fecha']+"','"+t[i]['tiempo_suspendido']+"','"+t[i]['penalty_points']+"')");
                          tdInf.textContent =   t[i]['infraccion'].slice(0,10);
                          tdTime.textContent =   t[i]['tiempo_suspendido'];
                          tdDate.textContent = t[i]['fecha'];
                          if(t[i]['baneado']==1)
                          tdBan.textContent =  "SI";
                          else
                            tdBan.textContent =  "NO";

                          tr.appendChild(th);
                          tr.appendChild(tdInf);
                          tr.appendChild(tdBan);
                          tr.appendChild(tdTime);
                          tr.appendChild(tdDate);
                          var parent = document.getElementById("bodyTable");

                          parent.appendChild(tr);





                    }



              },




          });
}

function SearchUser(nick)
{



  $.ajax({
        type: 'POST',
        url: '/php/findUser.php',
        data: {nick},
        datatype: 'json',
        success: function(z)
        {
                 var x = JSON.parse(z);
                    if(x.nickname)
                    {

                    $('#user_nickname').attr("placeholder",""+x.nickname+"");
                    if(x.baneado==0)
                    $('#btnBanUser').removeAttr("disabled","true");
                      if(x.tiempo_suspension==0)
                      $('#btnSuspendUser').removeAttr("disabled","true");
                      if(x.baneado==1 || x.tiempo_suspension>0)
                      $('#btnActiveUser').removeAttr("disabled","true");

                      console.log(x.tiempo_suspension);


                      $('#suspendUser').click(function()
                      {

                            $('#alertSuspendUser').css("visibility","visible");
                            $('#alertSuspendUser').text("Esperando respuesta del servidor");
                            var email = x.usuarioemail;
                            var id = x.id;
                            SuspendUser(email,id);
                              $('#suspendUser').attr("disabled","true");


                      });

                      $('#banUser').click(function()
                      {
                                $('#alertBanUser').css("visibility","visible");
                              $('#alertBanUser').text("Esperando respuesta del servidor");
                            var email = x.usuarioemail;
                            BanUser(email);
                            $('#banUser').attr("disabled","true");

                      });

                      $('#actUser').click(function()
                      {

                        $('#alertActUser').css("visibility","visible");
                        $('#alertActUser').text("Esperando respuesta del servidor");
                            var email = x.usuarioemail;
                            ActivateUser(email);
                                $('#actUser').attr("disabled","true");

                      });

                    }
                     if(x.nickname==null) {
                        $('#user_nickname').attr("placeholder","No se encontro el usuario!");
                        $('#btnBanUser').attr("disabled","true");
                          $('#btnSuspendUser').attr("disabled","true");
                            $('#btnActiveUser').attr("disabled","true");

                    }
                     if (x.error_conexion)
                    {
                      $('#user_nickname').attr("placeholder","No se pudo conectar a la base de datos");
                      $('#modalBanUser').removeAttr("disabled","true");
                        $('#modalSuspendUser').removeAttr("disabled","true");
                          $('#modalActiveUser').removeAttr("disabled","true");
                    }


        },

  });



}

function SuspendUser(email,id)
{
        var suspendTime = $('#inputSuspendUser').val();
        var points = $('#inputPointsSuspendUser').val();
        var suspendMotivo = $('#motivoSuspendUser').val();
        var name =   $('#user_nickname').attr("placeholder");

        $.ajax({
              type:'POST',
              url:'/php/adminUser.php',
              data: {suspendTime,suspendMotivo,name,email,id,points},
              datatype: 'json',
              success: function(t)
              {

                      var x = JSON.parse(t);
                      if(x.suspendido!=0)
                        {
                      //$('#alertSuspendUser').css("visibility","visible");
                      $('#alertSuspendUser').text("Usuario suspendido");
                        }
                        if(x.sin_motivo==1)
                        {
                          $('#alertSuspendUser').text("Por favor ingresa el motivo");
                          $('#suspendUser').removeAttr("disabled","true");
                        }


              },




        });


}

function BanUser(email)
{

  var banMotivo = $('#motivoBanUser').val();
  var name =   $('#user_nickname').attr("placeholder");
  $.ajax({
        type:'POST',
        url:'/php/adminUser.php',
        data: {banMotivo,name,email},
        datatype: 'json',
        success: function(t)
        {
                var x = JSON.parse(t);
                if(x.baneado==1)
                {
                  $('#alertBanUser').css("visibility","visible");
                  $('#alertBanUser').text("Usuario Baneado");
                }


                if(x.sin_motivo==1)
                {
                  $('#alertBanUser').text("Por favor ingresa el motivo");
                  $('#banUser').removeAttr("disabled","true");
                }
        },




  });


}
function ActivateUser(email)
{
    var name = $('#user_nickname').attr("placeholder");
    var activateMotivo = $('#motivoActUser').val();

    $.ajax({
          type:'POST',
          url:'/php/adminUser.php',
          data: {activateMotivo,name,email},
          datatype: 'json',
          success: function(t)
          {
                    var x = JSON.parse(t);

                                  if(x.baneado==0 && x.estado_consulta==true)
                                  {
                                    $('#alertActUser').css("visibility","visible");
                                    $('#alertActUser').text("Usuario Habilitado");
                                  }

                                  if(x.sin_motivo)
                                  {
                                    $('#alertActUser').css("visibility","visible");
                                    $('#alertActUser').text("Por favor,ingresa el motivo");
                                      $('#actUser').removeAttr("disabled","true");
                                  }


          },




    });




}

function CreateCard(r)
{
  var cortarContenido = r['contenido'].slice(0,100);
  var cortarTitulo = r['titulo'].slice(0,17);
  var carta_opinion = document.createElement("div");
  var img_share = document.createElement("img");
  var img_boton_up = document.createElement("img");
  var img_boton_down = document.createElement("img");
  var carta_header = document.createElement("div");
  var carta_body = document.createElement("div");
//  var e_13 = document.createElement("div");
  var carta_footer = document.createElement("div");
  var carta_titulo = document.createElement("h5");
  var carta_contenido = document.createElement("p");
  var carta_categoria = document.createElement("p");
  var boton_mostrar = document.createElement("a");
  var boton_positivos = document.createElement("button");
  var carta_positivos = document.createElement("span");
  var boton_negativos = document.createElement("button");
  var carta_negativos = document.createElement("span");
  var id_header = document.createElement("a");
  var header_del = document.createElement("button");
  carta_opinion.className = "card text-white bg-secondary border-primary  mb-3 mt-3 mr-2 ml-2";
  carta_opinion.style = "max-width: 20rem; min-width:20rem; ";
  carta_opinion.setAttribute("id",r['id']);
  id_header.setAttribute("unique-id",r['id']);
  id_header.setAttribute("href","#"+r['id']);
  id_header.setAttribute("target","_blank");
  id_header.setAttribute("data-toggle","tooltip");
  id_header.setAttribute("data-placement","top");
  id_header.setAttribute("title","Numero de opinion");
  header_del.textContent = "DEL";
  //header_del.setAttribute("href","opinion.html#"+r['id']);
  header_del.setAttribute("data-toggle","modal");
  header_del.setAttribute("data-target","#modalDelOp");
  header_del.setAttribute("class","btn btn-danger btn-sm");
  img_share.src = "img/share.png";
  img_share.setAttribute("alt","compartir");
  img_boton_up.src = "img/upvote.png";
  img_boton_down.src = "img/downvote.png";
//  e_2.className ="card-img-top ";
//  e_2.style = "max-width: 10rem; min-width:5rem;";
  carta_body.className = "card-body";
  carta_titulo.className = "card-title";
  carta_contenido.className = "card-text";
  carta_categoria.className = "card-text";
  boton_mostrar.className = "btn btn-primary btn-sm mt-2";
  id_header.className = "badge badge-info  ml-2";
  carta_header.className = "card-header d-flex justify-content-between";
  carta_header.setAttribute("id",r['id']);
  carta_footer.className = "card-footer d-flex justify-content-end";
  id_header.textContent = "#"+r['id'];
  boton_mostrar.textContent = "Modificar Opinion";
  boton_mostrar.setAttribute("id","clickOP");
  boton_mostrar.setAttribute("data-toggle","modal");
  boton_mostrar.setAttribute ("data-target", "#ModifyCommentModal");
  boton_mostrar.setAttribute ("type", "button");
  //boton_mostrar.setAttribute ("onclick", "test_1('"+r['id']+"')");
  boton_negativos.setAttribute ("class","btn btn-primary btn-sm ml-2 mt-2");
  boton_positivos.setAttribute ("disabled", "true");
  boton_negativos.setAttribute ("disabled", "true");
  carta_negativos.setAttribute ("class","badge badge-light ml-1");
  boton_positivos.setAttribute ("class","btn btn-primary btn-sm ml-1 mt-2");
  carta_positivos.setAttribute ("class","badge badge-light ml-1");
//  boton_positivos.textContent = "+";
  carta_positivos.textContent = r['positivos'];
//  boton_negativos.textContent = "-";
  carta_negativos.textContent = r['negativos'];
  carta_header.textContent = AsignarHeaderOp(r['negativos'],r['positivos']);
  carta_header.textContent = "Autor: " +r['nombre'];
//  e_2.alt = "Card Image Cap";
//    e_2.src = '/Opiniones/img/thr.jpg';
  carta_titulo.textContent = cortarTitulo;
  carta_contenido.textContent = cortarContenido;
    var cats = ["","Productos","Servicios","Politica","Sociedad","Medio ambiente","Interes general"];
  carta_categoria.textContent = "Categoria: "+cats[ r['cat']];
  carta_header.appendChild(id_header);
  //header_share.appendChild(img_share);
  carta_header.appendChild(header_del);
  carta_body.appendChild(carta_titulo);
  carta_body.appendChild(carta_contenido);
  carta_body.appendChild(carta_categoria);
  boton_positivos.appendChild(img_boton_up);
  boton_negativos.appendChild(img_boton_down);
  boton_positivos.appendChild(carta_positivos);
  boton_negativos.appendChild(carta_negativos);
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

function SearchOpinionById(hash)
{


  $.ajax(
    {

      type:'POST',
      url: '/php/getOpByHash.php',
      data: {hash},
      dataType: 'json',
      success: function(x)
      {
              if(x!=null)
              {
                CreateCard(x);

                id = x['id'];
                var body = document.getElementById('bodyAlert');
                if(body.children.length==0)
                {
                    var alert = document.createElement('div');
                    alert.className = "alert alert-success alert-dismissible fade show text-center";
                    alert.setAttribute("role","alert");
                    alert.setAttribute("id","alertSearchResult");
                    alert.textContent = "Opinion encontrada";
                    body.appendChild(alert);
                    window.setTimeout(function() {
                        $("#alertSearchResult").fadeTo(500, 0).slideUp(500, function() {
                            $(this).remove();
                          });
                        }, 2000);
                }


                $('#titulo').val(x['titulo']);
                $('#contenido').val(x['contenido']);
                $('#inputGroupSelect01').val(x['cat']);
                $('#yt-url').val(x['video']);
                $('#img-url').val(x['img']);
                $('#img1-url').val(x['img1']);
                $('#img2-url').val(x['img2']);
                $('#img_desc0').val(x['img_desc']);
                $('#img_desc1').val(x['img_desc1']);
                $('#img_desc2').val(x['img_desc2']);
              }
              else {
                var body = document.getElementById('bodyAlert');
                if(body.children.length==0)
                {
                    var alert = document.createElement('div');
                    alert.className = "alert alert-success alert-dismissible fade show ";
                    alert.setAttribute("role","alert");
                    alert.setAttribute("id","alertSearchResult");
                    alert.textContent = "No se pudo encontrar la opinion";
                    body.appendChild(alert);
                    window.setTimeout(function() {
                        $("#alertSearchResult").fadeTo(500, 0).slideUp(500, function() {
                            $(this).remove();
                          });
                        }, 2000);
                }

              }


      },
      error: function (e)
      {

      },

    });

}
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
function checkDataMotivo()
{
      var check = false;
      var motivOp = document.getElementById('motivOp');
      check = motivOp.checkValidity();



  if($('#contenido').val().match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/) )
        check = false;



      if(check)
      motivOp.setAttribute("class","form-control mb-1 is-valid");
      if(!check)
        motivOp.setAttribute("class","form-control mb-1 is-invalid");
}


function DestroyOpinion(id,motivo)
{

              $.ajax({
                  type: 'POST',
                  url: '/php/destroyOpinion.php',
                  data: {id,motivo},
                  datatype: 'json',
                  success: function (x)
                  {
                        if(x)
                        {
                            $('#alertOpDel').text("Eliminada satisfactoriamente");
                            $("#comment_deck").empty();
                        }



                  },


              });



}
function CheckvalidUser()
{
  var inputUser = document.getElementById("userValue");

  user = inputUser.checkValidity();

  if(user)
  {
    $('#searchUser').removeAttr("disabled","true");
    inputUser.setAttribute("class","form-control mb-1 is-valid");
  }
   if(!user)
   {
     $('#searchUser').attr("disabled","true");
     inputUser.setAttribute("class","form-control mb-1 is-invalid");
   }

}
function CheckValidHashOp()
{
  var inputUser = document.getElementById("searchOp");

  user = inputUser.checkValidity();

  if(user)
  {
    $('#submitRequest').removeAttr("disabled","true");
    inputUser.setAttribute("class","form-control mb-1 is-valid");
  }
   if(!user)
   {
     $('#submitRequest').attr("disabled","true");
     inputUser.setAttribute("class","form-control mb-1 is-invalid");
   }
}
function ModifyComentario ()
{
  $('#submitcomment').click(function(e){

        $('#submitcomment').attr("disabled","true");

       e.preventDefault();
       var titulo = $('#titulo').val();
       var comentario = $('#contenido').val();
       var cat = $('#inputGroupSelect01').val();
       var video = $('#yt-url').val();
       var img = $('#img-url').val();
       var img1 = $('#img1-url').val();
       var img2 = $('#img2-url').val();

       var img_desc =$('#img_desc0').val();
        var img_desc1 = $('#img_desc1').val();
         var img_desc2 = $('#img_desc2').val();
        var id = $('#searchOp').val();
        var motivo = $('#motivOp').val();



       if(comentario.length<200)
          return;

       if(comentario.length>2080)
          return;

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
                    document.getElementById('alertSuccess').innerHTML = "	Opinion Modificada con exito";
                  $('#alertSuccess').css("visibility","visible");
              }
              if(!r.opinion_modificada)
              {
                document.getElementById('alertSuccess').innerHTML = "No se pudo modificar la opinion";
                $('#alertSuccess').css("visibility","visible");
                  $('#submitcomment').attr("disabled","false");
              }
              if(r.no_puedes_realizar_esta_accion)
              {
                document.getElementById('alertSuccess').innerHTML = "No tienes permisos para realizar esta accion";
                $('#alertSuccess').css("visibility","visible");
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
$(document).ready(function()
{


            $('#closeSuspend').click(function()
            {
                    $('btnSuspendUser').removeAttr("disabled","true");
                    $('#motivoSuspendUser').empty();


            });

            $('#closeBan').click(function()
            {
                    $('btnBanUser').removeAttr("disabled","true");
                    $('#motivoBanUser').empty();


            });

            $('#closeAct').click(function()
            {
                    $('btnActiveUser').removeAttr("disabled","true");
                    $('#motivoActUser').empty();


            });

  $('#btnBanUser').attr("disabled","true");
    $('#btnSuspendUser').attr("disabled","true");
      $('#btnActiveUser').attr("disabled","true");

            $('#ModifyCommentModal').keydown(function()
            {
                checkDataTitulo();
                checkDataContenido();
                checkDataMotivo()
            });
            $('#ModifyCommentModal').keyup(function()
            {
                checkDataTitulo();
                checkDataContenido();
                checkDataMotivo()
            });


          $('#searchOp').keyup(function()
          {
              CheckValidHashOp();


          });
          $('#searchOp').keydown(function()
          {
              CheckValidHashOp();
          });



        $('#userValue').keyup(function()
        {
            CheckvalidUser();
        });
        $('#userValue').keydown(function()
        {
            CheckvalidUser();
        });


      $('#alertBanUser').css("visibility","hidden");
        $('#alertSuspendUser').css("visibility","hidden");
          $('#alertActUser').css("visibility","hidden");
      $('#alertOp').css("visibility","hidden");
      $('#alertSuccess').css("visibility","hidden");
      $('#alertOpDel').css("visibility","hidden");

            $('#searchUser').click(function()
            {


                  var nick = $('#userValue').val();
                 SearchUser(nick);
                 GetFlags(nick);
            });


            $('#submitRequest').click(function()
            {
                var hash = $('#searchOp').val();

                  SearchOpinionById(hash);

            });

            $('#delOp').click(function()
            {
                  var id = $('#searchOp').val();
                  var motivo = $('#motivoEliminateOp').val();

                      DestroyOpinion(id,motivo);
                         $('#delOp').attr('disabled', 'disabled');
                          $('#alertOpDel').css("visibility","visible");
                         $('#alertOpDel').text('Esperando respuesta del servidor');
            });

            $('#submitcomment').click(function()
            {
              $('#alertSuccess').css("visibility","visible");
                $('#alertSuccess').text("Esperando respuesta del servidor");
              ModifyComentario();
            });

            $('#cerrarComentario').click(function()
            {
                    $('#submitcomment').removeAttr("disabled","true");
                    $('#alertOpSuccess').css("visibility","hidden");

            });




});
