var renderSplash = function(selectorOne, selectorTwo, destination){
  if (window.localStorage.getItem("sessionId")) {
    var indexTemplate = Mustache.render($(selectorOne).html());
  } else {
    var indexTemplate = Mustache.render($(selectorTwo).html());
  }
  $(destination).html(indexTemplate);
};

var renderPage = function(templateSelector, destinationSelector, jsonObject) {
  var template = $(templateSelector).html();
  var output = Mustache.render(template, jsonObject);
  $(destinationSelector).html(output);
};

var renderAppend = function(templateSelector, destinationSelector, jsonObject) {
  var template = $(templateSelector).html();
  var output = Mustache.render(template, jsonObject);
  $(destinationSelector).append(output);
}