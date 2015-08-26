var getUserProfileEvent = function(serverUrl) {
  $('.container').on('click', '#user-icon', function(){
    var userId = window.localStorage.getItem('sessionId');
    $.ajax({
      type: "GET",
      url: serverUrl + "/dashboard",
      data: { userId: userId },
      dataType: "json"
    }).then(function(response){
      var template = $('#user-dashboard-template').html();
      var output = Mustache.render(template, { favorites: response.dashboardInfo, name: response.userName });
      $('.content-container').html(output);
    });
  });
};