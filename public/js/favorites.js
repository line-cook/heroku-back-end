var addFavorite = function(serverUrl) {
  $('.container').on('click', '#favorite-icon', function(event) {
    var sessionInfo = window.localStorage.getItem("sessionId");
    if (sessionInfo){
      var $favorite = $(event.target)
      $.ajax({
        type: "POST",
        url: serverUrl + "/favorites",
        data: $favorite.data()
      }).then(function(response){
        alert(response.status);
      });
    } else { alert("Sorry, please sign in to create favorites!") }
  });
};