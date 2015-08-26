describe ('Recipe Show', function() {

  beforeEach(function(){
    jasmine.getFixtures().fixturesPath = 'spec/';
    jasmine.getFixtures().load('index-fake.html');
    var currentRecipe = {
      title: "S'mores Cookies",
      ingredients: [{name: "unsalted butter", quantity: 11, unit: "tablespoons"}, {name: "baking soda", quantity: 1, unit: "teaspoon"}],
      instructions: [{content: "Preheat the oven to 375 degrees. Line baking pans with parchment paper. I used one 11x17 pan and one 9x13 pan but you can really use any sized pans you want."}, {content: "Add the flour mixture to the butter mixer and combine on low speed."}],
      prepTime: "28 minutes",
      yieldNumber: 26,
      yieldUnit: "Servings",
      stars: 4.54385964912281,
      imageUrl: "http://redirect.bigoven.com/pics/rs/640/smores-cookies.jpg",
      id: 208491
    };
    renderPage('#logged-out', '.container')
    renderPage('#recipe-show', '.content-container', currentRecipe);
    $('span.stars').stars();

    renderAppend('#incredients-template', '.recipe', currentRecipe);
    renderAppend('#instructions-template', '.recipe', currentRecipe)
  });

  describe ("true", function() {
    it("should equal true", function() {
      expect(true).toBe(true);
    });
  });

  describe ("recipe show template", function() {
    it("should be in the DOM", function() {
      expect($('#recipe-show')).toBeInDOM();
    });
  });

  describe ("favorite icon", function() {

    it("should be in the DOM", function() {
      expect($('#favorite-icon')).toBeInDOM();
    });

    it("should trigger an event when clicked", function() {
      var spyEvent = spyOnEvent('#favorite-icon', 'click');
      $('#favorite-icon').click();
      expect('click').toHaveBeenTriggeredOn('#favorite-icon');
      expect(spyEvent).toHaveBeenTriggered();
    });

    describe ("with an ajax call", function() {

      beforeEach(function(done) {
        spyOn(window, 'alert');
        window.localStorage.removeItem("sessionId");

        addFavorite(serverUrl);
        $('#favorite-icon').trigger('click');

        setTimeout(function() {
          done();
        }, ajaxTimeout);
      })

      it("should return an error alert when a user is not logged in", function() {
        expect(window.alert).toHaveBeenCalledWith('Sorry, please sign in to create favorites!');
      });
    })

    describe ("with an ajax call", function() {

      beforeEach(function(done) {
        spyOn(window, 'alert');
        window.localStorage.setItem("sessionId", testbenId);
        addFavorite(serverUrl);

        var recipeData = {
          Title: "S'mores Cookies",
          Ingredients: [{name: "unsalted butter", quantity: 11, unit: "tablespoons"}, {name: "baking soda", quantity: 1, unit: "teaspoon"}],
          Instructions: "Preheat the oven to 375 degrees. Line baking pans with parchment paper. I used one 11x17 pan and one 9x13 pan but you can really use any sized pans you want. Add the flour mixture to the butter mixer and combine on low speed.",
          TotalMinutes: 28,
          YieldNumber: 26,
          YieldUnit: "Servings",
          StarRating: 4.54385964912281,
          ImageURL: "http://redirect.bigoven.com/pics/rs/640/smores-cookies.jpg",
          RecipeID: 208491
        };

        currentRecipe = new Recipe(recipeData);
        currentRecipe.renderView(recipeData);

        $('.glyphicon-heart').trigger('click');

        setTimeout(function() {
          done();
        }, ajaxTimeout);
      })

      it("should return a confirmation alert when a user is logged in", function() {
        expect(window.alert).toHaveBeenCalledWith('Favorited!');
      });
    })

  });

});
