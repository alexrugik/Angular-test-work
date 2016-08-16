module.exports = User;

User.$inject = ['App', '$auth', '$state', '$http', '$rootScope', 'User'];

function User(App, $auth, $state, $http, $rootScope, User) {

  var $ctrl = this;

  if (!$auth.isAuthenticated()) {
    $state.go('login');
  }

  $ctrl.currentUser = User.$find(2);
  console.log($ctrl.currentUser);

}
