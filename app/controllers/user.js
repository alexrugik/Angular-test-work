module.exports = User;

User.$inject = ['App', '$auth', '$state', '$http', 'User'];

function User(App, $auth, $state, $http, User) {
  var $ctrl = this;

  if (!$auth.isAuthenticated()) {
    $state.go('login');
  }

  $ctrl.currentUser = User.$find($state.params.userId);
  console.log($ctrl.currentUser);
}
