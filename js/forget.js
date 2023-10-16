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
function Spinner(id,destroy)
{

    var spinner_parent = document.getElementById(id);

      if(destroy)
      {
        while (spinner_parent.hasChildNodes()) {
          spinner_parent.removeChild(spinner_parent.firstChild);
              }
      }
      else
      {

        var spinner_div = document.createElement('div')
        var span = document.createElement("span");

        spinner_div.className = "spinner-border text-info mt-2";
        span.className = "sr-only";
        span.textContent = "Cargando";

        spinner_div.appendChild(span)
        spinner_parent.appendChild(spinner_div);
      }





}
function RecoverByUser()
{

      $('#recover_user').click(function()
      {

                BackUser();
                $(this).remove();
                $('#recover_email').remove();
                var form = document.getElementById('form');

                var input_field = document.createElement('input');
                var but = document.createElement('button');
                var back = document.createElement('button');


                back.className = "btn btn-lg btn-danger btn-block mt-2";
                back.textContent = "Atras";
                back.setAttribute('id','back');


                but.className = "btn btn-lg btn-primary btn-block mt-2";
                but.setAttribute('id','submitforget');
                but.textContent = "Recuperar";
                input_field.setAttribute('type','text');
                input_field.setAttribute('id','username');
                input_field.setAttribute('placeholder','Usuario');
                input_field.setAttribute('minlength','5');
                input_field.setAttribute('maxlength','15');
                input_field.setAttribute('pattern','[a-zA-Z0-9-]+');
                input_field.setAttribute('title','Solo se admiten mayusculas, minusculas y numeros, Minimo 5 caracteres.');
                input_field.className = "mt-2 form-control";
                input_field.required = true;
                form.appendChild(input_field);
                form.appendChild(but);
                form.appendChild(back);

                $('#submitforget').click(function(e)
                {

                      e.preventDefault();
                      Spinner("spinner");
                      var user = $('#username').val();
                    //document.getElementById('submitforget').disabled = true;



                    if(user.length>4)
                      $.ajax({
                            type:'POST',
                            url: '/php/forget.php',
                            data: {user},
                            dataType:'json',
                            success: function(x)
                            {
                                  if(x.exito)
                                  {
                                    Spinner("spinner",1);
                                    var string = "ingreso Exitoso,seras redireccionado";
                                    var id = "bodyAlert";
                                    Alert(id,string);
                                    setTimeout(function () {
                                   window.location.href = "index.html"; //will redirect to your blog page (an ex: blog.html)
                                 }, 8000);

                                  }
                                  else if(x.ingresos_no_validos) {
                                    Spinner("spinner",1);
                                    var string = "Datos no validos";
                                    var id = "bodyAlert";
                                    Alert(id,string);
                                  //  document.getElementById('alertSuccess').innerHTML = "Credenciales no validas";
                                        document.getElementById('submitforget').disabled = false;

                                  }
                                  else if(x.usuario_vacio) {
                                    Spinner("spinner",1);
                                    var string = "Completa campo: Usuario";
                                    var id = "bodyAlert";
                                    Alert(id,string);
                                  //  document.getElementById('alertSuccess').innerHTML = "Completa campo: Usuario";
                                        document.getElementById('submitforget').disabled = false;

                                  }
                              //    else if(x.email_vacio) {
                              //      var string = "Completa campo: Email";
                              //      var id = "bodyAlert";
                              //      Alert(id,string);
                                  //  document.getElementById('alertSuccess').innerHTML = "Completa campo: Email";
                              //          document.getElementById('submitforget').disabled = false;

                              //    }
                                  else if(x.error_envio) {
                                    Spinner("spinner",1);
                                    var string = "No se pudo ejecutar la solicitud";
                                    var id = "bodyAlert";
                                    Alert(id,string);
                                  //  document.getElementById('alertSuccess').innerHTML = "No se pudo ejecutar la solicitud";
                                        document.getElementById('submitforget').disabled = false;

                                  }
                                  else if(x.usuario_no_valido) {
                                    Spinner("spinner",1);
                                    var string = "Caracteres invalidos";
                                    var id = "bodyAlert";
                                    Alert(id,string);
                                  //  document.getElementById('alertSuccess').innerHTML = "No se pudo ejecutar la solicitud";
                                        document.getElementById('submitforget').disabled = false;

                                  }
                            },






                      });
                      else if(user.length<4) {
                        var id="bodyAlert";
                        var string = "Campo usuario: Vacio.";
                        Alert(id,string);
                      }


                });




      });




}

