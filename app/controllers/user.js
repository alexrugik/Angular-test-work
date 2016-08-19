module.exports = User;

User.$inject = ['App', '$auth', '$state', '$http', 'User'];

function User(App, $auth, $state, $http, User) {
  var $ctrl = this;
  const url = 'http://test-api.live.gbksoft.net/api/v1/';

  initPage();

  function initPage() {
    checkAuth();
    $ctrl.currentUser = {};
    getCurrentUser($state.params.userId);
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

  function getCurrentUser(id) {
    let localUrl = url + 'users/' +  $state.params.userId + '?token=' + $auth.getToken();
    return $http.get(localUrl)
      .then(function(response) {
        $ctrl.currentUser = angular.fromJson(response.data.result);
      })
  }

}
