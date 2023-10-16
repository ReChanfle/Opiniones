

function AjaxGetRedes()
{

      $.ajax(
        {
          type: 'GET',
          url: '/php/getRedes.php',
          datatype: 'json',
          success: function(x)
          {
              var temp = JSON.parse(x);

              var url_yt = "https://www.youtube.com/channel/"+temp['youtube'];

              var url_fb = "https://www.facebook.com/"+temp['facebook'];

              var url_tw = "https://twitter.com/"+temp['twitter'];

              var url_insta = "https://www.instagram.com/"+temp['instagram'];

              document.getElementById('yt_user').setAttribute("href",url_yt);
                document.getElementById('fb_user').setAttribute("href",url_fb);
                  document.getElementById('tw_user').setAttribute("href",url_tw);
                    document.getElementById('insta_user').setAttribute("href",url_insta);
                  //  document.getElementById('button_user_opinion').innerHTML = "Creado por:"+temp['nickname'];




          },
      });

}


$(document).ready(function()
{

    //  AjaxGetRedes();


});
