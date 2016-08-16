module.exports = Login;

Login.$inject = ['$auth', '$state'];

function Login($auth, $state) {
  var $ctrl = this;

  if ($auth.isAuthenticated()) {
    $state.go("home");
  }

  $ctrl.credentials = {
    email: '',
    password: ''
  };

  $ctrl.authenticate = function() {
    return $auth.login($ctrl.credentials).then(function() {
      $state.go('home');
    });
  };

  var authScenarios = {
    /**
     * Internal authenticate
     */

    /**
     * Google Plus authenticate
     */
    google: function() {},
    /**
     * Facebook authenticate
     */
    facebook: function() {
      console.log("facebook");
      console.log($auth);
      $auth.facebook
    },
    /**
     * Twitter authenticate
     */
    twitter: function() {}
  };
  var authScenarios = {
    facebook: function() {
      $auth.facebook
    },
  };

  function authenticate(provider) {
    $auth.authenticate(provider)
  }
}
