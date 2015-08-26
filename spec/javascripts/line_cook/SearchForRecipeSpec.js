describe("Return the recipe search results", function() {
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'spec/';
    jasmine.getFixtures().load('index-fake.html');
    var indexTemplate = Mustache.render($('#home-page-logged-out').html());
    $('.container').html(indexTemplate);
  });

  describe ('recipe search event', function(){
    it('should contain an empty search field', function() {
      expect($('#search-form')).toBeInDOM();
    });
  });

  describe('with async sign up', function() {
    beforeEach(function(done) {
      recipeSearchEvent(BigOvenRecipeSearchJson)
      var recipe = 'lasagna';
      $('#search').val(recipe);
      $('#search-form').trigger('submit');
      setTimeout(function() {
        done();
      }, ajaxTimeout)
    });

    it('attaches divs with the recipe-container class', function() {
      expect($('.recipe-container')[0]).toBeInDOM();
    });
  });
});
