describe("Splash page", function() {

  beforeEach(function() {
    window.localStorage.removeItem("sessionId")
    jasmine.getFixtures().fixturesPath = 'spec/';
    jasmine.getFixtures().load('index-fake.html');
    renderSplash('#home-page-logged-in', '#home-page-logged-out', '.container')
  });

  it('should have a sign in form', function() {
    window.localStorage.removeItem("sessionId")
    renderSplash('#home-page-logged-in', '#home-page-logged-out', '.container')

    expect(document.getElementsByClassName('signin-form')[0]).toBeInDOM();
  });

  it('should have a sign out link when logged in', function() {
    window.localStorage.setItem("sessionId", 1)
    renderSplash('#home-page-logged-in', '#home-page-logged-out', '.container')

    expect(document.getElementsByClassName('signout-link')[0]).toBeInDOM();
  });

  it('should have the search form always', function() {
    expect($('#search-form')[0]).toBeInDOM();
    window.localStorage.setItem("sessionId", 1)
    renderSplash('#home-page-logged-in', '#home-page-logged-out', '.container')
    expect($('#search-form')[0]).toBeInDOM();
  })

  describe('uses ajax call to search', function() {

    beforeEach(function(done) {
      recipeSearchEvent(BigOvenRecipeSearchJson)
      $('#search').val('lasagna')
      $('#search-form').trigger('submit');

      setTimeout(function() {
        done();
      }, ajaxTimeout);
    });

    it('should land on recipe results page', function() {
      expect($('.recipe-container')[0]).toBeInDOM();
    });

    it('should clear search bar after search comes back', function() {
      expect($('#search').val()).toEqual('');
    })

  });

})

describe("Auth", function() {

  beforeEach(function() {
    window.localStorage.removeItem("sessionId")
    jasmine.getFixtures().fixturesPath = 'spec/';
    jasmine.getFixtures().load('index-fake.html');
    renderSplash('#home-page-logged-in', '#home-page-logged-out', '.container')
  });

  describe('from any page where not logged in', function() {
    it('should be able to add sign up form', function() {
      getSignUpFormEvent();
      $('.signup-link').trigger('click')

      expect($('#signup-container')[0]).toBeInDOM();
    });

    describe('with async sign up', function() {

      beforeEach(function(done) {
        getSignUpFormEvent();
        $('.signup-link').trigger('click')
        $('.signup-form').find('input[name="user[name]"]').val("testben" + Math.floor((Math.random() * 100000) + 1))
        $('.signup-form').find('input[name="user[password]"]').val("123")
        $('.signup-form').find('input[name="user[password_confirmation]"]').val("123")

        signUpEvent(serverUrl);
        $('.signup-form').trigger('submit');

        setTimeout(function() {
          done();
        }, ajaxTimeout);
      })

      it('should be able to submit a sign up form', function() {
        expect($('.signout-link')[0]).toBeInDOM();
      });

      it('should add user id to localStorage', function() {
        expect(window.localStorage.getItem("sessionId")).toBeGreaterThan(0);
      })

      it('should land on the main page with user icon', function() {
        expect($('.glyphicon-user')[0]).toBeInDOM();
      });

      it('should be able to sign out after signing in', function() {
        signOutEvent();
        $('.signout-link').trigger('click');
        expect($('.signin-form')[0]).toBeInDOM();
      });

      it('should remove user from localStorage when signing out', function() {
        signOutEvent();
        $('.signout-link').trigger('click');
        expect(window.localStorage.getItem("sessionId")).toEqual(null);
      });

    });
  });
});