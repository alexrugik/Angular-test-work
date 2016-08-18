module.exports = Login;

Login.$inject = ['$auth', '$state'];

function Login($auth, $state) {
  var $ctrl = this;

  if ($auth.isAuthenticated()) {
    $state.go('home');
  } else {
    $ctrl.loginText = 'Login please';
  }

  $ctrl.credentials = {
    email: '',
    password: ''
  };

  $ctrl.authenticate = function() {
    $auth.authenticate('facebook').then(function(res) {
      return $auth.login({
        fb_token: $auth.getToken()
      });
    }).then(function(res) {
      $auth.setToken(res.data.message);
      $state.go('home');
    });
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
