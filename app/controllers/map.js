module.exports = Map;

Map.$inject = ['App', '$auth', '$state', '$http', '$rootScope', 'User'];

function Map(App, $auth, $state, $http, $rootScope, User) {
  console.log($state);
  var $ctrl = this;

  if ($auth.isAuthenticated()) {
    $ctrl.user = App.user;
    $ctrl.users = User.$search();
  } else {
    $state.go('login');
  }

}
