module.exports = Login;

Login.$inject = ['$auth', '$state'];

function Login($auth, $state) {
  var $ctrl = this;

  initPage();

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

  function initPage() {
    checkAuth();
    $ctrl.credentials = {
      email: '',
      password: ''
    };
  }

  function checkAuth() {
    if (!$auth.isAuthenticated()) {
      $ctrl.loginText = 'Login please';
    } else {
      $state.go('home');
    }
  }

  function authenticate(provider) {
    $auth.authenticate(provider)
  }
}
