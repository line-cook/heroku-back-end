var recipeSearchEvent = function(apiRequest){
  $('.container').on('submit', '#search-form', function(event) {
    event.preventDefault();
    var data = $('#search').val();
    $('#search').val('');
    renderSplash('#logged-in', '#logged-out', '.container');
    $('body').css("background-color", "#FFF");
    apiRequest(data);
  });
};

var signUpEvent = function(serverUrl) {
  $('.container').on('submit', '.signup-form', function(event) {
    event.preventDefault();

    $target = $(event.target)
    $.ajax({
      url: serverUrl + "/signup",
      type: "POST",
      data: $target.serialize(),
      dataType: "json"
    }).then(function(response) {
      window.localStorage.setItem("sessionId", response.id);
      var indexTemplate = Mustache.render($('#logged-in').html());
      $('.container').html(indexTemplate);
      $('body').css("background-color", "#FFF");
    }).fail(function(response) {
      alert(response.responseText);
    })
  });
};

var signInEvent = function(serverUrl) {
  $('.container').on('submit', '.signin-form', function(event) {
    event.preventDefault();

    $target = $(event.target)
    $.ajax({
      url: serverUrl + "/signin",
      type: "POST",
      data: $target.serialize(),
      dataType: "json"
    }).then(function(response) {
      window.localStorage.setItem("sessionId", response.id);
      var indexTemplate = Mustache.render($('#logged-in').html());
      $('.container').html(indexTemplate);
      $('body').css("background-color", "#FFF");
    }).fail(function(response) {
      $target.find('input[name="user[password]"]').val('');
      alert("Wrong username or password");
    });
  });
};