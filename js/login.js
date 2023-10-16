

function checkData()
{

  var inputUser = document.getElementById("username");

  user = inputUser.checkValidity();

  if(user)
   return true;
else {
  return false;
}

}

function init()
{
   $('#pass').val("");
   $('#username').val("");





}

function checkIfLoggued()
{
  $.ajax({
    type: 'GET',
    url: '/php/login.php',
    dataType : "json",
    success: function(r)
    {

          if(r.logueado==1)
          window.location.href = "index.html";
   },

});
}



$(window).on( "load", function() {checkIfLoggued(); })


  $(document).ready(function()
  {

            init();

      $('#alertSuccess').css("visibility","hidden");

    $('#submitlogin').click(function(e){

        var usuario_campo = $('#username').val();
        var contrasena_campo = $('#pass').val();
         e.preventDefault();

           if(checkData())
        $.ajax({
          type: 'POST',
          url: '/php/login.php',
          data: {usuario_campo , contrasena_campo},
          dataType : "json",
          success: function(r)
          {

                if(r.logueado==1)
                window.location.href = "index.html";
            //var stat = JSON.parse(r);
             if(r.estado_inicio_sesion==1 && r.tiempo_suspension ==0 && r.usuario_no_encontrado==0 )
             {
                 document.getElementById('alertSuccess').innerHTML = "Inicio de sesion exitoso! Seras redireccionado.";
              $('#alertSuccess').css("visibility","visible");

              setTimeout(function () {
            window.location.href = "index.html"; //will redirect to your blog page (an ex: blog.html)
          }, 1000);

             }
             else if(r.baneado!=0)
             {
               $('#alertSuccess').css("visibility","visible");
                 document.getElementById('alertSuccess').innerHTML = "Este usuario esta inhabilitado permanentemente";
             }
             else if (r.estado_inicio_sesion==1 && r.tiempo_suspension !=0 && r.usuario_no_encontrado==0 )
             {
               document.getElementById('alertSuccess').innerHTML = "Estas suspendido hasta el: "+r.tiempo_suspension;
            $('#alertSuccess').css("visibility","visible");
             }
             else if(r.estado_inicio_sesion==1 && r.tiempo_suspension ==0 && r.usuario_no_encontrado==1)
             {
               $('#alertSuccess').css("visibility","visible");
                 document.getElementById('alertSuccess').innerHTML = "No se encontro el usuario";
             }
             else if (r.contrasena_incorrecta==1)
             {
               $('#alertSuccess').css("visibility","visible");
                 document.getElementById('alertSuccess').innerHTML = "Contraseña incorrecta";
             }

          },
          error: function(x)
          {
              console.log(x.responseText);
          }

      });


    });







  });
