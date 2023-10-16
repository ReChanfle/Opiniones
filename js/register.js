

function init()
{
  $.ajax({
    type: 'GET',
    url: '/php/register.php',
    dataType : "text",
    success: function(r)
    {
          if(r==9)
          {
              window.location.href = "index.html";
          }


    },
    error: function(x)
    {

    }

});



}

$(window).on( "load", function() {init(); })

  $(document).ready(function()
  {


  $('#pass').empty();
  $('#user').empty();
  $('#email').empty();
  $('#submitregister').attr("disabled","true");
  $('#checkTerminos').prop('checked',false);

        $('#checkTerminos').click(function()
        {


          if ($('#checkTerminos').is(":checked"))
          {
                $('#submitregister').removeAttr("disabled","true");

          }
          else {
              $('#submitregister').attr("disabled","true");
          }

        });





        $('#alertSuccess').css("visibility","hidden");


    $('#submitregister').click(function(e){



               e.preventDefault();
               //solo se envia la solicitud si los datos son validados.

                var user = $('#user').val();
                  var pass = $('#pass').val();
                    var email = $('#email').val();
                      $('#submitregister').attr("disabled","true");
                    $('#alertSuccess').css("visibility","visible");
                      $('#alertSuccess').text("Esperando respuesta del servidor");

                      $.ajax({
                        type: 'POST',
                        url: '/php/register.php',
                        data: {user , pass, email},
                        dataType : "text",
                        success: function(r)
                        {
                          //var stat = JSON.parse(r);
                              $('#submitregister').attr("disabled","true");
                           if(r==1)
                           {

                                $('#alertSuccess').text("Registro exitoso!Te enviamos un link para que actives tu cuenta!,seras redireccionado");


                                     setTimeout(function () {
                                    window.location.href = "index.html"; //will redirect to your blog page (an ex: blog.html)
                                  }, 4000);

                           }

                            if(r==2){
                                          $('#alertSuccess').text("Usuario existente!");
                                          $('#alertSuccess').css("visibility","visible");

                                            $('#pass').empty();
                                            $('#user').empty();
                                            $('#email').empty();
                                          setTimeout(function () {
                                         window.location.href = "register.html"; //will redirect to your blog page (an ex: blog.html)
                                       }, 2000);
                           }

                            if(r==3)
                           {
                                              $('#alertSuccess').text("Email en uso!");
                                                 $('#alertSuccess').css("visibility","visible");

                                                   $('#pass').empty();
                                                   $('#user').empty();
                                                   $('#email').empty();
                                                 setTimeout(function () {
                                                window.location.href = "register.html"; //will redirect to your blog page (an ex: blog.html)
                                              }, 2000);



                           }
                           if(r==4)
                          {
                                             $('#alertSuccess').text("Error en la inscripcion");
                                                $('#alertSuccess').css("visibility","visible");

                                                  $('#pass').empty();
                                                  $('#user').empty();
                                                  $('#email').empty();
                                                setTimeout(function () {
                                               window.location.href = "register.html"; //will redirect to your blog page (an ex: blog.html)
                                             }, 2000);



                          }
                          if(r==5)
                         {
                                            $('#alertSuccess').text("Caracteres no permitidos en Campo: Usuario");
                                               $('#alertSuccess').css("visibility","visible");

                                                 $('#pass').empty();
                                                 $('#user').empty();
                                                 $('#email').empty();
                                               setTimeout(function () {
                                              window.location.href = "register.html"; //will redirect to your blog page (an ex: blog.html)
                                            }, 2000);


                         }
                         if(r==6)
                        {
                                           $('#alertSuccess').text("Campo: Usuario, vacio");
                                              $('#alertSuccess').css("visibility","visible");

                                                $('#pass').empty();
                                                $('#user').empty();
                                                $('#email').empty();
                                              setTimeout(function () {
                                             window.location.href = "register.html"; //will redirect to your blog page (an ex: blog.html)
                                           }, 2000);


                        }
                        if(r==7)
                       {
                                          $('#alertSuccess').text("Campo: Contraseña, vacio");
                                             $('#alertSuccess').css("visibility","visible");

                                               $('#pass').empty();
                                               $('#user').empty();
                                               $('#email').empty();
                                             setTimeout(function () {
                                            window.location.href = "register.html"; //will redirect to your blog page (an ex: blog.html)
                                          }, 2000);


                       }
                       if(r==8)
                      {
                                         $('#alertSuccess').text("Campo: Email, vacio");
                                            $('#alertSuccess').css("visibility","visible");

                                              $('#pass').empty();
                                              $('#user').empty();
                                              $('#email').empty();
                                            setTimeout(function () {
                                           window.location.href = "register.html"; //will redirect to your blog page (an ex: blog.html)
                                         }, 2000);


                      }

                        },
                        error: function(x)
                        {
                            console.log(x.responseText);
                        }

                    });





    });







  });
