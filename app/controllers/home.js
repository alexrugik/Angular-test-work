module.exports = Home;

Home.$inject = ['App', '$auth', '$state', '$http', 'Test', '$rootScope', 'User'];

function Home(App, $auth, $state, $http, Test, $rootScope, User) {
  var $ctrl = this;
  $ctrl.user = {};

  checkAuth();

  $ctrl.user = App.user;

  $ctrl.saveChanges = function() {
    User.$new($ctrl.user.id).$extend($ctrl.user).$save().$then(function() {
      $ctrl.user.$extend(this);
      $state.go('map');
    });
  }

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