function RecoverByEmail()
{

      $('#recover_email').click(function()
      {
                BackEmail();

                $(this).remove();
                $('#recover_user').remove();
                var form = document.getElementById('form');

                var input_field = document.createElement('input');
                var but = document.createElement('button');
                var back = document.createElement('button');


                back.className = "btn btn-lg btn-danger btn-block mt-2";
                back.textContent = "Atras";
                back.setAttribute('id','back');
                but.className = "btn btn-lg btn-primary btn-block mt-2";
                but.setAttribute('id','submitforget');
                but.textContent = "Recuperar";


                input_field.setAttribute('type','email');
                input_field.setAttribute('id','email');
                input_field.setAttribute('placeholder','Email');
                input_field.className = "mt-2 form-control";
                input_field.required = true;


                form.appendChild(input_field);
                form.appendChild(but);
                form.appendChild(back);

                $('#submitforget').click(function(e)
                {

                      e.preventDefault();
                      Spinner("spinner");
                      var email = $('#email').val();

                    //document.getElementById('submitforget').disabled = true;
                      if(email.length>0)
                      $.ajax({
                            type:'POST',
                            url: '/php/forget.php',
                            data: {email},
                            dataType:'json',
                            success: function(x)
                            {
                                  if(x.exito)
                                  {
                                    Spinner("spinner",1);
                                    var string = "ingreso Exitoso,seras redireccionado";
                                    var id = "bodyAlert";
                                    Alert(id,string);
                                    setTimeout(function () {
                                   window.location.href = "index.html"; //will redirect to your blog page (an ex: blog.html)
                                 }, 8000);

                                  }
                                  else if(x.ingresos_no_validos) {
                                    Spinner("spinner",1);
                                    var string = "Datos no validos";
                                    var id = "bodyAlert";
                                    Alert(id,string);
                                  //  document.getElementById('alertSuccess').innerHTML = "Credenciales no validas";
                                        document.getElementById('submitforget').disabled = false;

                                  }
                                //  else if(x.usuario_vacio) {
                                //    var string = "Completa campo: ";
                                //    var id = "bodyAlert";
                                //    Alert(id,string);
                                  //  document.getElementById('alertSuccess').innerHTML = "Completa campo: Usuario";
                                  //      document.getElementById('submitforget').disabled = false;

                                //  }
                                  else if(x.email_vacio) {
                                    Spinner("spinner",1);
                                    var string = "Completa campo: Email";
                                    var id = "bodyAlert";
                                    Alert(id,string);
                                  //  document.getElementById('alertSuccess').innerHTML = "Completa campo: Email";
                                        document.getElementById('submitforget').disabled = false;

                                  }
                                  else if(x.error_envio) {
                                    Spinner("spinner",1);
                                    var string = "No se pudo ejecutar la solicitud";
                                    var id = "bodyAlert";
                                    Alert(id,string);
                                  //  document.getElementById('alertSuccess').innerHTML = "No se pudo ejecutar la solicitud";
                                        document.getElementById('submitforget').disabled = false;

                                  }
                                  else if(x.email_no_valido) {
                                    Spinner("spinner",1);
                                    var string = "Direccion de correo no valida";
                                    var id = "bodyAlert";
                                    Alert(id,string);
                                  //  document.getElementById('alertSuccess').innerHTML = "No se pudo ejecutar la solicitud";
                                        document.getElementById('submitforget').disabled = false;

                                  }
                            },






                      });
                      else  {
                        var id="bodyAlert";
                        var string = "Campo email: Vacio.";
                        Alert(id,string);
                      }


                });





      });




}

function BackUser()
{
      $('#form').on('click', '#back',function()
      {


            //document.getElementById('username').setAttribute("required","false");
          //  document.getElementById('email').setAttribute("required","false");
            $('#submitforget').remove();
            $('#username').remove();

            var button_user = document.createElement('button');
            var button_email = document.createElement('button');
            var form = document.getElementById('form');

            button_user.className = "btn btn-lg btn-primary btn-block mt-2";
            button_email.className = "btn btn-lg btn-primary btn-block mt-2";
            button_user.setAttribute("id","recover_user");
            button_user.setAttribute("id","recover_email");

            form.appendChild(button_user);
            form.appendChild(button_email);


      });




}
function BackEmail()
{
      $('#form').on('click', '#back',function()
      {


            //document.getElementById('email').setAttribute("required","false");
          //  document.getElementById('email').setAttribute("required","false");
            $('#submitforget').remove();
            $('#email').remove();

            var button_user = document.createElement('button');
            var button_email = document.createElement('button');
            var form = document.getElementById('form');

            button_user.className = "btn btn-lg btn-primary btn-block mt-2";
            button_email.className = "btn btn-lg btn-primary btn-block mt-2";
            button_user.setAttribute("id","recover_user");
            button_user.setAttribute("id","recover_email");

            form.appendChild(button_user);
            form.appendChild(button_email);


      });




}



$(document).ready(function()
{

          RecoverByUser();
          RecoverByEmail();












});
