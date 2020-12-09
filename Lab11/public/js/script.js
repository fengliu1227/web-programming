(function($) {
    // Let's start writing AJAX calls!


    var searchForm = $('#searchFrom');
    var show = $('#show');
    var showList = $('#showList');
    var submitButton = $('#submitButton');
    var searchTerm = $('search_term');

    function appendChild(List) {
        show.empty();
        show.hide();
        $("#homeLink").hide();
        showList.show();
        for (var i of List) {
            showList.append("<li>" + "<a href =" + i._links.self.href + " class=\"link\" data-id=\"" + i.id.toString() + "\">" + i.name + "</li>");
        }
    }

    function appendChildForSearch(List) {
        show.empty();
        show.hide();
        showList.show();
        $("#homeLink").hide();
        for (var i of List) {
            showList.append("<li>" + "<a href =" + i.show._links.self.href + " class=\"link\" data-id=\"" + i.show.id.toString() + "\">" + i.show.name + "</li>");
        }
    }

    function resetList() {
        showList.empty();
        showList.hide();
    }

    function showDetail(item) {
        if (item[0]) {
            show.append("<div id=\"div-left\" class=\"div-left\"></div>")
            if (item[0].name) {
                $("#div-left").append("<h1>" + item[0].name + "</h1>");
            } else {
                $("#div-left").append("<h1>Opps!!! No name???? Can you believe that?</h1>");
            }


            if (item[0].image && item[0].image.medium) {
                $("#div-left").append("<img src=" + item[0].image.medium + "></img>");
            } else {
                $("#div-left").append("<img src=\"/public/image/no_image.jpeg\"></img>");
            }
            show.append("<div id=\"div-right\" class=\"div-right\"></div>")
            $("#div-right").append("<dl id=\"show-info\"></dl>");
            $("#show-info").append("<dt>Language</dt>");


            if (item[0].language) {
                $("#show-info").append("<dd>" + item[0].language + "</dd>");
            } else {
                $("#show-info").append("<dd>N/A</dd>");
            }

            $("#show-info").append("<dt id=\"dt-genres\">Genres</dt>");
            $("#dt-genres").append("<ul id =\"ul-genres\"></ul>")
            for (var x of item[0].genres) {
                $("#ul-genres").append("<li>" + x + "</li>");
            }

            $("#show-info").append("<dt>Average rating</dt>");
            if (item[0].rating && item[0].rating.average) {
                $("#show-info").append("<dd>" + item[0].rating.average + "</dd>");
            } else {
                $("#show-info").append("<dd>N/A</dd>");
            }

            $("#show-info").append("<dt>Network</dt>");
            if (item[0].network && item[0].network.name) {
                $("#show-info").append("<dd>" + item[0].network.name + "</dd>");
            } else {
                $("#show-info").append("<dd>N/A</dd>");
            }

            $("#show-info").append("<dt>Summary</dt>");
            if (item[0].summary) {
                $("#show-info").append("<dd>" + item[0].summary + "</dd>");
            } else {
                $("#show-info").append("<dd>N/A</dd>");
            }
        } else {
            show.append("<h1>Opps!!! Not Found</h1>");
        }

        showList.hide();
        show.show();
        $("#homeLink").show();
    }

    var requestConfig = {
        method: 'GET',
        url: '/api/shows'
    };
    $.ajax(requestConfig).then(function(responseMessage) {
        var newElement = $(responseMessage);
        appendChild(newElement);
    });

    submitButton.on('click', function() {
        event.preventDefault();
        var term = $('#search_term').val();

        var requestConfig = {
            method: 'POST',
            url: '/api/shows/' + term
        }
        $.ajax(requestConfig).then(function(responseMessage) {
            var newElement = $(responseMessage);
            resetList();
            appendChildForSearch(newElement);
        })
    });


    $('#showList').on('click', 'li', function(event) {
        event.preventDefault();
        var currentId = $(this).children().data("id");

        var requestConfig = {
            method: 'GET',
            url: '/api/shows/' + currentId
        }

        $.ajax(requestConfig).then(function(responseMessage) {
            var newElement = $(responseMessage);
            showDetail(newElement);
        });
    });



})(window.jQuery);