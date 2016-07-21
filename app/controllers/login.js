module.exports = Login;

Login.$inject = ['$auth', '$state'];

function Login($auth, $state) {
  console.log($auth);
  console.log($state);
  if($auth.isAuthenticated()) {
    $state.go("home");
  }
  var vm = this;

  vm.credentials = {
    email: '',
    password: ''
  };
  vm.authenticate = authenticate;

  var authScenarios = {
    /**
     * Internal authenticate
     */

    /**
     * Google Plus authenticate
     */
    google: function () {},
    /**
     * Facebook authenticate
     */
    facebook: function () {
      console.log("facebook");
      console.log($auth);
      $auth.facebook
    },
    /**
     * Twitter authenticate
     */
    twitter: function () {}
  };
  var authScenarios = {
    facebook: function () {
      $auth.facebook
      console.log("facebook");
      console.log($auth);
    },

  };

  function authenticate(provider) {
    $auth.authenticate(provider)
  }

}
