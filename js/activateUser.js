
$(document).ready(function()
{
              $('#alertSuccess').css("visibility","hidden");
            var hash = location.hash;
            hash = hash.replace("#","");
            var checkhash = hash.split("?", 2);
            var validHash = checkhash[0];
            var validName = checkhash[1];

            console.log(validName);

            $.ajax({
                type:'POST',
                url: '/php/activateUser.php',
                data : {validHash,validName},
                dataType: 'json',
                success: function(x)
                {
                      if(x==1)
                      {
                        $('#alertSuccess').css("visibility","visible");
                        setTimeout(function () {
                      window.location.href = "index.html"; //will redirect to your blog page (an ex: blog.html)
                          }, 2000);
                      }
                      else {
                        document.getElementById('alertSuccess').innerHTML = "No se pudo activar la cuenta";
                        setTimeout(function () {
                      window.location.href = "index.html"; //will redirect to your blog page (an ex: blog.html)
                          }, 2000);
                      }

                },





            });



});
