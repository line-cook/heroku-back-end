 var getRecipeEvent = function(apiRequest){
  $('.container').on('click', '.recipe-container', function(event) {
    var $target = $(event.target);
    var recipeId = $target.closest('.recipe-container')[0].dataset.recipeid;
    apiRequest(recipeId);
  });
};

var getSignUpFormEvent = function(){
  $('.container').on('click', '.signup-link', function(event) {
    event.preventDefault();
    var loginTemplate = Mustache.render($('#sign-up-template').html());
    $('.navbar-collapse').collapse('toggle')
    $('.content-container').html(loginTemplate);
  });
};

var goBackSearchResultsEvent = function() {
  $('.container').on('click', '.back-search-results', function(event) {
    event.preventDefault();
    $('.content-container').html(window.sessionStorage.getItem("searchResults"));
    $('span.stars').stars();
    window.scrollTo(0, 0);
  });
};

var goBackRecipeEvent = function() {
  $('.container').on('click', '.back-recipe', function(event) {
    event.preventDefault();
    $('.content-container').html(window.sessionStorage.getItem("recipeResult"));
    $('span.stars').stars();
    Ears.stopListening();
    clearBinds();
    window.scrollTo(0, 0);
  });
};

var signOutEvent = function() {
  $('.container').on('click', '.signout-link', function(event) {
    event.preventDefault();
    window.localStorage.removeItem("sessionId");
    var indexTemplate = Mustache.render($('#home-page-logged-out').html());
    $('.container').html(indexTemplate);
    $('body').css("background-color", "#A2DAE2");
  });
};

var goHomeEvent = function() {
  $('.container').on('click', '.home-glyph', function(event) {
    event.preventDefault();
    $('body').css("background-color", "#A2DAE2");
    renderSplash('#home-page-logged-in', '#home-page-logged-out', '.container');
  });
};
