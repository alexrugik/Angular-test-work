module.exports = User;

User.$inject = ['App', '$auth', '$state', '$http', '$rootScope', 'User'];

function User(App, $auth, $state, $http, $rootScope, User) {
  $ctr = this;
  $ctr.currentUser = {};
  console.log(App);
  console.log($state);
  console.log("User controller");
  console.log($rootScope);

  if ($auth.isAuthenticated) {
    $ctr.currentUser;
    $ctr.users = $rootScope.users;

    angular.forEach($ctr.users, function(user, key) {
      if(user._id === $state.params.userId) {
        $ctr.currentUser = user;
      }
    })

  } else {
    $state.go("login");
  }


}
