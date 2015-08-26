var RecipeList = function() {
  this.recipePreviews = [];
}

RecipeList.prototype.addRecipePreview = function(recipePreview) {
  if (!recipePreview.filter()) {
    this.recipePreviews.push(recipePreview);
  }
};

RecipeList.prototype.renderView = function(data) {
  for (var i = 0; i < data.Results.length; i++) {
    this.addRecipePreview(new RecipePreview(data.Results[i]));
  }
  
  renderPage('#search-results', '.content-container', this);
  window.sessionStorage.setItem("searchResults", $('.content-container').html())
  $('span.stars').stars();
  return
};