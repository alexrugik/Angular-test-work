module.exports = User;

User.$inject = ['App', '$auth', '$state', '$http', 'User'];

function User(App, $auth, $state, $http, User) {
  var $ctrl = this;

  checkAuth();

  $ctrl.currentUser = User.$find($state.params.userId);

  function checkAuth() {
    if (!$auth.isAuthenticated()) {
      $state.go('login');
    } else {
      $ctrl.loginText = 'Logout';
      $ctrl.logout = function() {
        $state.go('login');
        return $auth.logout().then(function() {})
      }
    }
  }

}
