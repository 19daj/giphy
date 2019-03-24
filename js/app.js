$(document).ready(function () {
    var drawGifs = function (data) {
        //console.log(data);
        var gif = '';
        var url = '';
        data.forEach(function (element) {
            gif = element.images.downsized_large.url;
            url = element.bitly_gif_url;
            $("#elements").append(doTemplate(gif, url));
        });
    };

    var doTemplate = function (gif, url) {
        var t = "<div class= 'element'><img id='giphy' src='" + gif + "'/><a href='" + url + "'>Ver más</a></div>";
        return t;
    }

    var ajaxGif = function (gif) {
        $.ajax({
                url: 'http://api.giphy.com/v1/gifs/search',
                type: 'GET',
                datatype: 'json',
                data: {
                    q: gif,
                    api_key: 'nuNkTSu864zosBos4wCeenB8FYlS6ZZT'
                }
            })
            .done(function (response) {
                console.log(response);
                drawGifs(response.data);
            })
            .fail(function () {
                console.log('error');
            });
    }

    $('#search-gif').click(function (event) {
        console.log('Entro');
        $("#elements").empty();
        var gif = $("#gif-text").val();
        $("#gif-text").val("");
        ajaxGif(gif);
    });
});