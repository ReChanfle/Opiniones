
$(document).ready(function()
{
          $('#alertSuccess').css("visibility","hidden");

  $('#submitforget').click(function(e)
  {

    document.getElementById('submitforget').disabled = true;

            e.preventDefault();


            var hash = location.hash;
            hash = hash.replace("#","");
            var checkhash = hash.split("?", 3);
            var validHash = checkhash[0];
            var validName = checkhash[1];
            var validEmail = checkhash[2];
            var pass = $('#pass').val();
            var pass1 = $('#pass1').val();

            $('#alertSuccess').css("visibility","visible");
              document.getElementById('alertSuccess').innerHTML = "Esperando respuesta del servidor, no cierras la ventana";

            $.ajax({
                type: 'POST',
                url: '/php/recovery.php',
                data: {pass,pass1,validHash,validName,validEmail},
                datatype: 'json',
                success: function(t)
                {
                        var x = JSON.parse(t);

                        if(x.exito && x.email)
                        {
                          $('#alertSuccess').css("visibility","visible");
                            document.getElementById('alertSuccess').innerHTML = "Se ha reestablecido la contraseña satisfactoriamente, se ha enviado un email a tu casilla de correo";
                          setTimeout(function () {
                         window.location.href = "index.html"; //will redirect to your blog page (an ex: blog.html)
                       }, 4000);

                        }
                         if(x.contrasenas_no_coinciden) {
                          $('#alertSuccess').css("visibility","visible");
                          document.getElementById('alertSuccess').innerHTML = "Las Contraseñas no coinciden";
                              document.getElementById('submitforget').disabled = false;

                        }
                         if(x.error_conexion) {
                          $('#alertSuccess').css("visibility","visible");
                          document.getElementById('alertSuccess').innerHTML = "No se pudo establecer la conexion con el servidor";
                              document.getElementById('submitforget').disabled = false;

                        }
                         if(x.no_se_pudo_enviar_form) {
                          $('#alertSuccess').css("visibility","visible");
                          document.getElementById('alertSuccess').innerHTML = "No se pudo ejecutar la solicitud";
                              document.getElementById('submitforget').disabled = false;

                        }
                         if(x.codigo_incorrecto) {
                          $('#alertSuccess').css("visibility","visible");
                          document.getElementById('alertSuccess').innerHTML = "Codigo incorrecto";
                              document.getElementById('submitforget').disabled = false;

                        }



                },







            });



          });





});
