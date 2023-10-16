


function GetData(name)
{

          $.ajax({

                type: 'GET',
                url: '/php/userProfile.php',
                data: {name},
                dataType: 'json',
                success: function(x)
                {

                        console.log(x);
                        $('#buttonOp').text(x.cant_op);
                        $('#buttonRep').text(x.rep);
                        if(x.url_img_user!=null)
                        $('#avatar').attr("src",x.url_img_user);
                        else {
                            $('#avatar').attr("src","/img/user_profile.png");
                        }
                        $('#username').text(x.nickname);
                        $('#web').attr("href",x.web);
                        $('#youtube').attr("href","http://youtube.com/"+x.youtube);
                        $('#twitter').attr("href","http://twitter.com/"+x.twitter);
                        $('#instagram').attr("href","http://instagram.com/"+x.instagram);
                        $('#facebook').attr("href","http://facebook.com/"+x.facebook);

                        Achivements(x.id_user);

                },

                error: function(e)
                {

                      console.log(e.responseText);



                },

          });

}

function RecentOps(name)
{
  $.ajax({

        type: 'GET',
        url: '/php/recentOpProfile.php',
        data: {name},
        dataType: 'json',
        success: function(x)
        {

                for(var i in x)
                {
                        var link = "/opinion.html#"+x[i].id;
                        var a = document.createElement("a");
                        var span_pos = document.createElement("span");
                        var span_nen = document.createElement("span");
                        var parent = document.getElementById('list_op_recent');
                        span_pos.className = "badge bg-info rounded-pill ";
                        span_nen.className = "badge bg-info rounded-pill";
                        a.className = "list-group-item list-group-item-action text-white bg-secondary";
                        a.setAttribute("href",link);
                        a.textContent = x[i].titulo.slice(0,15)+"...";
                        span_pos.textContent = "⇑ "+x[i].positivos;
                        span_nen.textContent ="⇓ "+x[i].negativos;
                        a.appendChild(span_pos);
                          a.appendChild(span_nen);
                        parent.appendChild(a);

                }

        },
        error: function (e)
        {
              console.log(e);



        },

  });

}

function Achivements(id)
{
  $.ajax({
      type: 'GET',
      url: '/php/achivements.php',
      data: {id},
      dataType: 'json',
      success: function(x)
      {

                $('#achivement_op_pro').attr("style","width:"+x.cant_op+"%");

                  $('#achivement_op_pro_level').text(Levels(x.cant_op));

                    $('#achivement_op_comp').attr("style","width:"+x.op_comp+"%");

                      $('#achivement_op_comp_level').text(Levels(x.op_comp));

                        $('#achivement_op_contro').attr("style","width:"+x.cant_negativos+"%");

                          $('#achivement_contro_level').text(Levels(x.cant_negativos));

                            $('#achivement_op_conse').attr("style","width:"+x.cant_positivos+"%");

                              $('#achivement_op_conse_level').text(Levels(x.cant_positivos));

      },
      error: function (e)
      {
          console.log(e);
      },


  });





}

function Levels(level_op)
{
              var nivel = "Nivel:";
              var levels = [0, 1, 2, 3, 4 , 5 , 6 , 7 , 8 ];
              var points = [0 ,100, 200, 300, 400 , 500 , 600 , 700 , 800 ];
             for (var i in levels)
             {
                  if(level_op>=points[i])
                  {

                    return nivel+levels[i];

                  }



             }



}

$(document).ready(function()
{

          var name = location.hash;
            name = name.replace('#','');
            //console.log(hash);

      GetData(name);
      RecentOps(name);



});
