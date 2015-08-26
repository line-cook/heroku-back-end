describe("User dashboard", function() {

  describe("logging in as a user", function() {

    beforeEach(function(done) {
      window.localStorage.removeItem("sessionId")
      jasmine.getFixtures().fixturesPath = 'spec/';
      jasmine.getFixtures().load('index-fake.html');
      renderSplash('#home-page-logged-in', '#home-page-logged-out', '.container')

      signInEvent(serverUrl);

      $('.signin-form').find('input[name="user[name]"]').val("testben");
      $('.signin-form').find('input[name="user[password]"]').val("123");
      $('.signin-form').trigger('submit');

      setTimeout(function() {
        done();
      }, ajaxTimeout);
    });

    it("should have a user profile button", function() {
      expect($('.glyphicon-user')[0]).toBeInDOM();
    });

    describe("setup async for user dashboard", function() {

      beforeEach(function(done) {
        getUserProfileEvent(serverUrl);
        $('#user-icon').trigger('click');

        setTimeout(function() {
          done();
        }, ajaxTimeout);
      });

      it("should see user favorites", function() {
        expect($('#dashboard-container')).toBeInDOM();
      });

      it("should be able to click on a recipe to jump to recipe show page", function() {
        pending
      });
    });

  });

});