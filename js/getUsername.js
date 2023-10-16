

function LogOut(name)
{


            $.ajax({
            type: 'POST',
            url: '/php/destroysession.php',
            data: {name},
            dataType : "text",
            success: function(r)
            {
                if(r==1 )
            location.assign("index.html");

            },
            error: function(x)
            {
                console.log(x.responseText);
            }

          });

}


function Score()
{

        $.ajax({
            type:'GET',
            url: '/php/scoreBoard.php',
            //data: {id_user},
            datatype: 'json',
            success: function (x)
            {
                      if(x)
                      {
                          var s = JSON.parse(x);
                          if(!s.error)
                          {

                              $('#scoreUser').text(s.total_puntos);
                              document.getElementById("pointsLikesBox").innerHTML = "Puntos por Opiniones: "+s.puntos_likes;
                                document.getElementById("pointsOpBox").innerHTML = "Puntos por creacion de Opiniones: "+s.puntos_op;
                                  document.getElementById("penalty_points").innerHTML = "Puntos descontados: "+s.puntos_infracciones;
                                  document.getElementById("totalPoints").innerHTML = "Puntos Totales: "+s.total_puntos;
                          }
                      }
                  else
                  {
                      $('#scoreUser').text("E");
                  }
            },





        });


}

function Notifications()
{
      $.ajax({
            type: 'GET',
            url: '/php/notifications.php',
            datatype: 'json',
            success: function(x)
            {
                    if(x)
                    {
                          var r = JSON.parse(x);
                          CreateBadge(r.length);
                          MarkReadNotif(r);
                          for(i in r)
                          {
                            var alert = document.createElement("div");
                            alert.className = "alert alert-success text-center";
                            alert.setAttribute("role","alert");

                              if(r[i].type==1)
                              var content = "has sumado +10 puntos por tu Opinion,Sigue asi!! ";
                              if(r[i].type==3)
                              {
                              var content = ", "+r[i].sender_name+", a votado tu Opinion #"+r[i].id_op+", has sumado +1 punto";
                              }

                              alert.textContent =  r[i].recipient_name+" "+content+", "+"Fecha: "+ r[i].creation_date;


                              var parent = document.getElementById("notifAlert");

                              parent.appendChild(alert);


                          }

                          if(r.length==0)
                          {
                            var alert = document.createElement("div");
                            alert.className = "alert alert-info text-center";
                            alert.setAttribute("role","alert");
                            alert.textContent =  "Nada por aqui";
                            document.getElementById('cleanNotif').disabled = true;

                            var parent = document.getElementById("notifAlert");

                            parent.appendChild(alert);

                          }
                          else {
                            document.getElementById('cleanNotif').disabled = false;
                          }





                    }



            },


      });


        $('#cleanNotif').click(function()
        {
                $('#notifAlert').empty();
                //$('#quantityNotif').text("0");

                $('#quantityNotif').remove();

                window.setTimeout(function() {
                            location.reload();
                    }, 1000);



        });



}

function MarkReadNotif(r)
{

  $('#cleanNotif').click(function()
  {
          var ids = [];

                for(i in r)
                {
                      ids[i]  = r[i].recipient_id;
                      console.log(ids[i]);
                }



              $.ajax({
                  type: 'GET',
                  url: '/php/notifications.php',
                  data:  {ids:ids},
                  success: function(x)
                  {
                          console.log(x);


                  },




              });

      });
}

function CreateBadge(number)
{

        if(number>0)
        {
          var span = document.createElement("span");
          span.setAttribute("class","badge badge-pill badge-danger align-top");
          span.setAttribute("id","quantityNotif");
          span.textContent = number;
          var parent = document.getElementById("badgeNotifications");
          parent.appendChild(span);
        }




}

$(document).ready(function()
{

  var status = {user:null, tipo_user:0,id_user: null};


      $.ajax({
        type: 'GET',
        url: '/php/getUsername.php',
        data: {name},
        dataType : "json",
        success: function(r)
        {
          status.user=r['user'];
          status.tipo_user = r['tipo_user'];
          //status.id_user = r['id_user'];
          Score();
          Notifications();

            if(r['user']==null)
            {
            document.getElementById("user").innerHTML = "Ingresar";

            $('#user').attr("not_logued",true);
            //visibilidad de menu de usuario
            $('#userMenu').css('visibility', 'hidden');

            }

            else
            {
            document.getElementById("user").innerHTML = r['user'];

            $('#user').click(function()
            {

                    window.location.replace ("/user.html#"+r['user']);



            });


              if(r['tipo_user']==1)
              {
                document.getElementById("panelAdmin").hidden = false;

              }

            //var miCuentaSalir = document.getElementById("salir");
            //miCuentaSalir.setAttribute("onclick","LogOut("+r['user']+")");
            }



        },

  });


          $("#user").click(function(e)
              {
            //modificacion usuario
            e.preventDefault();
              if(status.user==null)
              window.location.replace ("/login.html");

                else
                {


                }



                });

                $('#salir').click(function(e)
                {

                    e.preventDefault();
                      LogOut(status.user);


                });
                $("#botonOpinion").click(function(e)
                    {
                        e.preventDefault();
                        if(status.user==null)
                          window.location.replace ("/login.html");
                    });

                $('#panelAdmin').click(function(d)
                {
                    d.preventDefault();
                  window.location.replace ("/admin.html");
                });

                var win = $(this);
                if (win.width()<= 600) {
                        $('#botonOpinion').addClass('mb-1');
                        $('#searchValue').addClass('mb-1');
                        $('#comment_deck').addClass('d-flex flex-column');
                        $('#labelCat').addClass('input-group-sm');
                        $('#labelCat1').addClass('input-group-sm');
                        $('#labelCat2').addClass('input-group-sm');



                }
                 else
                 {
                          $('#botonOpinion').removeClass('mb-1');
                            $('#searchValue').removeClass('mb-1');
                          $('#comment_deck').removeClass('d-flex flex-column');
                          $('#labelCat').removeClass('input-group-sm');
                          $('#labelCat1').addClass('input-group-sm');
                          $('#labelCat2').addClass('input-group-sm');
                  }



});
