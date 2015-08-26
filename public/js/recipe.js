var Recipe = function(data){
  this.title = data.Title;
  this.ingredients = [];
  this.instructions = [];
  this.instructionsIndex = 0;
  this.prepTime = data.TotalMinutes;
  this.yieldNumber = data.YieldNumber;
  this.yieldUnit = data.YieldUnit;
  this.stars = data.StarRating;
  this.imageUrl = data.ImageURL;
  this.id = data.RecipeID
}

Recipe.prototype.playStart = function() {
  Ears.stopListening();
  Ears.resumeListening();
  this.instructionsIndex = 0;
  Ears.say(this.instructions[this.instructionsIndex].content);
  this.instructionsIndex += 1;
}

Recipe.prototype.playNext = function() {
  Ears.say(this.instructions[this.instructionsIndex].content);
  this.instructionsIndex += 1;
};

Recipe.prototype.playRepeat = function() {
  this.instructionsIndex -= 1;
  Ears.say(this.instructions[this.instructionsIndex].content);
  this.instructionsIndex += 1;
};

Recipe.prototype.playQuit = function() {
  Ears.say("Why don't you love me?");
  Ears.stopListening();
};

Recipe.prototype.renderView = function(data) {
  for(var i = 0; i < data.Ingredients.length; i++) {
    this.ingredients.push(new Ingredient(data.Ingredients[i]));
  };

  var instructions = data.Instructions.split(/\s{2,}/).filter(Boolean);
  for(var i = 0; i < instructions.length; i++) {
    this.instructions.push(new Instruction(instructions[i]));
  };
  
  var userId = window.localStorage.getItem("sessionId")
  if (userId) {
    this.userId = userId;
  }
  
  renderPage('#recipe-show', '.content-container', this)
  $('span.stars').stars();
  
  renderAppend('#ingredients-template', '.recipe', this)
  renderAppend('#instructions-template', '.recipe', this)
  
  window.scrollTo(0, 0);
  window.sessionStorage.setItem("recipeResult", $('.content-container').html());
}

Recipe.prototype.openEarsSetup = function() {
  var that = this;

  $('.content-container').on('click', '#cook-button', function(event) {

    renderPage('#recipe-back-template', '.content-container')
    renderAppend('#instructions-template', '.content-container', that)
    renderAppend('#backup-buttons-template', '.content-container')

    window.scrollTo(0, 0);

    Ears.stopListening();
    Ears.resumeListening();

    var languages = {};
    languages["commands"] = {};
    languages["commands"].name = "commands";
    languages["commands"].csv = "START,NEXT,REPEAT,QUIT";
    languages["commands"].paths = {};
    Ears.generateLanguageModel(languages["commands"].name, languages["commands"].csv);
    $(document).on("generateLanguageModel", function(evt) {
      languages["commands"].paths = evt.originalEvent.detail;
    });

    $('.content-container').on('click', '.backup-start', function(event) {
      that.playStart();
    })

    $('.content-container').on('click', '.backup-next', function(event) {
      that.playNext();
    })

    $('.content-container').on('click', '.backup-repeat', function(event) {
      that.playRepeat();
    })

    $('.content-container').on('click', '.backup-off', function(event) {
      that.playQuit();
    })

    var processHeard = function(detail) {
      if (detail.hypothesis == "START") {
        that.playStart();
      } else if (detail.hypothesis == "NEXT") {
        that.playNext();
      } else if (detail.hypothesis == "REPEAT") {
        that.playRepeat();
      } else if (detail.hypothesis == "QUIT") {
        that.playQuit();
      }
    };

    $(document).on("receivedHypothesis", function(evt) {
      detail = evt.originalEvent.detail;
      processHeard(detail);
    });

    $(document).on("finishedSpeaking", function(evt) {
      if (that.instructionsIndex >= that.instructions.length) { Ears.stopListening(); }
    });

  });
}